import Card from '@/components/Card';
import Icon from '@/components/Icons';
import DiscountBuyForm from '@/pages/discount-buy/components/DiscountBuyForm';
import useBuyForm from '@/pages/discount-buy/state/use-buy-form';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { utils } from 'ethers';

const MarketCard = ({ bondMarkets }) => {
  const [{}, { openModal }] = useModal();
  const [{}, { setSelection }] = useBuyForm();

  return (
    <>
      <Card
        className={`${
          bondMarkets.highlight ? 'drop-shadow-[6px_6px_6px_rgba(80,174,203,0.75)]' : ''
        }`}
        darkModeBgColor="bg-black dark:bg-none"
        headerClasses="bg-theo-navy text-white dark:bg-theo-dark-navy"
        title={
          <div className="flex items-center pr-2">
            <div className="font- mr-2 text-2xl font-extrabold">{bondMarkets.header}-Month</div>
          </div>
        }
        headerRightComponent={<Icon name="lock-laminated" className="w-8" />}
      >
        <div className="flex flex-1 flex-col justify-between">
          <div className="mb-8 flex-1 space-y-4">
            <div className="flex justify-between text-lg text-theo-navy dark:text-theo-cyan">
              <div>Asset</div>
              <div>Price / THEO</div>
            </div>
            {bondMarkets.markets?.map((market, i) => (
              <div
                key={i}
                className="flex justify-between rounded-lg bg-[#e3e3e3] p-5 dark:bg-[#262626]"
              >
                <div>Logo</div>
                <div className="text-xl">{utils.formatUnits(bondMarkets.bigNumberPrice, 2)}</div>
              </div>
            ))}
          </div>
          <button
            className="border-button mb-3 w-full"
            onClick={() => {
              setSelection(bondMarkets);
              openModal(<DiscountBuyForm />);
            }}
          >
            Buy THEO
          </button>

          <div className="text-center  text-xs dark:text-[#ffffffb3]">
            Important: New buys are auto-locked until completion of the term
          </div>
        </div>
      </Card>
    </>
  );
};

export default MarketCard;
