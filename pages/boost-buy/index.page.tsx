import PageContainer from "@/components/PageContainer";
import StatCard from "@/components/Stats/StatCard";
import StatList from "@/components/Stats/StatList";

const STATS = [
  {
    name: "Treasury Balance",
    value: "$110,310,013",
    tooltip: "Lorem ipsum dolor sit amet, consectetur..",
  },
  {
    name: "THEO Price",
    value: "$35.42",
    tooltip: "Lorem ipsum dolor sit amet, consectetur..",
  },
];

const BoostBuy = () => {
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
BoostBuy.PageHead = () => {
  return "Boost Buy";
};

export default BoostBuy;
