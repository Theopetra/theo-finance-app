import { BigNumber } from 'ethers';
import { Result } from 'ethers/lib/utils';

export const rewardAsPercent = (reward: Result) => {
  return Number(BigNumber.from(reward).toNumber() / 10000).toFixed();
};
