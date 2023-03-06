import { commify, formatUnits } from 'ethers/lib/utils';

export function formatTheo(amount, toFixed = 2) {
  return commify(Number(formatUnits(amount, 9)).toFixed(toFixed));
}
