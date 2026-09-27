<?php
declare(strict_types=1);
session_start();

/*
 * News panel — publish an article + photo without external services.
 * Form -> commits markdown + image to GitHub -> GitHub Action redeploys the site (~3 min).
 *
 * Required config file OUTSIDE the web root (create once via hPanel File Manager):
 *   /home/u900558361/panel-config.php
 * See docs/PANEL.md for the template.
 */

// Config search: ancestors of public_html first, webroot last — a file outside
// the web root (e.g. /home/<user>/panel-config.php) always wins over the
// CI-generated one that ships inside public_html.
$dir = __DIR__;
$dirs = [];
for ($i = 0; $i < 6 && $dir !== dirname($dir); $i++) {
    $dirs[] = $dir;
    $dir = dirname($dir);
}
$config = null;
foreach (array_reverse($dirs) as $d) {
    if (is_file($d . '/panel-config.php')) {
        $config = require $d . '/panel-config.php';
        break;
    }
}

const CATEGORIES = ['Campaigns', 'Vatican', 'Mission', 'Community', 'Events', 'General'];
const LOCALES = ['en' => 'English', 'es' => 'Español (Spanish)', 'hi' => 'हिन्दी (Hindi)', 'ml' => 'മലയാളം (Malayalam)'];
const MAX_UPLOAD = 12 * 1024 * 1024; // 12 MB

$msg = '';
$err = '';

function e(string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }

function slugify(string $t): string {
    $ascii = function_exists('iconv') ? (iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $t) ?: '') : '';
    $s = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $ascii !== '' ? $ascii : $t) ?? '', '-'));
    return $s !== '' ? substr($s, 0, 60) : 'article-' . gmdate('Ymd-Hi');
}

function yamlQuote(string $s): string {
    return "'" . str_replace("'", "''", trim($s)) . "'";
}

function httpRequest(string $method, string $url, array $headers, ?string $body = null): array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 30,
    ]);
    if ($body !== null) curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    $resp = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    return [$code, is_string($resp) ? $resp : ''];
}

function ghHeaders(array $config): array {
    return [
        'Authorization: Bearer ' . $config['github_token'],
        'Accept: application/vnd.github+json',
        'X-GitHub-Api-Version: 2022-11-28',
        'User-Agent: hospitalarias-panel',
        'Content-Type: application/json',
    ];
}

/* Commit (or update) one file in the repo. Returns [ok, errorMessage]. */
function ghCommit(array $config, string $path, string $binary, string $message): array {
    $api = 'https://api.github.com/repos/' . $config['github_repo'] . '/contents/'
        . implode('/', array_map('rawurlencode', explode('/', $path)));
    $headers = ghHeaders($config);

    $sha = null;
    [$code, $body] = httpRequest('GET', $api . '?ref=' . rawurlencode($config['github_branch']), $headers);
    if ($code === 200) {
        $sha = json_decode($body, true)['sha'] ?? null;
    }

    $payload = [
        'message' => $message,
        'content' => base64_encode($binary),
        'branch' => $config['github_branch'],
    ];
    if ($sha) $payload['sha'] = $sha;

    [$code, $body] = httpRequest('PUT', $api, $headers, json_encode($payload));
    if ($code === 200 || $code === 201) return [true, ''];
    $detail = json_decode($body, true)['message'] ?? $body;
    return [false, "GitHub error {$code} on {$path}: {$detail}"];
}

/* Returns [binary, extension] or null on unsupported type. */
function processImage(string $tmpPath, string $mime): ?array {
    $extMap = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
    if (!isset($extMap[$mime])) return null;

    if (function_exists('imagecreatefromstring')) {
        $img = @imagecreatefromstring((string) file_get_contents($tmpPath));
        if ($img !== false) {
            if (imagesx($img) > 1600) {
                $resized = imagescale($img, 1600);
                if ($resized !== false) { imagedestroy($img); $img = $resized; }
            }
            ob_start();
            imagejpeg($img, null, 82);
            $bin = (string) ob_get_clean();
            imagedestroy($img);
            return [$bin, 'jpg'];
        }
    }
    return [(string) file_get_contents($tmpPath), $extMap[$mime]];
}

