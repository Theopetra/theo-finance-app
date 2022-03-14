import { MenuIcon } from "@heroicons/react/outline";
import { NavDrawerProps } from "../types";
import homeButtonLight from "../assets/homeButtonlight.png";
import homeButtonDark from "../assets/homeButtonDark.png";
import { useTheme } from "@/state/ui/theme";

const NavBar = ({ sidebarOpen, setSidebarOpen }: NavDrawerProps) => {
  const [{ theme }] = useTheme();

  return (
    <div className="fixed bottom-0 z-50 flex w-full pt-1 pl-1 bg-black lg:hidden sm:pl-3 sm:pt-3">
      <button
        type="button"
        className=""
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span className="sr-only">Open nav bar</span>
        {theme === "dark" ? (
          <img
            className="hidden w-auto h-24 dark:block"
            src={homeButtonDark.src}
            alt="Theopetra Labs"
          />
        ) : (
          <img
            className="block w-auto h-24"
            src={homeButtonLight.src}
            alt="Theopetra Labs"
          />
        )}
      </button>
    </div>
  );
};

export default NavBar;
