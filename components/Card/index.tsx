import { ReactElement } from "react";

type CardProps = {
  title?: string | undefined;
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
      className={`${LMBGC} ${DMBGC} rounded-xl py-4 px-6 dark:text-white text-theo-navy flex-1`}
    >
      <div className="flex justify-between mb-16">
        {title && <div className="font-normal text-xl">{title}</div>}
        {cardHeader && cardHeader}
        {headerRightComponent}
      </div>
      <div>{children} </div>
    </div>
  );
};

export default Card;
