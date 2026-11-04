# Creixensa Pilates & Fitness Studio · demo de rediseño

Propuesta **no oficial** de web para Creixensa (C/ Desiderio Escosura, 45, 50005 Zaragoza). Es un sitio estático (HTML, CSS y JS) sin dependencias ni proceso de build. La página lleva `noindex` y `robots.txt` bloquea la indexación hasta que el negocio la apruebe.

## Ejecutar

```bash
npm start          # http://localhost:4321
npm run check      # comprobaciones estáticas (anclas, recursos, alt, labels, JSON-LD, NAP) + sintaxis JS
```

Requiere Node 18 o superior. No hay que instalar nada.

## Estructura

- `index.html`: página principal (inicio, Studio, clases, horario, cómo empezar, opiniones, contacto).
- `legal.html`: aviso legal, política de privacidad y política de cookies con los datos del titular (noindex para no exponer el NIF en buscadores).
- `assets/css/styles.css`, `assets/js/main.js`: estilos e interacciones (menú, filtro del horario, mapa bajo demanda, formulario hacia WhatsApp, barra de contacto en móvil).
- `assets/fonts/`: Cormorant Garamond y Figtree (Google Fonts, licencia OFL), servidas desde el propio sitio.
- `scripts/serve.mjs`, `scripts/check.mjs`: servidor local y comprobaciones.

## Fuentes de los datos (consultadas el 15/10/2026)

| Dato | Fuente |
|---|---|
| Horario de clases 2026–27 | Publicación de Instagram @creixensapilates del 22/09/2026 |
| Clase de prueba de Pilates gratuita, reserva por WhatsApp o DM | Publicación de Instagram del 22/09/2026 |
| Quiromasaje | Publicación de Instagram del 10/09/2026 |
| Entrenamientos personales, osteopatía deportiva | Biografía de Instagram |
| WhatsApp 611 55 01 83 | Linktree oficial `linktr.ee/creixensa`, enlazado desde Instagram |
| Dirección, teléfono, 4,9 ★ con 67 opiniones | Ficha de Google Maps |
| Extractos de opiniones | Google Maps (y el widget de Google de la web archivada) |

## Confirmado por la clienta (29/10/2026)

- La clase de prueba gratuita de Pilates sigue vigente y es la valoración inicial.
- El horario se publica sin fechas (decisión de la clienta). Es válido hasta el 10 de diciembre de 2026: después hay que actualizarlo.
- No se publican referencias al barrio (decisión de la clienta).
- No se publican precios en la web (decisión de la clienta).
- Servicios añadidos a petición de la clienta: shiatsu y kobido.

## Pendiente de validar con el negocio

- Foto de quiromasaje (`quiromasaje-espalda-creixensa-zaragoza.jpg`): parece de banco de imágenes; la clienta debe confirmar su procedencia y que tiene derecho a usarla.
- Foto del hero (`sala-pilates-clara-creixensa-zaragoza.jpg`): parece retocada o generada con IA; la clienta debe confirmar que representa bien la sala.
- Logotipo oficial en vectorial (SVG/PDF). Ahora se usa el logo real recortado de una imagen JPG de 1050 px facilitada por el cliente (`assets/img/logo-*.png`), que se ve algo suave en pantallas de alta densidad.
- Fotografías originales en alta resolución y autorización para usarlas. Las actuales son de su Instagram, a 640 px.
- Cómo continuar después de la clase de prueba gratuita (bonos, precios de las clases).
- Duración y formato de las demás clases de fitness (Body Tono, Body Studio, Gluteband, Coreband, HIIT, Stretching y Ritmos latinos). La descripción de Aérofit la ha facilitado la clienta.
- Alcance y duración de las sesiones de quiromasaje, osteopatía deportiva, shiatsu y kobido, y quién las imparte.
- Dominio definitivo. Ahora `canonical`, Open Graph, JSON-LD, `sitemap.xml` y `robots.txt` apuntan de forma provisional a `https://creixensapilates.vercel.app`: al conectar el dominio hay que sustituir esa dirección en `index.html`, `legal.html`, `sitemap.xml` y `robots.txt`, y redirigir las direcciones `vercel.app` al dominio.
- La ficha de Google Maps sigue mostrando el barrio y un horario propio: debe revisarla la clienta.
