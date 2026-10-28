// Comprobaciones estáticas de la demo, sin dependencias.
// Uso: node scripts/check.mjs
import { readFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'legal.html'];
const errors = [];
const fail = (page, msg) => errors.push(`${page}: ${msg}`);

const exists = (p) => access(p).then(() => true, () => false);

for (const page of pages) {
  const html = await readFile(join(root, page), 'utf8');

  // Un único H1
  const h1 = html.match(/<h1[\s>]/g) || [];
  if (h1.length !== 1) fail(page, `debe tener un único <h1> (tiene ${h1.length})`);

  // IDs únicos
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) fail(page, `IDs duplicados: ${[...new Set(dupes)].join(', ')}`);

  // Anclas internas que apuntan a IDs existentes
  for (const [, hash] of html.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.includes(hash)) fail(page, `ancla rota #${hash}`);
  }

  // aria-controls / aria-labelledby / aria-describedby apuntan a IDs existentes
  for (const [, attr, value] of html.matchAll(/(aria-(?:controls|labelledby|describedby))="([^"]+)"/g)) {
    for (const ref of value.split(/\s+/)) {
      if (!ids.includes(ref)) fail(page, `${attr} apunta a un ID inexistente: ${ref}`);
    }
  }

  // Recursos locales (href/src) existentes
  for (const [, url] of html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)) {
    if (/^(https?:|tel:|mailto:|data:)/.test(url)) continue;
    if (!(await exists(join(root, url.split('?')[0])))) fail(page, `recurso local inexistente: ${url}`);
  }

  // Imágenes con alt y dimensiones
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    // alt vacío solo para las piezas del logo dentro del enlace de marca, que ya lleva aria-label
    const decorative = /class="brand-(mark|word)"/.test(tag) && /\salt=""/.test(tag);
    if (!decorative && !/\salt="[^"]+"/.test(tag)) fail(page, `imagen sin alt: ${tag.slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) fail(page, `imagen sin width/height: ${tag.slice(0, 80)}`);
  }

  // Enlaces que abren pestaña nueva con rel="noopener"
  for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    if (!/rel="[^"]*noopener/.test(tag)) fail(page, `target=_blank sin noopener: ${tag.slice(0, 80)}`);
  }

  // Inputs con etiqueta asociada
  for (const [, id] of html.matchAll(/<(?:input|select|textarea)\b[^>]*\sid="([^"]+)"/g)) {
    if (!html.includes(`for="${id}"`)) fail(page, `campo sin <label for>: #${id}`);
  }

  // JSON-LD válido y sin valoraciones agregadas
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(json);
      if (JSON.stringify(data).includes('aggregateRating')) fail(page, 'JSON-LD incluye aggregateRating (no verificado para datos estructurados)');
    } catch (e) {
      fail(page, `JSON-LD no válido: ${e.message}`);
    }
  }

  // Metadatos básicos
  if (!/<title>[^<]{10,}<\/title>/.test(html)) fail(page, 'falta <title>');
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) fail(page, 'falta meta description');
  if (!/<html lang="es">/.test(html)) fail(page, 'falta lang="es"');
}

// Coherencia NAP en la página principal
const index = await readFile(join(root, 'index.html'), 'utf8');
const phones = new Set([...index.matchAll(/tel:\+?(\d+)/g)].map((m) => m[1]));
const wa = new Set([...index.matchAll(/wa\.me\/(\d+)/g)].map((m) => m[1]));
if (phones.size !== 1 || [...phones][0] !== '34611550183') fail('index.html', `teléfonos incoherentes: ${[...phones]}`);
if (wa.size !== 1 || [...wa][0] !== '34611550183') fail('index.html', `números de WhatsApp incoherentes: ${[...wa]}`);

if (errors.length) {
  console.error(`✗ ${errors.length} problema(s):\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✓ Comprobaciones superadas en ${pages.join(', ')}`);
