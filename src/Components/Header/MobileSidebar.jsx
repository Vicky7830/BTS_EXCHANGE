import React, { useState, useEffect } from "react";
import as from "./MbSide.module.css";
import { RiExchangeFundsLine } from "react-icons/ri";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaTractor } from "react-icons/fa";
import { FaEthereum } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { TbUserDollar } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const MbSiddebar = (props) => {
  // navigation hook
  const navigate = useNavigate();





  return (
    <>
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
                      onClick={() => { props.mobileSideVis()   ;  navigate("/Exchange")}}
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

                    <li className="d-flex" onClick={() => {  props.mobileSideVis()   ;   navigate("/Exchange/Liquidity")}}>
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

                    <li className="d-flex" onClick={() => { props.mobileSideVis()   ;   navigate("/Earn/Farm")}}   >
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

                    <li className="d-flex" onClick={() => { props.mobileSideVis()   ;   navigate("/Earn/Stake")}}  >
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

                    <li className="d-flex"  onClick={()=>{ props.mobileSideVis() ; navigate("/Exchange/Liquidity/YourPools")}}     >
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

                    <li className="d-flex "   onClick={()=>{ props.mobileSideVis()   ; navigate("/Exchange/Liquidity/add")}}     >
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

                                          <li className="d-flex" onClick={() => {navigate("/Earn/UserStaking"); props.mobileSideVis()   ;}}  >
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


</>


  );
};

export default MbSiddebar;
