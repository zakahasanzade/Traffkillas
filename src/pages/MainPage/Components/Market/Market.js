import React, { useEffect, useState } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { Uploader } from "rsuite";
import TextareaAutosize from "react-textarea-autosize";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import dropify from "dropify";
import notify from "devextreme/ui/notify";
import FileUploader from "devextreme-react/file-uploader";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

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

  const SendMarketData = (e) => {
    e.preventDefault();
    const form = document.getElementById("form");

    const formData = new FormData(form);

    e.preventDefault();
    axios
      .post("https://22f3-89-77-236-116.eu.ngrok.io/check", formData.values)
      .then((res) => {
        console.log(res.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData.values);
  };
  // specify upload params and url for your files

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  const icon = <i class="fa-solid fa-paperclip"> Закрепить Файл </i>;
  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <form
        className="market_send"
        id="form"
        onSubmit={(e) => SendMarketData(e)}
      >
        <div className="market_send_title">
          <TextareaAutosize placeholder="Заголовок товара"></TextareaAutosize>
          <p>
            <input placeholder="Цена" /> TTK
          </p>
        </div>
        <TextareaAutosize
          placeholder="Полное название товара..."
          className="market_send_nameProduct"
        ></TextareaAutosize>
        <div className="market_send_submit">
          <p>
            Изображение товара:{" "}
            <Dropzone
              onChangeStatus={handleChangeStatus}
              accept="image/*"
              maxFiles="1"
              inputContent={icon}
            />
          </p>
          <button className="market_send_submit_button">
            <i class="fa-solid fa-cart-plus"> Добавить товар </i>
          </button>
        </div>
      </form>
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
