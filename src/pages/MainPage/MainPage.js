import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./MainPage.css";
import Header from "./Components/Header/Header";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";

const MainPage = () => {

  

  return (
    <>
      <div className="main_header">{<Header />}</div>
      <div className="headet_navbar">
        <nav className="nav">
          <ul className="header_navbar_ul">
            <CustomLink to="/MainPage/">Новости</CustomLink>
            <CustomLink to="/MainPage/Tasks">Задания</CustomLink>
            <CustomLink to="/MainPage/Statistics">Статистика</CustomLink>
            <CustomLink to="/MainPage/Leaderboard">Лидерборд</CustomLink>
            <CustomLink to="/MainPage/Market">Маркет</CustomLink>
            <CustomLink to="/MainPage/Instruments">Инструменты</CustomLink>
            <CustomLink to="/MainPage/Employees">Соотрудники</CustomLink>
          </ul>
        </nav>
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
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
