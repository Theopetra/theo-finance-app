import Icon from '@/components/Icons';
import useModal from '@/state/ui/theme/hooks/use-modal';
import ConfirmBuy, {
  LockDurationRow,
  MarketDiscountRow,
  PurchaseAmountRow,
  TheoPurchasePriceRow,
} from './ConfirmBuy';

const Failed = ({ error }) => {
  const [, { openModal }] = useModal();
  let errorMsg;

  // this is some rudimentary error mapping, we can make this richer if desired
  if (error?.code === 'UNPREDICTABLE_GAS_LIMIT') {
    if (error?.reason.includes('signature')) {
      errorMsg = 'Your current wallet is not on the whitelist. Come back soon!';
    } else {
      errorMsg = error.reason;
    }
  } else {
    errorMsg = error.message || error.code;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between ">
        <button onClick={() => openModal(<ConfirmBuy />)} className="text-theo-cyan">
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
        <div
          className="text-center text-theo-navy dark:text-white"
          style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="mb-4 text-3xl font-bold sm:text-4xl">
            Buy Failed...
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block w-8 text-theo-cyan sm:w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text">Reason: {errorMsg}</div>
        </div>
        <div>
          <Icon name="intersect" className="h-12 w-12 dark:text-white" />
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <MarketDiscountRow />
        <TheoPurchasePriceRow />
        <PurchaseAmountRow />
        <LockDurationRow />
      </div>
      <div className="flex w-full items-center justify-center">
        <button className="border-button w-60" onClick={() => openModal(<ConfirmBuy />)}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Failed;
