import { Coin, File, Gauge, Intersect, LockLaminated } from 'phosphor-react';
export const navigation = [
  { name: 'Dashboard', href: '/', icon: <Gauge size={26} className="mr-2 w-8" /> },
  {
    name: 'Discount Buy',
    href: '/discount-buy',
    icon: <Intersect size={26} className="mr-2 w-8" />,
    subNav: [
      {
        name: 'Your Purchases',
        href: '/discount-buy/your-purchases',
      },
    ],
  },
  {
    name: 'Claim Tokens',
    href: '/claim',
    icon: <Coin size={26} className="mr-2 w-8" />,
    disabled: false,
  },
  {
    name: 'Memberships',
    href: '/memberships',
    icon: <LockLaminated size={26} className="mr-2 w-8" />,
    disabled: false,
  },
  {
    name: 'Learn More',
    href: 'https://docs.theopetralabs.com/',
    icon: <File size={26} className="mr-2 w-8" />,
    target: '_blank',
  },
];
