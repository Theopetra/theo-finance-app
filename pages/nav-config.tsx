export const navigation = [
  { name: 'Dashboard', href: '/', icon: 'gauge' },
  {
    name: 'Discount Buy',
    href: '/discount-buy',
    icon: 'intersect',
    subNav: [
      {
        name: 'Your Purchases',
        href: '/discount-buy/your-purchases',
      },
    ],
  },
  {
    name: 'Memberships',
    href: '/memberships',
    icon: 'lock-laminated',
    disabled: true,
  },
  { name: 'T-Homes', href: '/t-homes', disabled: true, icon: 'door' },
  { name: 'Learn More', href: '/#', icon: 'file' },
];
