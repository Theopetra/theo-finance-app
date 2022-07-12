import { commify, formatUnits } from 'ethers/lib/utils';

export function formatTheo(amount) {
  return commify(formatUnits(amount, 9));
}
