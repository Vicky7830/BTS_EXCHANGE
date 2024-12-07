import { ethers } from "ethers";

import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
// import { tokenList } from "../../tokenList";
import { tokenList as staticTokens } from "../../assets/tokenList";
import { SET_TOKEN_VALUE, useSwapContext } from "../../context/SwapContext";
import commonTokenAbi from "./../../enviornment/commonTokenAbi.json";

const TokenSelect = ({ show, handleClose, sellToken, buyToken, active }) => {
  const { state, dispatch, swappingContractInsatnce } = useSwapContext();

  const [tokenList, setTokenList] = useState(staticTokens);
  const [tokenAddress, setTokenAddress] = useState("");

  const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = walletProvider.getSigner();

  const handleInputTokenAddress = async () => {
    // setContractAddress(e.target.value);
    // console.log("contractAddress:", contractAddress);

    const contractData = await walletProvider.getCode(tokenAddress);
    console.log("contractData:", contractData);

    if (contractData === "0x") {
      console.log("Invalid Token address");
    } else {
      // setIsToken(true);
      console.log("Valid Token address");
      const newTokenInstance = new ethers.Contract(
        // e.target.value,
        tokenAddress,
        commonTokenAbi,
        signer
      );
      const tokenName = await newTokenInstance.name();
      const tokenSymbol = await newTokenInstance.symbol();
      const tokenDecimals = await newTokenInstance.decimals();
      // setTokenDetails({
      //   name: tokenName,
      //   symbol: tokenSymbol,
      //   decimals: tokenDecimals,
      // });
      console.log(tokenName, ">>>>>", tokenSymbol, ">>>>>>>", tokenDecimals);
      setTokenList((prev) => [
        {
          coinSymbol: tokenSymbol,
          coinImg: "",
          coinName: tokenName,
          // address: '0x269c4867bc193c043b3E02BC8D2Cc68088D21023',
          address: tokenAddress, //testing
          decimals: tokenDecimals,
        },
        ...prev,
      ]);
    }
  };



  useEffect(() => {
    if (tokenAddress) {
      handleInputTokenAddress();
    }
  }, [tokenAddress]);

  const handleTokenSelect = (selectedToken) => {
    dispatch({ type: SET_TOKEN_VALUE, payload: selectedToken });
    handleClose();
  };

 

  return (
    <div>
      <Modal
        size="lg"
        dismissible
        show={show}
        onClose={handleClose}
        className="bg-black"
        id="modal"
      >
        <Modal.Body className="!bg-[#141414] rounded-lg p-4 border-[#b2bad626] border">
          <div className="flex justify-between">
            <h6>Select a token</h6>
            <button onClick={handleClose}>
              <CloseOutlined />
            </button>
          </div>
          <div className="mt-3">
            <div className="border-[#b2bad626] border !bg-[#1f1e1e] px-2 rounded-lg flex items-center">
              <SearchOutlined />
              <input
                type="text"
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder="Search name or paste address"
                className="border-none bg-transparent focus:outline-0 focus:border-0 focus:ring-0 w-full"
              />
            </div>
            <div className="topCoins mt-3">
              <ul className="flex flex-wrap gap-x-3 gap-y-2">
                {tokenList.slice(0, 7).map((coin, index) => (
                  <li key={index}>
                    <button
                      className={`border border-[#98a1c014] hover:bg-[#1f1f20] active:bg-[#3a3a3c] p-1 pr-2 rounded-2xl flex items-center justify-between ${
                        (active === "sell" &&
                          sellToken.coinSymbol === coin.coinSymbol) ||
                        (active === "buy" &&
                          buyToken.coinSymbol === coin.coinSymbol)
                          ? "bg-[#1f1f20]"
                          : "bg-[#141414]"
                      }`}
                      onClick={() => handleTokenSelect(coin)}
                    >
                      <div className="flex items-center">
                        <img
                          src={coin.coinImg}
                          alt=""
                          width="24px"
                          className="rounded-full"
                        />
                        <span className="text-lg font-medium ml-1.5 tracking-wide">
                          {coin.coinSymbol}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="popularCoins mt-4 pt-4 border-t border-gray-800">
              <h6 className="text-gray-400">Popular tokens</h6>
              <ul>
                {tokenList.map((coin, index) => (
                  <li className="mt-4" key={index}>
                    <button
                      className={`flex items-center gap-4 w-full hover:bg-[#1f1e1e] p-2 ${
                        (active === "sell" &&
                          sellToken.coinSymbol === coin.coinSymbol) ||
                        (active === "buy" &&
                          buyToken.coinSymbol === coin.coinSymbol)
                          ? "opacity-40"
                          : "opacity-100"
                      }`}
                      onClick={() => handleTokenSelect(coin)}
                    >
                      <img
                        src={coin.coinImg}
                        alt=""
                        width="36px"
                        className="rounded-full"
                      />
                      <span className="font-medium ml-1.5 tracking-wide flex flex-col items-start">
                        <span className="text-base">{coin.coinName}</span>
                        <span className="text-xs text-gray-400">
                          {coin.coinSymbol}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TokenSelect;
