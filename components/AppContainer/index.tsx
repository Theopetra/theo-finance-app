import { ReactElement, ReactNode, useState } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import Navigation from "../Navigation";
import MobileNav from "../Navigation/MobileNav.tsx";
import { useTheme } from "@/state/ui/theme";
import LightSwitch from "@/components/LightSwitch";
import ConnectWallet from "../ConnectWallet";

const AppContainer: React.FC<{ Header?: any }> = ({ children, Header }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [{ theme }] = useTheme();
  return (
    <div className={`${theme} h-full`}>
      <MobileNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="hidden md:flex md:max-w-64 md:flex-col md:fixed md:inset-y-0 w-[350px]">
        <Navigation />
      </div>
      <div className="md:pl-[350px] flex flex-col flex-1 dark:bg-[#262626] min-h-full">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100 ">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 ">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                <Header />
              </h1>
              <div className="space-x-2 flex-1 flex justify-end">
                <ConnectWallet />
                <LightSwitch />
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default AppContainer;
