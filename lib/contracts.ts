import stakingDistributorArtifact from '../artifacts/StakingDistributor.json';
import sTheopetraArtifact from '../artifacts/sTheopetra.json';
import theopetraAuthorityArtifact from '../artifacts/TheopetraAuthority.json';
import theopetraBondRepositoryArtifact from '../artifacts/TheopetraBondDepository.json';
import wethHelper from '../artifacts/WethHelper.json';
import whitelistBondDepArtifact from '../artifacts/WhitelistTheopetraBondDepository.json';
// TODO: change once this is deployed
import PublicPreListBondDepositoryArtifact from '../artifacts/WhitelistTheopetraBondDepository.json';

// address 1 = mainnet, address 3 = ropsten
// TODO: update mainnet addresses for launch

export const contractMetadata = {
  // TODO: change these contract addresses to the real ones (copies of WhitelistBondDepository for now)
  PublicPreListBondDepository: {
    address: {
      1: '0x4805Ea3b3D3f6eDf4f632FD02e53c2aD53422356',
      3: '0x4805Ea3b3D3f6eDf4f632FD02e53c2aD53422356',
    },
    abi: PublicPreListBondDepositoryArtifact.abi,
  },
  StakingDistributor: {
    address: {
      1: '0xb00b8fD9C8543e546064Fb087363E98B619D23b1',
      3: '0xb00b8fD9C8543e546064Fb087363E98B619D23b1',
    },
    abi: stakingDistributorArtifact.abi,
  },
  sTheopetra: {
    address: {
      1: '0x7DC47D9469f527F971d7062637eDe4d2a071c7B6',
      3: '0x7DC47D9469f527F971d7062637eDe4d2a071c7B6',
    },
    abi: sTheopetraArtifact.abi,
  },
  TheopetraAuthority: {
    address: {
      1: '0xD19E2973068657E68f4344bCB82E233864d302d7',
      3: '0xD19E2973068657E68f4344bCB82E233864d302d7',
    },
    abi: theopetraAuthorityArtifact.abi,
  },
  TheopetraBondDepository: {
    address: {
      1: '0x2C33Ef90294Ca8e8fF6e3EA9dE099b6AF5b697F8',
      3: '0x2C33Ef90294Ca8e8fF6e3EA9dE099b6AF5b697F8',
    },
    abi: theopetraBondRepositoryArtifact.abi,
  },
  WhitelistTheopetraBondDepository: {
    address: {
      1: '0x4805Ea3b3D3f6eDf4f632FD02e53c2aD53422356',
      3: '0x4805Ea3b3D3f6eDf4f632FD02e53c2aD53422356',
    },
    abi: whitelistBondDepArtifact.abi,
  },
  WethHelper: {
    address: {
      1: '0x4805Ea3b3D3f6eDf4f632FD02e53c2aD53422356',
      3: '0x4805Ea3b3D3f6eDf4f632FD02e53c2aD53422356',
    },
    abi: wethHelper.abi,
  },
};
