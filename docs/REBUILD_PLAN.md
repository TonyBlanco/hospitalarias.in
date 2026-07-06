# Rebuild Plan - hospitalarias.in

## Regla critica global

La paleta del sitio actual se conserva exacta.

- no cambiar colores de marca
- no aproximar colores
- no reinterpretar colores
- usar los mismos valores hex del sitio actual
- si aparece un conflicto entre accesibilidad y color, el color no se modifica sin aprobacion explicita

## Objetivo

Reconstruir `hospitalarias.in` como sitio estatico moderno, facil de mantener y sin dependencia de WordPress, usando el contenido y assets ya rescatados del backup.

## Por que cambiar

- WordPress ha quedado recuperado solo de forma parcial y fragil.
- El sitio depende de plugins, actualizaciones y ajustes manuales frecuentes.
- Para un sitio corporativo e informativo, una arquitectura estatica reduce coste, riesgo y mantenimiento.
- El contenido ya existe y puede reutilizarse sin arrastrar la complejidad del sistema anterior.

## Estado actual

- El contenido principal ha sido rescatado desde backup.
- Existen archivos, imagenes, textos y estructura base del sitio anterior.
- La restauracion de WordPress no es una base fiable para seguir construyendo.
- La prioridad ya no es "arreglar WordPress", sino extraer el contenido y rehacer el sitio mejor.

## Fuentes disponibles

- Backup completo de `public_html`
- Dump SQL restaurado
- Tema hijo personalizado `hermanas-hospitalarias-child`
- Libreria de uploads e imagenes
- Estructura de paginas visible en el sitio recuperado

## Enfoque recomendado

### Stack

- Framework: `Astro`
- Estilos: CSS modular o componentes con estilos locales
- Contenido: Markdown, JSON o YAML
- Formularios: servicio externo simple o endpoint ligero si hace falta
- Hosting: Hostinger
- CDN/DNS: Cloudflare

### Ventajas

- Mucho mas rapido
- Menos puntos de fallo
- Sin plugins ni panel pesado
- Mejor base para SEO
- Mejor base para multidioma
- Mantenimiento muy simple para cambios editoriales controlados

## Arquitectura propuesta

### 1. Capa de contenido

Separar contenido de presentacion:

- textos institucionales
- secciones de mision, vision y valores
- perfiles o bloques de equipo
- galeria
- newsletters o recursos descargables
- datos de contacto

Todo esto debe vivir en archivos faciles de editar y versionar.

### 2. Capa de componentes

Crear componentes reutilizables:

- `Header`
- `Footer`
- `Hero`
- `ContentSection`
- `CardGrid`
- `Timeline`
- `Gallery`
- `CTA`
- `ContactBlock`

### 3. Capa visual

Definir un sistema claro:

- tipografia
- paleta
- espaciado
- grid
- estados responsive
- tokens de color y superficie

## Mapa inicial de contenido a rescatar

Paginas detectadas o esperables:

- `/`
- `/our-founders-2/`
- `/benito-menni/`
- `/our-founders/`
- `/our-mission-values/`
- `/our-team/`
- `/what-we-do/`
- `/get-involved/donate/`
- `/get-involved/collaborate-with-us/`
- `/get-involved/volunteer-services/`
- `/communication/`
- `/communications/`
- `/gallery/`
- `/newsletter/`
- `/contact/`
- `/policy/`

## Sitemap propuesto

Arbol nuevo recomendado:

```text
hospitalarias.in
├── Inicio                      /
├── Quiénes somos               /about/
│   ├── Misión y valores        /about/mission-values/
│   ├── Fundadores              /about/founders/
│   │   └── Benito Menni        /about/founders/benito-menni/
│   └── Nuestro equipo          /about/team/
├── Qué hacemos                 /what-we-do/
├── Colabora                    /get-involved/
│   ├── Donar                   /get-involved/donate/
│   ├── Voluntariado            /get-involved/volunteer/
│   └── Colabora con nosotros   /get-involved/collaborate/
├── Actualidad                  /news/
│   ├── Galería                 /gallery/
│   └── Newsletter              /newsletter/
├── Contacto                    /contact/
└── Política de privacidad      /privacy-policy/
```

### Limpieza aplicada respecto al WordPress viejo

