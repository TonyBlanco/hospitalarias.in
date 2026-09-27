# News Panel — publicar artículos sin TinaCMS

`panel.php` es una página PHP propia en Hostinger. Las hermanas escriben un
artículo, adjuntan una foto y pulsan **Publish**. El panel hace commit del
markdown + la imagen al repo de GitHub y el workflow `deploy-hostinger.yml`
redeploya la web automáticamente (~3-5 min).

URL: `https://hospitalarias.in/panel.php` (noindex, disallow en robots.txt).

## Setup — automático vía GitHub Secrets

El archivo `panel-config.php` **lo genera el CI** en cada deploy: el workflow
`deploy-hostinger.yml` lo escribe en `dist/` (→ `public_html/`) desde dos
secrets del repo:

- `PANEL_PASSWORD` — la contraseña que comparten las hermanas
- `PANEL_GITHUB_TOKEN` — token para el Contents API

El archivo contiene secrets pero está protegido: `.htaccess` devuelve **404**
en `GET /panel-config.php` y, aunque se ejecutara, PHP no imprime nada (solo
`return [...]`).

### Rotar la contraseña o el token

```bash
gh secret set PANEL_PASSWORD --body "nueva-contraseña" -R TonyBlanco/hospitalarias.in
gh secret set PANEL_GITHUB_TOKEN --body "github_pat_..." -R TonyBlanco/hospitalarias.in
# luego: gh workflow run (o cualquier push) para regenerar el archivo
```

### Override manual (opcional, más seguro)

Si prefieres el config **fuera** del webroot, crea
`/home/u900558361/panel-config.php` en hPanel → File Manager:

```php
<?php
return [
  'github_token'   => 'github_pat_...',
  'github_repo'    => 'TonyBlanco/hospitalarias.in',
  'github_branch'  => 'main',
  'panel_password' => 'LaContraseñaQueCompartesConLasHermanas',
];
```

`panel.php` busca el archivo de fuera hacia dentro (raíz de la cuenta primero,
`public_html` al final), así que el archivo manual **siempre gana** al
generado por el CI.

Nota: el token actual en `PANEL_GITHUB_TOKEN` es el OAuth de `gh` (scope
`repo`, acceso a todos los repos). Para endurecerlo, crea un fine-grained PAT
limitado a este repo (Contents: Read+write) y haz `gh secret set`.

## Probar

1. `https://hospitalarias.in/panel.php` → login con la contraseña.
2. Publicar un artículo de prueba.
3. Confirmar el commit en GitHub y el run del Action.
4. En ~3-5 min aparece en la sección del idioma elegido.

## Cómo funciona

- Cada publish = 2 commits a `main`: imagen en `public/images/news/<slug>.<ext>`
  y artículo en `src/content/news/<locale>/<slug>.md`.
- Las fotos >1600px se redimensionan a JPEG automáticamente (si GD está
  disponible en el hosting; si no, se sube tal cual).
- Mismo título = mismo slug = se sobrescribe el artículo (sirve para corregir).
- La contraseña se pide una vez por sesión (PHP session cookie).
- La interfaz está en inglés; el selector de idioma (EN/ES/HI/ML) decide en
  qué sección aparece el artículo.

## Fallback

Si GitHub API falla, el error se muestra en el panel. En ese caso el artículo
se puede crear a mano: copiar el `.md` en `src/content/news/<locale>/` y la
foto en `public/images/news/`, commit + push, mismo resultado.

## Notas

- TinaCMS (`/admin/`) sigue desplegado pero ya no es necesario. Si se decide
  retirarlo: borrar `public/admin/`, `tina/`, y quitar los secrets `TINA_*`
  del workflow.
- `/es/` ya es un locale real; los artículos en `src/content/news/es/` se
  publican en `/es/noticias/`.
