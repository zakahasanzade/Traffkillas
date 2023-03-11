import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./MainPage.css";
import Header from "./Components/Header/Header";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { windows } from "fontawesome";

const MainPage = (props) => {
  let isLeaderboard = useMatch({
    path: "/MainPage/ProjectLeaderboard",
    end: true,
  });
  useEffect(() => {
    (window.location.pathname === "/MainPage/ProjectLeaderboard" ||
      window.location.pathname === "/MainPage/EmployerLeaderboard") &&
      setDropdown(true);
  }, []);
  const [dropdown, setDropdown] = useState();
  return (
    <>
      <div className="main_header">{<Header />}</div>
      <div className="headet_navbar">
        <nav className="nav">
          <ul className="header_navbar_ul">
            <CustomLink className="CustomLink" to="/MainPage/">
              Новости
            </CustomLink>
            <CustomLink className="CustomLink" to="/MainPage/Tasks">
              Задания
            </CustomLink>
            <CustomLink className="CustomLink" to="/MainPage/Statistics">
              Статистика
            </CustomLink>
            <div className="custom_dropdown">
              <p
                className={
                  dropdown
                    ? "navbar_dropdown_active navbar_dropdonw_Li"
                    : "navbar_dropdonw_Li"
                }
                // to="/MainPage/ProjectLeaderboard"
                onClick={(e) => {
                  // setDropdown(!dropdown);
                }}
              >
                Лидерборд
              </p>
              <ul className="navbar_dropdown_menu">
                <Link to="/MainPage/ProjectLeaderboard">Project</Link>
                <Link to="/MainPage/EmployerLeaderboard">Employer</Link>
              </ul>
            </div>
            <CustomLink className="CustomLink" to="/MainPage/Market">
              Маркет
            </CustomLink>
            {props.position !== "3" && (
              <CustomLink className="CustomLink" to="/MainPage/Instruments">
                Инструменты
              </CustomLink>
            )}
            {props.position !== "3" && (
              <CustomLink className="CustomLink" to="/MainPage/Employees">
                Сотрудники
              </CustomLink>
            )}
          </ul>
        </nav>
        {/* {dropdown && (
          <ul className="navbar_dropdown_menu">
            <Link to="/MainPage/ProjectLeaderboard">Project</Link>
            <Link to="/MainPage/ProjectLeaderboard">Employer</Link>
          </ul>
        )} */}
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
