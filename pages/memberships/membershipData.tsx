export type Membership = {
  type: 'premium' | 'standard';
  apy: number;
  lockDurationInDays?: number;
  contractName: 'TheopetraStaking' | 'TheopetraStakingLocked';
};

const membershipData = {
  premium: {
    type: 'premium',
    apy: 0.3,
    lockDurationInDays: 365,
    contractName: 'TheopetraStakingLocked',
  },
  standard: {
    type: 'standard',
    apy: 0.05,
    contractName: 'TheopetraStaking',
  },
};
export default membershipData;
