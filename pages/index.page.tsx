import AppContainer from "../components/AppContainer";
import LightSwitch from "@/components/LightSwitch";

export default function Dashboard() {
  return (
    <AppContainer>
      <div className="py-4">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
          <LightSwitch />
        </div>
      </div>
    </AppContainer>
  );
}
