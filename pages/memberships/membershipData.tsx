export type Membership = {
  type: 'premium' | 'standard';
  apy: number;
  lockDurationInDays?: number;
  contractName: 'TheopetraStaking' | 'TheopetraStakingLocked';
};

const membershipData = {
  premium: {
    type: 'premium',
    lockDurationInDays: 365,
    contractName: 'TheopetraStakingLocked',
  },
  standard: {
    type: 'standard',
    contractName: 'TheopetraStaking',
  },
};
export default membershipData;
