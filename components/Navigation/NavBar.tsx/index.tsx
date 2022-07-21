import homeButtonLight from '../assets/homeButtonlight.png';
import homeButtonDark from '../assets/homeButtonDark.png';
import { useUserPurchases } from '@/pages/discount-buy/state/use-user-purchases';
import { formatTheo } from '@/lib/format_theo';
import { BigNumber } from 'ethers';
import { useTheme } from '@/state/ui/theme';

const NavBar = () => {
  const [{ theme, navigationOpen }, { setNavigationOpen }] = useTheme();
  const [{ purchases }]: any = useUserPurchases();
  const classes = {
    statContainer: 'flex flex-col items-center justify-center flex-1 ',
    number: 'font-bold text-theo-cyan dark:text-white',
    label: 'text-xs font-normal text-theo-navy dark:text-theo-cyan',
  };

  return (
    <div className="fixed bottom-0 z-30 flex justify-between w-full h-16 pt-1 pl-1 bg-white dark:bg-black sm:pl-3 sm:pt-3 lg:hidden">
      <div className={classes.statContainer}>
        <div className={classes.number}>
          {formatTheo(
            purchases
              .reduce((prev, curr, i) => prev.add(curr.payout_), BigNumber.from(0))
              .toString()
          )}
        </div>
        <div className={classes.label}>Your $THEO</div>
      </div>
      <div className="flex items-center justify-center flex-1 mx-auto -mt-16">
        <button type="button" onClick={() => setNavigationOpen(!navigationOpen)}>
          <span className="sr-only">Open nav bar</span>
          {theme === 'dark' ? (
            <img
              className="hidden w-auto h-24 dark:block"
              src={homeButtonDark.src}
              alt="Theopetra Labs"
            />
          ) : (
            <img className="block w-auto h-24" src={homeButtonLight.src} alt="Theopetra Labs" />
          )}
        </button>
      </div>
      <div className={classes.statContainer}>
      </div>
    </div>
  );
};

export default NavBar;
