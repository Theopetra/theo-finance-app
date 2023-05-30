import Card from '@/components/Card';
import DynamicText from '@/components/DynamicText';
import Icon from '@/components/Icons';
import { TokenInfo } from '@/components/TokenName';
import { TokenPrice } from '@/components/TokenPrice';
import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';
import { useAnalytics } from '@/hooks/useAnalytics';
import DiscountBuyForm from '@/pages/discount-buy/components/DiscountBuyForm';
import useBuyForm from '@/pages/discount-buy/state/use-buy-form';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { zeroPad } from 'ethers/lib/utils';
import { useMemo } from 'react';
import EthIcon from '../../../public/assets/icons/eth.svg';
import UdcIcon from '../../../public/assets/icons/usdc.svg';

const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS;
const ethAddress = process.env.NEXT_PUBLIC_ETH_ADDRESS;

if (!usdcAddress || !ethAddress) {
  console.log('WARNING: quote token contract addresses not set in env vars');
}

const MarketCard = ({ bondMarkets }) => {
  const [{}, { openModal }] = useModal();
  const [{}, { setSelection }] = useBuyForm();
  const iconMap = {
    ETH: EthIcon,
    WETH: EthIcon,
    USDC: UdcIcon,
  };

  const orderedMarkets = useMemo(() => {
    const usdcMarket = bondMarkets?.markets.find((x) => x.marketData.quoteToken === usdcAddress);
    const ethMarket = bondMarkets?.markets.find((x) => x.marketData.quoteToken === ethAddress);
    return [usdcMarket, ethMarket];
  }, [bondMarkets]);
  const { abi, address } = useActiveBondDepo();
  const { logEvent } = useAnalytics();

  return (
    <>
      <Card
        className={`${
          bondMarkets.highlight ? 'drop-shadow-[6px_6px_6px_rgba(80,174,203,0.75)]' : ''
        }`}
        darkModeBgColor="bg-black dark:bg-none"
        headerClasses="bg-theo-navy text-white dark:bg-theo-dark-navy"
        title={
          <div className="flex items-center pr-2">
            <div className="font- mr-2 text-2xl font-extrabold">{bondMarkets.header}-Month</div>
          </div>
        }
        headerRightComponent={<Icon name="lock-laminated" className="w-8" />}
      >
        <div className="flex flex-1 flex-col justify-between">
          <div className="mb-8 flex-1 space-y-4">
            <div className="flex justify-between text-lg text-theo-navy dark:text-theo-cyan">
              <div>Asset</div>
              <div>Price / $THEO</div>
            </div>

            {orderedMarkets?.map((market, i) => {
              const token = TokenInfo(market?.marketData?.quoteToken);
              return (
                <DynamicText
                  key={i}
                  height="40px"
                  value={
                    <div className="flex items-center justify-between  rounded-lg bg-[#e3e3e3] p-5 dark:bg-[#262626]">
                      {token?.symbol && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={iconMap[token?.symbol]?.src}
                          alt={`${token?.symbol} icon`}
                          className="mr-2 w-8"
                        />
                      )}
                      <div className="text-2xl font-bold">
                        {TokenPrice({
                          marketId: market?.id,
                          quoteToken: market?.marketData?.quoteToken,
                        })}
                      </div>
                    </div>
                  }
                />
              );
            })}
          </div>
          <button
            className="border-button mb-3 w-full"
            onClick={() => {
              setSelection({ selectedBondDuration: bondMarkets.header, purchaseType: 'discount' });
              logEvent({ name: 'purchase_started' });
              openModal(<DiscountBuyForm title={`Discount Buy`} />);
            }}
          >
            Buy $THEO
          </button>

          <div className="text-center  text-xs dark:text-[#ffffffb3]">
            Once unlocked, $THEO purchased need to be staked into the Premium Pool for $ETH rebates.
          </div>
        </div>
      </Card>
    </>
  );
};

export default MarketCard;