- `our-founders` y `our-founders-2` se fusionan en una sola pagina.
- `communication` y `communications` se unifican en `news`.
- `policy` se renombra a `privacy-policy`.
- Las rutas de `get-involved` se simplifican para que sean mas claras y cortas.

## Estructura bilingue

Base recomendada para `Astro`:

```text
src/pages/
  en/
  es/
```

### Recomendaciones

- usar estructura preparada para `en` y `es` desde el inicio
- añadir `hreflang` en cada pagina
- incluir selector de idioma en el header
- usar slugs localizados por idioma

### Decision recomendada

Para la primera version:

- mantener `/` con idioma fijo en lugar de deteccion automatica
- usar slugs localizados
- evitar logica compleja de redireccion por navegador hasta una fase posterior

Ejemplo recomendado:

- `/en/about/`
- `/es/quienes-somos/`
- `/en/privacy-policy/`
- `/es/politica-de-privacidad/`

## Estructura de paginas

### Inicio

- hero con mision en una frase
- CTA principal de donar
- resumen de que hacemos
- impacto o cifras
- teaser de historia y Benito Menni
- llamada a colaborar
- ultimas noticias

### Misión y valores

- introduccion
- mision
- vision
- valores
- cita del fundador

### Fundadores

- historia de la congregacion
- listado de fundadores
- enlace destacado a Benito Menni

### Benito Menni

- biografia
- cronologia
- legado
- galeria historica

### Nuestro equipo

- introduccion
- grid de personas con foto, nombre y rol

### Qué hacemos

- introduccion
- areas de actividad o servicios
- donde actuamos
- testimonios

### Colabora

- pagina hub con tres tarjetas
- donar
- voluntariado
- colabora con nosotros

### Donar

- por que donar
- formas de donacion
- boton o formulario
- bloque de transparencia

### Voluntariado

- como participar
- requisitos
- formulario

### Colabora con nosotros

- alianzas
- beneficios
- contacto

### Actualidad

- listado de noticias
- categorias
- paginacion si aplica

### Galería

- grid de imagenes
- lightbox o visor simple

### Newsletter

- introduccion
- formulario de suscripcion

### Contacto

- formulario
- datos de contacto
- mapa
- redes sociales

### Política de privacidad

- texto legal
- adaptacion RGPD

## Mapa de redirecciones 301

Estas redirecciones deben mantenerse para no perder enlaces antiguos ni SEO:

| URL vieja | URL nueva | Nota |
| --- | --- | --- |
| `/our-founders/` | `/about/founders/` | ruta consolidada |
| `/our-founders-2/` | `/about/founders/` | duplicado fusionado |
| `/benito-menni/` | `/about/founders/benito-menni/` | nueva jerarquia |
| `/our-mission-values/` | `/about/mission-values/` | reorganizacion |
| `/our-team/` | `/about/team/` | reorganizacion |
| `/what-we-do/` | `/what-we-do/` | se mantiene |
| `/get-involved/donate/` | `/get-involved/donate/` | se mantiene |
| `/get-involved/collaborate-with-us/` | `/get-involved/collaborate/` | slug acortado |
| `/get-involved/volunteer-services/` | `/get-involved/volunteer/` | slug acortado |
| `/communication/` | `/news/` | fusionada |
| `/communications/` | `/news/` | fusionada |
| `/gallery/` | `/gallery/` | se mantiene |
| `/newsletter/` | `/newsletter/` | se mantiene |
| `/contact/` | `/contact/` | se mantiene |
| `/policy/` | `/privacy-policy/` | renombrada |

## Navegacion global

### Header

- Inicio
- Quiénes somos
- Qué hacemos
- Colabora
- Actualidad
- Contacto
- boton CTA `Donar`
- selector de idioma `EN / ES`

### Footer

- enlaces rapidos
- politica de privacidad
- contacto
- redes sociales
- newsletter

## Accesibilidad como requisito de diseño

La accesibilidad no debe tratarse como una validacion final, sino como parte del sitemap, los componentes y la navegacion desde el inicio.

### Criterios base de a11y

- jerarquia correcta de encabezados `h1` a `h6`
- navegacion completa por teclado
- estados `focus` visibles
- contraste suficiente entre texto y fondo
- enlaces y botones con etiquetas claras
- imagenes con texto alternativo util
- formularios con `label`, ayuda y mensajes de error claros
- menus desplegables accesibles
- landmarks semanticos como `header`, `nav`, `main`, `footer`
- idioma declarado correctamente por pagina

