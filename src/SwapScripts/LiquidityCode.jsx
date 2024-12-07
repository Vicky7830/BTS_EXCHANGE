import { ethers } from 'ethers';
import React from "react";
import swapContractAbi from "../enviornment/swapContractAbi.json";
import commonTokenAbi from "../enviornment/commonTokenAbi.json";

export const LiquidityCode = () => {
console.log("Adding Liquidity code initialized");

  const swappingContractAddress = "0x2e0D7CcC6a825a73cfa608A8986dDa0B7a602915";
  const functionCallerAddress = "0x98a9E141Da7814bFAe91bCe5920194af20cd65F5";  //caller wallet address
  const tokenBAddress = "0x9A1628b2f0D8f183b72841cA9374049Eaa8d0eA0"; //bitscoin
  const tokenA_address = "0xF352E4D29CDa25e1F89F5629Ba0FBf58D867A584"; //usdt

  const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = walletProvider.getSigner();
  const swappingContractInsatnce = new ethers.Contract(
    swappingContractAddress,
    swapContractAbi,
    signer
  );
  console.log("swappingContractInsatnce: ", swappingContractInsatnce);
  

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



   async function addingEthLiquidity() {
    //demo amounts :
    console.log("start");
    

    const actualAmount =   ethers.utils.parseUnits("0.001", "18"); //ether
     
    console.log("actualAmount: ", actualAmount.toString());

    const Fee = await swappingContractInsatnce.chargedFee(actualAmount);
    console.log("Fee",Fee);
    const amountAfterFee = Number(actualAmount) + Number(Fee);
    const token_B_Amount = ethers.utils.parseUnits("10", "18");
    const currentAllowance = await tokenBAddressInsatnce.allowance(
      functionCallerAddress,
      swappingContractAddress
    );
    if(Number(currentAllowance.toString()) >= Number(token_B_Amount)){
      const liquidityRes = await swappingContractInsatnce.addLiquidityETH(tokenBAddress,token_B_Amount,actualAmount,functionCallerAddress,{ value: amountAfterFee.toString() });  //we are using quote value here (bitscoin)
    console.log("liquidityRes: ", liquidityRes);
    
    }
    else{
      const approveData = await doApproval(tokenBAddressInsatnce);
      const liquidityRes = await swappingContractInsatnce.addLiquidityETH(tokenBAddress,token_B_Amount,actualAmount,functionCallerAddress,{ value: amountAfterFee.toString() });  //we are using quote value here (bitscoin)
     console.log("liquidityRes: ", liquidityRes);
     
    }
     
  }

  async function addingTokenLiquidity() {
    const token_A_Amount = ethers.utils.parseUnits("10", "18");
    const token_B_Amount = ethers.utils.parseUnits("10", "18");
    const currentTokenBAllowance = await tokenBAddressInsatnce.allowance(
      functionCallerAddress,
      swappingContractAddress
    );

    const currentTokenAAllowance = await tokenA_AddressInsatnce.allowance(
      functionCallerAddress,
      swappingContractAddress
    );
    
    if(Number(currentTokenAAllowance.toString()) >= Number(token_A_Amount)  && Number(currentTokenBAllowance.toString()) >= Number(token_B_Amount)){
      const liquidityTokenRes = await swappingContractInsatnce.addLiquidity(tokenA_address,tokenBAddress,token_A_Amount,token_B_Amount,functionCallerAddress);  //we are using quote value here (bitscoin)
     console.log("liquidityTokenRes: ", liquidityTokenRes);
    
    }
    else{
      const approveDataA = await doApproval(tokenA_AddressInsatnce);
      const approveData = await doApproval(tokenBAddressInsatnce);
      const liquidityTokenRes =  await swappingContractInsatnce.addLiquidity(tokenA_address,tokenBAddress,token_A_Amount,token_B_Amount,functionCallerAddress);  //we are using quote value here (bitscoin)
      console.log("liquidityTokenRes: ", liquidityTokenRes);
     
    }
    
  }


  return (
    <div>
        <button onClick={addingEthLiquidity}>AllEthLiquidity</button> <br/>
        <button onClick={addingTokenLiquidity}>AllTokenLiquidity</button>
    </div>
  )
}
