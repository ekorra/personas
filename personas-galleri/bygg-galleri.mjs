import fs from 'node:fs/promises';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const personaDirectory = path.join(here, 'personas');
const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
};
const outputFile = path.resolve(here, option('--output', 'index.html'));
const avatarPrefix = option('--avatar-prefix', '../avatarer');

const escapeHtml = (value = '') => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

function parseFrontmatter(source, filename) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`${filename} mangler metadata mellom ---`);
  const metadata = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    metadata[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  return { ...metadata, text: match[2].trim() };
}

function renderText(markdown) {
  const sections = markdown.split(/^## /m).filter(Boolean);
  return sections.map((section) => {
    const [heading, ...paragraphs] = section.split('\n');
    const body = paragraphs.join('\n').trim().split(/\n{2,}/).filter(Boolean)
      .map((paragraph) => `<p>${escapeHtml(paragraph.replaceAll('\n', ' '))}</p>`).join('');
    return `<section class="persona-notes"><h3>${escapeHtml(heading)}</h3>${body}</section>`;
  }).join('');
}

function personCard(persona) {
  const hasPerson = persona.fødselsår && /^\d{4}$/.test(persona.fødselsår);
  const age = hasPerson
    ? `<span class="age" data-birth-year="${escapeHtml(persona.fødselsår)}">Født ${escapeHtml(persona.fødselsår)}</span>`
    : '<span class="age">Ikke en menneskelig persona</span>';
  const detailedAvatar = persona.avatar
    ? `<figure>
          <img src="${escapeHtml(avatarPrefix)}/${escapeHtml(persona.avatar)}" alt="Detaljert avatar for ${escapeHtml(persona.navn || persona.rolle)}">
          <figcaption>Detaljert</figcaption>
        </figure>`
    : `<figure>
          <div class="avatar-unavailable" aria-label="Detaljert avatar er ikke laget ennå">Ikke laget</div>
          <figcaption>Detaljert</figcaption>
        </figure>`;
  return `
    <article class="persona-card">
      <div class="avatars">
        ${detailedAvatar}
        <figure>
          <img src="${escapeHtml(avatarPrefix)}/${escapeHtml(persona.avatar_enkel)}" alt="Enkel avatar for ${escapeHtml(persona.navn || persona.rolle)}">
          <figcaption>Enkel</figcaption>
        </figure>
      </div>
      <div class="persona-content">
        <div class="card-heading">
          <div>
            <p class="role">${escapeHtml(persona.rolle)}</p>
            <h2>${escapeHtml(persona.navn || 'Systembruker')}</h2>
            ${age}
          </div>
          <span class="status">${escapeHtml(persona.status)}</span>
        </div>
        ${renderText(persona.text)}
      </div>
    </article>`;
}

const files = (await fs.readdir(personaDirectory)).filter((file) => file.endsWith('.md')).sort();
const personas = await Promise.all(files.map(async (file) => parseFrontmatter(
  await fs.readFile(path.join(personaDirectory, file), 'utf8'), file,
)));
const groups = new Map();
for (const persona of personas) {
  const group = persona.kategori || 'Andre';
  groups.set(group, [...(groups.get(group) || []), persona]);
}

const sections = [...groups.entries()].map(([group, members]) => `
  <section class="persona-group" aria-labelledby="${escapeHtml(group).replaceAll(' ', '-')}">
    <h2 id="${escapeHtml(group).replaceAll(' ', '-')}">${escapeHtml(group)}</h2>
    <div class="persona-grid">${members.map(personCard).join('')}</div>
  </section>`).join('');

const html = `<!doctype html>
<html lang="nb">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Fiktive personaer med detaljert og enkel avatar.">
  <title>Personasgalleri</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='22' r='14' fill='%23172638'/%3E%3Cpath d='M8 60c2-16 14-24 24-24s22 8 24 24' fill='%23172638'/%3E%3C/svg%3E">
  <style>
    :root { --navy: #172638; --blue: #315d86; --paper: #f4f7fa; --line: #d3dee8; --muted: #596878; }
    * { box-sizing: border-box; }
    body { margin: 0; color: var(--navy); background: var(--paper); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.5; }
    main { max-width: 1400px; margin: 0 auto; padding: 3.5rem 1.5rem 5rem; }
    header { max-width: 800px; margin: 0 0 3rem; }
    h1, h2, h3, p { margin-top: 0; }
    h1 { font-size: clamp(2.1rem, 5vw, 4.1rem); letter-spacing: -0.055em; margin-bottom: .7rem; }
    .intro { font-size: 1.1rem; color: var(--muted); max-width: 65ch; }
    .source-note { font-size: .9rem; color: var(--muted); margin-bottom: 0; }
    .persona-group { margin-top: 3.8rem; }
    .persona-group > h2 { font-size: 1.45rem; margin-bottom: 1rem; }
    .persona-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(330px, 1fr)); gap: 1rem; }
    .persona-card { display: grid; grid-template-columns: 160px 1fr; gap: .25rem 1.15rem; min-width: 0; background: #fff; border: 1px solid var(--line); border-radius: 1rem; padding: 1rem; box-shadow: 0 3px 16px rgba(23, 38, 56, .05); }
    .avatars { display: grid; grid-template-columns: 1fr 1fr; gap: .25rem; align-content: start; }
    figure { margin: 0; text-align: center; }
    figure img { display: block; width: 100%; aspect-ratio: 1; object-fit: contain; }
    .avatar-unavailable { align-items: center; aspect-ratio: 1; background: #eef3f7; border: 1px dashed var(--line); border-radius: .65rem; color: var(--muted); display: flex; font-size: .75rem; justify-content: center; padding: .4rem; }
    figcaption { color: var(--muted); font-size: .72rem; margin-top: -.2rem; }
    .persona-content { min-width: 0; }
    .card-heading { display: flex; gap: .75rem; align-items: flex-start; justify-content: space-between; border-bottom: 1px solid var(--line); margin-bottom: .85rem; padding-bottom: .8rem; }
    .role { color: var(--blue); font-size: .82rem; font-weight: 700; letter-spacing: .035em; margin-bottom: .1rem; text-transform: uppercase; }
    .card-heading h2 { font-size: 1.35rem; line-height: 1.1; margin-bottom: .2rem; }
    .age { display: block; color: var(--muted); font-size: .93rem; }
    .status { border: 1px solid var(--line); border-radius: 99px; color: var(--muted); font-size: .75rem; padding: .18rem .48rem; white-space: nowrap; }
    .persona-notes + .persona-notes { margin-top: .8rem; }
    .persona-notes h3 { font-size: .92rem; margin-bottom: .2rem; }
    .persona-notes p { color: var(--muted); font-size: .9rem; margin-bottom: 0; }
    @media (max-width: 540px) { main { padding: 2rem 1rem 3rem; } .persona-card { grid-template-columns: 130px 1fr; } }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>Personasgalleri</h1>
      <p class="intro">Fiktive personaer for å utforske behov, roller og autorisasjonssituasjoner. Hvert kort viser samme figur i detaljert og enkel stil.</p>
      <p class="source-note">Navnene er fiktive og alderspassende. De er valgt med utgangspunkt i SSBs navnestatistikk, og representerer ikke virkelige personer.</p>
    </header>
    ${sections}
  </main>
  <script>
    document.querySelectorAll('[data-birth-year]').forEach((element) => {
      const age = new Date().getFullYear() - Number(element.dataset.birthYear);
      element.textContent = age + ' år';
    });
  </script>
</body>
</html>`;

await fs.mkdir(path.dirname(outputFile), { recursive: true });
await fs.writeFile(outputFile, html);
console.log(`Opprettet ${outputFile} med ${personas.length} personaer.`);
