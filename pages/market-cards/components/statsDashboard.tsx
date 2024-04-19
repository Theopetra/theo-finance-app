import { useMemo, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { format } from 'date-fns';
import useBuyForm from '../state/use-buy-form';
import { formatUnits } from 'viem';
import Card from '@/components/Card';

const StatsDashboard = () => {

    const [
        {
          valuationPrice,
          openingPrice,
          priceFeed,
          treasuryBalance,
          discountCapacity,
        }
      ] = useBuyForm();

      const marketInterval = 2617920;
      const marketStart = 1713220095;

      const ethPrice = formatUnits(BigInt(priceFeed as bigint), 8);
      const balanceFormatted = formatUnits(treasuryBalance?.value as bigint, 18)

      const now = Math.floor(new Date().getTime() / 1000);
      const updateSeconds = ((marketInterval - ((now - marketStart) % marketInterval)) + now);
      const nextUpdate = format(updateSeconds * 1000, 'yyyy-MM-dd');

      return (
        <Card className="mb-4 flex w-full flex-col" cardHeader={<div className="w-full text-center text-3xl font-bold">Growth Market Dashboard</div>}>
            <div>
                <div className="flex w-full">
                    <Card className="flex mx-1 h-32 items-center justify-center">
                        <>
                            <div className="flex text-2xl font-bold h-full items-center justify-center">
                                ${Math.round(valuationPrice * 100000) / 100000}</div>
                            <div className="flex items-center justify-center">Swap price</div>
                        </>
                    </Card>
                    <Card className="flex mx-1 h-32 items-center justify-center">
                        <>
                            <div className="flex text-2xl font-bold h-full items-center justify-center">
                                ${openingPrice ? Math.round(((Number(openingPrice) / 10**9) * Number(ethPrice)) * 100000) / 100000 : 'Loading...'}</div>
                            <div className="flex items-center justify-center">Lowest mint price</div>
                        </>
                    </Card>
                    <Card className="flex mx-1 h-32 items-center justify-center">
                        <>
                            <div className="flex text-2xl font-bold h-full items-center justify-center">
                                {Math.floor(Number(discountCapacity) / 10**9)} $THEO</div>
                            <div className="flex items-center justify-center">Capacity below market price</div>
                        </>
                    </Card>
                </div>
                <div className="flex w-full items-center justify-between">
                    <Card className="flex mx-1 h-32 items-center justify-center">
                        <>
                            <div className="flex text-2xl font-bold h-full items-center justify-center">{nextUpdate}</div>
                            <div className="flex items-center justify-center">Next Price Update</div>
                        </>
                    </Card>
                    <Card className="flex mx-1 h-32 items-center justify-center">
                        <>
                            <div className="flex text-2xl font-bold h-full items-center justify-center">
                                {Math.round(Number(balanceFormatted) * 100000) / 100000} ETH</div>
                            <div className="flex items-center justify-center">Treasury balance</div>
                        </>
                    </Card>
                </div>
            </div>
        </Card>
      )
}

export default StatsDashboard;