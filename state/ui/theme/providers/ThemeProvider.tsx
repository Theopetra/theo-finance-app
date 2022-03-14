import React, { useEffect, useState } from 'react';

export const ThemeContext = React.createContext<any>(null);

export const ThemeProvider: React.FC = (props) => {
  const [theme, setTheme] = useState('');
  const [navigationOpen, setNavigationOpen] = useState(false);
  useEffect(() => {
    theme && localStorage.setItem('uiTheme', theme);
  }, [theme]);

  useEffect(() => {
    const lsUiTheme = localStorage.getItem('uiTheme');
    lsUiTheme && setTheme(lsUiTheme);
  }, []);

  return (
    <ThemeContext.Provider
      value={[
        { theme, navigationOpen },
        { setTheme, setNavigationOpen },
      ]}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
