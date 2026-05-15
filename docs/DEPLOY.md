# Deploy - hospitalarias.in

## Servidor
- Host: 94.130.222.205
- Ruta stack WP: /opt/wp-multisite
- Nginx vhosts: /opt/voxtvserver/nginx/conf.d/00-wp-domains.conf

## Flujo recomendado
1. Backup previo de archivos del sitio en servidor.
2. Sincronizar cambios al directorio del sitio.
3. Ajustar permisos www-data:www-data.
4. Validar HTTP/HTTPS y cabeceras.

## Validaciones
```bash
curl -I https://hospitalarias.in
curl -I https://www.hospitalarias.in
```
