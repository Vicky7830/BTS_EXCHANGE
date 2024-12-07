import React, { useState, useEffect } from "react";
import as from "./Navbar.module.css";
// import logo from "../../assets/bsw.svg"
import LOGO from "../../assets/icon_big_300.png";
import { FaWallet } from "react-icons/fa6";
import { RiExchangeFundsLine } from "react-icons/ri";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaTractor } from "react-icons/fa";
import { FaEthereum } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { TbUserDollar } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import WalletPopUp from "../../services/walletConnect/WalletPopUp";
import { checkWhichAccountIsConnected, disconnectWallet } from "../../utils";
import MbSiddebar from "./MobileSidebar";

const Navbar = () => {
  // navigation hook
  const navigate = useNavigate();

  // states
  const [popUpVis, setPopUpVis] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");

  // mobile sidebar states 
const [mobileSidebar, setMobileSidebar] = useState(false)

  useEffect(() => {
    checkConnectedWallet();
    // disconnectWallet();
  }, []);
  useEffect(() => {
    if (selectedAccount) {
      popUpVisHandler();
    }
  }, [selectedAccount]);



  const formatAddress = (address) => {
    if (address) {
      return `${address.slice(0, 5)}...${address.slice(-5)}`;
    }
    return "Connect Wallet";
  };
  

  //connect to wallet
  const checkConnectedWallet = async () => {
    let account = await checkWhichAccountIsConnected();
    setSelectedAccount(account?.[0] || "");
  };

  // popUp Visibility toggler
  const popUpVisHandler = async () => {
    setPopUpVis((prev) => !prev);
  };

    // popUp Visibility toggler
    const mobileSideVis = async () => {
      setMobileSidebar(!mobileSidebar);
    };
  

// useEffect(()=>{
//   const NavList  = document.getElementsByClassName("NavList")
//   console.log("NavList=>>>>",NavList);

// if(mobileSidebar === true){
// console.log(mobileSidebar,"mobilesidebar");
// }
// else{
//   console.log(mobileSidebar,"mobilesidebarelse");

//   NavList[0].style.display="none"
//   NavList[1].style.display="none"
//   NavList[2].style.display="none"
// }

// },[mobileSidebar])



  return (
    <>

{  mobileSidebar?   <MbSiddebar  mobileSideVis={mobileSideVis}   ></MbSiddebar> : null   }

    
      {/* wallet pop up rendering   */}
      {popUpVis ? (
        <WalletPopUp
          popUpVisHandler={popUpVisHandler}
          setAccount={setSelectedAccount}
        ></WalletPopUp>
      ) : null}

      <div className={`${as.NavbarCont} d-flex`}>
        {/* 1st  slice */}
        <div className={`${as.NavbarSlice1} d-flex`}>
          {/* logo container  */}
          <div
            className={`${as.LogoContainer} d-flex align-items-center gap-2`}
          >
            <Link to="/">
              {/* logo   */}
              <img className={`${as.logo}`} src={LOGO}></img>

            </Link>

            <GiHamburgerMenu className={`${as.Hamburger}`}
            onClick={()=>setMobileSidebar(!mobileSidebar)}
             />




            {/* <span> biswap</span> */}
          </div>




          {/* nav list container  */}
          <div className={`${as.navList}`}>




            <ul
              className={`${as.navListul} d-flex align-items-center justify-content-start gap-3 `}
            >
            
              <li id={as.trade}>
               <span className={`${as.navName}`}    > Trade</span>

                <span     className={`${as.NavSublist}  NavList   `}>
                  <ul id={as.tradeDropdown}>
                    {/* 1 */}

                    <li
                      className="d-flex"
                      onClick={() => navigate("/swap")}   
                    >
                      {/* exchnage icon container  */}
                      <div className={`${as.li1} `}>
                        <span>
                          <RiExchangeFundsLine className={as.exchange_icon} />
                        </span>
                      </div>

                      {/* exchange icon next text   */}
                      <div className={`${as.li2}  d-flex flex-column`}>
                        <div className={`${as.li2a} `}>Exchange</div>
                        <div className={`${as.li2b}`}>
                          Swap with low trading fees
                        </div>
                      </div>
                    </li>

                    {/* 2 */}

                    <li className="d-flex" onClick={() => navigate("/pool")}>
                      {/* exchnage icon container  */}
                      <div className={`${as.li1} `}>
                        <span>
                          <AiFillDollarCircle className={as.exchange_icon} />
                        </span>
                      </div>

                      {/* exchange icon next text   */}
                      <div className={`${as.li2}  d-flex flex-column`}>
                        <div className={`${as.li2a}`}>Liquidity</div>
                        <div className={`${as.li2b} `}>
                          Start earning from fees
                        </div>
                      </div>
                    </li>

                    {/* ends here  */}
                  </ul>
                </span>
              </li>

              {/* earn dropdown  */}
              {/* earn dropdown  */}
              {/* earn dropdown  */}
              <li id={as.trade}>
              <span className={`${as.navName}`}    > Earn</span>

                
                <span   className={`${as.NavSublist}  NavList   `}>
                  <ul id={as.tradeDropdown}>
                    {/* 1 */}

                    <li className="d-flex" onClick={() => navigate("")}   >
                      {/* exchnage icon container  */}
                      <div className={`${as.li1} `}>
                        <span>
                          <FaTractor className={as.exchange_icon} />
                        </span>
                      </div>

                      {/* exchange icon next text   */}
                      <div className={`${as.li2}  d-flex flex-column`}>
                        <div className={`${as.li2a}`}>Farms</div>
                        <div className={`${as.li2b} `}>Earn double rewards</div>
                      </div>
                    </li>

                    {/* 2 */}

                    <li className="d-flex" onClick={() => navigate("")}  >
                      {/* exchnage icon container  */}
                      <div className={`${as.li1} `}>
                        <span>
                          <FaEthereum className={as.exchange_icon} />
                        </span>
                      </div>

                      {/* exchange icon next text   */}
                      <div className={`${as.li2}  d-flex flex-column`}>
                        <div className={`${as.li2a}`}>Fixed Staking</div>
                        <div className={`${as.li2b} `}>
                          Earn high returns, Easy Stake
                        </div>
                      </div>
                    </li>

                    {/* 3*/}

                    {/* <li className="d-flex"> */}
                    {/* exchnage icon container  */}
                    {/* <div className={`${as.li1} `}>
                        <span>
                          <TiGroupOutline className={as.exchange_icon} />
                        </span>
                      </div> */}

                    {/* exchange icon next text   */}
                    {/* <div className={`${as.li2}  d-flex flex-column`}>
                        <div className={`${as.li2a}`}>Referral Program</div>
                        <div className={`${as.li2b} `}>Refer and get more</div>
                      </div>
                    </li> */}

                    {/* ends here  */}
                  </ul>
                </span>
              </li>

              {/* more dropdown  */}
              {/* more dropdown  */}
              <li id={as.trade}>
              <span className={`${as.navName}`} >More</span>

                
                <span   className={`${as.NavSublist}  NavList   `}>
                  <ul id={as.tradeDropdown}>
                    {/* 1 */}

                    <li className="d-flex"  onClick={()=>{navigate("")}}   >
                      {/* exchnage icon container  */}
                      <div className={`${as.li1} `}>
                        <span>
                          <PiCurrencyCircleDollarFill
                            className={as.exchange_icon}
                          />
                        </span>
                      </div>

                      {/* exchange icon next text   */}
                      <div className={`${as.li2}  d-flex flex-column`}>
                        <div className={`${as.li2a}`}>Remove V3 Liquidity</div>
                        <div className={`${as.li2b} `}>
                          All trading fees earned along with removed liquidity.{" "}
                        </div>
                      </div>
                    </li>

                    {/* 2 */}

                    <li className="d-flex" onClick={()=>{navigate("")}}  >
                      {/* exchnage icon container  */}
                      <div className={`${as.li1} `}>
                        <span>
                          <TbUserDollar className={as.exchange_icon} />
                        </span>
                      </div>

                      {/* exchange icon next text   */}
                      <div className={`${as.li2}  d-flex flex-column`}>
                        <div className={`${as.li2a}`}>Add Liquidity to V3</div>
                        <div className={`${as.li2b} `}>
                          Provide liquidity to V3 protocol and increase capital
                          efficiency
                        </div>
                      </div>
                    </li>


                      {/* 3 */}

                      <li className="d-flex" onClick={() => navigate("")}  >
                      {/* exchnage icon container  */}
                      <div className={`${as.li1} `}>
                        <span>
                          <FaEthereum className={as.exchange_icon} />
                        </span>
                      </div>

                      {/* exchange icon next text   */}
                      <div className={`${as.li2}  d-flex flex-column`}>
                        <div className={`${as.li2a}`}>Unstake </div>
                        <div className={`${as.li2b} `}>
                          Claim reward and unstake 
                        </div>
                      </div>
                    </li>

                    {/* ends here  */}
                  </ul>
                </span>
              </li>
            </ul>
          </div>

          {/* buy button container   */}

          <div className={`${as.navBuyBtnCont} d-flex align-items-center   `}>
            <span></span>
            <button className={`${as.navBuyCont}   text-white `} onClick={()=>{navigate("")}}   >Buy Crypto</button>
          </div>
        </div>

        {/* 2nd  slice */}
        <div
          className={`${as.NavbarSlice2} d-flex align-items-center justify-content-end `}
        >
          {/* lang cont  */}
          <div className={`${as.LangCont}    `}></div>

          {/* wallet btn  */}
          <div
            className={`${as.Walletbtn}  d-flex align-items-center justify-content-center gap-2  `}
            onClick={  popUpVisHandler}
          >
            <FaWallet className={`${as.Walleti}    `} />
            <span id={`${as.walletAddress}`}>
            {formatAddress(selectedAccount)} </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
