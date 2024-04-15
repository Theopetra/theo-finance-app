import { useEtherscanTxId } from '@/hooks/useEtherscanTxId';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { getWalletClient } from '@wagmi/core'

const SuccessfulTransaction = ({
  txId,
  redirect,
  Icon,
  title,
  content,
}: {
  txId: string;
  redirect?: string;
  Icon: any;
  title: string;
  content?: ReactElement;
}) => {
  const etherscanUrl = useEtherscanTxId(txId);
  const router = useRouter();
  const [, { closeModal }] = useModal();

  const handleClick = () => {
    closeModal();

    if (redirect) {
      router.push(redirect);
    }
  };

  const addTheoToken = async () => {
    const walletClient = await getWalletClient()
    try {
      const success = await walletClient?.watchAsset({ 
        type: 'ERC20',
        options: {
          address: '0xfac0403a24229d7e2edd994d50f5940624cbeac2',
          decimals: 9,
          symbol: 'THEO',
        },
      })
      return success;
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="hidden w-16 sm:block"></div>

        <div
          className="mb-8 w-full text-center text-theo-navy dark:text-white"
          style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="mb-4 text-3xl font-bold sm:text-4xl">{title}</div>
        </div>
        <div className=" hidden sm:block">
          {/* Prop */}
          <Icon size={50} className=" w-12 dark:text-white" />
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-2">{content}</div>
      <div className="flex w-full flex-col items-center justify-center sm:flex-row">
        <button disabled={!txId} className="border-button mr-2 mb-4 w-72 sm:mb-0">
          <a href={etherscanUrl} target="_blank" rel="noreferrer">
            View Etherscan transaction
          </a>
        </button>
        <button className="border-button mr-2 mb-4 w-72 sm:mb-0" onClick={addTheoToken}>
          Import $THEO to wallet
        </button>
        <button className="border-button mr-2 mb-4 w-72 sm:mb-0" onClick={handleClick}>
            Make another purchase
        </button>
      </div>
    </div>
  );
};

export default SuccessfulTransaction;
