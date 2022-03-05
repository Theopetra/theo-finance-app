import Card from "@/components/Card";
import Tooltip from "@/components/Tooltip";

type StatCardProps = {
  name?: string;
  value?: string | number;
  tooltip?: string;
};

const StatCard = ({ name, value, tooltip }: StatCardProps) => {
  return (
    <Card title={name} headerRightComponent={<Tooltip>{tooltip}</Tooltip>}>
      <div className=" text-3xl font-extrabold">{value}</div>
    </Card>
  );
};

export default StatCard;
