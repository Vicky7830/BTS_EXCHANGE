import { ethers } from 'ethers';
import React, { useState } from 'react'
import commonTokenAbi from "../enviornment/commonTokenAbi.json";


export const SearchTokenData = () => {

    const [contractAddress , setContractAddress] = useState("")
    const [isToken, setIsToken] = useState(false);
    const [tokenDetails, setTokenDetails] = useState({
        name: "",
        symbol: "",
        decimals: ""
    })

    console.log("contractAddress:",contractAddress);
    
    const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = walletProvider.getSigner();

    const handleInputTokenAddress = async (e) => {
        setContractAddress(e.target.value);
        console.log("contractAddress:",contractAddress);
        
        const contractData = await walletProvider.getCode(e.target.value);
        console.log("contractData:",contractData);
        
        if(contractData === "0x"){
             console.log("Invalid Token address")
        }
        else{
            setIsToken(true);
            console.log("Valid Token address");
            const newTokenInstance = new ethers.Contract(e.target.value, commonTokenAbi, signer);
            const tokenName = await newTokenInstance.name();
            const tokenSymbol = await newTokenInstance.symbol();
            const tokenDecimals = await newTokenInstance.decimals();
            setTokenDetails({
                name: tokenName,
                symbol: tokenSymbol,
                decimals: tokenDecimals
            })


        }
    }
    console.log("tokenDetails:",tokenDetails);
    
    // token Adddress : "0x9A1628b2f0D8f183b72841cA9374049Eaa8d0eA0"
  return (
    <div> Sandeep
      Enter token address: <input placeholder='Enter token address' onChange={(e)=> handleInputTokenAddress(e)} style={{backgroundColor:"black", width :"auto"}}/> <br/>
     </div>
  )
}
