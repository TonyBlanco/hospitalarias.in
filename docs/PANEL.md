# News Panel — publicar artículos sin TinaCMS

`panel.php` es una página PHP propia en Hostinger. Las hermanas escriben un
artículo, adjuntan una foto y pulsan **Publish**. El panel hace commit del
markdown + la imagen al repo de GitHub y el workflow `deploy-hostinger.yml`
redeploya la web automáticamente (~3-5 min).

URL: `https://hospitalarias.in/panel.php` (noindex, disallow en robots.txt).

## Setup (una sola vez, ~5 min)

### 1. Crear el token de GitHub

1. GitHub → Settings → Developer settings → Personal access tokens →
   **Fine-grained tokens** → Generate new token.
2. Repository access: **Only select repositories** → `TonyBlanco/hospitalarias.in`.
3. Permissions: **Contents → Read and write**. Nada más.
4. Generar y copiar el token (`github_pat_...`).

### 2. Crear el archivo de config en Hostinger (fuera del webroot)

hPanel → File Manager → ir a `/home/u900558361/` (la carpeta RAÍZ de la cuenta,
NO dentro de `public_html`). Crear `panel-config.php`:

```php
<?php
return [
  'github_token'   => 'github_pat_PEGAR_AQUI',
  'github_repo'    => 'TonyBlanco/hospitalarias.in',
  'github_branch'  => 'main',
  'panel_password' => 'LaContraseñaQueCompartesConLasHermanas',
];
```

El panel busca este archivo subiendo niveles desde `public_html`, así que
cualquier carpeta por encima del webroot sirve. Nunca va al repo ni a `dist/`.

### 3. Probar

1. `https://hospitalarias.in/panel.php` → login con la contraseña.
2. Publicar un artículo de prueba.
3. Confirmar el commit en GitHub y el run del Action.
4. En ~3-5 min aparece en `/en/news/` (o `/hi/samachar/`, `/ml/varthakal/`).

## Cómo funciona

- Cada publish = 2 commits a `main`: imagen en `public/images/news/<slug>.<ext>`
  y artículo en `src/content/news/<locale>/<slug>.md`.
- Las fotos >1600px se redimensionan a JPEG automáticamente (si GD está
  disponible en el hosting; si no, se sube tal cual).
- Mismo título = mismo slug = se sobrescribe el artículo (sirve para corregir).
- La contraseña se pide una vez por sesión (PHP session cookie).
- La interfaz está en inglés; el selector de idioma decide en qué sección
  aparece el artículo.

## Fallback

Si GitHub API falla, el error se muestra en el panel. En ese caso el artículo
se puede crear a mano: copiar el `.md` en `src/content/news/<locale>/` y la
foto en `public/images/news/`, commit + push, mismo resultado.

## Notas

- TinaCMS (`/admin/`) sigue desplegado pero ya no es necesario. Si se decide
  retirarlo: borrar `public/admin/`, `tina/`, `src/pages/admin*` si existe, y
  quitar los secrets `TINA_*` del workflow.
- Los artículos en `src/content/news/es/` no se publican (no hay locale `es`
  en la web). O se eliminan o se monta `/es/` en el futuro.
