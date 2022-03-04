import React from "react";
import { ThemeProvider } from "../ui/theme";

const AppProviders = (props) => {
  return <ThemeProvider>{props.children}</ThemeProvider>;
};

export default AppProviders;
