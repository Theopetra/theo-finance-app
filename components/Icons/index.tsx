import React from "react";
import { ReactSVG } from "react-svg";

type IconProps = {
  name: string;
  className?: string;
};

const Icon = ({ name, className = "" }: IconProps) => {
  const src = `./assets/icons/${name}.svg`;
  return (
    <ReactSVG
      src={src}
      className={`${className} inline-block`}
      beforeInjection={(svg) => {
        svg.classList.add("w-full");
      }}
    />
  );
};

export default Icon;
