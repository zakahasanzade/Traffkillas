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
import { CSSTransition } from "react-transition-group";
import FormData from "form-data";
import { useRef } from "react";

import "./Market.css";
import { cookie, image } from "fontawesome";

const Market = () => {
  let AssetsArr = [];
  const [assets, SetAssets] = useState();
  const getAssets = () => {
    document.cookie = "test=hello;";
    fetch("http://94.103.90.6:5000/get_market", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
        Cookie: document.cookie,
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
  // console.log(assets);

  function submit(e) {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    document.cookie = "token=hello;";
    axios
      .post(
        "http://94.103.90.6:5000/test_cookie",

        formData,
        { withCredentials: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            Cookie:
              "id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly",
          },
          credentials: "include",
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
    // getAssets();
  }
  const DeletePost = (e) => {
    e.preventDefault();
    fetch("http://94.103.90.6:5000/delete_market", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        _id: e.target.id,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {})
      .catch((err) => {
        alert(err);
      });

    console.log(e.target);
    getAssets();
  };
  const headers = new Headers();
  headers.append("Cookie", "name1=value1; name2=value2");
  const [ProofProduct, SetProofProduct] = useState();
  const [SubmitProduct, SetSubmitProduct] = useState();
  const [PoductName, SetProductName] = useState();
  const [PoductId, SetProductId] = useState();
  const [getCode,SetGetCode]=useState()
  const BuyProduct = (e) => {
    fetch("http://94.103.90.6:5000/buy_market", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        Token: localStorage.getItem("token"),
      },
      withCredentials: true,
      body: JSON.stringify({ _id: PoductId }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        SetGetCode(JSON.parse(result).code)
      })
      .catch((err) => {
        alert(err);
      });
  };

  // const handleChangeStatus = ({ meta, file }, status) => {
  //   return status, meta, file;
  // };
  // const SendProductInfo = (e) => {
  //   e.preventDefault();
  //   let ProductInfo = {
  //     Title: document.querySelector(".TitleText").value,
  //     Price: document.querySelector(".ProductPrice").value,
  //     Imagere: { handleChangeStatus },
  //   };
  //   console.log(ProductInfo);
  //   fetch("http://94.103.90.6:5000/edit_profile_info", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: localStorage.getItem("token"),
  //     },
  //     body: JSON.stringify(ProductInfo),
  //   })
  //     .then((response) => {
  //       return response.text();
  //     })
  //     .then((result) => {
  //       // console.log(result);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };
  // specify upload params and url for your files
  // useEffect(() => {
  //   const DropzoneElement = document.querySelector(".dzu-input");
  //   DropzoneElement.setAttribute("name", "Image");
  //   DropzoneElement.setAttribute("id", "json");
  //   console.log(DropzoneElement);
  // });
  // DropzoneElement.setAttribute("name", "horse");
  // DropzoneElement.setAttribute('name', 'Image')
  const icon = <i className="fa-solid fa-paperclip"> Закрепить Файл </i>;
  useEffect(() => {
    const closeWindow = (e) => {
      if ( ProofProduct==true) {
        SetProofProduct();
        SetSubmitProduct()
      }
    };
    document.body.addEventListener("click", closeWindow);
  }, []);
  return (
    <>
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <form className="market_send" id="form" onSubmit={(e) => submit(e)}>
        <div className="market_send_title">
          <TextareaAutosize
            className="TitleText"
            placeholder="Заголовок товара"
            name="Name"
          ></TextareaAutosize>
          <p>
            <input placeholder="Цена" className="ProductPrice" name="Price" />{" "}
            TTK
          </p>
        </div>
        <TextareaAutosize
          placeholder="Полное название товара..."
          className="market_send_nameProduct"
          name="Content"
        ></TextareaAutosize>
        <div className="market_send_submit">
          <p>
            Изображение товара:{" "}
            {/* <Dropzone
              onChangeStatus={handleChangeStatus}
              accept="image/*"
              maxFiles="1"
              inputContent={icon}
              id="Image"
              type="file"
              name="Image"
            ></Dropzone> */}
            <input
              // onChangeStatus={handleChangeStatus}
              accept="image/*"
              maxfiles="1"
              inputcontent={icon}
              id="Image"
              type="file"
              name="Image"
            ></input>
          </p>
          <button
            className="market_send_submit_button"
            // onClick={SendProductInfo}
          >
            <i className="fa-solid fa-cart-plus"> Добавить товар </i>
          </button>
        </div>
      </form>
      <div className="market_products">
        {assets &&
          assets.map((product) => {
            const { name, price, url, _id, content } = product;
            return (
              <div
                className="market_product"
                async
                onClick={() => {
                  SetProofProduct(!ProofProduct);
                  SetProductName(product.name);
                  SetProductId(product._id);
                }}
              >
                <img src={url} alt={url} id={_id}></img>
                <p>{name}</p>
                <a>{price} TTK</a>{" "}
                <i
                  className="fa-solid fa-trash-can market_product_delete"
                  onClick={(e) => {
                    e.preventDefault();
                    // DeletePost;
                  }}
                ></i>
              </div>
            );
          })}
        <CSSTransition
          in={ProofProduct}
          classNames="alert"
          timeout={1000}
          unmountOnExit
        >
          <div className="ProofBuy">
            <p style={{ fontSize: "24px" }}>{PoductName}</p>
            <div className="ProofBuy_submit">
              <p style={{ fontSize: "20px" }}>Оформление покупки</p>
              <button
                onClick={(e) => {SetSubmitProduct(!SubmitProduct);BuyProduct()}}
                type="submit"
                style={{ fontSize: "16px", color: "red" }}
              >
                -50 000 TTK
              </button>
              <p style={{ fontSize: "12px" }}>550 000 TTK = 500 000 TTK</p>
            </div>
          </div>
        </CSSTransition>
        
      </div>
    </motion.div>
    <CSSTransition
          in={SubmitProduct}
          classNames="alert"
          timeout={1000}
          unmountOnExit
        >
          <div className="ProofBuy">
            <p style={{ fontSize: "24px" }}>{PoductName}</p>
            <div className="ProofBuy_submit">
              <p style={{ fontSize: "20px" }}>Успешно!</p>
              <button
                type="submit"
                style={{ fontSize: "16px", color: "red" }}
              >
                {getCode}
              </button>
              <p style={{ fontSize: "12px" }}>скопируйте код покупки</p>
            </div>
          </div>
        </CSSTransition>
        </>
  );
};

export default Market;
