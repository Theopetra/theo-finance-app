import { formatUnits } from 'viem';

export function formatTheo(amount, toFixed = 2) {
  return Number(formatUnits(amount, 9)).toFixed(toFixed);
}
