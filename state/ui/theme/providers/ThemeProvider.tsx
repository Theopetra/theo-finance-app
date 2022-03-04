import React, { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ThemeContext = React.createContext<any>(null);

export const ThemeProvider: React.FC = (props) => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider
      value={[
        { theme },
        {
          setTheme,
        },
      ]}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
