import stakingDistributorArtifact from '../artifacts/StakingDistributor.json';
import sTheopetraArtifact from '../artifacts/sTheopetra.json';
import theopetraAuthorityArtifact from '../artifacts/TheopetraAuthority.json';
import theopetraBondRepositoryArtifact from '../artifacts/TheopetraBondDepository.json';
import wethHelper from '../artifacts/WethHelper.json';
import whitelistBondDepArtifact from '../artifacts/WhitelistTheopetraBondDepository.json';
import PublicPreListBondDepositoryArtifact from '../artifacts/PublicPreListBondDepository.json';

// address 1 = mainnet, address 4 = rinkeby, address 5 = goerli
// TODO: add goerli addresses for chain id 5
// TODO: update mainnet addresses for launch

export const contractMetadata = {
  // TODO: change these contract addresses to the real ones (copies of TheopetraBondDepository for now)
  PublicPreListBondDepository: {
    address: {
      1: '0xbCF05b9993B5241C9F46F8a4C3459d423299D57D',
      4: '0xbCF05b9993B5241C9F46F8a4C3459d423299D57D',
    },
    abi: PublicPreListBondDepositoryArtifact.abi,
  },
  StakingDistributor: {
    address: {
      1: '0x0ee54Aa3fE9695Eff297582080Bd9766D09FBD9A',
      4: '0x0ee54Aa3fE9695Eff297582080Bd9766D09FBD9A',
    },
    abi: stakingDistributorArtifact.abi,
  },
  sTheopetra: {
    address: {
      1: '0xCD1a66F06eC36Db3F040C6065e5AAC0866FcD77A',
      4: '0xCD1a66F06eC36Db3F040C6065e5AAC0866FcD77A',
    },
    abi: sTheopetraArtifact.abi,
  },
  TheopetraAuthority: {
    address: {
      1: '0xBcdF034cE6624A817c1BfEffBDE8691443e5fDbB',
      4: '0xBcdF034cE6624A817c1BfEffBDE8691443e5fDbB',
    },
    abi: theopetraAuthorityArtifact.abi,
  },
  TheopetraBondDepository: {
    address: {
      1: '0x7130212e81e74db3BA13cE052B93a7E5F1Df00B3',
      4: '0x7130212e81e74db3BA13cE052B93a7E5F1Df00B3',
    },
    abi: theopetraBondRepositoryArtifact.abi,
  },
  WhitelistTheopetraBondDepository: {
    address: {
      1: '0xbCF05b9993B5241C9F46F8a4C3459d423299D57D',
      4: '0xbCF05b9993B5241C9F46F8a4C3459d423299D57D',
    },
    abi: whitelistBondDepArtifact.abi,
  },
  WethHelper: {
    address: {
      1: '0x2E48f1E6C53ace80BA34F4f138d9b4A7488ca9E9',
      4: '0x2E48f1E6C53ace80BA34F4f138d9b4A7488ca9E9',
    },
    abi: wethHelper.abi,
  },
};
