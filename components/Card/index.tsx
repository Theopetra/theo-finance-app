import { ReactElement } from 'react';

type CardProps = {
  title?: string | ReactElement | undefined;
  cardHeader?: ReactElement;
  headerRightComponent?: ReactElement;
  children: ReactElement;
  darkModeBgColor?: string;
  lightModeBgColor?: string;
  className?: string;
  headerClasses?: string;
};
const Card = ({
  title = '',
  cardHeader,
  headerRightComponent,
  children,
  darkModeBgColor,
  lightModeBgColor,
  className,
  headerClasses,
}: CardProps) => {
  const LMBGC = lightModeBgColor ? lightModeBgColor : 'bg-gradient-to-b from-white to-[#EDEDED]';
  const DMBGC = darkModeBgColor ? `dark:${darkModeBgColor}` : 'dark:bg-theo-cyan dark:bg-none';

  return (
    <div
      className={`${LMBGC} ${DMBGC} ${className} flex flex-1 flex-col rounded-xl text-theo-navy dark:text-white `}
    >
      <div className={`mb-8 flex items-center justify-between px-6 rounded-t-xl py-4 ${headerClasses}`}>
        {title && <div className="text-xl font-normal">{title}</div>}
        {cardHeader && cardHeader}
        {headerRightComponent}
      </div>
      <div className="flex flex-1 flex-col px-6 pb-4">{children} </div>
    </div>
  );
};

export default Card;
