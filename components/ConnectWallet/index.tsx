import { defaultConfig } from "next/dist/server/config-shared";
import Icon from "../Icons";

const ConnectWallet = () => {
  const handleClick = () => {
    window.alert("Connect Wallet");
  };
  return (
    <button onClick={handleClick} className="border-button space-x-2">
      <Icon name="wallet" className="w-4" />
      <span> connect wallet</span>
    </button>
  );
};

export default ConnectWallet;
