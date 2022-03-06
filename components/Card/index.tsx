import { ReactElement } from "react";

type CardProps = {
  title?: string | ReactElement | undefined;
  cardHeader?: ReactElement;
  headerRightComponent?: ReactElement;
  children: ReactElement;
  darkModeBgColor?: string;
  lightModeBgColor?: string;
};
const Card = ({
  title = "",
  cardHeader,
  headerRightComponent,
  children,
  darkModeBgColor,
  lightModeBgColor,
}: CardProps) => {
  const LMBGC = lightModeBgColor ? lightModeBgColor : "bg-[#ffffffcc]";
  const DMBGC = darkModeBgColor
    ? `dark:${darkModeBgColor}`
    : "dark:bg-theo-cyan ";

  return (
    <div
      className={`${LMBGC} ${DMBGC} rounded-xl py-4 px-6 dark:text-white text-theo-navy flex-1 flex flex-col `}
    >
      <div className="flex justify-between mb-16 items-center">
        {title && <div className="font-normal text-xl">{title}</div>}
        {cardHeader && cardHeader}
        {headerRightComponent}
      </div>
      <div className="flex flex-col flex-1">{children} </div>
    </div>
  );
};

export default Card;
