// Central business settings. Edit here — nothing else hardcodes these values.
export const business = {
  brandName: 'GLOWNEST',
  tagline: 'light up your moments.',
  brandLine: 'Handmade • Scented • Giftable',
  announcement: 'Handmade • Scented • Giftable',

  // 10-digit Indian mobile number (no +91). Converted to wa.me format in utils/whatsapp.js
  whatsappNumber: '7840867583',

  instagramHandle: '@glowneststudio.in',
  instagramUrl: 'https://www.instagram.com/glowneststudio.in/',

  // Optional. Leave empty to hide email everywhere. Set to e.g. 'hello@yourdomain.com'.
  email: '',

  currency: 'INR',
  locale: 'en-IN',

  shipping: {
    // Real shipping options only. Empty = "confirmed before order acceptance".
    // Example: [{ id: 'standard', label: 'Standard courier', price: 60 }]
    options: [],
    // Free-shipping threshold. Keep null until the owner verifies one.
    freeShippingThreshold: null,
  },

  // 'whatsapp' = customer sends a prepared WhatsApp message; the owner confirms manually.
  // Change only after a real backend / form service is connected.
  orderSubmissionMode: 'whatsapp',

  // 'none' = no gateway connected; no payment is ever simulated.
  paymentIntegration: 'none',
};
