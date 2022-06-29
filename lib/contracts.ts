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
      5: '0x861d6af34Fe29e4296b22d5cf14cfbA9DDac6852',
    },
    abi: PublicPreListBondDepositoryArtifact.abi,
  },
  StakingDistributor: {
    address: {
      1: '0x0ee54Aa3fE9695Eff297582080Bd9766D09FBD9A',
      4: '0x0ee54Aa3fE9695Eff297582080Bd9766D09FBD9A',
      5: '0x699A0bbd94585Cc8207c8B7D1632fa94a078Fa72',
    },
    abi: stakingDistributorArtifact.abi,
  },
  sTheopetra: {
    address: {
      1: '0xCD1a66F06eC36Db3F040C6065e5AAC0866FcD77A',
      4: '0xCD1a66F06eC36Db3F040C6065e5AAC0866FcD77A',
      5: '0x219E77121E43B8EB13e73f1685C71FeD86f83461',
    },
    abi: sTheopetraArtifact.abi,
  },
  TheopetraAuthority: {
    address: {
      1: '0xBcdF034cE6624A817c1BfEffBDE8691443e5fDbB',
      4: '0xBcdF034cE6624A817c1BfEffBDE8691443e5fDbB',
      5: '0xdCEF158fae6639E417ba7aC668981b44e993CD35',
    },
    abi: theopetraAuthorityArtifact.abi,
  },
  TheopetraBondDepository: {
    address: {
      1: '0x7130212e81e74db3BA13cE052B93a7E5F1Df00B3',
      4: '0x7130212e81e74db3BA13cE052B93a7E5F1Df00B3',
      5: '0xa73875D33C40a86cb778c8fDE5d5BB6E6392493C',
    },
    abi: theopetraBondRepositoryArtifact.abi,
  },
  WhitelistTheopetraBondDepository: {
    address: {
      1: '0xbCF05b9993B5241C9F46F8a4C3459d423299D57D',
      4: '0xbCF05b9993B5241C9F46F8a4C3459d423299D57D',
      5: '0x0078d142476367D6c04e205646010786D39eF934',
    },
    abi: whitelistBondDepArtifact.abi,
  },
  WethHelper: {
    address: {
      1: '0x2E48f1E6C53ace80BA34F4f138d9b4A7488ca9E9',
      4: '0x2E48f1E6C53ace80BA34F4f138d9b4A7488ca9E9',
      5: '0x1B8f83f219e89b33c09c0222aB95622D40d5481F',
    },
    abi: wethHelper.abi,
  },
};
