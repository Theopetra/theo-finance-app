import React from "react";
import { ReactSVG } from "react-svg";

const Icon: React.FC<{ name: string }> = ({ name }) => {
  const src = `./icons/${name}.svg`;
  return <ReactSVG src="./icons/file.svg" />;
};

export default Icon;
