import homeButtonLight from '../assets/homeButtonlight.png';
import homeButtonDark from '../assets/homeButtonDark.png';
import { formatTheo } from '@/lib/format_theo';
import { useTheme } from '@/state/ui/theme';
import { useAccount, useBalance } from 'wagmi';
import { useContractInfo } from '@/hooks/useContractInfo';

const NavBar = () => {
  const [{ theme, navigationOpen }, { setNavigationOpen }] = useTheme();
  const classes = {
    statContainer: 'flex flex-col items-center justify-center flex-1 ',
    number: 'font-bold text-theo-cyan dark:text-white',
    label: 'text-xs font-normal text-theo-navy dark:text-theo-cyan',
  };
  const { data: account } = useAccount();
  const { address } = useContractInfo('TheopetraERC20Token');
  const { data: balance } = useBalance({
    addressOrName: account?.address,
    formatUnits: 9,
    token: address,
    watch: true,
  });
  return (
    <div className="fixed bottom-0 z-30 flex h-16 w-full justify-between bg-white pt-1 pl-1 dark:bg-black sm:pl-3 sm:pt-3 lg:hidden">
      <div className={classes.statContainer}>
        {balance?.value && (
          <div>
            <div className={classes.number}>{formatTheo(balance?.value)}</div>
            <div className={classes.label}>$THEO In Your Wallet</div>
          </div>
        )}
      </div>
      <div className="mx-auto -mt-16 flex flex-1 items-center justify-center">
        <button type="button" onClick={() => setNavigationOpen(!navigationOpen)}>
          <span className="sr-only">Open nav bar</span>
          {theme === 'dark' ? (
            <img
              className="hidden h-24 w-auto dark:block"
              src={homeButtonDark.src}
              alt="Theopetra Labs"
            />
          ) : (
            <img className="block h-24 w-auto" src={homeButtonLight.src} alt="Theopetra Labs" />
          )}
        </button>
      </div>
      <div className={classes.statContainer}></div>
    </div>
  );
};

export default NavBar;
