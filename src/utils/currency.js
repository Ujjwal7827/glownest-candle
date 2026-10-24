import { business } from '../config/business';

const formatter = new Intl.NumberFormat(business.locale, {
  style: 'currency',
  currency: business.currency,
  maximumFractionDigits: 0,
});

export const formatPrice = (amount) =>
  typeof amount === 'number' && Number.isFinite(amount) ? formatter.format(amount) : '';
