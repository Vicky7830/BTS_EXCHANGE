import React from "react";
import swapContractAbi from "../enviornment/swapContractAbi.json";
import commonTokenAbi from "../enviornment/commonTokenAbi.json";
import { ethers } from "ethers";

export const SwapCode = () => {
  // const swappingContractAddress = "0x4c48775301a53dBD8BF6c361EA3Eb8beF95849c2";
  const swappingContractAddress = "0x2e0D7CcC6a825a73cfa608A8986dDa0B7a602915";
  const functionCallerAddress = "0x98a9E141Da7814bFAe91bCe5920194af20cd65F5";
  const tokenBAddress = "0x9A1628b2f0D8f183b72841cA9374049Eaa8d0eA0"; //bitscoin
  // const tokenA_address = "0xF352E4D29CDa25e1F89F5629Ba0FBf58D867A584"; //usdt
  const tokenA_address = "0x55d398326f99059fF775485246999027B3197955"; //usdt


  const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = walletProvider.getSigner();
  const swappingContractInsatnce = new ethers.Contract(
    swappingContractAddress,
    swapContractAbi,
    signer
  );

  const tokenA_AddressInsatnce = new ethers.Contract(
    tokenA_address,
    commonTokenAbi,
    signer
  );

  console.log(tokenA_AddressInsatnce, "tokenA_AddressInsatnce,+++++");

  const tokenBAddressInsatnce = new ethers.Contract(
    tokenBAddress,
    commonTokenAbi,
    signer
  );

  const doApproval = async (ApprovalTokenInstance) => {
    const EtherToWei = ethers.utils.parseUnits("1000000000000000", "18");
    const approvalForRouter = await ApprovalTokenInstance.approve(
      swappingContractAddress,
      EtherToWei
    );
    const ApprovalData = await approvalForRouter.wait();
    console.log("ApprovalData: ", ApprovalData);
  };
  //ETH TO TOKEN
  const ExecuteEthToTokenSwap = async () => {
    //static value :
    const amountOut = ethers.utils.parseUnits("10", "18");
    const actualAmount = ethers.utils.parseUnits("0.01", "18"); //ether

    console.log("actualAmount: ", actualAmount.toString());

    const Fee = await swappingContractInsatnce.chargedFee(actualAmount);
    console.log("Fee: ", Fee.toString());

    const amountAfterFee = Number(actualAmount) + Number(Fee);
    const currentAllowance = await tokenBAddressInsatnce.allowance(
      functionCallerAddress,
      swappingContractAddress
    );
    console.log(
      "currentAllowance:",
      currentAllowance.toString(),
      "amountAfterFee:",
      amountAfterFee
    );
    if (Number(currentAllowance.toString()) >= amountAfterFee) {
      // swapExactEthToTokens(actualAmount, amountAfterFee.toString())
      swapEthToExactTokens(amountOut, amountAfterFee.toString());
    } else {
      const approveData = await doApproval(tokenBAddressInsatnce);
      // swapExactEthToTokens(actualAmount, amountAfterFee.toString())
      swapEthToExactTokens(amountOut, amountAfterFee.toString());
    }
  };

  //TOKEN TO ETH
  const ExecuteTokenToEthSwap = async () => {
    // usdt to eth
    const amountOut = ethers.utils.parseUnits("0.0001", "18"); //in eth
    const actualtokenAmount = ethers.utils.parseUnits("10", "18"); //token
    const Fee = await swappingContractInsatnce.chargedFee(actualtokenAmount);
    console.log("Fee: ", Fee.toString());
    const tokenAmountAfterFee = Number(actualtokenAmount) + Number(Fee);

    console.log(
      "tokenAmountAfterFee:",
      tokenAmountAfterFee,
      "++++++++++++++++++++++++++++++"
    );

    console.log("actualtokenAmount: ", actualtokenAmount.toString());
    const currentTokenAllowance = await tokenA_AddressInsatnce.allowance(
      functionCallerAddress,
      swappingContractAddress
    );
    console.log(
      "currentTokenAllowance:",
      currentTokenAllowance.toString(),
      "tokenAmountAfterFee:",
      tokenAmountAfterFee
    );
    if (Number(currentTokenAllowance.toString() >= tokenAmountAfterFee)) {
      // swapExactTokenToEth(tokenA_address, actualtokenAmount.toString());
      swapTokenToExactEth(amountOut, tokenA_address);
    } else {
      const approveData = await doApproval(tokenA_AddressInsatnce);
      // swapExactTokenToEth(tokenA_address, actualtokenAmount.toString());
      swapTokenToExactEth(amountOut, tokenA_address);
    }
  };

  // TOKEN TO TOKEN

  const ExecuteTokenToTokenSwap = async () => {
    //BNB to USDT
    const amountOut = ethers.utils.parseUnits("10", "18"); // we are requsting 10 USDT
    const actualtokenAmount = ethers.utils.parseUnits("10", "18"); //token
    const Fee = await swappingContractInsatnce.chargedFee(actualtokenAmount);
    console.log("Fee: ", Fee.toString());
    const tokenAmountAfterFee = Number(actualtokenAmount) + Number(Fee);
    console.log(
      "tokenAmountAfterFee:",
      tokenAmountAfterFee,
      "++++++++++++++++++++++++++++++"
    );
    const currentTokenAllowance = await tokenA_AddressInsatnce.allowance(
      functionCallerAddress,
      swappingContractAddress
    );
    console.log(
      "currentTokenAllowance:",
      currentTokenAllowance.toString(),
      "tokenAmountAfterFee:",
      tokenAmountAfterFee
    );
    if (Number(currentTokenAllowance.toString() >= tokenAmountAfterFee)) {
      swapExactTokenToToken(actualtokenAmount,tokenA_address,tokenBAddress)
      // swapTokenToExactToken(amountOut, tokenA_AddressInsatnce, tokenBAddress); // here amountOut is token B
    } else {
      console.log("test");
      const approveData = await doApproval(tokenA_AddressInsatnce);
      console.log("approveData");
      swapExactTokenToToken(actualtokenAmount,tokenA_address,tokenBAddress)  // here amount is token B
      // swapTokenToExactToken(amountOut, tokenA_AddressInsatnce, tokenBAddress);
    }
  };

  //swap functions
  const swapExactEthToTokens = async (actualAmount, amountAfterFee) => { // BNB to BTC
    const swapResponse1 = await swappingContractInsatnce.swapExactETHForTokens(
      actualAmount,
      functionCallerAddress,
      tokenBAddress,
      { value: amountAfterFee }
    );
    console.log("swapResponse1: ", swapResponse1);
  };

  const swapEthToExactTokens = async (amountOut, amountAfterFee) => {  // 
    const swapResponse2 = await swappingContractInsatnce.swapETHForExactTokens(
      amountOut,
      tokenBAddress,
      functionCallerAddress,
      { value: amountAfterFee }
    );
    console.log("swapResponse2: ", swapResponse2);
  };

  const swapExactTokenToEth = async (tokenA_address, actualtokenAmount) => { // BTC to BNB
    const swapResponse3 = await swappingContractInsatnce.swapExactTokensForETH(
      actualtokenAmount,
      tokenA_address,
      functionCallerAddress
    );
    console.log("swapResponse3: ", swapResponse3);
  };

  const swapTokenToExactEth = async (amountOut, tokenA_address) => {
    //here amount out is how many eth you want
    const swapResponse4 = await swappingContractInsatnce.swapTokensForExactETH(
      amountOut,
      tokenA_address,
      functionCallerAddress
    );
    console.log("swapResponse4: ", swapResponse4);
  };

  const swapExactTokenToToken = async ( // USDT to BTC
    actualtokenAmount,
    tokenA_address,
    tokenBAddress
  ) => {
    // here actualtokenAmount is token A
    const swapResponse5 =
      await swappingContractInsatnce.swapExactTokensForTokens(
        actualtokenAmount,
        tokenA_address,
        tokenBAddress,
        functionCallerAddress
      );
    console.log("swapResponse5: ", swapResponse5);
  };

  const swapTokenToExactToken = async (amountOut, token1, token2) => {
    //here amount out id token B
    const swapResponse6 =
      await swappingContractInsatnce.swapTokensForExactTokens(
        amountOut,
        tokenA_address,
        tokenBAddress,
        functionCallerAddress
      );
    console.log("swapResponse6: ", swapResponse6);
  };

  return (
    <div>
      <button onClick={() => ExecuteEthToTokenSwap()}>Test Swap</button>
      <button onClick={() => ExecuteTokenToEthSwap()}>
        Test Token Swap To Eth
      </button>
      <button onClick={() => ExecuteTokenToTokenSwap()}>
        ------Test Token to Token
      </button>
    </div>
  );
};
