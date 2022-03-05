import PageContainer from "@/components/PageContainer";
import StatCard from "@/components/Stats/StatCard";
import StatList from "@/components/Stats/StatList";

const STATS = [
  {
    name: "Staking Yield",
    value: "5-30% APY",
    tooltip: "Lorem ipsum dolor sit amet, consectetur..",
  },
  {
    name: "THEO Staked",
    value: "78%",
    tooltip: "Lorem ipsum dolor sit amet, consectetur..",
  },
  {
    name: "Total Value Staked",
    value: "$11,186,090",
    tooltip: "Lorem ipsum dolor sit amet, consectetur..",
  },
];
const StakeGrow = () => {
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

StakeGrow.PageHead = () => {
  return <div>Stake + Grow</div>;
};

export default StakeGrow;
