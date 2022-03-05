import Tooltip from "@/components/Tooltip";

type StatCardProps = {
  name?: string;
  value?: string | number;
  tooltip?: string;
};

const StatCard = ({ name, value, tooltip }: StatCardProps) => {
  return (
    <div className="dark:bg-theo-cyan bg-[#ffffffcc] rounded-xl py-4 px-6 dark:text-white text-theo-navy flex-1">
      <div className="flex justify-between mb-16">
        <div className="font-normal text-xl">{name}</div>
        <Tooltip>{tooltip}</Tooltip>
      </div>
      <div className=" text-3xl font-extrabold">{value}</div>
    </div>
  );
};

export default StatCard;
