import { Fragment, useState } from 'react';
import Icon from '@/components/Icons';
import { useTheme } from '@/state/ui/theme';
import { classNames } from '@/util/class-names-util';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
type NavItemProps = {
  name?: string;
  href?: string;
  disabled?: boolean;
  icon?: string;
  subNav?: NavItemProps[];
};

type NavItem = {
  item: NavItemProps;
};

const NavItem = ({ item }: NavItem) => {
  const router = useRouter();
  const [{ activeSubNav }, { setActiveSubNav, setNavigationOpen }] = useTheme();
  const { name, href, icon, disabled, subNav } = item;

  return (
    <>
      <Link key={name} href={!disabled ? (href as any) : '#'} passHref={true}>
        <a
          onClick={() => {
            setNavigationOpen(false);
            setActiveSubNav(name);
          }}
          key={name}
          className={classNames(
            router.asPath === href
              ? 'bg-theo-navy text-white dark:bg-theo-cyan dark:text-theo-navy'
              : 'bg-theo-light text-theo-navy dark:bg-black dark:text-white',
            'group mx-auto flex max-w-[318px] cursor-pointer items-center  rounded-md px-4 py-4 text-lg font-bold transition',
            disabled && 'cursor-not-allowed opacity-50',
            !disabled &&
              'hover:bg-theo-cyan hover:text-white dark:hover:bg-theo-gray dark:hover:text-white'
          )}
        >
          <div>
            <div className={`flex items-center`}>
              {icon && <Icon name={icon} className="mr-4 w-8" />}
              <div>{name}</div>
            </div>
          </div>
        </a>
      </Link>
      {item?.subNav?.length && (
        <Transition
          show={Boolean(activeSubNav === name)}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {item?.subNav.map((subItem) => (
            <Fragment key={`${subItem.name}_main`}>
              <Link key={name} href={!disabled ? (subItem.href as any) : '#'} passHref={true}>
                <a
                  onClick={() => setNavigationOpen(false)}
                  key={name}
                  className={classNames(
                    router.asPath === subItem.href ? 'underline' : '',
                    ' block py-4 text-center text-lg font-bold text-theo-dark-navy dark:text-white',
                    disabled && 'cursor-not-allowed opacity-50'
                  )}
                >
                  {subItem.name}
                </a>
              </Link>
            </Fragment>
          ))}
        </Transition>
      )}
    </>
  );
};

export default NavItem;
