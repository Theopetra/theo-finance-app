import { ConfirmRow } from '@/components/ConfirmationModalRow';
import PendingTransaction from '@/components/PendingTransaction';
import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';
import { useContractInfo } from '@/hooks/useContractInfo';
import { logEvent } from '@/lib/analytics';
import { cache } from '@/lib/cache';
import Failed from './Failed';
import Successful from './Successful';
import { useUserPurchases } from '@/pages/discount-buy/state/use-user-purchases';

import useModal from '@/state/ui/theme/hooks/use-modal';
import { format } from 'date-fns';
import { ArrowLeft } from 'phosphor-react';
import { useAccount, useContractWrite, useSigner } from 'wagmi';

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
  return <ConfirmRow title="Purchase Date" value={format(new Date(date * 1000), 'yyyy-MM-dd')} />;
};

export const TokensToClaimRow = ({ total }) => {
  return <ConfirmRow title="$THEO claimed" value={total} />;
};
export const TokensUnlockedRow = ({ date }) => {
  return <ConfirmRow title="Tokens Unlocked" value={format(new Date(date * 1000), 'yyyy-MM-dd')} />;
};

const ConfirmClaim = ({ purchase }) => {
  const [, { openModal, closeModal }] = useModal();
  const { data: account } = useAccount();
  const [, { reRender }] = useUserPurchases();

  const { address: activeContract, abi: activeContractABI } = useContractInfo(
    purchase.contractName
  );

  const { data: signer } = useSigner();
  const claimArgs = [account?.address, [purchase.index]];
  // CLAIM
  const {
    data,
    isError: writeErr,
    isLoading: writeLoading,
    write: redeem,
  } = useContractWrite(
    {
      addressOrName: activeContract,
      contractInterface: activeContractABI,
      signerOrProvider: signer,
    },
    'redeem',
    {
      async onSuccess(data) {
        const receipt = await data.wait();
        if (receipt.status === 1) {
          logEvent({ name: 'redeem_completed' });
          cache.clear();
          reRender();
          openModal(<Successful txId={data.hash} purchase={purchase} />);
        } else {
          console.log('contract fail');
        }
      },
      onError(error) {
        console.log(error);
        openModal(<Failed error={error} purchase={purchase} />);
      },
      args: claimArgs,
    }
  );

  const handleClick = async () => {
    openModal(
      <PendingTransaction message="1 of 1 transactions..." secondaryMessage={`Claiming $THEO...`} />
    );
    redeem();
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
