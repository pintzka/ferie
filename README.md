# Sommerferie 2026 — familiens reiseside

Statisk webside med kart, kalender, byer, ladeplan, vær, budsjett og dagbok for sommerturen 2026.

Publiseres på `https://ferie.pintzka.com` via GitHub Pages.

## Filstruktur

```
ferie-site/
├── index.html                  # SPA-skjelett
├── CNAME                       # ferie.pintzka.com
├── assets/
│   ├── data.js                 # all reisedata (statisk)
│   ├── styles.css              # tilpasset stil
│   ├── storage.js              # GitHub-API + localStorage
│   ├── weather.js              # open-meteo
│   └── app.js                  # views + interaktivitet
└── data/                       # brukerdata — endres av siden via GitHub Contents API
    ├── wishlist.json
    ├── ratings.json
    ├── comments.json
    ├── budget.json
    ├── diary.json
    └── photos.json
```

## Deploy — steg for steg

### 1. Opprett GitHub-repo

```bash
cd "/Users/pintzka/Documents/AI/Claude Outputs/Sommerferie/ferie-site"
git init
git add .
git commit -m "Initial ferieside"
gh repo create pintzka/ferie --public --source=. --push
```

Hvis du ikke har `gh`, opprett repoet manuelt på github.com → ny → `ferie` → kopier `git remote add origin …` derfra.

### 2. Slå på GitHub Pages

På github.com → repo `ferie` → **Settings** → **Pages**:

- Source: **Deploy from a branch**
- Branch: **main** / root
- Lagre.

Etter 1–2 minutter er siden tilgjengelig på `https://pintzka.github.io/ferie/`. CNAME-filen sørger for at custom domain virker.

### 3. Sett opp ferie.pintzka.com (DNS)

Hos domeneregisteret for `pintzka.com` (Domeneshop / GoDaddy / Cloudflare / whoever):

Legg til en av disse:

**Anbefalt — CNAME:**
```
ferie.pintzka.com    CNAME    pintzka.github.io
```

**Alternativt — fire A-records:**
```
ferie.pintzka.com    A    185.199.108.153
ferie.pintzka.com    A    185.199.109.153
ferie.pintzka.com    A    185.199.110.153
ferie.pintzka.com    A    185.199.111.153
```

DNS-propagering tar 5 minutter til 24 timer.

Tilbake på github.com → Pages: i feltet **Custom domain** skriv `ferie.pintzka.com` → Save. Vent på "DNS check successful" → huk av **Enforce HTTPS**.

### 4. Generér Personal Access Token for skriving

For at familien skal kunne legge til ønsker, kommentarer og budsjett fra siden, må hver bruker sette inn en fine-grained PAT i nettleseren første gang.

På github.com → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**:

- Token name: `ferie-write`
- Expiration: `Custom` → sett til 1. september 2026 (etter ferien)
- Repository access: **Only select repositories** → `ferie`
- Permissions → **Repository permissions** → **Contents**: **Read and write**
- Generate token.

Kopier tokenet (vises kun én gang).

### 5. Åpne siden og logg inn

Åpne `https://ferie.pintzka.com` → klikk 👤-ikonet øverst:

- Velg navn
- Owner: `pintzka`
- Repo: `ferie`
- Branch: `main`
- Token: lim inn

Lagre. Endringer skrives nå direkte til repoet (commit per lagring).

### 6. (Valgfritt) Privat repo

Du kan gjøre repoet privat hvis du ikke vil at innholdet skal være synlig. Da må alle familiemedlemmer som leser siden også ha PAT med Contents read — siden den statiske siden er offentlig (GitHub Pages er alltid offentlig hvis du ikke har Pro/Enterprise), men API-kallene mot privat repo krever auth.

Anbefaling: **public repo**. Det er en familiefereside, ingen sensitiv info.

## Lokal utvikling

```bash
cd ferie-site
python3 -m http.server 8080
# → åpne http://localhost:8080
```

Eller bruk `npx serve` om du har Node.

## Endre innhold

Alt statisk innhold (severdigheter, restauranter, ruter, ladestopp) ligger i `assets/data.js`. Rediger der, commit, push — Pages oppdaterer automatisk på 30–60 sekunder.

## Begrensninger

- GPX-eksporten gir kun startpunkt (vi har ikke faktiske GPS-spor). Bruk Komoot eller ABRP for å trace ruten og eksportér derfra.
- Bildeopplasting fra siden er ikke implementert — legg lenker manuelt i `data/photos.json` for nå, eller bruk Imgur.
- Søk er klient-side og enkelt — matcher substring i navn og hint.
- Vær: live-varsel via open-meteo trer i kraft 7 dager før hver destinasjon. Før det vises klimanormaler.

## Lisens

Privat familieprosjekt. Ingen lisens.
