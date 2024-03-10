import { Coin, File, Gauge, Intersect, LockLaminated } from 'phosphor-react';
export const navigation = [
  {
    name: 'Growth Markets',
    href: '/',
    icon: <img src={'/assets/icons/Growth-Icon-navy.png'} className="mr-2 w-8" />,
  },
  {
    name: 'Land Event',
    href: '/land-event',
    icon: <img src={'/assets/icons/Growth-Icon-navy.png'} className="mr-2 w-8" />,
  },
  // {
  //   name: 'Convert to YIMBY',
  //   href: '/convert-to-yimby',
  //   icon: <img src={'/assets/icons/key.png'} className="mr-2 w-8" />,
  //   disabled: false,
  // },
  {
    name: 'Unstake THEO',
    href: '/unstake',
    icon: <LockLaminated size={26} className="mr-2 w-8" />,
    disabled: false,
  },
  {
    name: 'Claim Tokens',
    href: '/claim',
    icon: <Coin size={26} className="mr-2 w-8" />,
    disabled: false,
  },
  {
    name: 'Learn More',
    href: 'https://docs.theopetralabs.com/',
    icon: <File size={26} className="mr-2 w-8" />,
    target: '_blank',
  },
];
