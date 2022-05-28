import Icon from '@/components/Icons';
import useModal from '@/state/ui/theme/hooks/use-modal';
import useBuyForm from '../state/use-buy-form';
import { ConfirmRow, LockDurationRow, MarketDiscountRow, TheoPurchasePriceRow } from './ConfirmBuy';

const Successfull = () => {
  const [, { closeModal }] = useModal();
  const [{ purchaseAmount }] = useBuyForm();
  return (
    <div>
      <div className="flex justify-between">
        <div className="hidden w-16 sm:block"></div>

        <div
          className="mb-8 w-full text-center text-theo-navy dark:text-white"
          style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="mb-4 text-3xl font-bold sm:text-4xl">Buy Successfull!</div>
        </div>
        <div className=" hidden sm:block">
          <Icon name="intersect" className=" w-12 dark:text-white" />
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <MarketDiscountRow />
        <TheoPurchasePriceRow />
        <ConfirmRow title="Amount Purchased" value={purchaseAmount} />
        <LockDurationRow />
      </div>
      <div className="flex w-full flex-col items-center justify-center sm:flex-row">
        <button className="border-button mr-2 mb-4 w-72 sm:mb-0">View Etherscan Transaction</button>
        <button className="border-button w-72" onClick={closeModal}>
          Finish
        </button>
      </div>
    </div>
  );
};

export default Successfull;
