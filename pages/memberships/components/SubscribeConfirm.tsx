import CurrencyInput from '@/components/CurrencyInput';
import PendingTransaction from '@/components/PendingTransaction';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { add, format } from 'date-fns';
import { ArrowLeft, LockLaminated } from 'phosphor-react';
import { useAccount, useBalance } from 'wagmi';
import { Membership } from '../membershipData';
import { useContractInfo } from '@/hooks/useContractInfo';
import { useState } from 'react';
import { formatTheo } from '@/lib/format_theo';
import { MembershipDuration, MembershipType, MembershipAPY } from './SubscribeFormModal';
import { ConfirmRow } from '@/components/ConfirmationModalRow';

export const MembershipCommitment = ({ value }) => {
  return <ConfirmRow title="Amount Staked" value={value} />;
};
const SubscribeConfirm = ({ membership }: { membership: Membership }) => {
  const [commitmentValue, setCommitmentValue] = useState(0);
  const [, { openModal, closeModal }] = useModal();
  const { data: account, isError: accountIsError, isLoading: accountIsLoading } = useAccount();
  const { address } = useContractInfo('TheopetraERC20Token');

  const {
    data: balance,
    isError: balanceIsError,
    isLoading: balanceIsLoading,
  } = useBalance({
    addressOrName: account?.address,
    formatUnits: 9,
    token: address,
  });

  const handleClick = async () => {
    openModal(<PendingTransaction message="Claiming..." secondaryMessage={`Approving claim...`} />);
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
            Review carefully, this staking is final
          </div>
          <div>
            <LockLaminated color="#2F455C" size={50} />
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <MembershipType type={membership.type} />
          <MembershipCommitment value={commitmentValue} />
          <MembershipAPY apy={`${membership.apy * 100}% THEO`} />
          <MembershipDuration lockDuration={membership?.lockDurationInDays} />
        </div>
        <div className="flex w-full items-center justify-center">
          <button className="border-button w-60" onClick={handleClick}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeConfirm;
