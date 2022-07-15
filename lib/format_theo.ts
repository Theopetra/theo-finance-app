import { commify, formatUnits } from 'ethers/lib/utils';

export function formatTheo(amount) {
  return commify(Number(formatUnits(amount, 9)).toFixed(2));
}
