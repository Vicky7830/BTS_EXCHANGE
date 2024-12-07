import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import as from "./Bg.module.css";
import { useSwapContext } from "../context/SwapContext";
import { useMetaMask } from "../context/MetamaskContext";

const Pool = () => {
  const { account } = useMetaMask();
  const { swappingContractInsatnce } = useSwapContext();

  const [lpTokens, setLpTokens] = useState([]);

  async function getLPTokens() {
    try {
      const response = await swappingContractInsatnce.getUserLPTokens(account);

      const formattedData = response?.[0]?.map((lp, index) => {
        return {
          address: lp,
          pair: `${response?.[1]?.[index]}/${response?.[2]?.[index]}`,
          lpAmount: response?.[3]?.[index]?.toString(),
        };
      });
      setLpTokens(formattedData);

      // const tokenDetails = {
      //   address: tokenDetails?.[0]?.[0],
      //   pair: `${tokenDetails?.[1]?.[0]}/${tokenDetails?.[2]?.[0]}`,
      //   lpAmount: tokenDetails?.[3]?.[0]?.toString(),
      // };
      // console.log(response, ">>>> response");
    } catch (err) {
      console.log(err, ">>>> error");
    }
  }
  console.log(lpTokens, "??????????");

  useEffect(() => {
    getLPTokens();
  }, []);

  return (
    <div className={`${as.ExchangeCont} py-20`}>
      <div className="container mx-auto">
        <div className="max-w-[600px] mx-auto">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-end">
                <h6 className="text-xl font-medium">Your V2 liquidity</h6>
                {/* <span className="text-sm text-gray-400">V2</span> */}
              </div>
              <div className="flex gap-3">
                {/* <Link
                  to="/add/v2"
                  className="border border-[#d6b0342e] hover:border-[#d6b034f6] py-2 px-4 rounded-lg flex items-center justify-between"
                >
                  <span className="text-base font-medium text-gold">
                    Create a pair
                  </span>
                </Link> */}
                <Link
                  to="/add/v2"
                  className="border border-[#98a1c014] bg-[#d6b034df] hover:bg-[#d6b034f6] active:bg-[#d6b034] py-2 px-4 rounded-lg flex items-center justify-between"
                >
                  <span className="text-base font-medium">
                    Add V2 liquidity
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex-col p-4 border border-gray-400 mt-4 rounded-xl flex justify-between w-full">
              {lpTokens.length === 0 ? (
                <>
                  <p>No liquidity found.</p>
                </>
              ) : (
                <>
                  {lpTokens.map((token, index) => {
                    return (
                      <div key={index} className="flex justify-between items-center gap-24 mb-3 w-full">
                        <h6 className="text-2xl font-bold">{token?.pair}</h6>
                        <p className="text-base font-semibold m-0">
                          {(token?.lpAmount /1e18)?.toFixed(3)}
                        </p>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pool;
