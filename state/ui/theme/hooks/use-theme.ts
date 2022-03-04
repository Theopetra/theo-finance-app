import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

export const useTheme = () => {
  const [state, dispatch] = useContext(ThemeContext);

  return [state, dispatch];
};

export default useTheme;
