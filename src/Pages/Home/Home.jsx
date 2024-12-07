import React, { useEffect, useState } from "react";
import as from "./Home.module.css";
import gif from "../../assets/icon.gif";
import { useNavigate } from "react-router-dom";
import CurrencyList from "./CurrencyList";

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalVolume: 45510000000, // $45.51B
    dailyVolume: 15510000, // $15.51M
    tradeFeeSaved: 112250000, // $112.25M
    lpEarned: 23100000, // $23.10M
    monthlyActiveUsers: 59000, // 59.00k
  });

  // Simulate live updates
  useEffect(() => {
    const updateStats = () => {
      setStats((prevStats) => ({
        totalVolume: adjustValue(prevStats.totalVolume, 100000000, 50000000),
        dailyVolume: adjustValue(prevStats.dailyVolume, 500000, 100000),
        tradeFeeSaved: adjustValue(prevStats.tradeFeeSaved, 200000, 100000),
        lpEarned: adjustValue(prevStats.lpEarned, 50000, 10000),
        monthlyActiveUsers: adjustValue(prevStats.monthlyActiveUsers, 500, 100),
      }));
    };

    const intervalId = setInterval(updateStats, 3000); // Update every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Helper function to adjust values up or down
  const adjustValue = (currentValue, maxChange, minChange) => {
    const change = Math.floor(
      Math.random() * (maxChange - minChange + 1) + minChange
    );
    return Math.random() > 0.5 ? currentValue + change : currentValue - change;
  };

  // Format large numbers to display with units
  const formatNumber = (value) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}k`;
    return `$${value}`;
  };

  return (
    <>
      <div className={as.LandingCont}>
        <div className={as.IntroContainer}>
          {/* Intro section */}
          <div
            className={`${as.Intro_SubContainer1} d-flex align-items-center justify-content-end flex-column `}
          >
            <h2 className="text-uppercase letter-spacing-2 d-flex justify-content-center ">
             BITSSWAPS{" "}
              <span className="fw-bolder d-flex align-items-center">
                <hr></hr>
              </span>
            </h2>
            <h5 className="mt-0 pt-0">
              Boost capital efficiency with flexible trading & earning features
            </h5>

            {/* Buttons */}
            <div className={`${as.Intro_SubContainer1_btn_container}  `}>
              <button
                className={as.Intro_SubContainer1_btn}
                onClick={() => navigate("/swap")}
              >
                Trade Now
              </button>
              <button className={as.Intro_SubContainer1_btn}>Know more</button>
            </div>
          </div>

          {/* Intro image */}
          <div className={as.Intro_SubContainer2}>
            <img src={gif} alt="icon" loading="lazy"></img>
          </div>
        </div>

        <CurrencyList />

        {/* Features */}
        <div className={`${as.Landing3Fetaures}`}>
          <h1 className={`${as.ourSwap} text-uppercase`}>Our Swap</h1>

          <div className={`${as.Landing3FetauresCont}`}>
            {/* Dynamic stats */}
            <div className={`${as.featurebox1} ${as.featurebox}`}>
              <div className={`${as.imagecont} bg-red`}>
                <img
                  alt="feature_1"
                  loading="lazy"
                  src={require("../../assets/money_pot.png")}
                ></img>
              </div>
              <h6 className="fw-bold">Total Volume</h6>
              <h4 className="fw-bold">{formatNumber(stats.totalVolume)}</h4>
            </div>

            <div className={`${as.featurebox1} ${as.featurebox}`}>
              <div className={`${as.imagecont} bg-parrot`}>
                <img
                  alt="feature_2"
                  loading="lazy"
                  src={require("../../assets/volume.png")}
                ></img>
              </div>
              <h6 className="fw-bold">24H Volume</h6>
              <h4 className="fw-bold">{formatNumber(stats.dailyVolume)}</h4>
            </div>

            <div className={`${as.featurebox1} ${as.featurebox}`}>
              <div className={`${as.imagecont} bg-purple`}>
                <img
                  alt="feature_3"
                  loading="lazy"
                  src={require("../../assets/user.png")}
                ></img>
              </div>
              <h6 className="fw-bold">Monthly Active Users</h6>
              <h4 className="fw-bold">{formatNumber(stats.monthlyActiveUsers)}</h4>
            </div>

            <div className={`${as.featurebox1} ${as.featurebox}`}>
              <div className={`${as.imagecont} bg-yellow`}>
                <img
                  alt="feature_4"
                  loading="lazy"
                  src={require("../../assets/discount.png")}
                ></img>
              </div>
              <h6 className="fw-bold">Trade Fee Saved</h6>
              <h4 className="fw-bold">{formatNumber(stats.tradeFeeSaved)}</h4>
            </div>

            <div className={`${as.featurebox5} ${as.featurebox} border-none`}>
              <div className={`${as.imagecont} bg-blue`}>
                <img
                  alt="feature_5"
                  loading="lazy"
                  src={require("../../assets/lp.png")}
                ></img>
              </div>
              <h6 className="fw-bold">LP Earned</h6>
              <h4 className="fw-bold">{formatNumber(stats.lpEarned)}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
