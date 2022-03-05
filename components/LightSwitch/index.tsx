import { useTheme } from "@/state/ui/theme";
import Icon from "../Icons";

const LightSwitch = () => {
  const [{ theme }, { setTheme }] = useTheme();
  return (
    <label className="border-button">
      <input
        type="checkbox"
        value={theme}
        className="sr-only"
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      />
      <Icon name="sun" className="w-6" />
    </label>
  );
};
export default LightSwitch;
