import { Popover } from "@headlessui/react";
import { defaultConfig } from "next/dist/server/config-shared";
import Icon from "../Icons";

const Tooltip: React.FC = ({ children = "No content" }) => {
  return (
    <Popover className="relative inline">
      <Popover.Button>
        <Icon name="info" className="w-6" />
      </Popover.Button>

      <Popover.Panel className="right-[50%] translate-x-[50%] w-40 text-center rounded-xl trans absolute z-10 bg-theo-navy text-gray-300 p-2 text-xs shadow-xl">
        {children}
      </Popover.Panel>
    </Popover>
  );
};

export default Tooltip;
