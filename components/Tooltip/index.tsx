import { Popover } from '@headlessui/react';
import { ReactElement } from 'react';
import Icon from '../Icons';

const Tooltip: React.FC<{ icon?: string; size: string }> = ({
  size,
  children = 'No content',
  icon,
}) => {
  return (
    <Popover className="relative inline">
      <Popover.Button>
        <Icon name={icon ? icon : 'info'} className={`${size === 'small' ? 'w-3' : 'w-4'}`} />
      </Popover.Button>

      <Popover.Panel className="trans absolute right-[50%] z-10 w-40 translate-x-[50%] rounded-xl bg-theo-navy p-2 text-center text-xs text-gray-300 shadow-xl">
        {children}
      </Popover.Panel>
    </Popover>
  );
};

export default Tooltip;
