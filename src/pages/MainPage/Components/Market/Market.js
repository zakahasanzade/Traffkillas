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
import ReactCardFlip from "react-card-flip";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useRef } from "react";
import "./Market.css";
import { cookie, image } from "fontawesome";

const Market = (props) => {
  let AssetsArr = [];
  const position = props.position;
  const [assets, SetAssets] = useState();
  const getAssets = () => {
    document.cookie = "test=hello;";
    fetch("https://api1.traffkillas.kz/get_market", {
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
        setIsFlipped(Array(AssetsArr.length).fill(false));
        setSubmitProduct(Array(AssetsArr.length).fill(false));
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
    axios
      .post(
        "https://api1.traffkillas.kz/add_market",
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        getAssets();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
    form.reset();
  }
  const DeletePost = (e) => {
    // e.preventDefault();
    fetch("https://api1.traffkillas.kz/delete_market", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        _id: e.target.id,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        getAssets();
      })
      .catch((err) => {
        alert(err);
      });

    console.log("e.target");
  };
  const headers = new Headers();
  headers.append("Cookie", "name1=value1; name2=value2");
  const [ProofProduct, SetProofProduct] = useState();
  const [PoductName, SetProductName] = useState();
  const [PoductId, SetProductId] = useState();
  const [ProductPrice, SetProductPrice] = useState();
  const [getCode, SetGetCode] = useState();
  const createNotification = (type) => {
    if (type === "error") {
      NotificationManager.error(
        <div
          style={{ fontSize: "18px", fontWeight: "700", textAlign: "center" }}
        >
          ???????????????????? ?????????????????? ????????????
        </div>,
        <div style={{ textAlign: "center" }}>???????????????????????? ??????????????</div>,
        5000,
        () => {
          alert("callback");
        }
      );
    } else if (type === "success") {
      NotificationManager.success("??????????????!");
    }
  };
  const BuyProduct = (e, index) => {
    fetch("https://api1.traffkillas.kz/buy_market", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      withCredentials: true,
      body: JSON.stringify({ _id: PoductId }),
    })
      .then((response) => {
        console.log(response);
        if (response.status != 200) {
          throw new Error();
        }
        return response.text();
      })
      .then((result) => {
        SetGetCode(JSON.parse(result).code);
        var temp = SubmitProduct.map((el, i) => {
          el = false;
          if (i == index) {
            return !el;
          }

          return el;
        });
        setSubmitProduct(temp);
        createNotification("success");
      })
      .catch(() => {
        createNotification("error");
      });
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const [SubmitProduct, setSubmitProduct] = useState(false);
  const handleClick = (e, index) => {
    var temp = isFlipped.map((el, i) => {
      el = false;
      if (i == index) {
        return !el;
      }

      return el;
    });
    setIsFlipped(temp);
    console.log(isFlipped);
  };
  const ReturnCard = () => {
    var temp = isFlipped.map((el, i) => {
      el = false;
      return el;
    });
    setIsFlipped(temp);
  };
  const SubmitPurchase = (e, index) => {
    BuyProduct(e, index);

    console.log(SubmitProduct);
  };

  const icon = <i className="fa-solid fa-paperclip"> ?????????????????? ???????? </i>;

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
        {position !== "3" && (
          <form className="market_send" id="form" onSubmit={(e) => submit(e)}>
            <div className="market_send_title">
              <TextareaAutosize
                className="TitleText"
                placeholder="?????????????????? ????????????"
                name="Name"
              ></TextareaAutosize>
              <p>
                <input
                  placeholder="????????"
                  className="ProductPrice"
                  name="Price"
                />
                TTK
              </p>
            </div>
            <TextareaAutosize
              placeholder="???????????? ???????????????? ????????????..."
              className="market_send_nameProduct"
              name="Content"
            ></TextareaAutosize>
            <div className="market_send_submit">
              <p className="market_send_submit_attach">
                ?????????????????????? ????????????:
                <input
                  className="testinput"
                  accept="image/*"
                  maxfiles="1"
                  type="file"
                  name="Image"
                ></input>
              </p>
              <button
                className="market_send_submit_button"
                // onClick={SendProductInfo}
              >
                <i className="fa-solid fa-cart-plus"> ???????????????? ?????????? </i>
              </button>
            </div>
          </form>
        )}

        <div className="market_products">
          {assets &&
            assets.map((product, index) => {
              const { name, price, url, _id, content } = product;
              return (
                <ReactCardFlip
                  isFlipped={isFlipped[index]}
                  flipDirection="horizontal"
                >
                  <div id={_id} onClick={(e) => handleClick(e, index)}>
                    <div
                      className="market_product"
                      id={_id}
                      onClick={(e) => {
                        SetProofProduct(!ProofProduct);
                        SetProductName(product.name);
                        SetProductId(product._id);
                        SetProductPrice(product.price);
                      }}
                    >
                      <img src={url} alt={url} id={_id}></img>
                      <p>{name}</p>
                      <span>{price} TTK</span>{" "}
                      {position !== "3" && (
                        <i
                          className="bi bi-trash3-fill market_product_delete"
                          id={_id}
                          onClick={(e) => {
                            e.stopPropagation();
                            DeletePost(e);
                          }}
                        ></i>
                      )}
                    </div>
                  </div>

                  <div
                    className="ProofBuy"
                    onClick={(e) => ReturnCard(e, index)}
                    style={{ width: "240px" }}
                  >
                    <p style={{ fontSize: "24px", overflowWrap: "break-word" }}>
                      {PoductName}
                    </p>
                    <ReactCardFlip
                      isFlipped={SubmitProduct[index]}
                      flipDirection="horizontal"
                    >
                      <div className="ProofBuy_submit">
                        <p style={{ fontSize: "20px" }}>???????????????????? ??????????????</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("kdjfg");
                            // e.stopPropagation();
                            SubmitPurchase(e, index);
                            // BuyProduct();
                          }}
                          type="submit"
                          style={{ fontSize: "16px", color: "red" }}
                        >
                          <i class="bi bi-cart-check-fill"></i> -{ProductPrice}
                        </button>
                        <p style={{ fontSize: "12px" }}>
                          550 000 TTK = 500 000 TTK
                        </p>
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          // ReturnSubmit(e, index);
                        }}
                      >
                        <div className="ProofBuy_submit">
                          <p style={{ fontSize: "20px" }}>??????????????!</p>
                          <button
                            type="submit"
                            style={{ fontSize: "16px", color: "red" }}
                          >
                            {getCode}
                          </button>
                          <p style={{ fontSize: "12px" }}>
                            ???????????????????? ?????? ??????????????
                          </p>
                        </div>
                      </div>
                    </ReactCardFlip>
                  </div>
                </ReactCardFlip>
              );
            })}
        </div>
        <NotificationContainer />
      </motion.div>
      {/* <CSSTransition
        in={ProofProduct}
        classNames="alert"
        timeout={1000}
        unmountOnExit
      >
        <div className="ProofBuy">
          <p style={{ fontSize: "24px" }}>{PoductName}</p>
          <div className="ProofBuy_submit">
            <p style={{ fontSize: "20px" }}>???????????????????? ??????????????</p>
            <button
              onClick={(e) => {
                SetSubmitProduct(!SubmitProduct);
                SetProofProduct(!ProofProduct);
                BuyProduct();
              }}
              type="submit"
              style={{ fontSize: "16px", color: "red" }}
            >
              -50 000 TTK
            </button>
            <p style={{ fontSize: "12px" }}>550 000 TTK = 500 000 TTK</p>
          </div>
        </div>
      </CSSTransition> */}
      {/* <CSSTransition
        in={SubmitProduct}
        classNames="alert"
        timeout={1000}
        unmountOnExit
      >
        <div className="ProofBuy">
          <p style={{ fontSize: "24px" }}>{PoductName}</p>
          <div className="ProofBuy_submit">
            <p style={{ fontSize: "20px" }}>??????????????!</p>
            <button type="submit" style={{ fontSize: "16px", color: "red" }}>
              {getCode}
            </button>
            <p style={{ fontSize: "12px" }}>???????????????????? ?????? ??????????????</p>
          </div>
        </div>
      </CSSTransition> */}
    </>
  );
};

export default Market;
