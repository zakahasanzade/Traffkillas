import React, { useEffect, useState, useRef } from "react";
import "./Sidebar.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import AccountProfile from "../Assets/AccountProfile.svg";
import { Carousel } from "react-responsive-carousel";
// import { AllChats, ChatsId } from "./Components/AllChats";

import Tasks from "./Components/Tasks";
import { HubConnectionBuilder } from "@microsoft/signalr";
import Marketing from "./Components/Marketing";

// import SearchIcon from "@material-ui/icons/Search";
// import { Avatar, IconButton } from "@material-ui/core";
// import SidebarThread from "./SidebarThread";
// import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
// import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
// import SettingsIcon from "@material-ui/icons/Settings";
// import db, { auth } from "../firebase";
// import { useSelector } from "react-redux";
// import { selectUser } from "../features/counter/userSlice";
// import Photo from "./Assets/ProfilePhoto.svg";

let ChatId = null;

const Sidebar = ({
  navColor,
  setChangeNavColor,
  GetChat,
  UpdateChatId,
  GetchatMessage,
  GetStateChat,
  CloseMessenger,
  OnceUpdate,
  StopRendering,
}) => {
  // const [openChat, SetOpenChat] = useState(false);
  const chatRef = useRef();
  let UserMessagesArr = [];
  const [UserMessages, setUserMessages] = useState();
  const [lastOpen, setLastOpen] = useState();
  // const [navColor, setNavColor] = useState();

  let GetChatArr = [];
  // const [GetChat, setGetChat] = useState([]);
  // const GetChats = () => {
  //   fetch("http://146.0.78.143:5354/api/v1/messages/getChats", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  //     .then((response) => {
  //       return response.text();
  //     })
  //     .then((result) => {
  //       GetChatArr = new Array(JSON.parse(result)["data"]);
  //       setGetChat(JSON.parse(result));
  //       setNavColor(Array(JSON.parse(result).length).fill(false));
  //     });
  // };
  // const GetChatMessages = () => {
  //   fetch(`http://146.0.78.143:5354/api/v1/messages/fromChat?chat=${ChatId}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  //     .then((response) => {
  //       return response.text();
  //     })
  //     .then((result) => {
  //       UserMessagesArr = JSON.parse(result);
  //       setUserMessages(UserMessagesArr);
  //       GetchatMessage(UserMessagesArr);
  //       // SetOpenChat(true);
  //       // GetStateChat(openChat);
  //       StopRendering("lkdfnmc");
  //     });
  // };

  const [activeChat, setActiveChat] = useState("All");
  const StyleNav = (e) => {
    console.log(e.target.className);
    if (e.target.className === "sidebar__threads_navbar_all") {
      document.querySelector(`.${e.target.className}`).style.borderBottom =
        "2px solid #EA9127";

      document.querySelector(
        ".sidebar__threads_navbar_tasks"
      ).style.borderBottom = "0";
      document.querySelector(
        ".sidebar__threads_navbar_marketing"
      ).style.borderBottom = "0";
    } else if (e.target.className === "sidebar__threads_navbar_tasks") {
      document.querySelector(`.${e.target.className}`).style.borderBottom =
        "2px solid #EA9127";
      document.querySelector(
        ".sidebar__threads_navbar_all"
      ).style.borderBottom = "0";
      document.querySelector(
        ".sidebar__threads_navbar_marketing"
      ).style.borderBottom = "0";
    } else if (e.target.className === "sidebar__threads_navbar_marketing") {
      document.querySelector(`.${e.target.className}`).style.borderBottom =
        "2px solid #EA9127";
      document.querySelector(
        ".sidebar__threads_navbar_all"
      ).style.borderBottom = "0";
      document.querySelector(
        ".sidebar__threads_navbar_tasks"
      ).style.borderBottom = "0";
    }
  };

  useEffect(() => {
    document.querySelector(`.sidebar__threads_navbar_all`).style.borderBottom =
      "2px solid #EA9127";
    // GetChats();
    // GetChatMessages();
  }, []);
  // if (OnceUpdate === "chats") {
  //   GetChatMessages();
  // }
  return (
    <div className="sidebar">
      {console.log(lastOpen)}
      <div className="sidebar__header">
        {/* <div className="sidebar_menu">
          <i class="bi bi-list"></i>
        </div> */}
        <div className="sidebar__search">
          <i class="bi bi-search"></i>
          <input placeholder="Поиск" className="sidebar__input" />
        </div>
      </div>
      <div className="sidebar__threads_navbar">
        <ul>
          <li
            className="sidebar__threads_navbar_all"
            onClick={(e) => {
              setActiveChat("All");
              StyleNav(e);
            }}
          >
            Все
          </li>
          <li
            className="sidebar__threads_navbar_tasks"
            onClick={(e) => {
              setActiveChat("Tasks");
              StyleNav(e);
            }}
          >
            Задания
          </li>
          <li
            className="sidebar__threads_navbar_marketing"
            onClick={(e) => {
              setActiveChat("Marketing");
              StyleNav(e);
            }}
          >
            Маркетинг
          </li>
        </ul>
      </div>
      <div className="sidebar__threads">
        {activeChat === "All" && (
          <div className="sidebar__threads_chats">
            {GetChat &&
              GetChat?.map((chats, index) => {
                const { chatId, lastMessage } = chats;
                const standartFormat = new Date(lastMessage.sendTime);
                const lastTime =
                  (standartFormat.getHours().toLocaleString().length == 1
                    ? "0" + standartFormat.getHours()
                    : standartFormat.getHours()) +
                  ":" +
                  (standartFormat.getMinutes().toLocaleString().length == 1
                    ? "0" + standartFormat.getMinutes()
                    : standartFormat.getMinutes());
                return (
                  <Menu key={chats + index}>
                    <div
                      id={chatId}
                      className={
                        navColor[index]
                          ? "sidebar_sidebar_acoounts active_chat chat_" + index
                          : "sidebar_sidebar_acoounts chat_" + index
                      }
                      onClick={(e) => {
                        ChatId = document.querySelector(`.chat_${index}`).id;
                        UpdateChatId(ChatId);
                        // GetChatMessages();
                        var res = navColor.map((e, i) => {
                          if (i === index) {
                            return true;
                          } else {
                            return false;
                          }
                        });
                        setChangeNavColor(res);
                        console.log(navColor);
                      }}
                    >
                      <div className="sidebar_accounts_img">
                        <img src={AccountProfile} alt="AccountProfile"></img>
                        <div className="sidebar_accounts_info">
                          <div className="sidebar_accounts_info_title">
                            {chatId}
                          </div>
                          <div className="sidebar_accounts_info_message">
                            {lastMessage.text}
                          </div>
                        </div>
                      </div>
                      <div className="sidebar_accounts_notification">
                        <div className="sidebar_accounts_notification_time">
                          {lastTime}
                        </div>
                        {/* <div className="sidebar_accounts_notification_num">
                              2
                            </div> */}
                      </div>
                    </div>
                  </Menu>
                );
              })}
          </div>
        )}
        {/* {activeChat === "Tasks" && <Tasks GetChat={GetChat} />}
        {activeChat === "Marketing" && <Marketing GetChat={GetChat} />} */}
      </div>
      <div
        className="sidebar__bottom"
        onClick={() => {
          CloseMessenger(false);
        }}
      >
        <i class="bi bi-box-arrow-left sidebar__bottom_close"></i>
      </div>
    </div>
  );
};

export { Sidebar, ChatId };
