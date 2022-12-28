import HorizontalSubNav from '@/components/HorizontalSubNav';
import PageContainer from '@/components/PageContainer';
import Card from '@/components/Card';
import CardList from '@/components/CardList';
import DynamicText from '@/components/DynamicText';
import { format } from 'date-fns';
import ConfirmClaim from './components/ConfirmClaim';
import useModal from '@/state/ui/theme/hooks/use-modal';
import Icon from '@/components/Icons';
import { CircleWavyCheck, Clock } from 'phosphor-react';

const purchases = [
  {
    id: 1,
    type: 'Pre-Market',
    created_: 1658312882,
    expiry_: 1674080882,
    total: 1200000.32,
    matured_: false,
  },
  {
    id: 2,
    type: 'Pre-Market',
    created_: 1658312882,
    expiry_: 1674080882,
    total: 1200000.32,
    matured_: true,
  },
];
const Claim = () => {
  const [, { openModal }] = useModal();
  return (
    <>
      <div className="pt-4">
        <HorizontalSubNav
          items={[{ href: '/discount-buy/your-purchases', name: 'Your Purchases' }]}
        />
      </div>
      <PageContainer>
        <CardList>
          {purchases.map((purchase) => (
            <Card
              key={purchase.id}
              darkModeBgColor="bg-theo-dark-navy"
              title={<div className="pb-3 text-2xl font-bold">Claim Tokens</div>}
              headerRightComponent={
                <div>
                  {purchase.matured_ ? (
                    <CircleWavyCheck size={28} color="rgb(47, 69, 92)" weight="fill" />
                  ) : (
                    <Clock size={28} color="rgb(47, 69, 92)" weight="regular" />
                  )}{' '}
                </div>
              }
            >
              <>
                <div className="-mt-8 flex justify-between text-lg leading-8 text-theo-navy dark:text-theo-cyan">
                  <div>Type</div>
                  <div className="font-bold">{purchase.type}</div>
                </div>
                <div className="flex justify-between text-lg leading-8 text-theo-navy dark:text-theo-cyan">
                  <div>Purchased</div>
                  <div className="font-bold">
                    {format(new Date(purchase.created_ * 1000), 'yyyy-MM-dd')}
                  </div>
                </div>
                <div className="mb-2 flex justify-between text-lg leading-8 text-theo-navy dark:text-theo-cyan">
                  <div>Unlock Date</div>
                  <div className="font-bold">
                    {format(new Date(purchase.expiry_ * 1000), 'yyyy-MM-dd')}
                  </div>{' '}
                </div>
                <DynamicText
                  height="40px"
                  value={
                    <div className="flex items-center justify-between  rounded-lg bg-[#e3e3e3] p-5 dark:bg-[#262626]">
                      <Icon name={'theo-sm'} className="w-10" />
                      <div className="text-2xl font-medium">{purchase.total}</div>
                    </div>
                  }
                />
                <button
                  className="border-button mb-3 mt-3 w-full"
                  onClick={() => {
                    openModal(<ConfirmClaim purchase={purchase} />);
                  }}
                >
                  Claim THEO
                </button>
              </>
            </Card>
          ))}
        </CardList>
      </PageContainer>
    </>
  );
};

Claim.PageHead = () => {
  return <div>Claim your THEO</div>;
};

export default Claim;
