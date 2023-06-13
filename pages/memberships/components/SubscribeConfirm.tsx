import PendingTransaction from '@/components/PendingTransaction';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { ArrowLeft, LockLaminated } from 'phosphor-react';
import { useContractWrite } from 'wagmi';
import { Membership } from '../membershipData';
import { useContractInfo } from '@/hooks/useContractInfo';
import { useMemo } from 'react';
import { MembershipDuration, MembershipType, MembershipAPY } from './SubscribeFormModal';
import { ConfirmRow } from '@/components/ConfirmationModalRow';
import { logEvent } from '@/lib/analytics';
import { parseUnits } from 'ethers/lib/utils';
import { useUserPurchases } from '@/pages/discount-buy/state/use-user-purchases';
import { cache } from '@/lib/cache';
import SuccessfulTransaction from '@/components/SuccessfulTransaction';
import FailedTransaction from '@/components/FailedTransaction';
import { getAccount } from '@wagmi/core';
import { Abi } from 'viem';

export const MembershipCommitment = ({ value }) => {
  return <ConfirmRow title="$THEO to stake" value={value} />;
};
const SubscribeConfirm = ({
  membership,
  depositAmount,
}: {
  membership: Membership;
  depositAmount: string;
}) => {
  const [, { openModal, closeModal }] = useModal();
  const account = getAccount();
  // const { data: signer, isError, isLoading } = useSigner();
  const depositAmountFormatted = useMemo(() => parseUnits(depositAmount, 9), [depositAmount]);
  const [, { reRender }] = useUserPurchases();

  const { address: theopetraStakingAddress, abi: theopetraStakingABI } = useContractInfo(
    membership.contractName
  );
  const dataRows = (
    <>
      <MembershipType type={membership.type} />
      <MembershipCommitment value={depositAmount} />
      <MembershipAPY apy={membership.apy} value={depositAmount} />
      <MembershipDuration lockDuration={membership?.lockDurationInDays} />
    </>
  );
  const { address: theoAddress, abi: theoAbi } = useContractInfo('TheopetraERC20Token');
  const FailedModal = ({ error }: { error?: any }) => (
    <FailedTransaction
      Icon={LockLaminated}
      onRetry={() => {
        openModal(<SubscribeConfirm depositAmount={depositAmount} membership={membership} />);
      }}
      error={{ code: error?.code ?? 'Something went wrong.' }}
      content={dataRows}
    />
  );
  const stakeArgs = [account?.address, depositAmountFormatted, true];
  // STAKE
  const {
    data,
    isError: writeErr,
    isLoading: writeLoading,
    write: stake,
  } = useContractWrite({
    address: theopetraStakingAddress,
    abi: theopetraStakingABI as Abi,
    // signerOrProvider: signer,
    functionName: 'stake',
    onSuccess: (data) => {
      // const receipt = await data.wait();
      // if (receipt.status === 1) {
      if (data) {
        logEvent({ name: 'purchase_completed' });
        cache.clear();
        reRender();
        openModal(
          <SuccessfulTransaction
            txId={data.hash}
            redirect={`/memberships/your-memberships`}
            title={'Membership Successful!'}
            Icon={LockLaminated}
            content={dataRows}
          />
        );
      } else {
        console.log('contract fail');
      }
    },
    onError(error) {
      console.log(JSON.stringify(error));

      openModal(<FailedModal />);
    },
    args: stakeArgs,
  });
  // APPROVE
  const {
    data: approveData,
    isError: approveErr,
    isLoading: approveLoading,
    writeAsync: approve,
    isSuccess: addSuccess,
  } = useContractWrite({
    address: theoAddress,
    abi: theoAbi as Abi,

    functionName: 'approve',
    onSuccess: async (data) => {
      if (data.hash) {
        logEvent({ name: 'erc20_approved' });
        openModal(
          <PendingTransaction
            message="2 of 2 transactions..."
            secondaryMessage={`Submitting $THEO transaction...`}
          />
        );

        stake();
      } else {
        openModal(<FailedModal />);
      }
    },
    onError(error) {
      openModal(<FailedModal error={error} />);
    },
    args: [theopetraStakingAddress, depositAmountFormatted],
  });

  const handleClick = async () => {
    openModal(
      <PendingTransaction
        message="1 of 2 transactions..."
        secondaryMessage={
          <>
            Approving {depositAmount} $THEO spend...{' '}
            <div className="text-sm">Make sure to approve exact amount.</div>
          </>
        }
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
              {membership.type} Membership
            </div>
            You can unstake at any time, but won&apos;t be eligible for ETH rebates.
            {membership.type === 'premium' && (
              <>
                <br /> Slashing penalties apply if unstaked early.
              </>
            )}
          </div>
          <div>{membership.type === 'premium' && <LockLaminated color="#2F455C" size={50} />}</div>
        </div>
        <div className="mb-4 flex flex-col gap-2">{dataRows}</div>
        <div className="flex w-full items-center justify-center">
          <button className="border-button w-60" onClick={handleClick}>
            Confirm Membership
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeConfirm;
