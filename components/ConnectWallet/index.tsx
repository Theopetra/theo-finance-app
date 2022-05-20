import { defaultConfig } from 'next/dist/server/config-shared';
import Icon from '../Icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const ConnectWallet = () => {
  const handleClick = () => {
    window.alert('Connect Wallet');
  };
  return (
    <ConnectButton />
    // <button onClick={handleClick} className="border-button space-x-2">
    //   <Icon name="wallet" className="w-4" />
    //   <span> connect wallet</span>
    // </button>
  );
};

export default ConnectWallet;
