import React, { useEffect, useState } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import "./Market.css";

const Market = () => {
  let AssetsArr = [];
  const [assets, SetAssets] = useState();
  const getAssets = () => {
    fetch("http://94.103.90.6:5000/get_market", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        // const getArray = JSON.parse(result)["data"];
        AssetsArr = JSON.parse(result)["data"];
        SetAssets(AssetsArr);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getAssets();
  }, []);
  console.log(assets);
  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="market_products">
        {assets &&
          assets.map((product) => {
            const { name, price, url } = product;
            return (
              <div className="market_product">
                <img src={url} alt={url}></img>
                <p>{name}</p>
                <a href="/">{price}</a>
              </div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default Market;
