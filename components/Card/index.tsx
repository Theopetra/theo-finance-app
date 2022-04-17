import { ReactElement } from 'react';

type CardProps = {
  title?: string | ReactElement | undefined;
  cardHeader?: ReactElement;
  headerRightComponent?: ReactElement;
  children: ReactElement;
  darkModeBgColor?: string;
  lightModeBgColor?: string;
  className?;
};
const Card = ({
  title = '',
  cardHeader,
  headerRightComponent,
  children,
  darkModeBgColor,
  lightModeBgColor,
  className,
}: CardProps) => {
  const LMBGC = lightModeBgColor ? lightModeBgColor : 'bg-gradient-to-b from-white to-[#EDEDED]';
  const DMBGC = darkModeBgColor ? `dark:${darkModeBgColor}` : 'dark:bg-theo-cyan dark:bg-none';

  return (
    <div
      className={`${LMBGC} ${DMBGC} ${className} flex flex-1 flex-col rounded-xl py-4 px-6 text-theo-navy dark:text-white `}
    >
      <div className="mb-16 flex items-center justify-between">
        {title && <div className="text-xl font-normal">{title}</div>}
        {cardHeader && cardHeader}
        {headerRightComponent}
      </div>
      <div className="flex flex-1 flex-col">{children} </div>
    </div>
  );
};

export default Card;
