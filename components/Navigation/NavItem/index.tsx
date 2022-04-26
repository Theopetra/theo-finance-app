import Icon from '@/components/Icons';
import { useTheme } from '@/state/ui/theme';
import { classNames } from '@/util/class-names-util';
import Link from 'next/link';
import { useRouter } from 'next/router';

type NavItemProps = {
  name?: string;
  href?: string;
  disabled?: boolean;
  icon?: string;
};
const NavItem = ({ name, href, icon, disabled }: NavItemProps) => {
  const router = useRouter();
  const [, { setNavigationOpen }] = useTheme();

  return (
    <Link key={name} href={!disabled ? (href as any) : '#'} passHref={true}>
      <a
        onClick={() => setNavigationOpen(false)}
        key={name}
        className={classNames(
          router.asPath === href
            ? 'bg-theo-navy text-white dark:bg-theo-cyan dark:text-theo-navy'
            : 'bg-theo-light text-theo-navy dark:bg-black dark:text-white',
          'group flex cursor-pointer items-center rounded-md px-4  py-4 text-lg font-bold transition',
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
  );
};

export default NavItem;