### Impacto en el sitemap y la UI

- el header debe funcionar bien con teclado y lector de pantalla
- el selector de idioma debe ser claro y accesible
- las paginas largas como `Qué hacemos`, `Fundadores` o `Política de privacidad` deben tener buena estructura de lectura
- la galeria necesita navegacion accesible y no depender solo de interacciones visuales
- los formularios de `Contacto`, `Donar`, `Voluntariado` y `Newsletter` deben ser simples y robustos

### Entregables de accesibilidad para la v1

- checklist a11y por plantilla
- revision de contraste y foco
- pruebas basicas de teclado
- validacion semantica de formularios
- revision responsive en movil

## Modelo de contenido desacoplado

Estructura recomendada:

```text
src/content/
  pages/
  settings/
    navigation.json
    site.json
    team.json
public/images/
```

### Uso recomendado

- `pages/` para una pagina por idioma
- `navigation.json` para menus header y footer
- `site.json` para datos globales
- `team.json` para perfiles del equipo
- `public/images/` para imagenes optimizadas salidas del backup limpio

## Fases del proyecto

### Fase 1. Inventario y extraccion

Objetivo: convertir el backup en material utilizable.

Tareas:

- localizar paginas reales publicadas
- extraer textos principales
- identificar imagenes y documentos validos
- separar basura tecnica, backups internos y duplicados
- documentar que contenido falta o esta roto

Entregable:

- inventario de paginas
- inventario de assets
- lista de contenido dudoso o incompleto

### Fase 2. Sistema visual y UX

Objetivo: redisenar sin depender del look roto de WordPress.

Tareas:

- definir estructura de navegacion
- revisar jerarquia de informacion
- simplificar menus y secciones
- mejorar legibilidad y accesibilidad
- definir version movil primero

Entregable:

- mapa del sitio
- wireframes o referencias UI
- direccion visual aprobada

### Fase 3. Implementacion estatica

Objetivo: montar el nuevo sitio sobre una base limpia.

Tareas:

- crear proyecto Astro
- definir layout base
- crear componentes reutilizables
- cargar contenido estructurado
- montar paginas prioritarias
- optimizar imagenes

Entregable:

- version funcional local
- estructura lista para despliegue

### Fase 4. QA y publicacion

Objetivo: salir a produccion con una base estable.

Tareas:

- revisar responsive
- revisar accesibilidad basica
- validar enlaces, formularios y recursos
- revisar SEO tecnico base
- desplegar en Hostinger
- mantener Cloudflare como capa DNS/CDN

Entregable:

- sitio publicado
- checklist de validacion

## Requisitos de UX y accesibilidad

El revisor de UI deberia evaluar:

- claridad de navegacion
- legibilidad tipografica
- consistencia de espaciados
- contraste de color
- orden de lectura
- responsive en movil
- estados hover/focus
- semantica HTML
- accesibilidad de formularios

## Requisitos tecnicos

- HTML semantico
- CSS limpio y mantenible
- rendimiento alto en movil
- imagenes optimizadas
- sin dependencias innecesarias
- despliegue simple por archivos estaticos
- estructura preparada para i18n

## Estrategia multidioma

No hace falta activarla desde el dia uno, pero la base debe prepararse para:

- ingles
- espanol
- posibles idiomas adicionales

Recomendacion:

- rutas por idioma
- contenido separado por locale
- componentes compartidos
- no mezclar traducciones dentro del markup

## Riesgos a evitar

- intentar reparar WordPress indefinidamente
- arrastrar plugins o estructura legacy sin criterio
- copiar el diseno antiguo tal cual si ya no funciona bien
- mezclar contenido y maquetacion de forma rigida
- reconstruir sin inventario previo

## Decision recomendada

Seguir este orden:

1. Congelar WordPress como fuente de referencia, no como producto final.
2. Extraer contenido y assets utiles.
3. Redisenar una version estatica mas clara y mantenible.
4. Publicar primero una version estable en un solo idioma.
5. Preparar la siguiente iteracion con i18n y mejoras editoriales.

## Decisiones recomendadas para cerrar

- aprobar este sitemap como base de trabajo
- usar slugs localizados por idioma
- lanzar una `v1` con las paginas institucionales principales
- dejar `Actualidad`, `Galería` y `Newsletter` en fase 2 si el contenido no esta listo
- tratar `Nuestro equipo` como fase 1 solo si hay contenido real suficiente
- definir `Donar` como landing prioritaria si el objetivo principal incluye captacion

