import {
  ArrowDownwardOutlined,
  KeyboardArrowDownOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import TokenSelect from "../Components/Modals/TokenSelect";
import { formatCurrency } from "../Utils/currencyFormat";
import { useMetaMask } from "../context/MetamaskContext";
import {
  A_INPUT,
  SET_ACTIVE_TOKEN,
  SWAP_TOKENS,
  TOKEN_A,
  TOKEN_B,
  useSwapContext,
} from "../context/SwapContext";
import as from "./Bg.module.css";

const Swap = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { state, dispatch, getSwapQuote, handleSwapToken, balances, pairError } =
    useSwapContext();

  const [sellToken, setSellToken] = useState({
    coinName: "Binance Coin",
    coinSymbol: "BNB",
    price: 5375056.57,
    coinImg: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
    address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    decimals: 18,
  });
  const [buyToken, setBuyToken] = useState("");
  const [sell, setSell] = useState("0");
  const [buy, setBuy] = useState("0");
  const [active, setActive] = useState("");

  const { account, connectWallet } = useMetaMask();

  const handleSwap = () => {
    dispatch({ type: SWAP_TOKENS });
    // const temp = sellToken;
    // setSellToken(buyToken);
    // setBuyToken(temp);
  };

  
  return (
    <>
      <div className={`${as.ExchangeCont} py-20`}>
        <div className="container mx-auto">
          <div className="max-w-[500px] mx-auto">
            <h4 className="px-5 py-2 bg-[#1f1e1e] w-fit rounded-[20px] tracking-wide font-medium">
              Swap
            </h4>
            <div className="mt-3">
              <div className=" bg-[#1f1e1e] rounded-2xl p-4 border border-[#222223] hover:border-[#b2bad626] transition-none">
                <div className="flex gap-2 items-center justify-between mb-2">
                  <span className="text-sm text-gray-400 font-medium">
                    Sell
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 font-medium">
                      Balance :{" "}
                    </span>
                    <p className="m-0"> {(1 * balances.tokenA)?.toFixed(2)}</p>
                  </div>
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
                        (e) => {
                        
                          getSwapQuote(e.target.value)
                        }
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
                <div className="pt-2 min-h-8">
                  <span className="text-gray-400 text-sm">
                    {sell > 0 &&
                      sellToken &&
                      formatCurrency(sell * sellToken.price)}
                  </span>
                </div>
              </div>
              <div>
                <div
                  className="relative z-10 flex justify-center w-10 h-10 mx-auto bg-[#252525] my-[-18px] cursor-pointer items-center rounded-xl border-[#141414] border-4 swap_btn"
                  onClick={() => handleSwap()}
                >
                  <ArrowDownwardOutlined />
                </div>
              </div>
              <div className=" bg-[#1f1e1e] rounded-2xl p-4 border border-[#222223] hover:border-[#b2bad626] transition-none">
                <div className="flex gap-2 items-center justify-between mb-2">
                  <span className="text-sm text-gray-400 font-medium">Buy</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 font-medium">
                      Balance :{" "}
                    </span>
                    <p className="m-0"> {(1 * balances.tokenB)?.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-[60%]">
                    <input
                      type="text"
                      placeholder="0"
                      value={state.tokenBValue}
                      className="h-11 border-0 bg-transparent focus:outline-0 focus:border-0 focus:ring-0 px-0 text-4xl placeholder:text-gray-400 mt-1 py-0 w-full"
                      // onChange={(e) => setBuy(e.target.value)}
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
                <div className="pt-2 min-h-8">
                  <span className="text-gray-400 text-sm">
                    {buy > 0 &&
                      buyToken &&
                      formatCurrency(buy * buyToken.price)}
                  </span>
                </div>
              </div>
              <div>
                {account ? (
                  <button
                    onClick={handleSwapToken}
                    className="w-full mt-1 py-3 px-5 text-xl font-medium rounded-2xl bg-[#cead3f2d] text-gold hover:bg-[#cead3f58]  active:bg-[#cead3f7a]"
                  >
                  { pairError ? "Insufficient liquidity for this trade" :  "Swap"}
                  </button>
                ) : (
                  <button
                    className="w-full mt-1 py-3 px-5 text-xl font-medium rounded-2xl bg-[#cead3f2d] text-gold hover:bg-[#cead3f58]  active:bg-[#cead3f7a]"
                    onClick={connectWallet}
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
            <TokenSelect
              show={show}
              handleShow={handleShow}
              handleClose={handleClose}
              sellToken={sellToken}
              buyToken={buyToken}
              active={active}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Swap;
