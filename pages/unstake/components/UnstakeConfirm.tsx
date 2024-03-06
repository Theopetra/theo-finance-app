import PendingTransaction from '@/components/PendingTransaction';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { ArrowLeft, LockLaminated } from 'phosphor-react';
import { useContractWrite } from 'wagmi';
import { ConfirmRow } from '@/components/ConfirmationModalRow';
import { useUserPurchases } from '@/pages/market-cards/state/use-user-purchases';
import { cache } from '@/lib/cache';
import SuccessfulTransaction from '@/components/SuccessfulTransaction';
import FailedTransaction from '@/components/FailedTransaction';
import { formatTheo } from '@/lib/format_theo';
import { useState } from 'react';
import { Abi } from 'viem';

export const MembershipCommitment = ({ value }) => {
  return <ConfirmRow title="$THEO to stake" value={value} />;
};
const UnstakeConfirm = ({
  purchase,
  penalty,
  theoAddress,
  theoAbi,
  unstakeArgs,
  amount,
  stakingContractAddress,
  stakingContractAbi,
}: {
  purchase: any;
  penalty: any;
  theoAddress: any;
  theoAbi: any;
  unstakeArgs: any;
  amount: any;
  stakingContractAddress: any;
  stakingContractAbi: any;
}) => {
  const [, { openModal, closeModal }] = useModal();
  const [, { reRender }] = useUserPurchases();
  const [showInstructions, setShowInstructions] = useState(false);
  // APPROVE
  const {
    data: approveData,
    isLoading: approvalLoading,
    write: approve,
  } = useContractWrite({
    address: theoAddress,
    abi: theoAbi as Abi,
    functionName: 'approve',
    onSuccess: async (data) => {
      if (data.hash) {
        openModal(
          <PendingTransaction
            message="2 of 2 transactions..."
            secondaryMessage={`Submitting $THEO transaction...`}
          />
        );
        unstake();
      } else {
        console.log('failed', data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
    args: [stakingContractAddress, amount],
  });

  // unstake
  const { write: unstake, isLoading: unstakeLoading } = useContractWrite({
    address: stakingContractAddress,
    abi: stakingContractAbi as Abi,
    functionName: 'unstake',
    onSuccess: async (data) => {
      if (data.hash) {
        openModal(
          <SuccessfulTransaction
            Icon={LockLaminated}
            title={'Unstake Successful'}
            txId={data.hash}
          />
        );
        cache.clear();
        reRender();
      }
    },
    onError: (error) => {
      openModal(<FailedTransaction Icon={LockLaminated} error={error} />);
      console.log('error', error);
    },
    args: unstakeArgs,
  });

  const handleConfirmUnstake = async () => {
    openModal(
      <PendingTransaction
        message="1 of 2 transactions..."
        secondaryMessage={`Approving $THEO spend...`}
      />
    );
    approve();
  };

  const confirmContent = (
    <>
      {' '}
      <div className="mb-4 flex flex-col gap-2">
        {purchase.contractName !== 'TheopetraStaking' && (
          <div className=" mx-auto mb-4 flex max-w-2xl flex-col gap-4 text-xl">
            <p>
              Staking is being phased out as part of the tokenomics upgrade, so all unstaking
              penalties have been removed.
            </p>
            <p>
              Thank you for staking for the first two rebates! Be sure to check back soon for more
              updates!
            </p>
            <div className="text-center text-2xl font-bold">
              -0 $THEO
              {/* -{penalty ? formatTheo(BigInt(penalty)) : 0} $THEO */}
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-center">
        <button className="border-button w-60" onClick={handleConfirmUnstake}>
          Confirm Unstake
        </button>
      </div>
    </>
  );

  const instructionContent = (
    <div className="flex flex-col items-center justify-center sm:flex-row">
      <div>
        <div className="relative mr-6 w-1/2 overflow-hidden rounded-2xl bg-theo-light p-6 shadow-md sm:w-auto">
          <img
            src="/assets/images/instruction-ex.png"
            alt="instructions"
            className=" w-full max-w-[250px] overflow-hidden rounded-2xl"
          />
        </div>
      </div>
      <div>
        <p className="mb-4 text-xl font-bold">To Unstake:</p>
        <p className="mb-4 text-lg">
          Click the <span className="font-bold text-red-500">&apos;Use default&apos;</span> button
          or your transaction will not be approved.
        </p>
        <button className="border-button button-primary w-60" onClick={handleConfirmUnstake}>
          Continue with Unstake
        </button>
      </div>
    </div>
  );
  return (
    <div>
      <div className="flex flex-col">
        <div className="mb-12 flex items-center justify-between">
          <button onClick={closeModal} className="cursor-pointer">
            <ArrowLeft color="rgb(80, 174, 203)" size={50} />
          </button>
          <div className="text-center text-theo-navy dark:text-white">
            <div
              className="text-3xl font-bold capitalize sm:text-4xl"
              style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)' }}
            >
              {purchase.contractName === 'TheopetraStaking' ? 'Standard' : 'Premium'} Membership
            </div>
          </div>
          <div>
            {purchase.contractName !== 'TheopetraStaking' && (
              <LockLaminated color="#2F455C" size={50} />
            )}{' '}
          </div>
        </div>

        {showInstructions ? instructionContent : confirmContent}
      </div>
    </div>
  );
};

export default UnstakeConfirm;
