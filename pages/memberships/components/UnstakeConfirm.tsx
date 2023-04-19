import PendingTransaction from '@/components/PendingTransaction';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { ArrowLeft, LockLaminated } from 'phosphor-react';
import { useContractWrite, useSigner } from 'wagmi';
import { ConfirmRow } from '@/components/ConfirmationModalRow';
import { useUserPurchases } from '@/pages/discount-buy/state/use-user-purchases';
import { cache } from '@/lib/cache';
import SuccessfulTransaction from '@/components/SuccessfulTransaction';
import FailedTransaction from '@/components/FailedTransaction';

export const MembershipCommitment = ({ value }) => {
  return <ConfirmRow title="$THEO to stake" value={value} />;
};
const UnstakeConfirm = ({
  purchase,
  theoAddress,
  theoAbi,
  unstakeArgs,
  amount,
  stakingContractAddress,
  stakingContractAbi,
}: {
  purchase: any;
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

  // APPROVE
  const {
    data: approveData,
    isLoading: approvalLoading,
    write: approve,
  } = useContractWrite(
    {
      addressOrName: theoAddress,
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
      addressOrName: stakingContractAddress,
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

  const handleClick = async () => {
    openModal(
      <PendingTransaction
        message="1 of 2 transactions..."
        secondaryMessage={`Approving $THEO spend...`}
      />
    );
    approve();
  };

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
              {/* {purchase.contractName === 'TheopetraStaking' ? 'Standard' : 'Premium'} */}
              Membership
            </div>
            Premium stakes are locked for 1 year from the date of staking. Premature unstaking—that
            is, unstaking before the 1-year lock period expires—will incur a slashing penalty. These
            penalties are in the form of $THEO principal and $THEO rebate slashing. This slashing
            penalty is present to incentivize long-term behavior for Premium members.
          </div>
          <div>
            <LockLaminated color="#2F455C" size={50} />
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-2">{/* // todo: add the rest of the rows */}</div>
        <div className="flex w-full items-center justify-center">
          <button className="border-button w-60" onClick={handleClick}>
            Confirm Unstake
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnstakeConfirm;
