import { useTheme } from '@/state/ui/theme';
import { Transition } from '@headlessui/react';
import { ReactElement } from 'react';
import Skeleton from 'react-loading-skeleton';

const DynamicText: React.FC<{
  value?: string | number | ReactElement;
  height?: string | number;
  loadingLines?;
}> = ({ value, height, loadingLines = 1 }) => {
  const [{ theme }] = useTheme();
  return (
    <>
      <Transition
        show={Boolean(value)}
        enter="transition-opacity duration-250"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-250"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {value}
      </Transition>
      {!value && (
        <Skeleton
          duration={2}
          inline={true}
          className="opacity-30"
          {...(height ? { height: '40px' } : [])}
          highlightColor={theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255,1)'}
          baseColor={theme === 'dark' ? '#333333' : 'rgb(187 187 187 / 80%)'}
          count={loadingLines}
        />
      )}
    </>
  );
};

export default DynamicText;
