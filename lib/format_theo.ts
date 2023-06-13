import { formatUnits } from 'viem';

export function formatTheo(amount: bigint, toFixed: number = 2) {
  return Number(formatUnits(amount, 9)).toFixed(toFixed);
}
