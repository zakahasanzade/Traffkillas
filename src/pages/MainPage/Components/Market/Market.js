import React from "react";
import PS5 from "./Market_Assets/Playstation-5.svg";
import XBox from "./Market_Assets/XBox-X.svg";
import Iphone14 from "./Market_Assets/Iphone-14.svg";
import SamsungS22 from "./Market_Assets/Samsung-S22.svg";
import MacBookM1 from "./Market_Assets/MacBook-M1.svg";
import { motion } from "framer-motion/dist/framer-motion";

import "./Market.css";
const Market = () => {
  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      {/* <div className="main_header">{<Header />}</div>
      <div className="NavBar">{<NavBar />}</div> */}
      <div className="market_products">
        <div className="market_product">
          <img src={PS5} alt="PS5"></img>
          <p>
            PlayStation 5<br /> Digital 1TB
          </p>
          <a href="/">24 000 TKK</a>
        </div>
        <div className="market_product">
          <img src={XBox} alt="XBox"></img>
          <p>
            XBox Series X<br /> 512GB
          </p>
          <a href="/">20 000</a>
        </div>
        <div className="market_product">
          <img src={PS5} alt="PS5"></img>
          <p>
            PS5 DVD-drive
            <br />
            <br />
          </p>
          <a href="/">26 000</a>
        </div>
        <div className="market_product">
          <img src={XBox} alt="XBox"></img>
          <p>
            XBox Series X<br /> Digital 1TB
          </p>
          <a href="/">23 000</a>
        </div>
        <div className="market_product">
          <img src={Iphone14} alt="Iphone14"></img>
          <p>
            iPhone 14 Pro
            <br /> 258GB
          </p>
          <a href="/"> 30 000 </a>
        </div>
        <div className="market_product">
          <img src={SamsungS22} alt="SamsungS22"></img>
          <p>
            Samsung S22
            <br /> Ultra 12/256GB
          </p>
          <a href="/">35 000</a>
        </div>
        <div className="market_product">
          <img src={MacBookM1} alt="MacBookM1"></img>
          <p>
            MacBook 2021
            <br /> M1 Pro
          </p>
          <a href="/">50 000</a>
        </div>
        <div className="market_product">
          <img src={XBox} alt="XBox"></img>
          <p>
            XBox Series X<br /> 1TB
          </p>
          <a href="/">23 000</a>
        </div>
      </div>
    </motion.div>
  );
};

export default Market;
