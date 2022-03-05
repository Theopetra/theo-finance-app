import Card from "@/components/Card";
import PageContainer from "@/components/PageContainer";
import StatCard from "@/components/Stats/StatCard";
import StatList from "@/components/Stats/StatList";
import { useTheme } from "@/state/ui/theme";

const STATS = [
  {
    name: "Market Cap",
    value: "$110,310,013",
    tooltip: "Lorem ipsum dolor sit amet, consectetur..",
  },
  {
    name: "THEO Price",
    value: "$35.42",
    tooltip: "Lorem ipsum dolor sit amet, consectetur..",
  },
  {
    name: "Circulating Supply",
    value: "$11,186,090",
    tooltip: "Lorem ipsum dolor sit amet, consectetur..",
  },
];
const PROPERTY_MANAGEMENT = [
  {
    title: "7 Buildings",
    subtitle: "$110,310,013",
    darkImgSrc: "/assets/images/dashboard/Ismetric_building_both_versions.png",
    lightImgSrc: "/assets/images/dashboard/Ismetric_building_both_versions.png",
  },
  {
    title: "50 units/month",
    subtitle: "Growth Rate",
    darkImgSrc: "/assets/images/dashboard/Graph_dark_version.png",
    lightImgSrc: "/assets/images/dashboard/Graph_light_version.png",
  },
  {
    title: "96% Rented",
    subtitle: "Occupancy Rate",
    darkImgSrc: "/assets/images/dashboard/Progress_dark_version.png",
    lightImgSrc: "/assets/images/dashboard/Progress_light_version.png",
  },
];
const Dashboard = () => {
  const [{ theme }] = useTheme();
  return (
    <PageContainer>
      <StatList>
        {STATS.map((props) => (
          <StatCard {...props} />
        ))}
      </StatList>
      <div className="mt-4">
        <Card title="Property Management" darkModeBgColor={"bg-black"}>
          <div className="flex space-x-2 items-end mb-14">
            {PROPERTY_MANAGEMENT.map((x) => (
              <div className="flex-1">
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={theme === "dark" ? x.darkImgSrc : x.lightImgSrc}
                    alt={`${x.title} graphic`}
                    className="mb-7 max-h-[200px]"
                  />
                  <div>
                    <div className="text-3xl mb-2 font-bold">{x.title}</div>
                    <div>{x.subtitle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

Dashboard.PageHead = () => {
  return <div>Welcome Home</div>;
};

export default Dashboard;
