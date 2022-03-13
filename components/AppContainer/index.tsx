import { ReactElement, ReactNode, useState } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import Navigation from "../Navigation";
import MobileNav from "../Navigation/MobileNav.tsx";
import { useTheme } from "@/state/ui/theme";
import LightSwitch from "@/components/LightSwitch";
import ConnectWallet from "../ConnectWallet";
import NavBar from "../Navigation/NavBar.tsx";

const AppContainer: React.FC<{ Header?: any }> = ({ children, Header }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [{ theme }] = useTheme();
  return (
    <div className={`${theme} h-full`}>
      <MobileNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="hidden lg:flex lg:max-w-64 lg:flex-col lg:fixed lg:inset-y-0 w-[350px]">
        <Navigation />
      </div>
      <div className="lg:pl-[350px] flex flex-col flex-1 dark:bg-[#262626] min-h-full">
        <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 ">
          <div className="py-6">
            <div className="max-w-7xl dark:bg-[#262626] bg-gray-100 sticky top-0 mx-auto px-4 sm:px-6 lg:px-8 flex  flex-col-reverse justify-center items-center md:flex-row md:justify-between pb-14">
              <h1 className="text-5xl font-semibold text-gray-900 dark:text-white">
                <Header />
              </h1>
              <div className="space-x-2 flex-1 flex justify-end mb-12 md:mb-0">
                <ConnectWallet />
                <LightSwitch />
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default AppContainer;
