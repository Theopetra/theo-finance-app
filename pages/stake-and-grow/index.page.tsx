import ActionCard from "@/components/ActionCard";
import CardList from "@/components/CardList";
import PageContainer from "@/components/PageContainer";
import StatCard from "@/components/StatCard";
import { Fragment } from "react";

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
const ACTION_CARD = [
  {
    header: {
      primary: "Standard Stake",
      secondary: "",
    },
    icon: "lock-laminated",
    data: [
      { label: "Assets", value: "sTHEO" },
      { label: "APY", value: "5% THEO" },
      { label: "Locked for", value: "30 Days" },
    ],
    actionButton: {
      label: "Stake + Grow",
      onClick: "",
      icon: "lock-laminated",
    },
    warning: "Connect your wallet to stake THEO",
  },
  {
    header: {
      primary: "Platinum Stake",
      secondary: "",
    },
    icon: "lock-laminated",
    data: [
      { label: "Assets", value: "sTHEO" },
      {
        label: "APY",
        value: "30% THEO",
        info: "+ ETH airdrops to top 4000 holders ",
      },
      { label: "Locked for", value: "120 Days" },
    ],
    actionButton: {
      label: "Stake + Grow",
      onClick: "",
      icon: "lock-laminated",
    },
    warning: "Connect your wallet to stake THEO",
  },
];
const StakeGrow = () => {
  return (
    <PageContainer>
      <CardList className={"mb-4"}>
        {STATS.map((props) => (
          <Fragment key={props.name}>
            <StatCard {...props} />
          </Fragment>
        ))}
      </CardList>
      <CardList>
        {ACTION_CARD.map((props, i) => (
          <Fragment key={`${props.header.secondary}_${i}`}>
            <ActionCard {...props} />
          </Fragment>
        ))}
      </CardList>
    </PageContainer>
  );
};

StakeGrow.PageHead = () => {
  return <div>Stake + Grow</div>;
};

export default StakeGrow;
