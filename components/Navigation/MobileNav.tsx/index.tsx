import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { navigation } from '../../../pages/nav-config';
import Logo from '../Logo';
import NavItem from '../NavItem';
import { useTheme } from '@/state/ui/theme';

const MobileNav = () => {
  const [{ navigationOpen }] = useTheme();
  return (
    <Transition.Root show={navigationOpen} as={Fragment}>
      <div className="fixed inset-0 z-30 flex lg:hidden">
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-y-full"
          enterTo="-translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <div className="relative flex w-full flex-1 flex-col bg-gray-800">
            <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <Logo altLogo />
              </div>
              <nav className="mt-5 space-y-1 px-2">
                {navigation.map((item) => (
                  <Fragment key={`${item.name}_mobile`}>
                    <NavItem item={item} />
                  </Fragment>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 bg-gray-700 p-4">
              <a href="#" className="group block flex-shrink-0">
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
