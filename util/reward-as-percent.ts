export const rewardAsPercent = (reward) => {
  return Number(Number(BigInt(reward)) / 10000).toFixed();
};
