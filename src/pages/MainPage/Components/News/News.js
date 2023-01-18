import React, { useState } from "react";
import "./News.css";
import rightArrow from "./News Assets/Arrow Right.svg";
import { TagsInput } from "react-tag-input-component";
import { motion } from "framer-motion/dist/framer-motion";

const News = () => {
  const [show, setShow] = useState(false);
  // CREATE A NEW BLOCK WITH THE RECEIVED DATA   //
  const [tags, setTags] = useState([]);
  const getArray = () => [
    {
      color: "red",
      title: "Важный день сегодня",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      hashtag: ["#проекты", "jdnsc"],
    },
    {
      color: "black",
      title: "Обновление платформы",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      hashtag: ["#проекты", "jdnsc"],
    },
  ];
  // const handleAddition = (tag) => {
  //x
  // SEND VALUES FROM ELEMENT TO SERVER //
  const [post, setPost] = useState(getArray);
  const SendTitlePageData = (e) => {
    const newsTitle = document.querySelector(".newsTitle").value;
    const newsTag = tags;
    const newsContent = document.querySelector(".newsContent").value;
    const newsColor = getComputedStyle(
      document.querySelector(".newsColor")
    ).getPropertyValue("background-color");
    // console.log(newsColor);
    var raw = {
      color: newsColor,
      title: newsTitle,
      hashtag: newsTag,
      text: newsContent,
    };
    console.log(raw);
    setPost([...post, raw]);

    fetch("https://a98c-89-77-236-116.eu.ngrok.io/post_news", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(raw),
    })
      .then((response) => {
        console.log(response.status);
        response.text();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        alert(err);
      });

    fetch("https://httpbin.org/get", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        // console.log(response.status);
        response.text();
      })
      .then((result) => {
        result.JSON();
        console.log(result);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{opacity:0,x:-100 }}
      transition={{duration:0.3}}
    >
      <div className="news_page">
        <div className="news_page_titles">
          <div className="news_page_title">
            <div className="news_page_title_dot">
              <div className="newsColor"></div>
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
        <p className="date">14 декабря</p>
        {post &&
          post.map((block) => {
            const { color, title, text, hashtag } = block;
            return (
              <div className="news_page_div">
                <h1>
                  <div
                    className="news_page_div_dot"
                    style={{ backgroundColor: color }}
                  ></div>
                  {title}
                </h1>
                <p className="news_page_text">{text}</p>
                <div className="news_page_footer">
                  <a className="date">20:55</a>
                  <div className="news_page_footer_p">
                    <p> {hashtag}</p>
                  </div>
                </div>
              </div>
            );
          })}

        <p className="date" style={{ marginTop: "10px" }}>
          13 декабря
        </p>

        {/* <div className="news_page_div">
          <h1>
            <div className="news_page_div_blue"></div>Обновление платформы
          </h1>
          <p className="news_page_text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="news_page_footer">
            <a className="date">14:15</a>
            <div className="news_page_footer_p">
              <p>#проекты</p>
              <p>#платформа</p>
            </div>
          </div>
        </div> */}
      </div>
    </motion.div>
  );
};

export default News;
