import logoDark from "./assets/logo-dark.svg";
import logoLight from "./assets/logo-light.svg";
import altLogoLight from "./assets/alt-logo-dark.svg";
import altLogoDark from "./assets/alt-logo-dark.svg";
import { useTheme } from "@/state/ui/theme";

const Logo: React.FC<{ altLogo?: boolean }> = ({ altLogo }) => {
  const [{ theme }] = useTheme();

  return theme === "dark" ? (
    <img
      className="hidden w-auto h-34 dark:block"
      src={altLogo ? altLogoDark.src : logoDark.src}
      alt="Theopetra Labs"
    />
  ) : (
    <img
      className="block w-auto h-34"
      src={altLogo ? altLogoLight.src : logoLight.src}
      alt="Theopetra Labs"
    />
  );
};

export default Logo;
