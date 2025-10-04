# Pokémon Database (Static)

A lightweight static site to browse all 151 Generation 1 Pokémon with search and type filters. No build tools required.

## Quick start

- Open `index.html` directly in your browser, or
- Serve the folder (for better caching/cors behavior) with a simple server:

```bash
# Python 3
python -m http.server 8080
# or Node.js
npx serve . --listen 8080 --single --yes
```

Then visit `http://localhost:8080`.

## Structure

- `index.html` – markup and layout
- `styles.css` – modern dark UI styling
- `app.js` – search + filter + rendering using complete Generation 1 dataset (151 Pokémon)

## Customizing

- Add more Pokémon to the `allPokemon` array in `app.js` or fetch from PokéAPI.
- Update styles in `styles.css` to change the theme.

## Notes

- Sprites are loaded from PokéAPI's public sprite CDN.
- This is static and privacy-friendly; no tracking, no frameworks.
