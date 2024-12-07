import { ethers, providers } from "ethers";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import swapContractAbi from "../../enviornment/swapContractAbi.json";
import commonTokenAbi from "../../enviornment/commonTokenAbi.json";
import routerAbi from "../../enviornment/routerAbi.json";
import bitscoin from "./../../assets/icon_new/Bitscoin.png.png";
import { useMetaMask } from "../MetamaskContext";
import { useCommonContext } from "../CommonContext";

const swappingContractAddress = "0x2e0D7CcC6a825a73cfa608A8986dDa0B7a602915";

const SwapContext = createContext();

export const useSwapContext = () => {
  return useContext(SwapContext);
};

export const SET_ACTIVE_TOKEN = "set_active_token";
export const SET_TOKEN_VALUE = "set_token_value";
export const SWAP_TOKENS = "swap_tokens";
export const A_INPUT = "a_input_change";
export const B_INPUT = "b_input_change";
export const TOKEN_A = "A";
export const TOKEN_B = "B";

const intialState = {
  tokenA: {
    coinSymbol: "BNB",
    coinImg: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
    coinName: "Binance Coin",
    address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    decimals: 18,
    isCoin: true,
  },
  tokenB: {
    coinSymbol: "BTS",
    coinImg: bitscoin,
    coinName: "BITSCOIN",
    address: "0x9A1628b2f0D8f183b72841cA9374049Eaa8d0eA0",
    decimals: 18,
  },
  activeToken: TOKEN_A, // A, B
  tokenAValue: "",
  tokenBValue: "",
};

