import { ConnectButton } from '@rainbow-me/rainbowkit';

const ConnectWallet = () => {
  return <ConnectButton accountStatus="address" chainStatus="icon" showBalance={false} />;
};

export default ConnectWallet;
