import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export const ThemeContext = React.createContext<any>(null);

export const ThemeProvider: React.FC = (props) => {
  const [theme, setTheme] = useState('');
  // TODO: Nav belongs in it's own provider
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [activeSubNav, setActiveSubNav] = useState('');
  const router = useRouter();

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
        { theme, navigationOpen, activeSubNav },
        { setTheme, setNavigationOpen, setActiveSubNav },
      ]}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