function reducer(state, action) {
  switch (action.type) {
    case SET_ACTIVE_TOKEN:
      return { ...state, activeToken: action.payload };
    case SET_TOKEN_VALUE: {
      let tokenA = state.tokenA;
      let tokenB = state.tokenB;

      if (state.activeToken === TOKEN_A) {
        tokenA = action.payload;
      } else if (state.activeToken === TOKEN_B) {
        tokenB = action.payload;
      }

      return {
        ...state,
        tokenA,
        tokenB,
      };
    }
    case SWAP_TOKENS: {
      const tokenA = state.tokenA;
      const tokenB = state.tokenB;
      const tokenAValue = state.tokenAValue;
      const tokenBValue = state.tokenBValue;
      return {
        ...state,
        tokenA: tokenB,
        tokenB: tokenA,
        tokenAValue: tokenBValue,
        tokenBValue: tokenAValue,
      };
    }
    case A_INPUT: {
      return {
        ...state,
        tokenAValue: action.payload,
        // tokenBValue: action.payload * 2,
      };
    }
    case B_INPUT: {
      return {
        ...state,
        tokenBValue: action.payload,
        // tokenAValue: action.payload * 2,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const ERC20_ABI = ["function balanceOf(address owner) view returns (uint256)"];

export const SwapProvider = ({ children }) => {
  const { account } = useMetaMask();
  const { setLoading } = useCommonContext();
  const [state, dispatch] = useReducer(reducer, intialState);
  const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = walletProvider.getSigner();
  const [pairError, setPairError] = useState(false);

  const [balances, setBalances] = useState({
    tokenA: "",
    tokenB: "",
  });

  const swappingContractInsatnce = new ethers.Contract(
    swappingContractAddress,
    swapContractAbi,
    signer
  );

  const tokenA_AddressInsatnce = new ethers.Contract(
    state.tokenA.address,
    commonTokenAbi,
    signer
  );

  const tokenBAddressInsatnce = new ethers.Contract(
    state.tokenB.address,
    commonTokenAbi,
    signer
  );

  console.log(swappingContractInsatnce, ">>>>> swappingContractInsatnce");

  const getSwapQuote = async (value) => {
    try {
      if (value == 0 || value == "") {
        dispatch({ type: B_INPUT, payload: 0 });
      }
      setPairError(false)
      dispatch({ type: A_INPUT, payload: value });
      const EtherToWei = ethers.utils.parseUnits(
        value,
        state.tokenA.decimals + ""
      );
      // const amountA = EtherToWei;
      const tokenA = state.tokenA.address;
      const tokenB = state.tokenB.address;

      const quotedValue = await swappingContractInsatnce.quote(
        EtherToWei,
        tokenA,
        tokenB
      );
      // debugger

      console.log(quotedValue.toString());
      const WeiToEther = ethers.utils.formatUnits(
        quotedValue.toString(),
        state.tokenB.decimals + ""
      );
      dispatch({ type: B_INPUT, payload: WeiToEther });
      console.log("WeiToEther: ", WeiToEther);
    } catch (error) {
      if (error.reason == "Pair does not exist") {
        console.log("ERROR WHILE GETTING QUOTE ----> ", error.reason);
        setPairError(true);
      }
      // debugger

      // console.log(error.reason, "ERROR WHILE GETTING QUOT1E", error, ">>>>>>>>>>>>>>>>>>>>>>>>>", error.code)
    }
  };

  const setTokenBValue = (value) => {
    dispatch({ type: B_INPUT, payload: value });
  };

  const swapExactEthToTokens = async (actualAmount, amountAfterFee) => {
    const functionCallerAddress = account;

    // BNB to BTC
    const swapResponse1 = await swappingContractInsatnce.swapExactETHForTokens(
      actualAmount,
      functionCallerAddress,
      state.tokenB.address,
      { value: amountAfterFee }
    );
    console.log("swapResponse1: ", swapResponse1);
  };

  const swapExactTokenToEth = async (actualtokenAmount) => {
    const functionCallerAddress = account;

    // BTC to BNB
    const swapResponse3 = await swappingContractInsatnce.swapExactTokensForETH(
      actualtokenAmount,
      state.tokenA.address,
      functionCallerAddress
    );
    console.log("swapResponse3: ", swapResponse3);
  };

  const swapExactTokenToToken = async (
    // USDT to BTC
    actualtokenAmount
  ) => {
    const functionCallerAddress = account;

    // here actualtokenAmount is token A
    const swapResponse5 =
      await swappingContractInsatnce.swapExactTokensForTokens(
        actualtokenAmount,
        state.tokenA.address,
        state.tokenB.address,
        functionCallerAddress
      );
    console.log("swapResponse5: ", swapResponse5);
  };

  const doApproval = async (ApprovalTokenInstance) => {
    const EtherToWei = ethers.utils.parseUnits("1000000000000000", "18");
    const approvalForRouter = await ApprovalTokenInstance.approve(
      swappingContractAddress,
      EtherToWei
    );
    const ApprovalData = await approvalForRouter.wait();
    console.log("ApprovalData: ", ApprovalData);
  };

  const calculateAllowance = async (tokenInstaknce) => {
    const functionCallerAddress = account;
    console.log("tokenInstaknce:", tokenInstaknce);
    console.log("swappingContractAddress:", swappingContractAddress);

    const currentAllowance = await tokenInstaknce.allowance(
      functionCallerAddress,
      swappingContractAddress
    );
    console.log("currentAllowance: ", currentAllowance);

    return currentAllowance;
  };

  const handleSwapToken = async () => {
    try {
      setLoading(true);
      const actualAmount = ethers.utils
        .parseUnits(state.tokenAValue, state.tokenA.decimals + "")
        .toString();
      const fee = await swappingContractInsatnce.chargedFee(actualAmount);
      const amountAfterFee = Number(actualAmount) + Number(fee);
      const currentAllowance = await calculateAllowance(tokenA_AddressInsatnce);
      if (Number(currentAllowance.toString()) >= amountAfterFee) {
        // swapExactEthToTokens(actualAmount, amountAfterFee.toString())
        // swapEthToExactTokens(amountOut, amountAfterFee.toString());
        if (state.tokenA.isCoin) {
          await swapExactEthToTokens(actualAmount, amountAfterFee);
        } else if (state.tokenB.isCoin) {
          await swapExactTokenToEth(actualAmount);
        } else {
          // both are token
          await swapExactTokenToToken(actualAmount);
        }
      } else {
        const approveData = await doApproval(tokenA_AddressInsatnce);
        // swapExactEthToTokens(actualAmount, amountAfterFee.toString())
        // swapEthToExactTokens(amountOut, amountAfterFee.toString());

        if (state.tokenA.isCoin) {
          await swapExactEthToTokens(actualAmount, amountAfterFee);
        } else if (state.tokenB.isCoin) {
          await swapExactTokenToEth(actualAmount);
        } else {
          // both are token
          await swapExactTokenToToken(actualAmount);
        }
      }
      setLoading(false);

    } catch (error) {
      console.log(error, " HANDLE SWAOPP TOKEN ERROR ");
      setLoading(false);
    }
  };

  // pool functions   -> In this we don't have  concept of tokenA,B will work on bnb type tokens
  const addPool = async () => {
    setLoading(true);
    if (
      state.tokenA.coinSymbol === "BNB" ||
      state.tokenB.coinSymbol === "BNB"
    ) {
      await addingEthLiquidity();
    } else {
      await addingTokenLiquidity();
    }
    setLoading(false);
  };

  async function addingEthLiquidity() {
    let BNB_TOKEN;
    let NON_BNB_TOKEN;
    if (state.tokenA.coinSymbol === "BNB") {
      BNB_TOKEN = {
        ...state.tokenA,
        value: state.tokenAValue,
        instance: tokenA_AddressInsatnce,
      };
      NON_BNB_TOKEN = {
        ...state.tokenB,
        value: state.tokenBValue,
        instance: tokenBAddressInsatnce,
      };
    } else {
      BNB_TOKEN = {
        ...state.tokenB,
        value: state.tokenBValue,
        instance: tokenBAddressInsatnce,
      };
      NON_BNB_TOKEN = {
        ...state.tokenA,
        value: state.tokenAValue,
        instance: tokenA_AddressInsatnce,
      };
    }
    const actualAmount = ethers.utils.parseUnits(
      BNB_TOKEN.value,
      BNB_TOKEN.decimals
    );
    console.log(state.tokenA);

    const Fee = await swappingContractInsatnce.chargedFee(actualAmount);
    const amountAfterFee = Number(actualAmount) + Number(Fee);
    const nonBNBActualAmount = ethers.utils.parseUnits(
      NON_BNB_TOKEN.value,
      NON_BNB_TOKEN.decimals
    );

    console.log("check addr : ", NON_BNB_TOKEN.address);
    console.log("NON_BNB_TOKEN.instance: ", NON_BNB_TOKEN.instance);

    const currentAllowance = await calculateAllowance(NON_BNB_TOKEN.instance);
    const expectedGasLimit = await walletProvider.getGasPrice();
    console.log("expectedGasLimit:", expectedGasLimit.toString());

    console.log(
      "currentAllowance: ",
      currentAllowance.toString(),
      " and token amount is ",
      Number(nonBNBActualAmount)
    );

    if (Number(currentAllowance.toString()) >= Number(nonBNBActualAmount)) {
      const liquidityRes = await swappingContractInsatnce.addLiquidityETH(
        NON_BNB_TOKEN.address,
        nonBNBActualAmount,
        actualAmount,
        account,
        { value: amountAfterFee.toString(), gasLimit: 6000000 }
      ); //we are using quote value here (bitscoin)
      console.log("liquidityRes: ", liquidityRes);
    } else {
      console.log("enter in else ");

      const approveData = await doApproval(NON_BNB_TOKEN.instance);
      const liquidityRes = await swappingContractInsatnce.addLiquidityETH(
        NON_BNB_TOKEN.address,
        nonBNBActualAmount,
        actualAmount,
        account,
        { value: amountAfterFee.toString(), gasLimit: 6000000 }
      ); //we are using quote value here (bitscoin)
      console.log("liquidityRes: ", liquidityRes);
    }
  }

  async function addingTokenLiquidity() {
    const token_A_Amount = ethers.utils.parseUnits(
      state.tokenAValue,
      state.tokenA.decimals
    );
    const token_B_Amount = ethers.utils.parseUnits(
      state.tokenBValue,
      state.tokenB.decimals
    );
    const currentTokenBAllowance = calculateAllowance(tokenBAddressInsatnce);
    const currentTokenAAllowance = calculateAllowance(tokenA_AddressInsatnce);

    if (
      Number(currentTokenAAllowance.toString()) >= Number(token_A_Amount) &&
      Number(currentTokenBAllowance.toString()) >= Number(token_B_Amount)
    ) {
      const liquidityTokenRes = await swappingContractInsatnce.addLiquidity(
        state.tokenA.address,
        state.tokenB.address,
        token_A_Amount,
        token_B_Amount,
        account,
        { gasLimit: 6000000 }
      ); //we are using quote value here (bitscoin)
      console.log("liquidityTokenRes: ", liquidityTokenRes);
    } else {
      const approveDataA = await doApproval(tokenA_AddressInsatnce);
      const approveData = await doApproval(tokenBAddressInsatnce);
      const liquidityTokenRes = await swappingContractInsatnce.addLiquidity(
        state.tokenA.address,
        state.tokenB.address,
        token_A_Amount,
        token_B_Amount,
        account,
        { gasLimit: 6000000 }
      ); //we are using quote value here (bitscoin)
      console.log("liquidityTokenRes: ", liquidityTokenRes);
    }
  }

  async function getNativeBalance(type) {
    const balance = await walletProvider.getBalance(account);
    console.log(`Native Balance: ${ethers.utils.formatEther(balance)} ETH`);
    // const obj = ;

    setBalances((balances) => ({
      ...balances,
      ...(type == "A"
        ? {
            tokenA:
              "" +
              ethers.utils.formatEther(balance, "" + state.tokenA.decimals),
          }
        : {}),
      ...(type == "B"
        ? {
            tokenB: ethers.utils.formatEther(
              balance,
              "" + state.tokenB.decimals
            ),
          }
        : {}),
    }));
  }

  async function getTokenBalance(tokenAddress, type) {
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    const balance = await tokenContract.balanceOf(account);
    console.log(
      `Token Balance: ${ethers.utils.formatUnits(balance, 18)} TOKEN_SYMBOL`
    );

    setBalances((balances) => ({
      ...balances,
      ...(type === "A"
        ? {
            tokenA: ethers.utils.formatUnits(balance, state.tokenA.decimals),
          }
        : {}),
      ...(type === "B"
        ? {
            tokenB: ethers.utils.formatUnits(balance, state.tokenB.decimals),
          }
        : {}),
    }));
  }
  useEffect(() => {
    if (state.tokenA.coinSymbol === "BNB") {
      getNativeBalance("A");
    } else {
      getTokenBalance(state.tokenA.address, "A");
    }
  }, [state.tokenA]);

  useEffect(() => {
    if (state.tokenB.coinSymbol === "BNB") {
      getNativeBalance("B");
    } else {
      getTokenBalance(state.tokenB.address, "B");
    }
  }, [state.tokenB]);

  return (
    <SwapContext.Provider
      value={{
        dispatch,
        state,
        getSwapQuote,
        handleSwapToken,
        addPool,
        pairError,
        setTokenBValue,
        swappingContractInsatnce,
        balances,
      }}
    >
      {children}
    </SwapContext.Provider>
  );
};

export default SwapContext;
//ek  min phone dead hogya
