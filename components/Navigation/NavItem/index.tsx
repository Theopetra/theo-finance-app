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
          ? "bg-theo-navy text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
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
