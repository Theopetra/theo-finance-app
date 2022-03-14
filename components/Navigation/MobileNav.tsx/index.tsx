import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { navigation } from "../../../pages/nav-config";
import Logo from "../Logo";
import NavItem from "../NavItem";
import { NavDrawerProps } from "../types";

const MobileNav = ({ sidebarOpen }: NavDrawerProps) => {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <div className="fixed inset-0 z-40 flex lg:hidden">
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-y-full"
          enterTo="-translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <div className="relative flex flex-col flex-1 w-full bg-gray-800">
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Logo altLogo />
              </div>
              <nav className="px-2 mt-5 space-y-1">
                {navigation.map((item) => (
                  <Fragment key={`${item.name}_mobile`}>
                    <NavItem
                      icon={item.icon}
                      name={item.name}
                      comingSoon={item.comingSoon}
                      href={item.href}
                    />
                  </Fragment>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 p-4 bg-gray-700">
              <a href="#" className="flex-shrink-0 block group">
                <div className="flex items-center"></div>
              </a>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};
export default MobileNav;
