import React, { useEffect, useState } from "react";

export const ThemeContext = React.createContext<any>(null);

export const ThemeProvider: React.FC = (props) => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    theme && localStorage.setItem("uiTheme", theme);
  }, [theme]);

  useEffect(() => {
    const lsUiTheme = localStorage.getItem("uiTheme");
    lsUiTheme && setTheme(lsUiTheme);
  }, []);

  return (
    <ThemeContext.Provider value={[{ theme }, { setTheme }]}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
