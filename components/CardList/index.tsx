import React from "react";

const CardList: React.FC<{
  className?: string;
  horizontalScroll?: boolean;
}> = ({ children, className, horizontalScroll }) => {
  const gridClasses = horizontalScroll
    ? `horrizontal-scroll-container sticky-list`
    : "grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3";
  return (
    <div className={` ${gridClasses} gap-4  ${className}`}>{children}</div>
  );
};
export default CardList;
