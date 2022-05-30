import Card from '@/components/Card';
import Tooltip from '@/components/Tooltip';
import { ReactElement } from 'react';

type StatCardProps = {
  name?: string | ReactElement;
  value?: string | number;
  tooltip?: string;
  tooltipIcon?: string;
};

const StatCard = ({ name, value, tooltip, tooltipIcon }: StatCardProps) => {
  return (
    <Card title={name} headerRightComponent={<Tooltip icon={tooltipIcon}>{tooltip}</Tooltip>}>
      <div className="text-2xl font-extrabold sm:text-3xl">{value}</div>
    </Card>
  );
};

export default StatCard;
