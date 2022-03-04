import { useTheme } from "@/state/ui/theme";

const LightSwitch = () => {
  const [{ theme }, { setTheme }] = useTheme();
  return (
    <label>
      <input
        type="checkbox"
        value={theme}
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      />
      {theme}
    </label>
  );
};
export default LightSwitch;
