# Personas- og ikonbibliotek

Dette repositoryet inneholder det gjenbrukbare ikonbiblioteket og et statisk personasgalleri.

## Mapper

- `avatarer/`: detaljerte og enkle avatarer.
- `symboler/`: gjenbrukbare piktogrammer.
- `AGENTS.md` og `ikonstil.md`: arbeidsregler og stilguide for nye ressurser.
- `personas-galleri/personas/`: én Markdown-fil per fiktive persona.
- `docs/`: ferdig nettsted for GitHub Pages. Denne mappen oppdateres automatisk og skal ikke redigeres direkte.

## Oppdater galleriet

Når du har oppdatert en persona eller lagt til en avatar, kjør:

```bash
node bygg_github_pages.mjs
```

Det kopierer avatarene inn i `docs/assets/avatarer/` og bygger `docs/index.html` fra Markdown-profilene.

## Publiser med GitHub Pages

I GitHub-repositoryet: **Settings** → **Pages** → velg `main` og mappen `/docs` som publiseringskilde.

Repositoryet og siden er offentlige når det brukes med en personlig GitHub-konto. Legg derfor bare inn fiktive personaer og innhold som er trygt å dele offentlig.
