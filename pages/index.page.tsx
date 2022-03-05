import PageContainer from "@/components/PageContainer";
import StatCard from "@/components/Stats/StatCard";
import StatList from "@/components/Stats/StatList";

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
const Dashboard = () => {
  return (
    <PageContainer>
      <StatList>
        {STATS.map((props) => (
          <StatCard {...props} />
        ))}
      </StatList>
    </PageContainer>
  );
};

Dashboard.PageHead = () => {
  return <div>Welcome Home</div>;
};

export default Dashboard;
