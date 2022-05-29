import { navigation } from '../../pages/nav-config';
import NavItem from './NavItem';
import Logo from './Logo';
import Icon from '../Icons';
import { Fragment } from 'react';

const socialLinks = [
  { icon: 'twitter-logo', href: 'https://twitter.com/TheopetraLabs' },
  { icon: 'telegram-logo', href: '#' },
  { icon: 'discord-logo', href: 'https://discord.gg/Y5wzSGhg37' },
  { icon: 'youtube-logo', href: '#' },
];
const classes = {
  statContainer: 'flex flex-row-reverse items-center justify-between flex-1  ',
  number: 'font-bold text-theo-cyan dark:text-white',
  label: 'font-semibold  text-theo-navy dark:text-theo-cyan',
};

const Navigation = () => {
  return (
    <div className=" flex min-h-0 flex-1 flex-col bg-gradient-to-b from-[#ebebeb] to-[#ababab] dark:bg-theo-dark-navy dark:from-theo-dark-navy dark:to-theo-dark-navy">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5">
        <div className="flex items-center px-9">
          <Logo />
        </div>
        <nav className="mt-5 flex-1 space-y-2 px-2 pr-8 pl-8">
          {navigation.map((item) => (
            <Fragment key={`${item.name}_main`}>
              <NavItem item={item} />
            </Fragment>
          ))}
        </nav>
        <div className="flex w-full items-center justify-between px-8 pb-2">
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
        <div className=" flex h-16 w-full justify-between bg-white p-1 dark:bg-black sm:p-5">
          <div className={classes.statContainer}>
            <div className={classes.number}>101,221,000</div>
            <div className={classes.label}>Your $THEO</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