// ---------- Auth ----------
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: panel.php');
    exit;
}

if (isset($_POST['action']) && $_POST['action'] === 'login') {
    if ($config && hash_equals((string) $config['panel_password'], (string) ($_POST['password'] ?? ''))) {
        session_regenerate_id(true);
        $_SESSION['ok'] = true;
        $_SESSION['csrf'] = bin2hex(random_bytes(16));
    } else {
        sleep(1);
        $err = 'Incorrect password.';
    }
}

$logged = !empty($_SESSION['ok']);

// ---------- Publish ----------
if ($logged && isset($_POST['action']) && $_POST['action'] === 'publish') {
    if (!hash_equals((string) ($_SESSION['csrf'] ?? ''), (string) ($_POST['csrf'] ?? ''))) {
        $err = 'Session expired — please try again.';
    } elseif (!$config) {
        $err = 'Panel is not configured yet. Ask Luis to create panel-config.php (see docs/PANEL.md).';
    } else {
        $locale = (string) ($_POST['locale'] ?? 'en');
        $title = trim((string) ($_POST['title'] ?? ''));
        $category = in_array($_POST['category'] ?? '', CATEGORIES, true) ? (string) $_POST['category'] : 'General';
        $description = trim((string) ($_POST['description'] ?? ''));
        $imageAlt = trim((string) ($_POST['image_alt'] ?? ''));
        $body = trim((string) ($_POST['body'] ?? ''));
        $date = preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) ($_POST['date'] ?? ''))
            ? (string) $_POST['date'] : gmdate('Y-m-d');

        if (!isset(LOCALES[$locale])) $err = 'Please choose a valid language.';
        elseif ($title === '' || $body === '' || $description === '' || $imageAlt === '') {
            $err = 'Please fill in every field.';
        } elseif (empty($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
            $err = 'Please attach a photo (JPG, PNG or WebP, up to 12 MB).';
        } elseif ($_FILES['photo']['size'] > MAX_UPLOAD) {
            $err = 'The photo is too large (max 12 MB).';
        } else {
            $mime = (string) (new finfo(FILEINFO_MIME_TYPE))->file($_FILES['photo']['tmp_name']);
            $image = processImage($_FILES['photo']['tmp_name'], $mime);

            if (!$image) {
                $err = 'The photo must be a JPG, PNG or WebP image.';
            } else {
                [$imgBin, $ext] = $image;
                $slug = slugify($title);
                $imgRepoPath = "public/images/news/{$slug}.{$ext}";
                $mdRepoPath = "src/content/news/{$locale}/{$slug}.md";
                $imgWebPath = "/images/news/{$slug}.{$ext}";

                $md = "---\n"
                    . 'title: ' . yamlQuote($title) . "\n"
                    . "date: {$date}T00:00:00.000Z\n"
                    . "category: {$category}\n"
                    . "image: {$imgWebPath}\n"
                    . 'imageAlt: ' . yamlQuote($imageAlt) . "\n"
                    . 'description: ' . yamlQuote($description) . "\n"
                    . "---\n\n" . $body . "\n";

                [$okImg, $errImg] = ghCommit($config, $imgRepoPath, $imgBin, "news: photo for {$slug}");
                if (!$okImg) {
                    $err = $errImg;
                } else {
                    [$okMd, $errMd] = ghCommit($config, $mdRepoPath, $md, "news: {$title}");
                    if ($okMd) {
                        $base = ['en' => '/en/news/', 'hi' => '/hi/samachar/', 'ml' => '/ml/varthakal/', 'es' => '/es/noticias/'][$locale];
                        $msg = "Published \"{$title}\". It will appear at https://hospitalarias.in{$base} in about 3-5 minutes.";
                    } else {
                        $err = $errMd;
                    }
                }
            }
        }
    }
    $_SESSION['csrf'] = bin2hex(random_bytes(16)); // rotate token
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>News Panel — Benedict Menni Centre</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; background: #f4f2ef; color: #26221e; margin: 0; padding: 24px; }
  .card { max-width: 560px; margin: 0 auto; background: #fff; border-radius: 14px; padding: 28px; box-shadow: 0 6px 24px rgba(0,0,0,.08); }
  h1 { font-size: 1.35rem; margin: 0 0 4px; }
  .sub { color: #6b655c; font-size: .9rem; margin: 0 0 20px; }
  label { display: block; font-weight: 600; font-size: .85rem; margin: 16px 0 4px; }
  input, select, textarea { width: 100%; padding: 11px 12px; border: 1px solid #d8d2c8; border-radius: 8px; font: inherit; font-size: 1rem; background: #fff; }
  textarea { min-height: 160px; resize: vertical; }
  .hint { font-size: .78rem; color: #6b655c; margin-top: 3px; }
  button { margin-top: 22px; width: 100%; padding: 13px; border: 0; border-radius: 8px; background: #7a2e2e; color: #fff; font-size: 1rem; font-weight: 700; cursor: pointer; }
  button:hover { background: #612525; }
  .ok { background: #e8f5e9; border: 1px solid #a5d6a7; color: #1b5e20; padding: 12px 14px; border-radius: 8px; margin-bottom: 16px; }
  .err { background: #fdecea; border: 1px solid #f5b7b1; color: #922; padding: 12px 14px; border-radius: 8px; margin-bottom: 16px; }
  .row { display: flex; gap: 12px; } .row > div { flex: 1; }
  .links { display: flex; justify-content: space-between; margin-top: 18px; font-size: .85rem; }
  a { color: #7a2e2e; }
</style>
</head>
<body>
<div class="card">
  <h1>News Panel</h1>
  <p class="sub">Benedict Menni Psychosocial Rehabilitation Centre</p>

  <?php if ($msg): ?><div class="ok"><?= e($msg) ?></div><?php endif; ?>
  <?php if ($err): ?><div class="err"><?= e($err) ?></div><?php endif; ?>

  <?php if (!$logged): ?>
    <form method="post">
      <input type="hidden" name="action" value="login">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required autofocus autocomplete="current-password">
      <button type="submit">Sign in</button>
    </form>
  <?php else: ?>
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="action" value="publish">
      <input type="hidden" name="csrf" value="<?= e((string) ($_SESSION['csrf'] ?? '')) ?>">

      <div class="row">
        <div>
          <label for="locale">Article language</label>
          <select id="locale" name="locale">
            <?php foreach (LOCALES as $code => $label): ?>
              <option value="<?= e($code) ?>"><?= e($label) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
        <div>
          <label for="date">Date</label>
          <input type="date" id="date" name="date" value="<?= e(gmdate('Y-m-d')) ?>">
        </div>
      </div>

      <label for="title">Title</label>
      <input type="text" id="title" name="title" required maxlength="140">

      <label for="category">Category</label>
      <select id="category" name="category">
        <?php foreach (CATEGORIES as $c): ?><option><?= e($c) ?></option><?php endforeach; ?>
      </select>

      <label for="description">Short description</label>
      <input type="text" id="description" name="description" required maxlength="200">
      <p class="hint">One or two sentences — shown on the news card.</p>

      <label for="photo">Photo</label>
      <input type="file" id="photo" name="photo" accept="image/jpeg,image/png,image/webp" required>
      <p class="hint">JPG, PNG or WebP, up to 12 MB. Large photos are resized automatically.</p>

      <label for="image_alt">Photo description</label>
      <input type="text" id="image_alt" name="image_alt" required maxlength="160">
      <p class="hint">Describe the photo for blind readers, e.g. "Residents at the garden workshop".</p>

      <label for="body">Article text</label>
      <textarea id="body" name="body" required></textarea>
      <p class="hint">Plain text. Leave an empty line between paragraphs.</p>

      <button type="submit">Publish</button>
    </form>
    <div class="links">
      <a href="https://hospitalarias.in/en/news/" target="_blank" rel="noopener">View news page ↗</a>
      <a href="?logout=1">Sign out</a>
    </div>
  <?php endif; ?>
</div>
</body>
</html>
