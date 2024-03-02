import { useActiveBondDepo } from '@/hooks/useActiveBondDepo';
import { BondDepoNameType, useContractInfo } from '@/hooks/useContractInfo';
import { cache } from '@/lib/cache';
import { TermsWithMarket } from '@/pages/market-cards/state/use-buy-form';
import { Abi, formatEther, formatUnits } from 'viem';
import { useContractRead, useBalance } from 'wagmi';

export const UnitProgress = ({
  bondDepoName
}: {
  bondDepoName: BondDepoNameType;
}) => {

const unitCost = 150000;
const { address, abi } = useContractInfo('ChainlinkPriceFeed');
const { data: priceFeed } = useContractRead({
    address,
    abi: abi as Abi,
    functionName: 'latestAnswer',
});
        
const { data: balance } = useBalance({
address: '0xf3143ae15deA73F4E8F32360F6b669173c854388',
});

const price = formatUnits(BigInt(priceFeed as bigint), 8)

if (priceFeed && balance?.value) {
    const percentageValue = ((BigInt(price) * BigInt(balance.value))  / BigInt(unitCost)) * BigInt(100);
    if (percentageValue > BigInt(100)) {
        return 100;
    } else return Number(percentageValue);
} else return 0;


   
 
};
