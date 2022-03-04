import { useTheme } from "@/state/ui/theme";

const LightSwitch = () => {
  const [{ theme }, { setTheme }] = useTheme();
  return (
    <label className="inline p-2">
      <input
        type="checkbox"
        value={theme}
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      />
    </label>
  );
};
export default LightSwitch;
