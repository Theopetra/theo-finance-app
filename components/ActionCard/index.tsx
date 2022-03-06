import { Fragment, ReactElement } from "react";
import Card from "../Card";
import Icon from "../Icons";

type ActionCardProps = {
  header: {
    primary?: string | ReactElement;
    secondary: string;
  };
  data: { label: string; value: string; info?: string }[];
  actionButton: { label: string; onClick: string; icon?: string };
  warning: string;
  icon: string;
};

const ActionCard = ({
  header,
  data,
  actionButton,
  warning,
  icon,
}: ActionCardProps) => {
  return (
    <Card
      darkModeBgColor="bg-black"
      title={
        <div className="flex items-center pr-2">
          <div className="text-2xl font-semibold mr-2">{header.primary}</div>
          <div className="lead leading-4">{header.secondary}</div>
        </div>
      }
      headerRightComponent={<Icon name={icon} className="w-10" />}
    >
      <div className="flex flex-col flex-1 justify-between">
        <div className="space-y-4 mb-8 flex-1">
          {data.map((x) => (
            <Fragment key={x.label}>
              <div className="flex justify-between text-xl">
                <div className="flex-1">{x.label}</div>
                <div className="dark:text-theo-cyan font-semibold text-right">
                  {x.value}
                  <span className="text-theo-cyan dark:text-gray-400 block text-xs font-normal max-w-[140px] leading-3">
                    {x.info}
                  </span>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <button className="border-button w-full mb-3">
          {actionButton.icon && (
            <Icon name={actionButton.icon} className="w-6 mr-2" />
          )}
          {actionButton.label}
        </button>
        <div className="text-center  dark:text-[#ffffffb3] text-xs">
          {warning}
        </div>
      </div>
    </Card>
  );
};
export default ActionCard;
