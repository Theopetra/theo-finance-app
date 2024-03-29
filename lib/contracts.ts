import stakingDistributorArtifact from '../artifacts/StakingDistributor.json';
import sTheopetraArtifact from '../artifacts/sTheopetra.json';
import pTheopetraArtifact from '../artifacts/pTheopetra.json';
import theopetraAuthorityArtifact from '../artifacts/TheopetraAuthority.json';
import theopetraBondRepositoryArtifact from '../artifacts/TheopetraBondDepository.json';
import theopetraStakingArtifact from '../artifacts/TheopetraStaking.json';
import theopetraStakingLockedArtifact from '../artifacts/TheopetraStakingLocked.json';
import wethHelper from '../artifacts/WethHelper.json';
import whitelistBondDepArtifact from '../artifacts/WhitelistTheopetraBondDepository.json';
import PublicPreListBondDepositoryArtifact from '../artifacts/PublicPreListBondDepository.json';
import BondingCalculatorArtifact from '../artifacts/TwapGetter.json';
import ChainlinkPriceFeedArtifact from '../artifacts/EACAggregatorProxy.json';
import { erc20ABI } from 'wagmi';

// address 1 = mainnet, address 4 = rinkeby, address 5 = goerli, address 31337 = hardhat, address 11155111 = sepolia

