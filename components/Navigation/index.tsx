import { navigation } from "./nav-config";
import NavItem from "./NavItem";
import Logo from "./Logo";

const Navigation = () => {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-t from-[#ebebeb] to-[rgb(171, 171, 171)] dark:from-theo-dark-navy dark:to-theo-dark-navy dark:bg-theo-dark-navy p-8">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <Logo />
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-2">
          {navigation.map((item) => (
            <NavItem name={item.name} current={item.current} href={item.href} />
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 flex bg-gray-700 p-4">
        <a href="#" className="flex-shrink-0 w-full group block">
          <div className="flex items-center">social</div>
        </a>
      </div>
    </div>
  );
};

export default Navigation;
