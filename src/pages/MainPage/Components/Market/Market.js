import React from "react";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import PS5 from "./Market_Assets/Playstation-5.svg";
import XBox from "./Market_Assets/XBox-X.svg";
import Iphone14 from "./Market_Assets/Iphone-14.svg";
import SamsungS22 from "./Market_Assets/Samsung-S22.svg";
import MacBookM1 from "./Market_Assets/MacBook-M1.svg";
import "./Market.css";
import { from } from "form-data";
const Market = () => {
  return (
    <div className="main" id="active">
      {/* <div className="main_header">{<Header />}</div>
      <div className="NavBar">{<NavBar />}</div> */}
      <div className="market_products">
        <div className="market_product">
          <img src={PS5} alt="PS5"></img>
          <p>
            PlayStation 5<br /> Digital 1TB
          </p>
          <a>24 000 TKK</a>
        </div>
        <div className="market_product">
          <img src={XBox} alt="XBox"></img>
          <p>
            XBox Series X<br /> 512GB
          </p>
          <a>20 000</a>
        </div>
        <div className="market_product">
          <img src={PS5} alt="PS5"></img>
          <p>
            PS5 DVD-drive
            <br />
            <br />
          </p>
          <a>26 000</a>
        </div>
        <div className="market_product">
          <img src={XBox} alt="XBox"></img>
          <p>
            XBox Series X<br /> Digital 1TB
          </p>
          <a>23 000</a>
        </div>
        <div className="market_product">
          <img src={Iphone14} alt="Iphone14"></img>
          <p>
            iPhone 14 Pro
            <br /> 258GB
          </p>
          <a>30 000 </a>
        </div>
        <div className="market_product">
          <img src={SamsungS22} alt="SamsungS22"></img>
          <p>
            Samsung S22
            <br /> Ultra 12/256GB
          </p>
          <a>35 000</a>
        </div>
        <div className="market_product">
          <img src={MacBookM1} alt="MacBookM1"></img>
          <p>
            MacBook 2021
            <br /> M1 Pro
          </p>
          <a>50 000</a>
        </div>
        <div className="market_product">
          <img src={XBox} alt="XBox"></img>
          <p>
            XBox Series X<br /> 1TB
          </p>
          <a>23 000</a>
        </div>
      </div>
    </div>
  );
};

export default Market;
