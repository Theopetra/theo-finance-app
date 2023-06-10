import PendingTransaction from '@/components/PendingTransaction';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { ArrowLeft, LockLaminated } from 'phosphor-react';
import { useContractWrite, useSigner } from 'wagmi';
import { ConfirmRow } from '@/components/ConfirmationModalRow';
import { useUserPurchases } from '@/pages/discount-buy/state/use-user-purchases';
import { cache } from '@/lib/cache';
import SuccessfulTransaction from '@/components/SuccessfulTransaction';
import FailedTransaction from '@/components/FailedTransaction';
import { formatTheo } from '@/lib/format_theo';
import { BigNumber } from 'ethers';
import { useState } from 'react';
import Image from 'next/image';

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
  const { data: signer } = useSigner();
  const [, { reRender }] = useUserPurchases();
  const [showInstructions, setShowInstructions] = useState(false);
  // APPROVE
  const {
    data: approveData,
    isLoading: approvalLoading,
    write: approve,
  } = useContractWrite(
    {
      address: theoAddress,
      contractInterface: theoAbi,
      signerOrProvider: signer,
    },
    'approve',
    {
      async onSuccess(data) {
        const receipt = await data.wait();
        if (receipt.status === 1) {
          openModal(
            <PendingTransaction
              message="2 of 2 transactions..."
              secondaryMessage={`Submitting $THEO transaction...`}
            />
          );
          unstake();
        } else {
          console.log('failed', receipt);
        }
      },
      onError(error) {
        console.log('failed 22', error);
      },
      args: [stakingContractAddress, amount],
    }
  );

  // unstake
  const { write: unstake, isLoading: unstakeLoading } = useContractWrite(
    {
      address: stakingContractAddress,
      contractInterface: stakingContractAbi,
      signerOrProvider: signer,
    },
    'unstake',
    {
      async onSuccess(data) {
        const receipt = await data.wait();
        if (receipt.status === 1) {
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
      onError(error) {
        openModal(<FailedTransaction Icon={LockLaminated} error={error} />);
        console.log('error', error);
      },
      args: unstakeArgs,
    }
  );

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
            <p>Premium stakes are locked for 1 year from the date of staking. </p>
            <p>
              Premature unstaking—that is, unstaking before the 1-year lock period expires—will
              incur a slashing penalty.
            </p>
            <p>
              These penalties are in the form of $THEO principal and $THEO rebate slashing. This
              slashing penalty is present to incentivize long-term behavior for Premium members.
            </p>
            <div className="text-center text-2xl font-bold">
              -{penalty ? formatTheo(BigNumber.from(penalty).toString()) : 0} $THEO
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-center">
        <button className="border-button w-60" onClick={() => setShowInstructions(true)}>
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
