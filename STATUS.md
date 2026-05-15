# hospitalarias.in - STATUS

## Objetivo
Salvar sitio de Hostinger en server Hetzner dentro del stack WP paralelo.

## Fuentes usadas
- `public_html.zip` (6.0G)
- `u299712666_tQWF4.sql` (8.7M)

## Ubicación en servidor
- `/opt/wp-multisite/wp4`
- DB: `wp4`

## Notas técnicas
- Se necesitó parchear sintaxis en SQL export para defaults binarios de tablas Wordfence (`DEFAULT x...`).
- Se reinstaló core WP base desde backup previo para recuperar `wp-admin`/`wp-includes`.
- Plugin `elementor` y `megamenu` instalados manualmente por servidor.

## Estado actual
- Front responde (`200`)
- Admin accesible
- Editor Elementor aún sensible a sesiones/caché/protocolo

## Próximo paso recomendado
- Estabilizar login/editor en una sola ruta HTTPS y validar edición completa de página principal.
