import ActionCard from "@/components/ActionCard";
import CardList from "@/components/CardList";
import PageContainer from "@/components/PageContainer";
import StatCard from "@/components/StatCard";
import { Fragment } from "react";

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

const ACTION_CARD = [
  {
    header: {
      primary: <span className="text-4xl">10%</span>,
      secondary: "Market Discount",
    },
    icon: "intersect",
    data: [
      { label: "Assets", value: "ETH-THEO" },
      { label: "Bond Price", value: "$25.20" },
      { label: "Duration", value: "120 Days" },
    ],
    actionButton: { label: "Buy Theo", onClick: "", icon: "intersect" },
    warning:
      "Important: New bonds are auto-staked (accrue rebase rewards) and no longer vest linearly",
  },
  {
    header: {
      primary: <span className="text-4xl">10%</span>,
      secondary: "Market Discount",
    },
    icon: "intersect",
    data: [
      { label: "Assets", value: "ETH-THEO" },
      { label: "Bond Price", value: "$25.20" },
      { label: "Duration", value: "120 Days" },
    ],
    actionButton: { label: "Buy Theo", onClick: "", icon: "intersect" },
    warning:
      "Important: New bonds are auto-staked (accrue rebase rewards) and no longer vest linearly",
  },
  {
    header: {
      primary: <span className="text-4xl">30%</span>,
      secondary: "Market Discount",
    },
    icon: "intersect",
    data: [
      { label: "Assets", value: "ETH-THEO" },
      { label: "Bond Price", value: "$25.20" },
      { label: "Duration", value: "120 Days" },
    ],
    actionButton: { label: "Buy Theo", onClick: "", icon: "intersect" },
    warning:
      "Important: New bonds are auto-staked (accrue rebase rewards) and no longer vest linearly",
  },
];

const BoostBuy = () => {
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
BoostBuy.PageHead = () => {
  return (
    <>
      Boost Buy <span className="text-xl">(Bond)</span>
    </>
  );
};

export default BoostBuy;
