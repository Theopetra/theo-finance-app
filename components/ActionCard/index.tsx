import { Fragment, ReactElement } from 'react';
import Card from '../Card';
import Icon from '../Icons';

type ActionCardProps = {
  header: {
    primary?: string | ReactElement;
    secondary?: string;
    classes?: string;
  };
  data: { label: string; value: string; info?: string; type?: string }[];
  actionButton: { label: string; onClick?: () => void; icon?: ReactElement };
  warning: string;
  icon: ReactElement;
  highlight?: boolean;
};

const ActionCard = ({ header, data, actionButton, warning, icon, highlight }: ActionCardProps) => {
  const highlightClasses = 'drop-shadow-[4px_4px_4px_rgba(80,174,203,0.75)]';
  return (
    <Card
      className={highlight ? highlightClasses : ''}
      darkModeBgColor="bg-black dark:bg-none"
      title={
        <div className="flex items-center pr-2">
          <div className="mr-2 text-2xl font-semibold">{header.primary}</div>
          <div className="lead leading-4">{header.secondary}</div>
        </div>
      }
      headerClasses={header.classes}
      headerRightComponent={icon}
    >
      <div className="flex flex-1 flex-col justify-between">
        <div className="mb-8 flex-1 space-y-2 sm:space-y-4">
          {data?.map((x) => (
            <Fragment key={x.label}>
              <div className="flex justify-between text-xl">
                <div className="flex-1">{x.label}</div>
                <div className="text-right font-semibold dark:text-theo-cyan">
                  {x.value}
                  <span className="block max-w-[140px] text-xs font-normal leading-3 text-theo-cyan dark:text-gray-400">
                    {x.info}
                  </span>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <button className="border-button mb-3 w-full" onClick={actionButton.onClick}>
          {actionButton.icon}
          {actionButton.label}
        </button>
        <div className="text-center  text-xs dark:text-[#ffffffb3]">{warning}</div>
      </div>
    </Card>
  );
};
export default ActionCard;
