import stakingDistributorArtifact from '../artifacts/StakingDistributor.json'
import sTheopetraArtifact from '../artifacts/sTheopetra.json'
import theopetraAuthorityArtifact from '../artifacts/TheopetraAuthority.json'
import theopetraBondRepositoryArtifact from '../artifacts/TheopetraBondDepository.json'
import theopetraFounderVestingArtifact from '../artifacts/TheopetraFounderVesting.json'
import theopetraStakingArtifact from '../artifacts/TheopetraStaking.json'
import theopetraTreasuryArtifact from '../artifacts/TheopetraTreasury.json'
import yieldReporterArtifact from '../artifacts/TheopetraYieldReporter.json'
import whitelistBondDepArtifact from '../artifacts/WhitelistTheopetraBondDepository.json'

// address 1 = mainnet, address 4 = rinkeby
// TODO: update mainnet addresses for launch

export const contractMetadata = {
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
  TheopetraFounderVesting: {
    address: {
      1: '0x9140dE89f6Ab27647B96773E818196AC242E890b',
      4: '0x9140dE89f6Ab27647B96773E818196AC242E890b',
    },
    abi: theopetraFounderVestingArtifact.abi,
  },
  TheopetraStaking: {
    address: {
      1: '0x79b4882B3121061C054EEFEBcB05B2b3fFcf59Dd',
      4: '0x79b4882B3121061C054EEFEBcB05B2b3fFcf59Dd',
    },
    abi: theopetraStakingArtifact.abi,
  },
  TheopetraTreasury: {
    address: {
      1: '0x6640C3FD53e4Cf446B4139f478A199147d663a44',
      4: '0x6640C3FD53e4Cf446B4139f478A199147d663a44',
    },
    abi: theopetraTreasuryArtifact.abi,
  },
  TheopetraYieldReporter: {
    address: {
      1: '0xe0EC926a2Cba5d5118Eb6d7A4BFE97c08Bd812C0',
      4: '0xe0EC926a2Cba5d5118Eb6d7A4BFE97c08Bd812C0',
    },
    abi: yieldReporterArtifact.abi,
  },
  WhitelistTheopetraBondDepository: {
    address: {
      1: '0xbCF05b9993B5241C9F46F8a4C3459d423299D57D',
      4: '0xbCF05b9993B5241C9F46F8a4C3459d423299D57D',
    },
    abi: whitelistBondDepArtifact.abi,
  },
}