import { classNames } from "@/util/class-names-util";
import { ReactNode } from "react";

type NavItemProps = {
  name?: string;
  href?: string;
  current?: boolean;
  // Icon?: ReactNode;
};
const NavItem = ({ name, href, current }: NavItemProps) => {
  return (
    <a
      key={name}
      href={href}
      className={classNames(
        current
          ? "bg-theo-navy text-white dark:bg-theo-cyan dark:text-theo-navy"
          : "hover:bg-theo-cyan hover:text-white text-theo-navy dark:text-white dark:bg-black bg-theo-light",
        "group flex items-center px-4 py-4  font-bold rounded-md text-lg"
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
  );
};

export default NavItem;
