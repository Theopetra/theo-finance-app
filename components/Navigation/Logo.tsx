import logoDark from './assets/logo-dark.svg';
import logoLight from './assets/logo-light.svg';
import altLogoLight from './assets/alt-logo-dark.svg';
import altLogoDark from './assets/alt-logo-dark.svg';
import { useTheme } from '@/state/ui/theme';
import Link from 'next/link';

const Logo: React.FC<{ altLogo?: boolean }> = ({ altLogo }) => {
  const [{ theme }, { setActiveSubNav, setNavigationOpen }] = useTheme();

  return (
    <Link href="/" passHref>
      <a
        className="block"
        onClick={() => {
          setNavigationOpen(false);
          setActiveSubNav('Dashboard');
        }}
      >
        {theme === 'dark' ? (
          <img
            className="hidden h-32 w-auto dark:block"
            src={altLogo ? altLogoDark.src : logoDark.src}
            alt="Theopetra Labs"
          />
        ) : (
          <img
            className="block h-32 w-auto"
            src={altLogo ? altLogoLight.src : logoLight.src}
            alt="Theopetra Labs"
          />
        )}
      </a>
    </Link>
  );
};

export default Logo;
