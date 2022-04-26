import { navigation } from '../../pages/nav-config';
import NavItem from './NavItem';
import Logo from './Logo';
import Icon from '../Icons';
import { Fragment } from 'react';

const socialLinks = [
  { icon: 'twitter-logo', href: '#' },
  { icon: 'telegram-logo', href: '#' },
  { icon: 'discord-logo', href: '#' },
  { icon: 'youtube-logo', href: '#' },
];
const Navigation = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-[#ebebeb] to-[#ababab] dark:bg-theo-dark-navy dark:from-theo-dark-navy dark:to-theo-dark-navy">
      <div className="flex flex-1 flex-col overflow-y-auto p-8 pt-5">
        <div className="flex items-center px-4">
          <Logo />
        </div>
        <nav className="mt-5 flex-1 space-y-2 px-2">
          {navigation.map((item) => (
            <Fragment key={`${item.name}_main`}>
              <NavItem
                icon={item.icon}
                name={item.name}
                disabled={item.disabled}
                href={item.href}
              />
            </Fragment>
          ))}
        </nav>
        <div className="flex w-full items-center justify-between">
          {socialLinks.map((x) => (
            <Fragment key={x.icon}>
              <a
                href={x.href}
                className="block rounded p-4 transition hover:bg-theo-cyan hover:text-white dark:text-theo-cyan dark:hover:bg-theo-gray"
              >
                <Icon name={x.icon} />
              </a>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
