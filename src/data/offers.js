export function expiresOn(days) {
  const baseDate = new Date('2026-02-23T00:00:00Z');
  baseDate.setDate(baseDate.getDate() + days);
  return baseDate.toISOString().split('T')[0];
}

export const stats = [
  { label: 'Active Offers', value: '23', icon: '🎁' },
  { label: 'Total Value', value: '$8,450+', icon: '💰' },
  { label: 'Countries', value: '50+', icon: '🌍' },
  { label: 'Happy Users', value: '1M+', icon: '👥' },
];

export const categories = [
  { id: 'all', label: 'All Offers', icon: '🌟' },
  { id: 'finance', label: 'Finance', icon: '💳' },
  { id: 'crypto', label: 'Crypto', icon: '₿' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
  { id: 'food', label: 'Food', icon: '🍔' },
];

export const offers = [
  {
    id: 1,
    company: "Robinhood",
    logo: "https://cdn.simpleicons.org/robinhood/00C805",
    emoji: "🐦",
    bonus: "$10",
    bonusNote: "In Crypto",
    category: "crypto",
    description: "Deposit $10 to earn $10 in free crypto. Available across Europe.",
    countries: ["🇪🇺"],
    countryNames: ["Europe"],
    steps: 1,
    spots: 30, // Using limited spots instead of an expiry date
    rating: 4.8,
    reviews: 14200,
    isHot: true,
    isFeatured: true,
    tags: ["Crypto", "Deposit Required"],
    link: "https://join.robinhood.com/eu_crypto/josed-0522ec07/"
  },
  {
    id: 2,
    company: "KAST",
    logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect width='400' height='400' fill='black'/><path d='M150 100 v200 M150 200 l90 -100 M150 200 l90 100' stroke='white' stroke-width='40' stroke-linecap='round' stroke-linejoin='round'/></svg>",
    emoji: "💳",
    bonus: "$20",
    bonusNote: "+ UP TO 6% CASHBACK",
    category: "finance",
    description: "Complete verification (KYC) and spend $100 to earn $20. As a bonus, get 20% off any paid card.",
    countries: ["🌍"],
    countryNames: ["Worldwide"],
    steps: 2,
    spots: null,
    expiry: expiresOn(180),
    rating: 4.9,
    reviews: 5800,
    isHot: true,
    isFeatured: true,
    tags: ["Cashback", "Card", "20% Discount"],
    link: "https://go.kast.xyz/VqVO/IXRGELP6"
  },
  {
    id: 3,
    company: "Coinbase",
    logo: "https://cdn.simpleicons.org/coinbase/0066FF",
    emoji: "🪙",
    bonus: "$10",
    bonusNote: "In Crypto",
    category: "crypto",
    description: "Deposit $10 to earn $10 in free crypto. Available worldwide.",
    countries: ["🌍"],
    countryNames: ["Worldwide"],
    steps: 1,
    spots: null,
    rating: 4.8,
    reviews: 12500,
    isHot: true,
    isFeatured: false,
    tags: ["Crypto", "Bonus", "Worldwide"],
    link: "https://coinbase.com/join/D8SQRTE?src=ios-link"
  }
];
