// The ORIGINAL logo lives at public/glownest-logo.png (served at /glownest-logo.png).
// It is loaded by URL, so a missing/misnamed file can never break the build — it only shows the alt text.
// Keep the filename lowercase exactly as written: glownest-logo.png (Netlify/Linux are case-sensitive).
// Never redraw or recolour the logo.
export const brand = {
  // Site serves a lossless 600px copy of the original (210 KB vs 1.9 MB) for fast mobile loading.
  // The untouched original is kept at /glownest-logo.png. To use it directly, set logo: '/glownest-logo.png'.
  logo: '/glownest-logo-web.png',
  logoAlt: 'GLOWNEST logo',
  colors: {
    bg: '#111010', dark: '#1D1A1A', cream: '#F8F3EB', ivory: '#FFFDF9',
    blush: '#E8C8CD', roseGold: '#B88976', gold: '#C5A46D',
    text: '#292321', muted: '#776D67', border: '#E8DDD2',
  },
};