## Siguiente paso operativo

Preparar dos entregables:

1. un inventario real de contenido recuperado
2. un primer esqueleto del nuevo sitio en Astro

Con eso ya se puede pasar de "rescate tecnico" a "reconstruccion controlada".

## Prompts de agente

Set de prompts copia-pega para ejecutar el rebuild por fases. Cada prompt es autonomo y debe parar para revision antes de seguir.

### Placeholders

- `[REPO]`: ruta del repositorio del rebuild
- `[FUENTE]`: ruta absoluta de los ficheros rescatados del WordPress viejo
- `[FORK]`: remoto propio donde se hace push
- `[IP_HOSTINGER]`: IP real del hosting de destino

### Prompt 0. Inventario de contenido

```text
ROL: Agente de desarrollo. Extrae el contenido RESCATADO de hospitalarias.in (WordPress viejo) a un inventario estructurado que será la FUENTE del rebuild en Astro. NO construyas el sitio todavía. Meticuloso; PARA al final para mi OK.

REGLAS DE ORO: rutas absolutas; solo LEE el WordPress (no lo toques como producto); NO inventes contenido (extrae el real); no secretos.

FUENTE: ficheros rescatados (HTML/export + carpeta uploads) en [FUENTE].

TAREA:
1. Por cada pagina del sitemap nuevo, localiza su pagina vieja equivalente y extrae: titulo (en/es si existe); textos (encabezados + parrafos en texto/markdown, SIN HTML de Elementor); imagenes usadas (nombre en /uploads) + alt; CTAs (texto + destino) y enlaces internos.
2. Guarda un .md por pagina en [REPO]/_source/inventory/ con esta plantilla:
   pagina | url_nueva | url_vieja_origen | titulo_en | titulo_es
   copys: ...
   imagenes: [archivo + alt]
   ctas: ...
   enlaces_internos: ...
   notas_limpieza: ...
3. Copia las imagenes referenciadas a [REPO]/_source/images-raw/ (sin optimizar aun).
4. Marca duplicados (our-founders vs our-founders-2 ; communication vs communications) y que se fusiona.
5. PALETA DE COLORES (CRITICO, prioridad #1): extrae los colores EXACTOS del sitio actual (revisa el CSS del tema/Elementor, variables CSS y valores hex/rgb en el HTML). Lista cada color con su hex y su uso (fondo, texto, botones, enlaces, acentos, header/footer). Guardalo en [REPO]/_source/colors.md. NO aproximes ni cambies ningun color.

ENTREGA: arbol de _source/inventory/ + lista de imagenes + _source/colors.md con la paleta EXACTA (hex) + resumen de lo que falte. PARA para mi OK antes de la Fase 1.
```

### Prompt 1. Scaffold Astro + i18n + layout base

```text
ROL: Agente de desarrollo. Crea el proyecto Astro base de hospitalarias.in (estatico, bilingue en/es): layout, navegacion y tokens de diseno. Sin contenido final aun. PARA en el diff para mi OK.

REGLAS DE ORO: rutas absolutas; trabaja en [REPO]; rama feature + push SOLO a [FORK]; commits convencionales; sin plugins innecesarios, sin base de datos, sin CMS.

TAREA:
1. Inicializa Astro (ultima version, TypeScript) en [REPO].
2. i18n en/es (routing por carpetas src/pages/en y src/pages/es). Idioma por defecto: DECIDE conmigo (en, o deteccion). hreflang en cada pagina.
3. Content Collections (src/content/): 'pages' (por idioma) + 'settings' (navigation.json, site.json, team.json) con schemas Zod.
4. Layout base src/layouts/Base.astro: <head> con meta/SEO/hreflang/OpenGraph, skip-link de accesibilidad, <Header> y <Footer>.
5. Header con la nav del mapa (desplegables 'Quienes somos' y 'Colabora', boton CTA 'Donar', selector EN/ES) y Footer (enlaces, privacidad, redes, newsletter).
6. COLORES (CRITICO, prioridad #1): crea un CSS DEDICADO src/styles/colors.css con los colores EXACTOS de _source/colors.md (mismos hex, como CSS variables). TODO el sitio usa esas variables; PROHIBIDO inventar o aproximar colores. El resto de tokens (tipografia, espaciado) coherentes con la marca (logo rescatado). Mobile-first y responsive.
7. Una pagina placeholder por cada ruta del sitemap para que 'npm run build' compile.

ENTREGA: estructura del repo + salida de 'npm run build' + capturas del layout base (header/footer/responsive). PARA para mi OK.
```

