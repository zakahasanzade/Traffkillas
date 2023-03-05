import React, { useEffect, useState, useRef } from "react";
import "./News.css";
import rightArrow from "./News Assets/Arrow Right.svg";
import { TagsInput } from "react-tag-input-component";
import { motion } from "framer-motion/dist/framer-motion";
import { CSSTransition } from "react-transition-group";
import TextareaAutosize from "react-textarea-autosize";

const News = (props) => {
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
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        getArray = JSON.parse(result)["data"];
        setPost(getArray);
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
      .then((result) => {
        getData();
      })
      .catch((err) => {
        alert(err);
      });

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
      .then((result) => {
        getData();
      })
      .catch((err) => {
        alert(err);
      });

    console.log(e.target.id);
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

  const setBack = (col) => {
    document.querySelector(".back").style.backgroundColor = col;
  };
  console.log(typeof post);
  const position = props.position;
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
        {position !== "3" ? (
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
                        setBack("#0F82F5");
                      }}
                    >
                      <div
                        className="selCol"
                        style={{
                          backgroundColor: "#0F82F5",
                        }}
                      ></div>
                      Уведомления платформы
                    </li>
                    <li
                      onClick={() => {
                        setBack("#ED2709");
                      }}
                    >
                      <div
                        className="selCol"
                        style={{
                          backgroundColor: "#ED2709",
                        }}
                      ></div>
                      Высокий приоритет
                    </li>
                    <li
                      onClick={() => {
                        setBack("#EA9127");
                      }}
                    >
                      <div
                        className="selCol"
                        style={{
                          backgroundColor: "#EA9127",
                        }}
                      ></div>
                      Средняя важность
                    </li>
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
                      Низкий приоритет
                    </li>
                  </ul>
                </CSSTransition>
                <TextareaAutosize
                  className="newsTitle"
                  placeholder="Заголовок"
                />
              </div>
              <div className="news_page_title_input">
                <TextareaAutosize
                  className="newsContent"
                  placeholder="Содержание поста..."
                />
              </div>
              <div className="news_page_title_bottom">
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
                <div className="news_page_titles_button">
                  <button type="submit" onClick={SendTitlePageData}>
                    <p>Опубликовать новость</p>
                    <img src={rightArrow} alt="rightArrow" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="news_list">
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
                    <p className="date">
                      {date.substring(0, 2)}{" "}
                      {now.toLocaleString("ru-ru", { month: "short" })}
                      {console.log(now)}
                    </p>
                  ) : null}
                  <div
                    className="news_page_div"
                    style={{
                      animationDelay: "5s",
                    }}
                  >
                    <h1>
                      <div
                        className="news_page_div_content"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div
                          className="news_page_div_dot"
                          style={{ backgroundColor: color }}
                        ></div>
                        <p>{title}</p>
                      </div>
                      {position !== "3" ? (
                        <i
                          onClick={DeletePost}
                          class="fa-solid fa-trash-can"
                          id={_id.$oid}
                        ></i>
                      ) : null}
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
      </div>
    </motion.div>
  );
};

export default News;
