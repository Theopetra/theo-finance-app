import hre from 'hardhat';

export function fundConnectedWallet(wallet: string | undefined) {

    hre.network.provider.send("hardhat_setBalance", [
        wallet,
        "0x8ac7230489e80000",]);
  }
  
