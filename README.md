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
- `legal.html`: marcador honesto de los textos legales pendientes. No contiene textos inventados.
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

## Pendiente de validar con el negocio

- Logotipo oficial en vectorial. La marca de la demo es una aproximación geométrica provisional.
- Fotografías originales en alta resolución y autorización para usarlas. Las actuales son de su Instagram, a 640 px.
- Si la clase de prueba sigue vigente y cómo continuar después (bonos, precios). No se publican precios.
- Duración y formato de cada clase de fitness (Body Studio, Body Tono, Aerofit…).
- Alcance de las sesiones de osteopatía deportiva y quiromasaje, y quién las imparte.
- Email vigente: la web antigua mostraba `creixensapilates@gmail.com` y `info@creixensastudio.com.es`.
- Dominio definitivo. Después hay que añadir `canonical`, URLs absolutas de Open Graph, `url` en el JSON-LD y quitar `noindex`.
- Textos legales (aviso legal, privacidad y cookies).
- El horario de Google Maps no coincide con el de clases (por ejemplo, el miércoles por la tarde).
