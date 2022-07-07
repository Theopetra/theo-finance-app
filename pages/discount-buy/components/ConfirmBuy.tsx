import Icon from '@/components/Icons';
import { WhitelistTokenPrice } from '@/components/TokenPrice';
import { useContractInfo } from '@/hooks/useContractInfo';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { add, format } from 'date-fns';
import { ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { useAccount, useContract, useContractWrite, useProvider, useSigner } from 'wagmi';
import useBuyForm from '../state/use-buy-form';
import DiscountBuyForm from './DiscountBuyForm';
import Failed from './Failed';
import Successfull from './Successful';
import wethHelperSignedMessages from '@/artifacts/signed-messages/weth-helper-signed-messages';
import wlBondDepoSignedMessages from '@/artifacts/signed-messages/wl-bonddepo-signed-messages';
import { useMemo } from 'react';
import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';

export const Price = () => {
  const [{ selectedMarket, purchaseToken, purchaseCost }] = useBuyForm();

  return (
    <>
      <WhitelistTokenPrice
        marketId={selectedMarket.id}
        quoteToken={selectedMarket.marketData.quoteToken}
      />{' '}
      {purchaseToken?.symbol}
    </>
  );
};
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

export const PurchaseAmountRow = () => {
  const [{ purchaseAmount, purchaseCost }] = useBuyForm();

  return <ConfirmRow title="Purchase Amount" value={purchaseAmount} subtext={purchaseCost} />;
};

export const TheoPurchasePriceRow = () => {
  const [{ purchaseToken }] = useBuyForm();
  return <ConfirmRow title="THEO Purchase Price" value={<Price />} />;
};

export const LockDurationRow = () => {
  const [{ bondMarkets }] = useBuyForm();
  return (
    <ConfirmRow
      title="Lock Duration"
      value={`${bondMarkets?.header} Months`}
      subtext={`Tokens will unlock on ${format(
        add(new Date(), { months: bondMarkets?.header }),
        'MM-dd-yy'
      )}`}
    />
  );
};

export const ConfirmRow: React.FC<{ title?; value?; subtext? }> = ({ title, value, subtext }) => {
  return (
    <div className="space-between flex items-center rounded-2xl bg-white bg-gradient-to-l from-[#EDEDED] to-[#ffffff] p-4 py-3 shadow dark:from-[#000000] dark:to-[#262626] sm:px-8">
      <div className="flex-1 text-lg text-theo-navy dark:text-white sm:text-xl">{title}</div>
      <div className="text-right">
        <div className="text-lg font-bold dark:text-theo-cyan sm:text-2xl">{value}</div>
        <div className="text-xs text-theo-cyan dark:text-white sm:text-sm">{subtext}</div>
      </div>
    </div>
  );
};

const ConfirmBuy = () => {
  const [, { openModal }] = useModal();
  const [{ selectedMarket, purchaseToken, purchaseCost }] = useBuyForm();
  const { address } = useActiveBondDepo();

  // const provider = useProvider();
  const { data: wallet } = useAccount();
  const { address: activeBondDepoAddress, abi: activeBondDepoAbi } = useActiveBondDepo();
  const { address: WethHelperAddress, abi: WethHelperAbi } = useContractInfo('WethHelper');
  const { data: signer, isError, isLoading } = useSigner();

  // autostake
  const signature: any = useMemo(() => {
    if (purchaseToken?.symbol === 'weth') {
      return wethHelperSignedMessages.find((sig) => {
        return sig.address.toLowerCase() === wallet?.address?.toLowerCase();
      });
    }
    return wlBondDepoSignedMessages.find((sig) => {
      return sig.address.toLowerCase() === wallet?.address?.toLowerCase();
    });
  }, [wallet, purchaseToken?.symbol]);

  //Bond depo target for the WethHelper contract
  let isWhitelist = false;
    const { activeContractName } = useActiveBondDepo() 
      if ( activeContractName == "WhitelistTheopetraBondDepository" )
        isWhitelist = true;

  const maxPrice = parseEther('25');
  const depositAmount = parseEther(purchaseCost);

  const args = [
    selectedMarket.id,
    depositAmount._hex,
    maxPrice._hex,
    wallet?.address,
    wallet?.address,
    signature?.wlDepoSignature,
  ];

  const WethArgs = [
    selectedMarket.id,
    depositAmount._hex,
    maxPrice._hex,
    wallet?.address,
    wallet?.address,
    isWhitelist, 
    signature?.wlDepoSignature,
  ];

  const {
    data,
    isError: writeErr,
    isLoading: writeLoading,
    write: deposit,
  } = useContractWrite(
    {
      addressOrName: activeBondDepoAddress,
      contractInterface: activeBondDepoAbi,
      signerOrProvider: signer,
    },
    'deposit',
    {
      onSettled() {
        openModal(<Successfull />);
      },
      onError(error) {
        console.log('Error', error);
        openModal(<Failed error={error} />);
      },
      args,
    }
  );

  //wETH Helper Deposit Function
  //TODO: Add toggle to choose between both deposit functions
  if ( purchaseToken?.symbol === 'eth' ) {
  const {
    data,
    isError: writeErr,
    isLoading: writeLoading,
    write: deposit,
  } = useContractWrite(
    {
      addressOrName: WethHelperAddress,
      contractInterface: WethHelperAbi,
      signerOrProvider: signer,
    },
    'deposit',
    {
      onSettled() {
        openModal(<Successfull />);
      },
      onError(error) {
        console.log('Error', error);
        openModal(<Failed error={error} />);
      },
      args: [WethArgs],
    }
  );
  }

  const {
    data: approveData,
    isError: approveErr,
    isLoading: approveLoading,
    write: approve,
  } = useContractWrite(
    {
      addressOrName: purchaseToken?.quoteToken!,
      contractInterface: [
        'function approve(address _spender, uint256 _value) public returns (bool success)',
      ],
      signerOrProvider: signer,
    },
    'approve',
    {
      async onSuccess(data) {
        console.log(data);
        await data.wait();
        deposit();
      },
      onError(error) {
        console.log('error');
      },
      args: [address, depositAmount],
    }
  );

  const handleClick = async () => {
    approve();
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <button onClick={() => openModal(<DiscountBuyForm />)} className="text-theo-cyan">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>
        <div
          className="mb-8 text-center text-theo-navy dark:text-white"
          style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="mb-4 text-3xl font-bold sm:text-4xl">Confirm Buy</div>
          <div>Review carefully, this purchase is final</div>
        </div>
        <div>
          <Icon name="intersect" className="h-12 w-12 dark:text-white" />
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <MarketDiscountRow />
        <TheoPurchasePriceRow />
        <PurchaseAmountRow />
        <LockDurationRow />
        {/* TODO: calc time remaining */}
        {/* <ConfirmRow title="Offer Valid For" value="10:00 (??)" subtext={'18:14 pm EST'} /> */}
      </div>
      <div className="flex w-full items-center justify-center">
        <button className="border-button w-60" onClick={handleClick}>
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default ConfirmBuy;
