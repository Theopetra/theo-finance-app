import Card from '@/components/Card';
import DynamicText from '@/components/DynamicText';
import Icon from '@/components/Icons';
import { TokenInfo } from '@/components/TokenName';
import { WhitelistTokenPrice } from '@/components/TokenPrice';
import DiscountBuyForm from '@/pages/discount-buy/components/DiscountBuyForm';
import useBuyForm from '@/pages/discount-buy/state/use-buy-form';
import useModal from '@/state/ui/theme/hooks/use-modal';
import { zeroPad } from 'ethers/lib/utils';
import { useMemo } from 'react';
import EthIcon from '../../../public/assets/icons/eth.svg';
import UdcIcon from '../../../public/assets/icons/usdc.svg';

// TODO: add env variables
const usdcAddress =
  process.env.NEXT_PUBLIC_USDC_ADDRESS || '0x07865c6E87B9F70255377e024ace6630C1Eaa37F';
const ethAddress =
  process.env.NEXT_PUBLIC_ETH_ADDRESS || '0xc778417E063141139Fce010982780140Aa0cD5Ab';
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
              <div>Price / THEO</div>
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
                        <>
                          <img
                            src={iconMap[token?.symbol]?.src}
                            alt={`${token?.symbol} icon`}
                            className="mr-2 w-8"
                          />
                        </>
                      )}
                      <div className="text-2xl font-bold">
                        {WhitelistTokenPrice({
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
              setSelection({ selectedBondDuration: bondMarkets.header, purchaseType: 'WhiteList' });
              openModal(<DiscountBuyForm title="Whitelist Buy" />);
            }}
          >
            Buy THEO
          </button>

          <div className="text-center  text-xs dark:text-[#ffffffb3]">
            Important: New buys are auto-locked until completion of the term
          </div>
        </div>
      </Card>
    </>
  );
};

export default MarketCard;
