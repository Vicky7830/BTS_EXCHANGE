import { RxCrossCircled } from "react-icons/rx";
import ad from "./WalletPopUp.module.css";
import { Link } from "react-router-dom";
import METAMASK_ICON from "../../assets/metamask-wallet.svg";
import TRUST_WALLET_ICON from "../../assets/trust-wallet.svg";
import BINANCE_WALLET_ICON from "../../assets/binance-wallet.svg";
import COINBASE_WALLET_ICON from "../../assets/coinbase-wallet.svg";
import WALLET_CONNECT_ICON from "../../assets/connect-wallet.svg";
import { useState } from "react";

const WalletPopUp = ({ popUpVisHandler, setAccount }) => {
  const [selectedWallet, setSelectedWallet] = useState("");

  const bscMainnet = {
    chainId: '0x38', // BSC Mainnet chain ID in hex
    chainName: 'Binance Smart Chain',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    nativeCurrency: { name: 'Binance Coin', symbol: 'BNB', decimals: 18 },
    blockExplorerUrls: ['https://bscscan.com'],
  };

  const connectWallet = async (wallet) => {
    try {
      // Detect the wallet provider (MetaMask or others)
      if (window.ethereum) {
        const provider = window.ethereum;
        
        // Check if the wallet is connected to the correct network
        const currentChainId = await provider.request({ method: 'eth_chainId' });

        if (currentChainId !== bscMainnet.chainId) {
          // If not connected to BSC Mainnet, prompt user to switch
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: bscMainnet.chainId }],
          });
        }

        // Simulate wallet connection (replace with actual wallet connection logic)
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Get the first account connected
        setAccount(account);
        localStorage.setItem("connectedAccount", account);

        // Log the wallet address to the console
        console.log("Connected Wallet Address:", account);

        // Close the popup after connection
        popUpVisHandler();
      } else {
        alert("Please install MetaMask or another Web3 wallet extension.");
      }
    } catch (error) {
      console.error("Error during wallet connection:", error);
      if (error.code === 4902) {
        // Handle the case where the BSC Mainnet is not available in the wallet
        alert("Binance Smart Chain network not available in your wallet. Please add it manually.");
      } else {
        alert("An error occurred while connecting your wallet.");
      }
    }
  };

  return (
    <div className={ad.main}>
      <div className={ad.popUp}>
        <div className={ad.popupHeader}>
          <h4 className="fw-bold">Connect a Wallet</h4>
          <RxCrossCircled
            className="fw-bold cursor-pointer"
            size={20}
            onClick={popUpVisHandler}
          />
        </div>
        <p className={ad.terms}>
          By connecting a wallet, you agree to <wbr /> Bitswap's{" "}
          <Link to="#">Terms of Use</Link>
        </p>
        <div className={ad.contentGh}>
          <div className={ad.pannelCrypto}>
            {/* Wallet Options */}
            {[ 
              { name: "MetaMask", icon: METAMASK_ICON, key: "metamask" },
              { name: "Trust Wallet", icon: TRUST_WALLET_ICON, key: "trustwallet" },
              { name: "Binance Chain", icon: BINANCE_WALLET_ICON, key: "binancechain" },
              { name: "Coinbase Wallet", icon: COINBASE_WALLET_ICON, key: "coinbase" },
              { name: "Wallet Connect", icon: WALLET_CONNECT_ICON, key: "walletconnect" },
            ].map(({ name, icon, key }) => (
              <button
                key={key}
                className={`${ad.buttonWallet} mt-3`}
                onClick={() => connectWallet(key)}
              >
                <span className={ad.buttonWalleta}>
                  <img
                    className={`${ad.buttonWalletaimg} img img-template`}
                    src={icon}
                    alt={name}
                  />
                </span>
                <span className={`${ad.buttonWalletb} fw-bold d-flex align-items-center pt-1`}>
                  {name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPopUp;
