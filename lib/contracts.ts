import stakingDistributorArtifact from '../artifacts/StakingDistributor.json';
import sTheopetraArtifact from '../artifacts/sTheopetra.json';
import theopetraAuthorityArtifact from '../artifacts/TheopetraAuthority.json';
import theopetraBondRepositoryArtifact from '../artifacts/TheopetraBondDepository.json';
import wethHelper from '../artifacts/WethHelper.json';
import whitelistBondDepArtifact from '../artifacts/WhitelistTheopetraBondDepository.json';
// TODO: change once this is deployed
import PublicPreListBondDepositoryArtifact from '../artifacts/WhitelistTheopetraBondDepository.json';

// address 1 = mainnet, address 3 = ropsten, address 4 = rinkeby
// TODO: update mainnet addresses for launch

export const contractMetadata = {
  // TODO: change these contract addresses to the real ones (copies of WhitelistBondDepository for now)
  PublicPreListBondDepository: {
    address: {
      1: '0x4805Ea3b3D3f6eDf4f632FD02e53c2aD53422356',
      3: '0x4805Ea3b3D3f6eDf4f632FD02e53c2aD53422356',
      4: '0x2E48f1E6C53ace80BA34F4f138d9b4A7488ca9E9',
    },
    abi: PublicPreListBondDepositoryArtifact.abi,
  },
  StakingDistributor: {
    address: {
      1: '0xb00b8fD9C8543e546064Fb087363E98B619D23b1',
      3: '0xb00b8fD9C8543e546064Fb087363E98B619D23b1',
      4: '0x0ee54Aa3fE9695Eff297582080Bd9766D09FBD9A',
    },
    abi: stakingDistributorArtifact.abi,
  },
  sTheopetra: {
    address: {
      1: '0x7DC47D9469f527F971d7062637eDe4d2a071c7B6',
      3: '0x7DC47D9469f527F971d7062637eDe4d2a071c7B6',
      4: '0xCD1a66F06eC36Db3F040C6065e5AAC0866FcD77A',
    },
    abi: sTheopetraArtifact.abi,
  },
  TheopetraAuthority: {
    address: {
      1: '0xD19E2973068657E68f4344bCB82E233864d302d7',
      3: '0xD19E2973068657E68f4344bCB82E233864d302d7',
      4: '0xBcdF034cE6624A817c1BfEffBDE8691443e5fDbB',
    },
    abi: theopetraAuthorityArtifact.abi,
  },
  TheopetraBondDepository: {
    address: {
      1: '0x2C33Ef90294Ca8e8fF6e3EA9dE099b6AF5b697F8',
      3: '0x2C33Ef90294Ca8e8fF6e3EA9dE099b6AF5b697F8',
      4: '0x7130212e81e74db3BA13cE052B93a7E5F1Df00B3',
    },
    abi: theopetraBondRepositoryArtifact.abi,
  },
  WhitelistTheopetraBondDepository: {
    address: {
      1: '0x4805Ea3b3D3f6eDf4f632FD02e53c2aD53422356',
      3: '0x4805Ea3b3D3f6eDf4f632FD02e53c2aD53422356',
      4: '0xbCF05b9993B5241C9F46F8a4C3459d423299D57D',
    },
    abi: whitelistBondDepArtifact.abi,
  },
  WethHelper: {
    address: {
      1: '0x4805Ea3b3D3f6eDf4f632FD02e53c2aD53422356',
      3: '0x4805Ea3b3D3f6eDf4f632FD02e53c2aD53422356',
      4: '0x2E48f1E6C53ace80BA34F4f138d9b4A7488ca9E9',
    },
    abi: wethHelper.abi,
  },
};
