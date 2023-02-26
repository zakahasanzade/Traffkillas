import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./MainPage.css";
import Header from "./Components/Header/Header";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { windows } from "fontawesome";

const MainPage = () => {
  let isLeaderboard = useMatch({
    path: "/MainPage/ProjectLeaderboard",
    end: true,
  });
  const [dropdown, setDropdown] = useState(isLeaderboard);
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
                setDropdown(!dropdown);
              }}
            >
              Лидерборд
            </CustomLink>
            <CustomLink to="/MainPage/Market">Маркет</CustomLink>
            <CustomLink to="/MainPage/Instruments">Инструменты</CustomLink>
            <CustomLink to="/MainPage/Employees">Соотрудники</CustomLink>
          </ul>
        </nav>
        {dropdown ? (
          <ul className="navbar_dropdown">
            <li>Проекты</li>
            <li>Работники</li>
          </ul>
        ) : (
          ""
        )}
      </div>
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
