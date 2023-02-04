import React, { useEffect, useState, useRef } from "react";
import "./News.css";
import rightArrow from "./News Assets/Arrow Right.svg";
import { TagsInput } from "react-tag-input-component";
import { motion } from "framer-motion/dist/framer-motion";
import { CSSTransition } from "react-transition-group";

const News = () => {
  // const [show, setShow] = useState(false);
  // CREATE A NEW BLOCK WITH THE RECEIVED DATA   //
  const [tags, setTags] = useState([]);
  let getArray = [];
  const [post, setPost] = useState();
  const [Color, SetColor] = useState();
  const btnRef = useRef();
  // SEND VALUES FROM ELEMENT TO SERVER //

  const getData = () => {
    fetch("http://94.103.90.6:5000/get_news", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: localStorage.getItem("token"),
      },
      // credentials: "include",
    })
      .then((response) => {
        // console.log(response.status);
        return response.text();
      })
      .then((result) => {
        // console.log(result);
        getArray = JSON.parse(result)["data"];
        setPost(getArray);
        // console.log(getArray);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const SendTitlePageData = (e) => {
    const newsTitle = document.querySelector(".newsTitle").value;
    document.querySelector(".newsTitle").value = "";
    const newsTag = tags;
    setTags([]);
    console.log(tags);
    const newsContent = document.querySelector(".newsContent").value;
    document.querySelector(".newsContent").value = "";
    const newsColor = getComputedStyle(
      document.querySelector(".back")
    ).getPropertyValue("background-color");
    var raw = {
      color: newsColor,
      title: newsTitle,
      hashtag: newsTag,
      text: newsContent,
    };
    setBack("green");

    fetch("http://94.103.90.6:5000/post_news", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Token: localStorage.getItem("token"),
      },
      body: JSON.stringify(raw),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {})
      .catch((err) => {
        alert(err);
      });
    getData();
    console.log(post);
  };
  const DeletePost = (e) => {
    e.preventDefault();
    fetch("http://94.103.90.6:5000/delete_news", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Token: localStorage.getItem("token"),
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

    console.log(e.target.id);
    getData();
  };
  useEffect(() => {
    getData();

    const closeDropdown = (e) => {
      if (e.srcElement.className !== "back") {
        SetColor();
      }
    };
    document.body.addEventListener("click", closeDropdown);
  }, []);
  // return getData();
  // console.log(getArray);

  // console.log(post);
  // const [back, SetBack] = useState("green");
  // console.log(back);
  const setBack = (col) => {
    document.querySelector(".back").style.backgroundColor = col;
  };
  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="news_page">
        <div className="news_page_titles">
          <div className="news_page_title">
            <div className="news_page_title_dot">
              <div
                ref={btnRef}
                onClick={() => SetColor(!Color)}
                className="back"
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: "green",
                  borderRadius: "100%",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              ></div>
              <CSSTransition
                in={Color}
                classNames="alert"
                timeout={1000}
                unmountOnExit
              >
                <ul
                  onClick={(e) => {
                    // e.stopPropagation();
                  }}
                >
                  <li
                    onClick={() => {
                      setBack("green");
                    }}
                  >
                    <div
                      className="selCol"
                      style={{
                        backgroundColor: "green",
                      }}
                    ></div>
                    Тема новости 1
                  </li>
                  <li
                    onClick={() => {
                      setBack("red");
                    }}
                  >
                    <div
                      className="selCol"
                      style={{
                        backgroundColor: "red",
                      }}
                    ></div>
                    Тема новости 2
                  </li>
                  <li
                    onClick={() => {
                      setBack("blue");
                    }}
                  >
                    <div
                      className="selCol"
                      style={{
                        backgroundColor: "blue",
                      }}
                    ></div>
                    Тема новости 3
                  </li>
                  <li
                    onClick={() => {
                      setBack("orange");
                    }}
                  >
                    <div
                      className="selCol"
                      style={{
                        backgroundColor: "orange",
                      }}
                    ></div>
                    Тема новости 4
                  </li>
                  <li
                    onClick={() => {
                      setBack("#FF4B8C");
                    }}
                  >
                    <div
                      className="selCol"
                      style={{
                        backgroundColor: "#FF4B8C",
                      }}
                    ></div>
                    Тема новости 5
                  </li>
                </ul>
              </CSSTransition>
              <input className="newsTitle" placeholder="Заголовок" />
            </div>
            <div className="news_page_title_input">
              <input
                className="newsContent"
                placeholder="Содержание поста..."
              />
            </div>
            <div className="news_page_title_tags">
              <p>Теги:</p>
              <TagsInput
                value={tags}
                onChange={setTags}
                name="fruits"
                placeHolder="#новый_тег"
                // handleAddition={handleAddition}
              />
            </div>
          </div>
          <div className="news_page_titles_button">
            <button type="submit" onClick={SendTitlePageData}>
              <p>Опубликовать новость</p>
              <img src={rightArrow} alt="rightArrow" />
            </button>
          </div>
        </div>
        {post &&
          post.map((block, index, array) => {
            const { color, title, text, hashtag, time, date, _id } = block;
            {
              /* console.log(JSON.parse(_id)["$oid"]) */
            }
            let now = new Date();
            let tag = [];
            now.setMonth(date.substring(3) - 1);
            hashtag.forEach((element) => {
              tag.push(<p>#{element} </p>);
            });
            return (
              <>
                {index === 0 || array[index - 1].date !== date ? (
                  <p className="date" style={{ marginTop: "10px" }}>
                    {date.substring(0, 2)}{" "}
                    {now.toLocaleString("ru-ru", { month: "long" })}
                  </p>
                ) : null}
                <div className="news_page_div">
                  <h1>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        className="news_page_div_dot"
                        style={{ backgroundColor: color }}
                      ></div>
                      {title}
                    </div>
                    <i
                      onClick={DeletePost}
                      class="fa-solid fa-trash-can"
                      id={_id.$oid}
                    ></i>
                  </h1>
                  <p className="news_page_text">{text}</p>
                  <div className="news_page_footer">
                    <p className="date">{time}</p>
                    <div className="news_page_footer_p">
                      <p style={{ display: "flex" }}>{tag}</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </motion.div>
  );
};

export default News;
