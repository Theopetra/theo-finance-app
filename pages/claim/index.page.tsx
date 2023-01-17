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
import { useUserPurchases } from '../discount-buy/state/use-user-purchases';
import { formatTheo } from '@/lib/format_theo';
import { useMemo } from 'react';
import { BigNumber } from 'ethers';

const Claim = () => {
  const [{ purchases }] = useUserPurchases();
  const formattedPurchases = useMemo(
    () =>
      purchases?.map((p) => {
        return {
          ...p,
          date: new Date(p.created_),
          amount: `${formatTheo(p.payout_)}`,
          discount: 0,
          unlockDate: new Date(p.expiry_),
          index: BigNumber.from(p.index).toNumber(),
        };
      }),
    [purchases]
  );
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
          {formattedPurchases.map((purchase) => (
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
                  <div className="font-bold">{purchase.discount}</div>
                </div>
                <div className="flex justify-between text-lg leading-8 text-theo-navy dark:text-theo-cyan">
                  <div>Purchased</div>
                  <div className="font-bold">
                    {format(new Date(purchase.date * 1000), 'yyyy-MM-dd')}
                  </div>
                </div>
                <div className="mb-2 flex justify-between text-lg leading-8 text-theo-navy dark:text-theo-cyan">
                  <div>Unlock Date</div>
                  <div className="font-bold">
                    {format(new Date(purchase.unlockDate * 1000), 'yyyy-MM-dd')}
                  </div>{' '}
                </div>
                <DynamicText
                  height="40px"
                  value={
                    <div className="flex items-center justify-between  rounded-lg bg-[#e3e3e3] p-5 dark:bg-[#262626]">
                      <Icon name={'theo-sm'} className="w-10" />
                      <div className="text-2xl font-medium">{purchase.amount}</div>
                    </div>
                  }
                />
                <button
                  className="border-button mb-3 mt-3 w-full disabled:cursor-not-allowed disabled:opacity-50 "
                  disabled={!purchase.matured_}
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
