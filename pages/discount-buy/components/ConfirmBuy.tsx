import wethHelperSignedMessages from '@/artifacts/signed-messages/weth-helper-signed-messages';
import wlBondDepoSignedMessages from '@/artifacts/signed-messages/wl-bonddepo-signed-messages';
import { ConfirmRow } from '@/components/ConfirmationModalRow';
import Icon from '@/components/Icons';
import PendingTransaction from '@/components/PendingTransaction';
import { WhitelistTokenPrice } from '@/components/TokenPrice';
import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useContractInfo } from '@/hooks/useContractInfo';
import { cache } from '@/lib/cache';
import { cleanSymbol } from '@/lib/clean_symbol';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { add, format } from 'date-fns';
import { parseEther, parseUnits } from 'ethers/lib/utils';
import { useMemo } from 'react';
import { useAccount, useContractWrite, useSigner } from 'wagmi';
import useBuyForm from '../state/use-buy-form';
import { useUserPurchases } from '../state/use-user-purchases';
import DiscountBuyForm from './DiscountBuyForm';
import Failed from './Failed';
import Successful from './Successful';

export const Price = () => {
  const [{ selectedMarket, purchaseToken, purchaseCost }] = useBuyForm();

  return (
    <>
      <WhitelistTokenPrice
        marketId={selectedMarket?.id}
        quoteToken={selectedMarket?.marketData.quoteToken}
      />{' '}
      {cleanSymbol(purchaseToken?.symbol)}
    </>
  );
};
export const MarketDiscountRow = () => {
  const { activeContractName } = useActiveBondDepo();

  return (
    <ConfirmRow
      title="Purchase Type"
      value={activeContractName === 'WhitelistTheopetraBondDepository' ? 'Whitelist' : 'Discount Market'}
      subtext={activeContractName === 'WhitelistTheopetraBondDepository' ? '24-Hour Event' : ''}
    />
  );
};

export const PurchaseAmountRow = () => {
  const [{ purchaseAmount, purchaseCost, purchaseToken }] = useBuyForm();

  return (
    <ConfirmRow
      title="Purchase Amount"
      value={`${purchaseAmount} $THEO`}
      subtext={`${purchaseCost} ${cleanSymbol(purchaseToken?.symbol)}`}
    />
  );
};

export const TheoPurchasePriceRow = () => {
  const [{ purchaseToken }] = useBuyForm();
  return <ConfirmRow title="$THEO Purchase Price" value={<Price />} subtext={`Per $THEO`} />;
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

const ConfirmBuy = () => {
  const [, { openModal }] = useModal();
  const [{ selectedMarket, purchaseToken, purchaseCost }] = useBuyForm();
  const [, { reRender }] = useUserPurchases();
  const { data: wallet } = useAccount();
  const {
    address: activeBondDepoAddress,
    abi: activeBondDepoAbi,
    activeContractName,
  } = useActiveBondDepo();
  const { address: WethHelperAddress, abi: WethHelperAbi } = useContractInfo('WethHelper');
  const { data: signer, isError, isLoading } = useSigner();
  const { logEvent } = useAnalytics();

  const signature: any = useMemo(() => {
    if (purchaseToken?.symbol?.toLowerCase().includes('eth')) {
      return wethHelperSignedMessages.find((sig) => {
        return sig.address.toLowerCase() === wallet?.address?.toLowerCase();
      });
    }
    return wlBondDepoSignedMessages.find((sig) => {
      return sig.address.toLowerCase() === wallet?.address?.toLowerCase();
    });
  }, [wallet, purchaseToken?.symbol]);

  //TODO: Max price should be set by the user
  const maxPrice = parseEther('25');
  const depositAmount =
    purchaseToken?.symbol?.toLowerCase() === 'usdc'
      ? parseUnits(purchaseCost, 6)
      : parseEther(purchaseCost);

  const args = [
    selectedMarket.id,
    depositAmount,
    maxPrice._hex,
    wallet?.address,
    wallet?.address,
    signature?.wlDepoSignature || '0x00',
  ];

  const WethArgs = [
    selectedMarket.id,
    maxPrice._hex,
    wallet?.address,
    wallet?.address,
    // TODO: autostake
    true,
    activeContractName !== 'PublicPrelistBondDepository',
    signature?.wethHelperSignature || '0x00',
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
      async onSuccess(data) {
        const receipt = await data.wait();
        if (receipt.status === 1) {
          logEvent({ name: 'purchase_completed' });
          cache.clear();
          reRender();
          openModal(<Successful txId={data.hash} />);
        } else {
          openModal(<Failed error={{ code: 'Something went wrong.' }} />);
        }
      },
      onError(error) {
        console.log(error);
        openModal(<Failed error={error} />);
      },
      args,
    }
  );

  const {
    data: wethData,
    isError: wethWriteErr,
    isLoading: wethWriteLoading,
    write: wethDeposit,
  } = useContractWrite(
    {
      addressOrName: WethHelperAddress,
      contractInterface: WethHelperAbi,
      signerOrProvider: signer,
    },
    'deposit',
    {
      async onSuccess(data) {
        openModal(
          <PendingTransaction
            message="2 of 2 transactions..."
            secondaryMessage={`Submitting ${cleanSymbol(purchaseToken?.symbol)} transaction...`}
          />
        );

        const receipt = await data.wait();
        if (receipt.status === 1) {
          logEvent({ name: 'purchase_completed' });
          cache.clear();
          reRender();
          openModal(<Successful txId={data.hash} />);
        } else {
          openModal(<Failed error={{ code: 'Something went wrong.' }} />);
        }
      },
      onError(error) {
        openModal(<Failed error={error} />);
      },
      args: WethArgs,
      overrides: {
        value: depositAmount,
      },
    }
  );

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
        const receipt = await data.wait();
        if (receipt.status === 1) {
          logEvent({ name: 'erc20_approved' });
          openModal(
            <PendingTransaction
              message="2 of 2 transactions..."
              secondaryMessage={`Submitting ${cleanSymbol(purchaseToken?.symbol)} transaction...`}
            />
          );

          deposit();
        } else {
          openModal(<Failed error={{ code: 'Something went wrong.' }} />);
        }
      },
      onError(error) {
        openModal(<Failed error={error} />);
      },
      args: [activeBondDepoAddress, depositAmount],
    }
  );

  const handleClick = async () => {
    logEvent({ name: 'purchase_submitted' });
    if (purchaseToken?.symbol?.toLowerCase().includes('eth')) {
      openModal(
        <PendingTransaction
          message="1 of 2 transactions..."
          secondaryMessage={`Approving ${cleanSymbol(purchaseToken?.symbol)} spend...`}
        />
      );

      wethDeposit();
    } else {
      openModal(
        <PendingTransaction
          message="1 of 2 transactions..."
          secondaryMessage={`Approving ${cleanSymbol(purchaseToken?.symbol)} spend...`}
        />
      );
      approve();
    }
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
          <div>
            Please review carefully, this purchase is final.
            <br />
            Click <strong>Confirm Purchase</strong> below to confirm.
            <br />
            *Note: This purchase includes 10% $THEO inflation to fund exchange listings*
          </div>
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
