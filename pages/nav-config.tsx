import { Coin, File, Gauge, LockLaminated } from 'phosphor-react';
export const navigation = [
  { name: 'Dashboard', href: '/', icon: <Gauge size={26} className="mr-2 w-8" /> },
  // {
  //   name: 'Whitelist Sale',
  //   href: '/whitelist-sale',
  //   icon: <Intersect size={26} className="mr-2 w-8" />,
  //   subNav: [
  //     {
  //       name: 'Your Purchases',
  //       href: '/whitelist-sale/your-purchases',
  //     },
  //   ],
  // },
  // {
  //   name: 'Pre-Market Sale',
  //   href: '/discount-buy',
  //   icon: 'intersect',
  //   subNav: [
  //     {
  //       name: 'Your Purchases',
  //       href: '/discount-buy/your-purchases',
  //     },
  //   ],
  // },
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
