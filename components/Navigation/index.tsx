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
    <div className="to-[#ababab] flex min-h-0 flex-1 flex-col bg-gradient-to-b from-[#ebebeb] dark:bg-theo-dark-navy dark:from-theo-dark-navy dark:to-theo-dark-navy">
      <div className="flex flex-col flex-1 p-8 pt-5 overflow-y-auto">
        <div className="flex items-center px-4">
          <Logo />
        </div>
        <nav className="flex-1 px-2 mt-5 space-y-2">
          {navigation.map((item) => (
            <Fragment key={`${item.name}_main`}>
              <NavItem
                icon={item.icon}
                name={item.name}
                comingSoon={item.comingSoon}
                href={item.href}
              />
            </Fragment>
          ))}
        </nav>
        <div className="flex items-center justify-between w-full">
          {socialLinks.map((x) => (
            <Fragment key={x.icon}>
              <a
                href={x.href}
                className="block p-4 transition rounded hover:bg-theo-cyan hover:text-white dark:text-theo-cyan dark:hover:bg-theo-gray"
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
