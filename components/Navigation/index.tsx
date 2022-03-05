import { navigation } from "./nav-config";
import NavItem from "./NavItem";
import Logo from "./Logo";
import Icon from "../Icons";
import { Fragment } from "react";

const socialLinks = [
  { icon: "twitter-logo", href: "#" },
  { icon: "telegram-logo", href: "#" },
  { icon: "discord-logo", href: "#" },
  { icon: "youtube-logo", href: "#" },
];
const Navigation = () => {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-t from-[#ebebeb] to-[rgb(171, 171, 171)] dark:from-theo-dark-navy dark:to-theo-dark-navy dark:bg-theo-dark-navy">
      <div className="flex-1 flex flex-col pt-5 overflow-y-auto  p-8">
        <div className="flex items-center  px-4">
          <Logo />
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-2">
          {navigation.map((item) => (
            <Fragment key={`${item.name}_main`}>
              <NavItem
                icon={item.icon}
                name={item.name}
                comingSoon={item.comingSoon}
                href={item.href}
              />
            </Fragment>
          ))}
        </nav>

        <div className="flex justify-between items-center w-full">
          {socialLinks.map((x) => (
            <Fragment key={x.icon}>
              <a
                href={x.href}
                className="dark:text-theo-cyan dark:hover:bg-theo-gray hover:bg-theo-cyan hover:text-white p-4 block rounded transition"
              >
                <Icon name={x.icon} />
              </a>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
