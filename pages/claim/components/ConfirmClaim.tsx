import { ConfirmRow } from '@/components/ConfirmationModalRow';
import PendingTransaction from '@/components/PendingTransaction';
import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';

import useModal from '@/state/ui/theme/hooks/use-modal';
import { add, format } from 'date-fns';
import { ArrowLeft, DownloadSimple } from 'phosphor-react';

export const MarketDiscountRow = () => {
  const { activeContractName } = useActiveBondDepo();

  return (
    <ConfirmRow
      title="Purchase Type"
      value={activeContractName === 'WhitelistTheopetraBondDepository' ? 'Whitelist' : 'Pre-Market'}
      subtext={activeContractName === 'WhitelistTheopetraBondDepository' ? '24-Hour Event' : ''}
    />
  );
};
export const TheoPurchaseDateRow = ({ date }) => {
  return <ConfirmRow title="Purchase Date" value={format(new Date(date), 'yyyy-MM-dd')} />;
};

export const TokensToClaimRow = ({ total }) => {
  return <ConfirmRow title="Tokens to Claim" value={total} />;
};
export const TokensUnlockedRow = ({ date }) => {
  return <ConfirmRow title="Tokens Unlocked" value={format(new Date(date), 'yyyy-MM-dd')} />;
};

const ConfirmClaim = ({ purchase }) => {
  const [, { openModal, closeModal }] = useModal();

  const handleClick = async () => {
    // logEvent({ name: 'purchase_claimed' });
    openModal(<PendingTransaction message="Claiming..." secondaryMessage={`Approving claim...`} />);
    // TODO: use useContractWrite to call the claim function on the contract
    // claim function will handle the success and failure modals
    // claim();
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="mb-12 flex items-center justify-between">
          <button onClick={closeModal} className="cursor-pointer">
            <ArrowLeft color="rgb(80, 174, 203)" size={50} />
          </button>
          <div
            className="text-center text-theo-navy dark:text-white"
            style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)' }}
          >
            <div className="text-3xl font-bold sm:text-4xl">Confirm Claim</div>
          </div>
          <div></div>
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <MarketDiscountRow />
          <TheoPurchaseDateRow date={purchase.date} />
          <TokensToClaimRow total={purchase.amount} />
          <TokensUnlockedRow date={purchase.unlockDate} />
        </div>
        <div className="flex w-full items-center justify-center">
          <button className="border-button w-60" onClick={handleClick}>
            Confirm Claim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmClaim;
