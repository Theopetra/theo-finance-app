export type Membership = {
  type: 'premium' | 'standard';
  apy: number;
  lockDurationInDays?: number;
};

const membershipData = {
  premium: {
    type: 'premium',
    apy: 0.3,
    lockDurationInDays: 365,
  },
  standard: {
    type: 'standard',
    apy: 0.05,
  },
};
export default membershipData;
