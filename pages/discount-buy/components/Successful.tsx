import Icon from '@/components/Icons';
import useBuyForm from '../state/use-buy-form';
import { ConfirmRow } from './ConfirmBuy';

const Successfull = () => {
  const [{ purchasePrice, purchaseAmount, purchaseCurrency, selection }] = useBuyForm();
  return (
    <div>
      {/* fauxModalHeader w/ back button, icon and title ? */}
      <div className="flex justify-between">
        <div className="w-16"></div>

        <div
          className="mb-8 text-center text-theo-navy dark:text-white"
          style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="mb-4 text-4xl font-bold ">Buy Successfull!</div>
        </div>
        <div>
          <Icon name="intersect" className="h-12 w-12 dark:text-white" />
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <ConfirmRow
          title="Market Discount"
          value={selection.discount.value}
          subtext={'Current market price = $34 USDC'}
        />
        <ConfirmRow
          title="THEO Purchase Price"
          value={`${purchasePrice} ${purchaseCurrency.name}`}
        />
        <ConfirmRow title="Amount Purchased" value={purchaseAmount} />
        <ConfirmRow
          title="Lock Duration"
          value={selection.lockDuration.value}
          subtext={'Tokens will unlock on'}
        />
      </div>
      <div className="flex w-full items-center justify-center">
        <button className="border-button w-72">View Etherscan Transaction</button>
      </div>
    </div>
  );
};

export default Successfull;
