import theopetraBondRepositoryArtifact from '../artifacts/TheopetraBondDepository.json';
import whitelistBondDepArtifact from '../artifacts/WhitelistTheopetraBondDepository.json';
import wethHelper from '../artifacts/WethHelper.json';

// address 1 = mainnet, address 4 = rinkeby
// TODO: update mainnet addresses for launch

export const contractMetadata = {
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
      // waiting on contract to be deployed.
      1: '',
      4: '',
    },
    abi: wethHelper.abi,
  },
};
