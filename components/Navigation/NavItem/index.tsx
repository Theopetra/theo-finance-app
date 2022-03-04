import Icon from "@/components/Icons";
import { classNames } from "@/util/class-names-util";
import Link from "next/link";
import { useRouter } from "next/router";

type NavItemProps = {
  name?: string;
  href?: string;
  comingSoon?: boolean;
  icon?: string;
};
const NavItem = ({ name, href, icon, comingSoon }: NavItemProps) => {
  const router = useRouter();
  return (
    <Link key={name} href={!comingSoon ? (href as any) : "#"}>
      <a
        key={name}
        href={href as any}
        className={classNames(
          router.asPath === href
            ? "bg-theo-navy text-white dark:bg-theo-cyan dark:text-theo-navy"
            : "text-theo-navy dark:text-white dark:bg-black bg-theo-light",
          "group cursor-pointer flex items-center px-4 py-4  font-bold rounded-md text-lg transition",
          comingSoon && "cursor-not-allowed ",
          !comingSoon &&
            "hover:bg-theo-cyan hover:text-white dark:hover:bg-theo-gray dark:hover:text-white"
        )}
      >
        <div>
          <div className={`flex items-center`}>
            {icon && <Icon name={icon} className="w-8 mr-4" />}
            <div>
              <span className={comingSoon ? "line-through" : ""}>{name}</span>
              {comingSoon ? (
                <span className="text-xs text-gray-300 block font-normal">
                  (Coming Soon)
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default NavItem;