### Prompt 2. Home

```text
ROL: Agente de desarrollo. Construye la HOME de hospitalarias.in en Astro usando el inventario (_source/inventory/) como fuente. PARA en el diff para mi OK.

REGLAS DE ORO: rutas absolutas; rama feature + push SOLO a [FORK]; contenido desde _source (no inventar); accesible y responsive.

TAREA (secciones del mapa para la Home):
1. Hero: mision en 1 frase + CTA 'Donar'.
2. 'Que hacemos' (resumen de 3 areas).
3. Impacto/cifras.
4. Historia (teaser de Benito Menni con enlace).
5. Llamada a colaborar (tarjetas Donar/Voluntariado/Colabora).
6. Ultimas noticias (si hay; si no, ocultar limpio).
7. Contenido en Markdown/JSON desacoplado (src/content), en/es.

ACCESIBILIDAD: jerarquia correcta de headings (un solo h1), alt en imagenes, contraste AA, foco visible.

ENTREGA: diff + captura desktop/mobile en en y es + build OK. PARA para mi OK.
```

### Prompt 3. Quienes somos + Que hacemos

```text
ROL: Agente de desarrollo. Construye las paginas internas del bloque 'Quienes somos' y 'Que hacemos', desde el inventario. PARA en el diff para mi OK.

REGLAS DE ORO: rutas absolutas; rama feature + push SOLO a [FORK]; contenido desde _source; accesible/responsive; reutiliza componentes del layout base.

PAGINAS (rutas del mapa, en/es):
- /about/mission-values/  (intro, mision, vision, valores, cita del fundador)
- /about/founders/         (historia de la congregacion, listado de fundadores, enlace a Benito Menni) -- FUSIONA our-founders + our-founders-2
- /about/founders/benito-menni/  (biografia, cronologia, legado, galeria historica)
- /about/team/             (intro + grid de personas desde team.json)
- /what-we-do/             (intro, areas/servicios, donde actuamos, testimonios)

ENTREGA: diff + capturas en/es de cada pagina + build OK. PARA para mi OK.
```

### Prompt 4. Colabora + Contacto + Privacidad

```text
ROL: Agente de desarrollo. Construye el hub 'Colabora' y sus subpaginas, Contacto y Politica de privacidad. PARA en el diff para mi OK.

REGLAS DE ORO: rutas absolutas; rama feature + push SOLO a [FORK]; contenido desde _source; accesible/responsive.

PAGINAS (rutas del mapa, en/es):
- /get-involved/            (hub: 3 tarjetas Donar/Voluntariado/Colabora)
- /get-involved/donate/     (por que donar, formas de donacion, boton/formulario, transparencia)
- /get-involved/volunteer/  (como participar, requisitos, formulario)   [antes volunteer-services]
- /get-involved/collaborate/(alianzas/empresas, beneficios, contacto)   [antes collaborate-with-us]
- /contact/                 (formulario, datos, mapa, redes)
- /privacy-policy/          (texto legal RGPD)   [antes /policy/]

FORMULARIOS: como es sitio estatico, usa un servicio compatible (p. ej. Formspree/endpoint externo) o define un placeholder claro para conectar despues. DECIDE conmigo.

ENTREGA: diff + capturas + build OK. PARA para mi OK.
```

### Prompt 5. Actualidad + Galeria + Newsletter

```text
ROL: Agente de desarrollo. Construye el bloque de medios: Actualidad (noticias), Galeria y Newsletter. Solo si se prioriza para v1; si no, deja rutas placeholder. PARA en el diff para mi OK.

REGLAS DE ORO: rutas absolutas; rama feature + push SOLO a [FORK]; contenido desde _source; accesible/responsive.

PAGINAS (rutas del mapa, en/es):
- /news/       (listado de noticias con Content Collection 'news', categorias, paginacion) -- FUSIONA communication + communications
- /gallery/    (grid de imagenes con lightbox accesible)
- /newsletter/ (intro + formulario de suscripcion; servicio externo)

ENTREGA: diff + capturas + build OK. PARA para mi OK.
```

