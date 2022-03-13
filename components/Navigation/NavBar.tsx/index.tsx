import { MenuIcon } from "@heroicons/react/outline";
import { NavDrawerProps } from "../types";

const NavBar = ({ sidebarOpen, setSidebarOpen }: NavDrawerProps) => {
  return (
    <div className="w-full fixed bottom-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-black ">
      <button
        type="button"
        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default NavBar;
