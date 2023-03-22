import Card from '@/components/Card';
import Tooltip from '@/components/Tooltip';
import { ReactElement } from 'react';
import DynamicText from '../DynamicText';

type StatCardProps = {
  name?: string | ReactElement;
  value?: string | number;
  tooltip?: string;
  tooltipIcon?: string;
};

const StatCard = ({ name, value, tooltip, tooltipIcon }: StatCardProps) => {
  return (
    <Card
      title={name}
      headerRightComponent={tooltip && <Tooltip icon={tooltipIcon}>{tooltip}</Tooltip>}
    >
      <div className="text-2xl font-extrabold sm:text-3xl">
        <DynamicText value={value} />
      </div>
    </Card>
  );
};

export default StatCard;
