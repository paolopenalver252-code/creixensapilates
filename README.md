# Creixensa Pilates & Fitness Studio · demo de rediseño

Propuesta **no oficial** de web para Creixensa (C/ Desiderio Escosura, 45, 50005 Zaragoza). Es un sitio estático (HTML, CSS y JS) sin dependencias ni proceso de build. La página lleva `noindex` y `robots.txt` bloquea la indexación hasta que el negocio la apruebe.

## Ejecutar

```bash
npm start          # http://localhost:4321
npm run check      # comprobaciones estáticas (anclas, recursos, alt, labels, JSON-LD, NAP) + sintaxis JS
```

Requiere Node 18 o superior. No hay que instalar nada.

## Estructura

- `index.html`: página principal (inicio, estudio, clases, horario, cómo empezar, opiniones, contacto).
- `legal.html`: aviso legal, política de privacidad y política de cookies con los datos del titular (noindex para no exponer el NIF en buscadores).
- `assets/css/styles.css`, `assets/js/main.js`: estilos e interacciones (menú, filtro del horario, mapa bajo demanda, formulario hacia WhatsApp, barra de contacto en móvil).
- `assets/fonts/`: Cormorant Garamond y Figtree (Google Fonts, licencia OFL), servidas desde el propio sitio.
- `scripts/serve.mjs`, `scripts/check.mjs`: servidor local y comprobaciones.

## Fuentes de los datos (consultadas el 15/10/2026)

| Dato | Fuente |
|---|---|
| Horario de clases 2026–27 | Publicación de Instagram @creixensapilates del 22/09/2026 |
| Clase de prueba de Pilates gratuita, reserva por WhatsApp o DM | Misma publicación del 22/09/2026 |
| Quiromasaje | Publicación de Instagram del 10/09/2026 |
| Entrenamientos personales, osteopatía deportiva | Biografía de Instagram |
| WhatsApp 611 55 01 83 | Linktree oficial `linktr.ee/creixensa`, enlazado desde Instagram |
| Dirección, teléfono, 4,9 ★ con 67 opiniones | Ficha de Google Maps |
| Extractos de opiniones | Google Maps (y el widget de Google de la web archivada) |

## Confirmado por la clienta (29/10/2026)

- La clase de prueba gratuita de Pilates sigue vigente y es la valoración inicial.
- Horario de clases vigente del 7 de septiembre al 10 de diciembre de 2026. Después hay que actualizarlo en la web.
- No se publican precios en la web (decisión de la clienta).
- Servicios añadidos a petición de la clienta: shiatsu y kobido.

## Pendiente de validar con el negocio

- Logotipo oficial en vectorial (SVG/PDF). Ahora se usa el logo real recortado de una imagen JPG de 1050 px facilitada por el cliente (`assets/img/logo-*.png`), que se ve algo suave en pantallas de alta densidad.
- Fotografías originales en alta resolución y autorización para usarlas. Las actuales son de su Instagram, a 640 px.
- Bloque «Masajes y terapias manuales» (quiromasaje, osteopatía deportiva, shiatsu y kobido): usa una foto de la clienta de un ejercicio de Pilates en la sala (`sesion-estudio.jpg`). Si más adelante hay una foto de una sesión de masaje u osteopatía, encajaría mejor.
- Cómo continuar después de la clase de prueba gratuita (bonos, precios de las clases).
- Duración y formato de las demás clases de fitness (Body Studio, Body Tono, Tabata, Ritmos Latinos). La descripción de Aerofit la ha facilitado la clienta.
- Alcance y duración de las sesiones de quiromasaje, osteopatía deportiva, shiatsu y kobido, y quién las imparte.
- Dominio definitivo. Después hay que añadir `canonical`, URLs absolutas de Open Graph, `url` en el JSON-LD y quitar `noindex`.
- El horario de Google Maps no coincide con el de clases (por ejemplo, el miércoles por la tarde).
