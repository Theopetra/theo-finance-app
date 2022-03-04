import { classNames } from "@/util/class-names-util";
import Link from "next/link";
import { useRouter } from "next/router";

type NavItemProps = {
  name?: string;
  href?: string;
  current?: boolean;
};
const NavItem = ({ name, href, current }: NavItemProps) => {
  const router = useRouter();
  return (
    <Link key={name} href={href as any}>
      <a
        className={classNames(
          router.asPath === href
            ? "bg-theo-navy text-white dark:bg-theo-cyan dark:text-theo-navy"
            : "hover:bg-theo-cyan hover:text-white text-theo-navy dark:text-white dark:bg-black bg-theo-light",
          "group cursor-pointer flex items-center px-4 py-4  font-bold rounded-md text-lg"
        )}
      >
        {/* <Icon
        className={classNames(
          current ? "text-gray-300" : "text-gray-400 group-hover:text-gray-300",
          "mr-3 flex-shrink-0 h-6 w-6"
        )}
        aria-hidden="true"
      /> */}
        {name}
      </a>
    </Link>
  );
};

export default NavItem;
