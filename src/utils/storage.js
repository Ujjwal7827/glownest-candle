// Safe localStorage helpers. Never store personal or payment details with these.
export const readJSON = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const writeJSON = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode / quota) — app still works */
  }
};

export const readSession = (key) => {
  try { return window.sessionStorage.getItem(key); } catch { return null; }
};
export const writeSession = (key, value) => {
  try { window.sessionStorage.setItem(key, value); } catch { /* ignore */ }
};
