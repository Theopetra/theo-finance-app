import Icon from '@/components/Icons';
import useModal from '@/state/ui/theme/hooks/use-modal';
import useBuyForm from '../state/use-buy-form';
import DiscountBuyForm from './DiscountBuyForm';

const ConfirmBuy = () => {
  const [, { openModal }] = useModal();
  const [{ purchasePrice }] = useBuyForm();
  return (
    <div>
      {purchasePrice}
      {/* fauxModalHeader w/ back button, icon and title ? */}
      <div className="flex justify-between">
        <div>
          <button onClick={() => openModal(<DiscountBuyForm />)} className="text-theo-cyan">
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
      <div className="flex w-full items-center">
        <div className="w-1/2">
          <button className="border-button w-full">Confirm Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBuy;
