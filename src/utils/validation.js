export const required = (value, label = 'This field') =>
  String(value ?? '').trim() ? '' : `${label} is required.`;

export const validEmail = (value, { optional = false } = {}) => {
  const v = String(value ?? '').trim();
  if (!v) return optional ? '' : 'Email is required.';
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter a valid email address.';
};

// Indian mobile: 10 digits starting 6-9, optional +91 / 0 prefix and spaces/dashes.
export const normalizePhone = (value) => {
  let d = String(value ?? '').replace(/[\s\-()]/g, '');
  if (d.startsWith('+91')) d = d.slice(3);
  else if (d.startsWith('91') && d.length === 12) d = d.slice(2);
  else if (d.startsWith('0') && d.length === 11) d = d.slice(1);
  return d;
};

export const validPhone = (value, label = 'Mobile number') => {
  const v = String(value ?? '').trim();
  if (!v) return `${label} is required.`;
  return /^[6-9]\d{9}$/.test(normalizePhone(v)) ? '' : `Enter a valid 10-digit ${label.toLowerCase()}.`;
};

export const validPin = (value) => {
  const v = String(value ?? '').trim();
  if (!v) return 'PIN code is required.';
  return /^[1-9]\d{5}$/.test(v) ? '' : 'Enter a valid 6-digit PIN code.';
};

export const positiveInt = (value, label = 'Quantity') => {
  const v = String(value ?? '').trim();
  if (!v) return `${label} is required.`;
  return /^[1-9]\d*$/.test(v) ? '' : `${label} must be a whole number of 1 or more.`;
};

// date is 'YYYY-MM-DD'. Must be today or later.
export const futureDate = (value, { optional = true } = {}) => {
  const v = String(value ?? '').trim();
  if (!v) return optional ? '' : 'Date is required.';
  const d = new Date(`${v}T00:00:00`);
  if (Number.isNaN(d.getTime())) return 'Enter a valid date.';
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return d >= today ? '' : 'Choose today or a later date.';
};

export const hasErrors = (errors) => Object.values(errors).some(Boolean);
