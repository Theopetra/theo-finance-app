import Navigation from '../Navigation';
import MobileNav from '../Navigation/MobileNav.tsx';
import { useTheme } from '@/state/ui/theme';
import LightSwitch from '@/components/LightSwitch';
import ConnectWallet from '../ConnectWallet';
import NavBar from '../Navigation/NavBar.tsx';
import FauxModal from '../FauxModal';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { Transition } from '@headlessui/react';

const AppContainer: React.FC<{ Header?: any }> = ({ children, Header }) => {
  const [{ theme }] = useTheme();
  const [{ isOpen }] = useModal();

  return (
    <div className={`${theme} h-full`}>
      <MobileNav />
      <div className="lg:max-w-64 hidden w-[350px] lg:fixed lg:inset-y-0 lg:flex lg:flex-col">
        <Navigation />
      </div>
      <div className="flex min-h-full flex-1 flex-col dark:bg-[#262626] lg:pl-[350px]">
        <NavBar />
        <main className="flex-1 ">
          {/* provider */}
          <Transition
            show={isOpen}
            enter="transition-all delay-250 duration-250"
            enterFrom=" translate-x-32 opacity-0"
            enterTo=" translate-x-0 opacitity-1"
            leave="transition-all duration-250"
            leaveFrom="translate-x-0 opacity-1"
            leaveTo="translate-x-32 opacity-0"
          >
            <FauxModal />
          </Transition>
          <Transition
            show={!isOpen}
            enter="transition-opacity delay-250 duration-250"
            enterFrom="opacity-0"
            enterTo="opacity-1"
            leave="transition-opacity duration-250"
            leaveFrom="opacity-1"
            leaveTo="opacity-0"
          >
            <div className="py-6 ">
              <div className="sticky top-0 z-10 mx-auto flex max-w-7xl flex-col-reverse items-center justify-center bg-gray-100 px-4  pb-14 dark:bg-[#262626] sm:px-6 md:flex-row md:justify-between lg:px-8">
                <h1 className="text-5xl font-semibold text-gray-900 dark:text-white">
                  <Header />
                </h1>
                <div className="mb-12 flex flex-1 justify-end space-x-2 md:mb-0">
                  <ConnectWallet />
                  <LightSwitch />
                </div>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
            </div>
          </Transition>
        </main>
      </div>
    </div>
  );
};
export default AppContainer;
