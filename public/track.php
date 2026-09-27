<?php
declare(strict_types=1);
/*
 * Tiny visit counter — no cookies, no personal data.
 * A JS beacon on every page hits this with ?p=<path>; counts per path per day
 * go to <account>/panel-stats.json (outside public_html). Panel reads it.
 */

http_response_code(204); // no content regardless of outcome

$ua = (string) ($_SERVER['HTTP_USER_AGENT'] ?? '');
if (preg_match('/bot|crawl|spider|slurp|pingdom|uptime|monitor|scan|headless/i', $ua)) exit;

$p = (string) ($_GET['p'] ?? '');
if (!preg_match('#^/[a-zA-Z0-9/_-]{0,200}/?$#', $p)) exit;
if (str_contains($p, '.php') || str_starts_with($p, '/admin')) exit; // don't count the panel itself

$file = dirname(__DIR__) . '/panel-stats.json';
$day = gmdate('Y-m-d');
$keepAfter = gmdate('Y-m-d', strtotime('-90 days'));

$fp = fopen($file, 'c+');
if (!$fp) exit;
flock($fp, LOCK_EX);
$data = json_decode((string) stream_get_contents($fp), true);
if (!is_array($data)) $data = [];
$data[$day][$p] = ($data[$day][$p] ?? 0) + 1;
foreach (array_keys($data) as $d) {
    if ($d < $keepAfter) unset($data[$d]);
}
rewind($fp);
ftruncate($fp, 0);
fwrite($fp, json_encode($data));
flock($fp, LOCK_UN);
fclose($fp);
