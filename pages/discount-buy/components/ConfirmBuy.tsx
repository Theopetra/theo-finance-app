import Icon from '@/components/Icons';
import useModal from '@/state/ui/theme/hooks/use-modal';
import useBuyForm from '../state/use-buy-form';
import DiscountBuyForm from './DiscountBuyForm';
import Failed from './Failed';

const ConfirmRow = ({ title, value, subtext = '' }) => {
  return (
    <div className="space-between flex items-center rounded-2xl bg-white bg-gradient-to-l from-[#EDEDED] to-[#ffffff] px-8 py-3 shadow">
      <div className="flex-1 text-xl text-theo-navy">{title}</div>
      <div className="text-right">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-theo-cyan">{subtext}</div>
      </div>
    </div>
  );
};

const ConfirmBuy = () => {
  const [, { openModal }] = useModal();
  const [{ purchasePrice, purchaseAmount, purchaseCurrency }] = useBuyForm();
  return (
    <div>
      {/* fauxModalHeader w/ back button, icon and title ? */}
      <div className="flex justify-between">
        <div>
          <button
            onClick={() => openModal(<DiscountBuyForm data={{}} />)}
            className="text-theo-cyan"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>
        <div
          className="mb-8 text-center text-theo-navy dark:text-white"
          style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="mb-4 text-4xl font-bold ">Confirm Buy</div>
          <div>Review carefully, this purchase is final</div>
        </div>
        <div>
          <Icon name="intersect" className="h-12 w-12" />
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <ConfirmRow
          title="Market Discount"
          value="4%"
          subtext={'Current market price = $34 USDC'}
        />
        <ConfirmRow
          title="THEO Purchase Price"
          value={`${purchasePrice} ${purchaseCurrency.name}`}
        />
        <ConfirmRow title="Purchase Amount" value={purchaseAmount} />
        <ConfirmRow title="Lock Duration" value="4%" subtext={'Tokens will unlock on'} />
        <ConfirmRow title="Offer Valid For" value="10:00" subtext={'18:14 pm EST'} />
      </div>
      <div className="flex w-full items-center justify-center">
        <button className="border-button w-60" onClick={() => openModal(<Failed />)}>
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default ConfirmBuy;
