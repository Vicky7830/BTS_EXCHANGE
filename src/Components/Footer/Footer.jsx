import React from 'react'
import as from "./Footer.module.css"

import { SiCoinmarketcap } from "react-icons/si";
import { FaLinkedin, FaTelegramPlane } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

import { FaYoutube } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FcShop } from "react-icons/fc";
import { Link } from 'react-router-dom';

const Footer = () => {


    return (
        <div className={`${as.Footer}   d-flex`}  >

            {/* footer divided into two section   */}

            {/* 1st one   */}
            <div className={`${as.Footersub1}    d-flex justify-content-end  align-items-center`}  >

                {/* coin details box  */}
                <div className={`${as.CoinDetailsBox}  `}   >

                    {/* conin details head  */}
                    <div className={`${as.CoinDetailshead}  d-flex `}   >
                        {/* divides into 2, 1st one shows coin and 2nd one shows buy coin button  */}


                        <div className={`${as.CoinDetailshead_1} d-flex `}   >
                            {/* icon  */}
                            <div className={`${as.img_cont}  d-flex justify-content-center align-items-center`}  >
                                {/* logo   */}
                                <img alt='coin_icon' loading='lazy' src={require("../../assets/icon.png")}    ></img>
                            </div>

                            {/* 2nf  / */}

                            <div className={`${as.img_cont}  d-flex flex-column   justify-content-center align-items-start`}  >
                                <h6 className='mb-0 mt-1 pb-0 letter-spacing-1'>BITS</h6>
                                <h5 className='mt-1 pt-0 '>0.091</h5>
                            </div>
                        </div>



                        <div className={`${as.CoinDetailshead_2} d-flex justify-content-center align-items-center `}   >

                            <button   >Buy Now</button>

                        </div>



                        <div>

                        </div>
                    </div>


                    <hr className='pt-1 mt-2 mt-0 pb-0 mb-0 text-secondary '  ></hr>



                    {/* coin details content via table  */}
                    <table className={`${as.CoinDetailsContent} `}   >
                        <tbody>
                            {/* 1 */}
                            <tr>
                                <td>Max Supply</td>
                                <td>1000000000</td>
                            </tr>

                            {/* 2// */}
                            {/* 1 */}
                            <tr>
                                <td>Total supply</td>
                                <td>1000000000</td>
                            </tr>


                            {/* 3 */}
                            {/* 1 */}
                            <tr>
                                <td>Circulating supply</td>
                                <td>45424400</td>
                            </tr>

                            {/* 4 */}

                            {/* 1 */}
                            <tr>
                                <td>Total Burned</td>
                                <td>44500.26</td>
                            </tr>

                            {/* 5 */}

                            {/* 1 */}
                            <tr>
                                <td>Market Cap</td>
                                <td>758800.23</td>
                            </tr>
                        </tbody>


                    </table>


                </div>


            </div>




            {/* 2nd one  */}
            <div className={`${as.Footersub2}  d-flex justify-content-start  align-items-top`}  >

                {/* 3 /  */}

                {/* 3*3  */}

                {/* 1 */}

                <div className={`${as.column_container} `}  >
                    <span className='text-center d-flex fw-bold justify-content-center text-white'  >About Us</span>
                    <ul>
                        <li><a href=''   >Docs</a></li>
                        <li><a href=''   >Team</a></li>
                        <li><a href=''   >Blog</a></li>
                        <li><a href=''   >Docs</a></li>

                    </ul>

                </div>

                {/* 2 */}

                <div className={`${as.column_container}`}  >
                    <span className='text-center d-flex fw-bold justify-content-center text-white'  >About Us</span>
                    <ul>
                        <li><a href=''   >Docs</a></li>
                        <li><a href=''   >Team</a></li>
                        <li><a href=''   >Blog</a></li>
                        <li><a href=''   >Docs</a></li>

                    </ul>

                </div>

                {/* 3 */}
                <div className={`${as.column_container}`}  >
                    <span className='text-center d-flex fw-bold justify-content-center text-white'  >About Us</span>
                    <ul>
                        <li><a href=''   >Docs</a></li>
                        <li><a href=''   >Team</a></li>
                        <li><a href=''   >Blog</a></li>
                        <li><a href=''   >Docs</a></li>

                    </ul>

                </div>

                {/* 4 */}
                <div className={`${as.column_container_community} d-flex flex-column `}  >
                    <span className='text-center d-flex fw-bold justify-content-center text-white'  >Community</span>

                    {/* community icons / */}
                    <div className={`${as._community_icons}`}  >

                        <Link className='text-white'  to={""}  target='_blank'    > <SiCoinmarketcap className={`${as._community_icons_icon}`} /> </Link>
                        <Link className='text-white'  to={"https://t.me/+1cKbjwMxalRkYmRl"}  target='_blank'    ><FaTelegramPlane className={`${as._community_icons_icon}`} /></Link>
                        <Link className='text-white'  to={"https://www.instagram.com/bitsswaps/"}  target='_blank'    > <RiInstagramFill className={`${as._community_icons_icon}`} /> </Link>
                        <Link className='text-white'  to={"https://www.facebook.com/profile.php?id=61554413385597"}  target='_blank'    >  <FaFacebook className={`${as._community_icons_icon}`} /> </Link>
                        <Link className='text-white'  to={""}  target='_blank'    > <FaTwitter className={`${as._community_icons_icon}`} /> </Link>
                       <Link className='text-white'  to={""}  target='_blank'    >  <FaLinkedin className={`${as._community_icons_icon}`} /> </Link>
                       <Link className='text-white'  to={"https://www.youtube.com/channel/UCnj71dG9gWSEypZYy98zBFQ"}  target='_blank'    >  <FaYoutube className={`${as._community_icons_icon}`} /> </Link>
                        <Link className='text-white'  to={""}  target='_blank'    > <FaSquareGithub className={`${as._community_icons_icon}`} /> </Link>
                    </div>

                    <div className={`${as.morebtns}  d-flex flex-column`}  >

                        <a className={`${as.morebtns_a}  `}    >
                            <FcShop className={`${as._community_marketplace_icon}`} />
                            <span className={`${as.morebtns_marketplacecaption}  `}   >Marketplace</span>
                        </a>


                        <a className={`${as.morebtns_b} bg-light `}    >
                            {/* <FcShop  className={`${as._community_marketplace_icon}`} /> */}
                            <img alt='audit' loading='lazy' src={require("../../assets/audit.png")}  ></img>
                        </a>

                    </div>


                </div>



            </div>





        </div>
    )
}

export default Footer