### Prompt 6. i18n completo

```text
ROL: Agente de desarrollo. Completa el multidioma en/es de todo el sitio. PARA en el diff para mi OK.

REGLAS DE ORO: rutas absolutas; rama feature + push SOLO a [FORK]; no romper rutas existentes.

TAREA:
1. Asegura que TODAS las paginas tienen version en y es (contenido en src/content por idioma).
2. Selector de idioma en el header que mantiene la pagina equivalente al cambiar.
3. hreflang alternate en/es + x-default en cada pagina.
4. Slugs: DECIDE conmigo entre localizados (/es/quienes-somos/) o ingles para ambos; implementa el elegido de forma consistente.
5. Textos de UI (menus, botones, footer) en un diccionario i18n, no hardcodeados.

ENTREGA: diff + prueba de navegacion cruzada en<->es sin romper la pagina + build OK. PARA para mi OK.
```

### Prompt 7. Accesibilidad + SEO + sitemap.xml + 301

```text
ROL: Agente de desarrollo. Pasada final de accesibilidad, SEO y redirecciones. PARA en el diff para mi OK.

REGLAS DE ORO: rutas absolutas; rama feature + push SOLO a [FORK].

TAREA:
1. ACCESIBILIDAD (a11y): un solo h1 por pagina + jerarquia correcta; alt en todas las imagenes; foco visible; navegacion por teclado; labels en formularios; landmarks (header/main/footer/nav); skip-link. Pasa un audit (axe/Lighthouse) y corrige. CONTRASTE vs COLORES: NO cambies los colores de marca (regla #1). Si algun par de colores falla el contraste AA, NO lo modifiques: reportamelo con el problema y una sugerencia (p. ej. ajustar tamano/grosor de fuente u overlay) y decido yo; nunca cambiar un color sin mi OK.
2. SEO: <title>/<meta description> por pagina e idioma; OpenGraph/Twitter; datos estructurados basicos (Organization/NGO).
3. Genera sitemap.xml (con @astrojs/sitemap) y robots.txt.
4. REDIRECCIONES 301 segun la tabla del mapa (viejo -> nuevo). En Hostinger estatico, implementa via .htaccess (Apache). Incluye TODAS las filas de la tabla.

ENTREGA: informe Lighthouse (a11y/SEO/perf) + sitemap.xml + .htaccess con las 301 + build OK. PARA para mi OK.
```

### Prompt 8. Deploy en Hostinger + DNS en Cloudflare

```text
ROL: Agente con acceso al hosting (Hostinger) y a Cloudflare API. Despliega el sitio estatico y conecta el dominio. Meticuloso; PARA para mi OK antes de tocar produccion.

REGLAS DE ORO: rutas absolutas; no volcar secretos (usa tokens acotados: Cloudflare solo Zone.DNS); no romper otros dominios; backup antes de sobreescribir.

CONTEXTO: hospitalarias.in tiene el DNS en Cloudflare. Hosting = Hostinger (plan Business, IP [IP_HOSTINGER]). El sitio Astro compila a estatico (carpeta dist/).

TAREA:
1. 'npm run build' -> genera dist/.
2. Sube dist/ a la carpeta del dominio hospitalarias.in en Hostinger (public_html/ o la carpeta del addon domain). Incluye el .htaccess con las 301.
3. DNS en Cloudflare: A hospitalarias.in -> [IP_HOSTINGER]; www CNAME -> hospitalarias.in. Ponlo primero en DNS ONLY para que Hostinger emita el SSL; cuando el SSL este activo, cambia a Proxied.
4. Verifica: https://hospitalarias.in carga la home nueva; las 301 redirigen; en/es OK; SSL valido.

ENTREGA: confirmacion de despliegue + pruebas de las 301 + estado SSL + captura en vivo. PARA para mi OK final.
```

## Orden de ejecucion

1. Prompt 0: inventario de contenido
2. Prompt 1: scaffold Astro + layout base
3. Prompt 2: home
4. Prompt 3: Quienes somos + Que hacemos
5. Prompt 4: Colabora + Contacto + Privacidad
6. Prompt 5: medios si entran en v1
7. Prompt 6: i18n completo
8. Prompt 7: accesibilidad + SEO + 301
9. Prompt 8: deploy final

Cada prompt debe parar para revision antes de pasar al siguiente.
