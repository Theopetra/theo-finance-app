import PendingTransaction from '@/components/PendingTransaction';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { ArrowLeft, LockLaminated } from 'phosphor-react';
import { useAccount, useContractWrite, useSigner } from 'wagmi';
import { Membership } from '../membershipData';
import { useContractInfo } from '@/hooks/useContractInfo';
import { useMemo } from 'react';
import { MembershipDuration, MembershipType, MembershipAPY } from './SubscribeFormModal';
import { ConfirmRow } from '@/components/ConfirmationModalRow';
import { logEvent } from '@/lib/analytics';
import { parseUnits } from 'ethers/lib/utils';
import { useUserPurchases } from '@/pages/discount-buy/state/use-user-purchases';
import { cache } from '@/lib/cache';
import Failed from './Failed';
import Successful from './Successful';

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
  const { data: account } = useAccount();
  const { data: signer, isError, isLoading } = useSigner();
  const depositAmountFormatted = useMemo(() => parseUnits(depositAmount, 9), [depositAmount]);
  const [, { reRender }] = useUserPurchases();

  const { address: theopetraStakingAddress, abi: theopetraStakingABI } = useContractInfo(
    membership.contractName
  );

  const { address: theoAddress } = useContractInfo('TheopetraERC20Token');

  const stakeArgs = [account?.address, depositAmountFormatted, true];
  // STAKE
  const {
    data,
    isError: writeErr,
    isLoading: writeLoading,
    write: stake,
  } = useContractWrite(
    {
      addressOrName: theopetraStakingAddress,
      contractInterface: theopetraStakingABI,
      signerOrProvider: signer,
    },
    'stake',
    {
      async onSuccess(data) {
        const receipt = await data.wait();
        if (receipt.status === 1) {
          logEvent({ name: 'purchase_completed' });
          cache.clear();
          reRender();
          console.log('successs');
          openModal(
            <Successful txId={data.hash} membership={membership} depositAmount={depositAmount} />
          );
        } else {
          console.log('contract fail');
        }
      },
      onError(error) {
        openModal(<Failed error={error} membership={membership} depositAmount={depositAmount} />);
      },
      args: stakeArgs,
    }
  );
  // APPROVE
  const {
    data: approveData,
    isError: approveErr,
    isLoading: approveLoading,
    write: approve,
  } = useContractWrite(
    {
      addressOrName: theoAddress,
      contractInterface: [
        'function approve(address _spender, uint256 _value) public returns (bool success)',
      ],
      signerOrProvider: signer,
    },
    'approve',
    {
      async onSuccess(data) {
        const receipt = await data.wait();
        if (receipt.status === 1) {
          logEvent({ name: 'erc20_approved' });
          openModal(
            <PendingTransaction
              message="2 of 2 transactions..."
              secondaryMessage={`Submitting THEO transaction...`}
            />
          );

          stake();
        } else {
          openModal(
            <Failed
              error={{ code: 'Something went wrong.' }}
              membership={membership}
              depositAmount={depositAmount}
            />
          );
        }
      },
      onError(error) {
        openModal(<Failed error={error} membership={membership} depositAmount={depositAmount} />);
      },
      args: [theopetraStakingAddress, depositAmountFormatted],
    }
  );

  const handleClick = async () => {
    openModal(
      <PendingTransaction
        message="1 of 2 transactions..."
        secondaryMessage={`Approving THEO spend...`}
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
          <div
            className="text-center text-theo-navy dark:text-white"
            style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)' }}
          >
            <div className="text-3xl font-bold capitalize sm:text-4xl">
              {membership.type} Membership
            </div>
            You can unstake at any time, but won’t be eligible for ETH rebates.
          </div>
          <div>
            <LockLaminated color="#2F455C" size={50} />
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <MembershipType type={membership.type} />
          <MembershipCommitment value={depositAmount} />
          <MembershipAPY apy={membership.apy} value={depositAmount} />
          <MembershipDuration lockDuration={membership?.lockDurationInDays} />
        </div>
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
