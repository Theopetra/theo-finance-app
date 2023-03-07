import Navigation from '../Navigation';
import MobileNav from '../Navigation/MobileNav.tsx';
import { useTheme } from '@/state/ui/theme';
import LightSwitch from '@/components/LightSwitch';
import ConnectWallet from '../ConnectWallet';
import NavBar from '../Navigation/NavBar.tsx';
import FauxModal from '../FauxModal';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { Transition } from '@headlessui/react';
import { useNetwork } from 'wagmi';

const AppContainer: React.FC<{ Header?: any; PageStateProvider }> = ({
  children,
  Header,
  PageStateProvider,
}) => {
  const [{ theme }] = useTheme();
  const [{ isOpen, transitioning }, { setTransitioning }] = useModal();
  const { isLoading, activeChain } = useNetwork();
  const allowedChains = [1, 11155111, 31337];
  return (
    <div className={`${theme} h-full min-h-screen`}>
      <MobileNav />
      <div className="lg:max-w-64 hidden w-[300px] lg:fixed lg:inset-y-0 lg:flex lg:flex-col">
        <Navigation />
      </div>
      <div className="flex min-h-screen flex-1 flex-col dark:bg-[#262626] lg:pl-[300px]">
        <NavBar />
        <main
          className={`${
            transitioning ? 'overflow-hidden' : ''
          } relative w-full flex-1  bg-contain bg-bottom bg-no-repeat `}
          style={{
            backgroundImage: `url(/assets/images/Grid-Background-${
              theme === 'dark' ? '02' : '01'
            }.svg)`,
          }}
        >
          <div className="py-6 ">
            <div className="z-10 mx-auto flex max-w-7xl flex-col-reverse items-center justify-center bg-gray-100 px-4  dark:bg-[#262626] sm:px-6 md:flex-row md:justify-between lg:px-8">
              <h1 className="text-4xl font-extrabold text-theo-navy dark:text-white sm:text-5xl">
                <Header />
              </h1>
              <div className="mb-12 flex flex-1 justify-end space-x-2 md:mb-0">
                <ConnectWallet />
                <LightSwitch />
              </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {isLoading && <div className="  font-bold">Loading</div>}

              {activeChain?.id && !allowedChains.includes(activeChain.id) && (
                <div className=" font-bold">Please connect to the Ethereum Mainnet.</div>
              )}
              {activeChain && allowedChains.includes(activeChain.id) && (
                <PageStateProvider>
                  {/* provider */}
                  <Transition
                    beforeEnter={() => setTransitioning(true)}
                    afterEnter={() => setTransitioning(false)}
                    beforeLeave={() => setTransitioning(true)}
                    afterLeave={() => setTransitioning(false)}
                    show={isOpen}
                    as={'div'}
                    enter="fixed inset-0 z-40 transition-all duration-250"
                    enterFrom="translate-x-32 opacity-0"
                    enterTo=" translate-x-0 opacitity-1"
                    leave="fixed inset-0 z-40 transition-all duration-250"
                    leaveFrom="translate-x-0 opacity-1"
                    leaveTo="translate-x-32 opacity-0"
                  >
                    <FauxModal />
                  </Transition>
                  {children}
                </PageStateProvider>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default AppContainer;
