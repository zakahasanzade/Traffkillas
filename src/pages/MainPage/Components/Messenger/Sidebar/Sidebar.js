import React, { useEffect, useState } from "react";
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
import AllChats from "./Components/AllChats";
import { HubConnectionBuilder } from "@microsoft/signalr";

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

const Sidebar = () => {
  //   const user = useSelector(selectUser);

  //   useEffect(() => {
  //     db.collection("threads").onSnapshot((snapshot) =>
  //       setThreads(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data(),
  //         }))
  //       )
  //     );
  //   }, []);
  
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
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar_menu">
          <i class="bi bi-list"></i>
        </div>
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
        {activeChat === "All" && <AllChats title="All" />}
        {activeChat === "Tasks" && <AllChats title="Tasks" />}
        {activeChat === "Marketing" && <AllChats title="Marketing" />}
      </div>
      <div className="sidebar__bottom"></div>
    </div>
  );
};

export default Sidebar;