export const contractMetadata = {
  PublicPreListBondDepository: {
    address: {
      1: '0x9CC43eA3688a1D793155aA33DF1C42Af47C393Ed',
      4: '0xbCF05b9993B5241C9F46F8a4C3459d423299D57D',
      5: '0x861d6af34Fe29e4296b22d5cf14cfbA9DDac6852',
      31337: '0x9CC43eA3688a1D793155aA33DF1C42Af47C393Ed',
      11155111: '0x27B6C54071E321B7F1247C66c86d574c930eF724',
    },
    abi: PublicPreListBondDepositoryArtifact.abi,
  },
  MobyBondDepository: {
    address: {
      1: '0x0B1a87021ec75fBaE919b1e86b2B1335FFC8F4d3',
      4: '0x4A351C6aE3249499CBb50E8FE6566E2615386Da8',
      5: '0x4A351C6aE3249499CBb50E8FE6566E2615386Da8',
      31337: '0x0B1a87021ec75fBaE919b1e86b2B1335FFC8F4d3',
      11155111: '0x4A351C6aE3249499CBb50E8FE6566E2615386Da8',
    },
    abi: PublicPreListBondDepositoryArtifact.abi,
  },
  StakingDistributor: {
    address: {
      1: '0x1BE45D4069329CE41d07953FBB8a5cC6B9E545Ce',
      4: '0x0ee54Aa3fE9695Eff297582080Bd9766D09FBD9A',
      5: '0x699A0bbd94585Cc8207c8B7D1632fa94a078Fa72',
      31337: '0x1BE45D4069329CE41d07953FBB8a5cC6B9E545Ce',
      11155111: '0x22A2a0680258FcE2c5485D24D559a60feb70a25a',
    },
    abi: stakingDistributorArtifact.abi,
  },
  TheopetraAuthority: {
    address: {
      1: '0xfe9fab692c951eeb28345b3a22008f4057eaa232',
      4: '0xBcdF034cE6624A817c1BfEffBDE8691443e5fDbB',
      5: '0xdCEF158fae6639E417ba7aC668981b44e993CD35',
      31337: '0xfe9fab692c951eeb28345b3a22008f4057eaa232',
      11155111: '0xAaC4427037042Fc0F1131e61371eeDe224fC16Bd',
    },
    abi: theopetraAuthorityArtifact.abi,
  },
  TheopetraBondDepository: {
    address: {
      1: '0x747D4b0C6db8d197Aa6F8E11f4C45e95dC872C5e',
      4: '0x7130212e81e74db3BA13cE052B93a7E5F1Df00B3',
      5: '0xa73875D33C40a86cb778c8fDE5d5BB6E6392493C',
      31337: '0x747D4b0C6db8d197Aa6F8E11f4C45e95dC872C5e',
      11155111: '0x8884a5b35629C37FA419Fec4448E9a81d8782903',
    },
    abi: theopetraBondRepositoryArtifact.abi,
  },
  TheopetraStaking: {
    address: {
      1: '0x93E137f18f5603CBBa0d1a8b2b2bc585B229D485',
      4: '0x79b4882B3121061C054EEFEBcB05B2b3fFcf59Dd',
      5: '0x9fA01b224cd42fD147181E377b08d1a19477b320',
      31337: '0x93E137f18f5603CBBa0d1a8b2b2bc585B229D485',
      11155111: '0x888352704E10a2ED0c7781EF54EeEF8F2f7a79e1',
    },
    abi: theopetraStakingArtifact.abi,
  },
  TheopetraStakingLocked: {
    address: {
      1: '0x3b41c244Be7Fe35ac4fFD80615C5524704292263',
      4: '0x79b4882B3121061C054EEFEBcB05B2b3fFcf59Dd',
      5: '0x2e312581C2ce60FBAdaA36e6B6A6b722a1F87b0b',
      31337: '0x3b41c244Be7Fe35ac4fFD80615C5524704292263',
      11155111: '0x519A9CA0BdA026CCB7C0c349eAFb27Ae64F572da',
    },
    abi: theopetraStakingLockedArtifact.abi,
  },
  WhitelistTheopetraBondDepository: {
    address: {
      1: '0xDC17fcfeaE5B998C1c016E3f690237773788Bb41',
      4: '0xbCF05b9993B5241C9F46F8a4C3459d423299D57D',
      5: '0x0078d142476367D6c04e205646010786D39eF934',
      31337: '0xDC17fcfeaE5B998C1c016E3f690237773788Bb41',
      11155111: '0xD874941390479fC05C94B16E58F50B5FfB7FB406',
    },
    abi: whitelistBondDepArtifact.abi,
  },
  WethHelper: {
    address: {
      1: '0xF6dA2B78eE3287715705e80B6c588A0078CFE84C',
      4: '0x2E48f1E6C53ace80BA34F4f138d9b4A7488ca9E9',
      5: '0x1B8f83f219e89b33c09c0222aB95622D40d5481F',
      31337: '0x1c1521cf734CD13B02e8150951c3bF2B438be780',
      11155111: '0xa8551F2AC23C4e1c1505f771DE76CbA4a9063e76',
    },
    abi: wethHelper.abi,
  },
  TheopetraERC20Token: {
    address: {
      1: '0xfAc0403a24229d7e2Edd994D50F5940624CBeac2',
      5: '0xc48beb3d230c54805be1c7a2310b6ac6ae62797a',
      31337: '0xfAc0403a24229d7e2Edd994D50F5940624CBeac2',
      11155111: '0xd874B7e430873237b798c06f4bae067C25e35b40',
    },
    abi: erc20ABI,
  },
  sTheopetra: {
    address: {
      1: '0x76378Dc4f40dc033D5D900fCD9f830b13b54C85D',
      4: '0xCD1a66F06eC36Db3F040C6065e5AAC0866FcD77A',
      5: '0x219E77121E43B8EB13e73f1685C71FeD86f83461',
      31337: '0x76378Dc4f40dc033D5D900fCD9f830b13b54C85D',
      11155111: '0xE90ba5c553810B0F2913A6D8267595697cB05E78',
    },
    abi: sTheopetraArtifact.abi,
  },
  pTheopetra: {
    address: {
      1: '0x42F25CA244fe6C4079A1963a854B5bCB555442A9',
      4: '0xCD1a66F06eC36Db3F040C6065e5AAC0866FcD77A',
      5: '0x219E77121E43B8EB13e73f1685C71FeD86f83461',
      31337: '0x42F25CA244fe6C4079A1963a854B5bCB555442A9',
      11155111: '0x4FDCC3dE1c882Db748f72A3e28117BB3aB643A83',
    },
    abi: pTheopetraArtifact.abi,
  },
  BondingCalculator: {
    address: {
      1: '0xF7349113330B9Ad56F4BF56b670c88c05cbDCEDE',
      4: '0x9fA01b224cd42fD147181E377b08d1a19477b320',
      5: '0x92394c3570B9070765be36F0B92e29ca749B0Fc2',
      31337: '0xF7349113330B9Ad56F4BF56b670c88c05cbDCEDE',
      11155111: '0x9bd2Aa0F260fA3deF639dD9aB456609f8695Cfdc',
    },
    abi: BondingCalculatorArtifact.abi,
  },
  ChainlinkPriceFeed: {
    address: {
      1: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
      4: '',
      5: '',
      31337: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
      11155111: ''
    },
    abi: ChainlinkPriceFeedArtifact.abi,
  },
};
