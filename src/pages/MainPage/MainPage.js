import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./MainPage.css";
import Header from "./Components/Header/Header";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  // document.cookie = localStorage.getItem("token");
  const [dropdownMenu, SetDropdownMenu] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const closeDropdown = (e) => {
  //     if (e.srcElement.className !== "navbar_dropdown_li") {
  //       document.querySelector(".dropdown").className = "";
  //       console.log("AAA");
  //     }
  //   };
  //   document.body.addEventListener("click", closeDropdown);
  // }, []);
  return (
    <>
      <div className="main_header">{<Header />}</div>
      <div className="headet_navbar">
        <nav className="nav">
          <ul className="header_navbar_ul">
            <CustomLink to="/MainPage/">Новости</CustomLink>
            <CustomLink to="/MainPage/Tasks">Задания</CustomLink>
            <CustomLink to="/MainPage/Statistics">Статистика</CustomLink>
            <CustomLink
              to="/MainPage/ProjectLeaderboard"
              onClick={(e) => {
                SetDropdownMenu(!dropdownMenu);
                e.stopPropagation();
              }}
            >
              Лидерборд
            </CustomLink>
            <CustomLink to="/MainPage/Market">Маркет</CustomLink>
            <CustomLink to="/MainPage/Instruments">Инструменты</CustomLink>
            <CustomLink to="/MainPage/Employees">Соотрудники</CustomLink>
          </ul>
        </nav>
      </div>
      {dropdownMenu ? <p>Hello</p> : ""}
      <Outlet />
    </>
  );
};

export default MainPage;
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active dropdown" : "dropdown"}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
