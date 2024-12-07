import { ethers } from "ethers";

import {
  AddOutlined,
  KeyboardArrowDownOutlined,
  KeyboardBackspaceOutlined,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import TokenSelect from "../Components/Modals/TokenSelect";
import { Link } from "react-router-dom";
import { calculateToken } from "../Utils/calculateToken";
import {
  SET_ACTIVE_TOKEN,
  TOKEN_A,
  TOKEN_B,
  useSwapContext,
} from "../context/SwapContext";
import { useMetaMask } from "../context/MetamaskContext";
import as from "./Bg.module.css";

const AddLiquidity = () => {
  const { account } = useMetaMask();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    state,
    dispatch,
    getSwapQuote,
    handleSwapToken,
    addPool,
    pairError,
    setTokenBValue,
    swappingContractInsatnce,
    balances,
  } = useSwapContext();

  const [tokenA, setTokenA] = useState({
    coinName: "Binance Coin",
    coinSymbol: "BNB",
    price: 5375056.57,
    coinImg: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    decimals: 18,
  });
  const [tokenB, setTokenB] = useState({
    coinName: "",
    coinSymbol: "",
    price: 0,
    coinImg: "",
  });
  const [active, setActive] = useState("");
  const [tokenToToken, setTokenToToken] = useState("");
  const [poolShare, setPoolShare] = useState(0);

  useEffect(() => {
    handleGetTokenToToken();
  }, [state.tokenA, state.tokenB]);

  useEffect(() => {
    getPoolShare();
  }, [state.tokenAValue, state.tokenBValue])

  const handleGetTokenToToken = async () => {
    try {
      const EtherToWei = ethers.utils.parseUnits(
        "1",
        state.tokenA.decimals + ""
      );
      const tokenA = state.tokenA.address;
      const tokenB = state.tokenB.address;
      const quotedValue = await swappingContractInsatnce.quote(
        EtherToWei,
        tokenA,
        tokenB
      );
      const WeiToEther = ethers.utils.formatUnits(
        quotedValue.toString(),
        state.tokenB.decimals + ""
      );

      getPoolShare();
      // Implement logic here to get pool share

      setPoolShare(0);

      setTokenToToken(WeiToEther);
      // debugger
    } catch (err) {
      // debugger
      if (err.reason == "Pair does not exist") {
        setTokenToToken("ERROR");
      }
    }
  };

  //========
  const getPoolShare = async () => {
    try {
      console.log(state.tokenAValue, "state.tokenAValue");
      const tokenAValue = ethers.utils.parseUnits(
        state.tokenAValue,
        state.tokenA.decimals + ""
      );
      const poolShare = await swappingContractInsatnce.getCurrentPoolShare(
        state.tokenA.address,
        state.tokenB.address,
        tokenAValue
      );
      const poolSharePercentage = Number(poolShare.toString()) / 100;
      console.log(poolSharePercentage, "poolSharePercentage");

      setPoolShare(poolSharePercentage.toFixed(2))
      return poolSharePercentage.toFixed(2);

    } catch (error) {
      console.log(error, ">>>>>> getpoolshare error")
    }
  };
  //==========

  return (
    <div className={`${as.ExchangeCont} py-20`}>
      <div className="container mx-auto">
        <div className="max-w-[450px] mx-auto">
          <div className="border border-gray-600 rounded-2xl p-4">
            <div className="flex justify-between">
              <Link to="/pool">
                <KeyboardBackspaceOutlined className="!text-gray-600 backIcon" />
              </Link>
              <h6 className="text-xl font-medium">Add liquidity</h6>
              <div></div>
            </div>
            <div className="mt-5">
              <div className="bg-[#1f1e1e] rounded-2xl p-4 pt-2 border border-[#222223] hover:border-[#b2bad626] transition-none">
                <div className="flex flex-col items-end gap-2 ">
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-400 font-medium">
                      Balance :{" "}
                    </span>
                    <p className="m-0"> {(1 * balances.tokenA)?.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="w-[60%]">
                      <input
                        type="text"
                        placeholder="0"
                        value={state.tokenAValue}
                        className="h-11 border-0 bg-transparent focus:outline-0 focus:border-0 focus:ring-0 px-0 text-4xl placeholder:text-gray-400 mt-1 py-0 w-full"
                        // onChange={(e) => setSell(e.target.value)}
                        onChange={
                          (e) => getSwapQuote(e.target.value)
                          // dispatch({ type: A_INPUT, payload: e.target.value })
                        }
                      />
                    </div>
                    <div className="inline-block">
                      <button
                        className="border border-[#98a1c014] bg-[#141414] hover:bg-[#2c2c2e] active:bg-[#3a3a3c] p-1 pr-2 rounded-2xl flex items-center justify-between"
                        onClick={() => {
                          dispatch({
                            type: SET_ACTIVE_TOKEN,
                            payload: TOKEN_A,
                          });
                          handleShow();
                          // setOpenModal(true);
                          // setActive("sell");
                        }}
                      >
                        <div className="flex items-center">
                          {state?.tokenA ? (
                            <>
                              <img
                                src={state.tokenA?.coinImg}
                                alt=""
                                width="24px"
                                className="rounded-full"
                              />
                              <span className="text-xl font-medium mx-1 tracking-wide">
                                {state.tokenA?.coinSymbol}
                              </span>{" "}
                            </>
                          ) : (
                            <span className="text-lg font-medium pl-2 pr-1 ">
                              Select Token
                            </span>
                          )}
                        </div>
                        <KeyboardArrowDownOutlined className="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-4 flex justify-center">
                <AddOutlined className="!text-lxl text-red-500 plusIcon" />
              </div>
              <div className="bg-[#1f1e1e] rounded-2xl p-4 pt-2 border border-[#222223] hover:border-[#b2bad626] transition-none">
                <div className="flex flex-col items-end gap-2 ">
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-400 font-medium">
                      Balance :{" "}
                    </span>
                    <p className="m-0"> {(1 * balances.tokenB)?.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="w-[60%]">
                      <input
                        type="text"
                        placeholder="0"
                        value={state.tokenBValue}
                        className="h-11 border-0 bg-transparent focus:outline-0 focus:border-0 focus:ring-0 px-0 text-4xl placeholder:text-gray-400 mt-1 py-0 w-full"
                        onChange={(e) => {
                          if (pairError) {
                            setTokenBValue(e.target.value);
                          }
                        }}
                      />
                    </div>
                    <div className="inline-block">
                      <button
                        className="border border-[#98a1c014] bg-[#141414] hover:bg-[#2c2c2e] active:bg-[#3a3a3c] p-1 pr-2 rounded-2xl flex items-center justify-between"
                        onClick={() => {
                          dispatch({
                            type: SET_ACTIVE_TOKEN,
                            payload: TOKEN_B,
                          });
                          handleShow();
                          // setOpenModal(true);
                          // setActive("buy");
                        }}
                      >
                        <div className="flex items-center">
                          {state?.tokenB ? (
                            <>
                              <img
                                src={state?.tokenB?.coinImg}
                                alt=""
                                width="24px"
                                className="rounded-full"
                              />
                              <span className="text-xl font-medium mx-1 tracking-wide">
                                {state?.tokenB?.coinSymbol}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-medium pl-2 pr-1 ">
                              Select Token
                            </span>
                          )}
                        </div>
                        <KeyboardArrowDownOutlined className="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {tokenToToken != "ERROR" ? (
                <div className="flex flex-col gap-3 justify-between items-center mt-4 bg-[#1f1e1e] rounded-2xl p-4 border border-[#222223] hover:border-[#b2bad626] transition-none">
                  <div className="flex w-full justify-between">
                    <div className="">
                      <p className="">
                        <p>{(1 / tokenToToken)?.toFixed(7)}</p>
                        {state.tokenA?.coinSymbol} per{" "}
                        {state.tokenB?.coinSymbol}
                      </p>
                    </div>
                    <div>
                      <p>{(tokenToToken * 1)?.toFixed(4)}</p>

                      <p>
                        {state.tokenB?.coinSymbol} per{" "}
                        {state.tokenA?.coinSymbol}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-center">{poolShare} %</p>
                    <span className="text-sm text-gray-400 font-medium">
                      Share of pool
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-4">Pair does not exist !</div>
                </>
              )}
              {tokenA.coinSymbol && tokenB.coinSymbol && (
                <div className="mt-5 bg-[#1f1e1e] rounded-2xl border border-[#b2bad626] transition-none">
                  <div className="p-4">
                    <p className="text-sm font-medium">Prices and pool share</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-[#b2bad626]">
                    <div className="flex justify-between items-center text-center">
                      <div>
                        <p>
                          {tokenB.price
                            ? calculateToken(tokenB.price, tokenA.price)
                            : 0}
                        </p>
                        <span className="text-sm text-gray-400 font-medium">
                          {tokenB.coinSymbol} per {tokenA.coinSymbol}
                        </span>
                      </div>
                      <div>
                        <p>
                          {tokenB.price
                            ? calculateToken(tokenA.price, tokenB.price)
                            : 0}
                        </p>
                        <span className="text-sm text-gray-400 font-medium">
                          {tokenA.coinSymbol} per {tokenB.coinSymbol}
                        </span>
                      </div>
                      <div>
                        <p>0%</p>
                        <span className="text-sm text-gray-400 font-medium">
                          Share of pool
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4">
              {account ? (
                <button
                  onClick={addPool}
                  className="w-full py-4 px-5 text-xl font-medium rounded-2xl bg-[#cead3f2d] text-gold hover:bg-[#cead3f58]  active:bg-[#cead3f7a]"
                >
                  {pairError ? "Create pair & add liquidity" : "Add"}
                </button>
              ) : (
                <button className="w-full py-4 px-5 text-xl font-medium rounded-2xl bg-[#cead3f2d] text-gold hover:bg-[#cead3f58]  active:bg-[#cead3f7a]">
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <TokenSelect
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
        // openModal={openModal}
        // setOpenModal={setOpenModal}
        // sellToken={sellToken}
        // buyToken={buyToken}
        // setSellToken={setSellToken}
        // setBuyToken={setBuyToken}
        active={active}
      />
    </div>
  );
};

export default AddLiquidity;
