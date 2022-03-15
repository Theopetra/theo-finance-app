import Navigation from '../Navigation';
import MobileNav from '../Navigation/MobileNav.tsx';
import { useTheme } from '@/state/ui/theme';
import LightSwitch from '@/components/LightSwitch';
import ConnectWallet from '../ConnectWallet';
import NavBar from '../Navigation/NavBar.tsx';

const AppContainer: React.FC<{ Header?: any }> = ({ children, Header }) => {
  const [{ theme }] = useTheme();

  return (
    <div className={`${theme} h-full`}>
      <MobileNav />
      <div className="lg:max-w-64 hidden w-[350px] lg:fixed lg:inset-y-0 lg:flex lg:flex-col">
        <Navigation />
      </div>
      <div className="flex min-h-full flex-1 flex-col dark:bg-[#262626] lg:pl-[350px]">
        <NavBar />
        <main className="flex-1 ">
          <div className="py-6">
            <div className="sticky top-0 mx-auto flex max-w-7xl flex-col-reverse items-center justify-center bg-gray-100 px-4  pb-14 dark:bg-[#262626] sm:px-6 md:flex-row md:justify-between lg:px-8">
              <h1 className="text-5xl font-semibold text-gray-900 dark:text-white">
                <Header />
              </h1>
              <div className="flex justify-end flex-1 mb-12 space-x-2 md:mb-0">
                <ConnectWallet />
                <LightSwitch />
              </div>
            </div>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default AppContainer;
