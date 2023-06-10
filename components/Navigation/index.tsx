import { useContractInfo } from '@/hooks/useContractInfo';
import { formatTheo } from '@/lib/format_theo';
import { navigation } from '@/pages/nav-config';
import { Fragment } from 'react';
import { useAccount, useBalance } from 'wagmi';
import Icon from '../Icons';
import Logo from './Logo';
import NavItem from './NavItem';

const socialLinks = [
  { icon: 'twitter', href: 'https://twitter.com/TheopetraLabs' },
  { icon: 'discord', href: 'https://discord.gg/kUUeyPkwSv' },
  { icon: 'gitbook', href: 'https://docs.theopetralabs.com' },
];
const classes = {
  statContainer: 'flex flex-row-reverse items-center justify-between flex-1  ',
  number: 'font-bold text-theo-cyan dark:text-white',
  label: 'font-semibold text-sm text-theo-navy dark:text-theo-cyan',
};

const Navigation = () => {
  const { data: account } = useAccount();
  const { address } = useContractInfo('TheopetraERC20Token');

  const { data: balance } = useBalance({
    address: account?.address,
    formatUnits: 9,
    token: address,
    watch: true,
  });

  return (
    <div className=" flex min-h-0 flex-1 flex-col bg-gradient-to-b from-[#ebebeb] to-[#ababab] dark:bg-theo-dark-navy dark:from-theo-dark-navy dark:to-theo-dark-navy">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5">
        <div className="flex items-center px-9">
          <Logo />
        </div>
        <nav className="mt-5 flex-1 space-y-2 px-2 pr-8 pl-8">
          {navigation.map((item) => (
            <Fragment key={`${item.name}_main`}>
              <NavItem item={{ ...item, disabled: item.disabled }} />
            </Fragment>
          ))}
        </nav>
        <div className="flex w-full items-center justify-between px-8 pb-2">
          {socialLinks.map((x) => (
            <Fragment key={x.icon}>
              <a
                href={x.href}
                className=" flex h-20  w-20 items-center rounded p-4 transition hover:bg-theo-cyan hover:text-white dark:text-theo-cyan dark:hover:bg-theo-gray"
                target={'_blank'}
                rel="noreferrer"
              >
                <Icon name={x.icon} className="w-full" />
              </a>
            </Fragment>
          ))}
        </div>
        <div className=" flex h-16 w-full justify-between bg-white p-1 dark:bg-black sm:p-5">
          {balance?.value && (
            <div className={classes.statContainer}>
              <div className={classes.number}>{formatTheo(balance?.value)}</div>
              <div className={classes.label}>$THEO In Your Wallet</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
