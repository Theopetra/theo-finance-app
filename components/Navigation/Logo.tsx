import logoDark from "./assets/logo-dark.svg";
import logoLight from "./assets/logo-light.svg";
import { useTheme } from "@/state/ui/theme";

const Logo = () => {
  const [{ theme }] = useTheme();

  return theme === "dark" ? (
    <img
      className="h-34 w-auto dark:block hidden"
      src={logoDark.src}
      alt="Theopetra Labs"
    />
  ) : (
    <img
      className="h-34 w-auto block"
      src={logoLight.src}
      alt="Theopetra Labs"
    />
  );
};

export default Logo;
