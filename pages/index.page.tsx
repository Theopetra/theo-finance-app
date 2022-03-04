import AppContainer from "../components/AppContainer";
import { useTheme } from "@/state/ui/theme";

export default function Dashboard() {
  const [{ theme }, { setTheme }] = useTheme();
  return (
    <AppContainer>
      <div className="py-4">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
          <input
            type="checkbox"
            value={theme}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
          {theme}
        </div>
      </div>
    </AppContainer>
  );
}
