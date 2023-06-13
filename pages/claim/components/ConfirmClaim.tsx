import { ConfirmRow } from '@/components/ConfirmationModalRow';
import PendingTransaction from '@/components/PendingTransaction';
import { useContractInfo } from '@/hooks/useContractInfo';
import { logEvent } from '@/lib/analytics';
import { cache } from '@/lib/cache';
import { useUserPurchases } from '@/pages/discount-buy/state/use-user-purchases';

import useModal from '@/state/ui/theme/hooks/use-modal';
import { format } from 'date-fns';
import { ArrowLeft, Intersect } from 'phosphor-react';
import { useContractWrite, useWalletClient } from 'wagmi';
import FailedTransaction from '@/components/FailedTransaction';
import SuccessfulTransaction from '@/components/SuccessfulTransaction';
import { Abi } from 'viem';
import { getAccount } from '@wagmi/core';

export const MarketDiscountRow = () => {
  return <ConfirmRow title="Purchase Type" value={'Pre-Market'} />;
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
  const account = getAccount();
  const [, { reRender }] = useUserPurchases();

  const { address: activeContract, abi: activeContractABI } = useContractInfo(
    purchase.contractName
  );

  const { data: walletClient } = useWalletClient();
  const claimArgs = [account?.address, [purchase.index]];

  const dataRows = (
    <>
      <MarketDiscountRow />
      <TheoPurchaseDateRow date={purchase.date} />
      <TokensToClaimRow total={purchase.amount} />
      <TokensUnlockedRow date={purchase.unlockDate} />
    </>
  );
  const {
    data,
    isError: writeErr,
    isLoading: writeLoading,
    write: redeem,
  } = useContractWrite({
    address: activeContract,
    abi: activeContractABI as Abi,
    functionName: 'redeem',
    onSuccess: async (data) => {
      if (data.hash) {
        logEvent({ name: 'redeem_completed' });
        cache.clear();
        reRender();
        openModal(
          <SuccessfulTransaction
            txId={data.hash}
            title="Claim Successful!"
            redirect="/claim"
            Icon={Intersect}
            content={dataRows}
          />
        );
      } else {
        console.log('contract fail');
      }
    },
    onError: (error) => {
      console.log(error);
      openModal(
        <FailedTransaction
          Icon={Intersect}
          onRetry={() => {
            openModal(<ConfirmClaim purchase={purchase} />);
          }}
          error={error}
          content={dataRows}
        />
      );
    },
    args: claimArgs,
  });

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
        <div className="mb-4 flex flex-col gap-2">{dataRows}</div>
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
