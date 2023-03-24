import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./MainPage.css";
import Header from "./Components/Header/Header";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { windows } from "fontawesome";

const MainPage = ({ position, ModeChange, mode }) => {
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
  const ChangeModes = (props) => {
    ModeChange();
  };
  const [showMessenger, setShowMessenger] = useState();
  const OpeanMessenger = () => {
    setShowMessenger(!showMessenger);
  };
  const CloseMessengerWindow = (window) => {
    setShowMessenger(window);
    console.log(window);
  };
  const ChangeMode = () => {
    ModeChange();
  };
  const [HeaderData, SetHeaderData] = useState(false);
  const [show, setShow] = useState(false);
  const getHeaderData = () => {
    let x = null;
    fetch("https://api1.traffkillas.kz/get_profile_info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        x = JSON.parse(result)["data"];
        SetHeaderData(x);
        console.log(x);
      });
  };
  const SetShowProfileInfo = () => {
    setShow(!show);
  };
  useEffect(() => {
    getHeaderData();
  }, []);
  const navigate = useNavigate();
  const ViewProfile = () => {
    navigate("/MainPage/Profile");
  };

  return (
    <>
      <div className="main_header">
        {
          <Header
            ChangeModes={ChangeModes}
            OpeanMessenger={OpeanMessenger}
            mode={mode}
            CloseMessengerWindow={CloseMessengerWindow}
            showMessenger={showMessenger}
            show={show}
            HeaderData={HeaderData}
            ViewProfile={ViewProfile}
            SetShowProfileInfo={SetShowProfileInfo}
          />
        }
      </div>
      <div className="headet_navbar">
        <nav className="nav">
          <ul
            className={
              mode ? "header_navbar_ul light_navbar_ul" : "header_navbar_ul "
            }
          >
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
                <Link to="/MainPage/ProjectLeaderboard">Проекты</Link>
                <Link to="/MainPage/EmployerLeaderboard">Работники</Link>
              </ul>
            </div>
            <CustomLink className="CustomLink" to="/MainPage/Market">
              Маркет
            </CustomLink>
            {position !== "3" && (
              <CustomLink className="CustomLink" to="/MainPage/Instruments">
                Инструменты
              </CustomLink>
            )}
            {position !== "3" && (
              <CustomLink className="CustomLink" to="/MainPage/Employees">
                Сотрудники
              </CustomLink>
            )}
          </ul>
        </nav>
      </div>
      <nav
        style={
          mode
            ? { backgroundColor: "white", color: "black" }
            : { backgroundColor: "black", color: "white" }
        }
        className="responsive_nav"
      >
        <div className="responsive_nav_top">
          <div className="header_profile_buttons">
            {mode ? (
              <i onClick={ChangeMode} className="bi bi-sun-fill"></i>
            ) : (
              <i onClick={ChangeMode} className="bi bi-moon-stars-fill"></i>
            )}
            <i onClick={OpeanMessenger} className="bi bi-chat-quote-fill"></i>
          </div>
          <button
            style={mode ? { color: "black" } : { color: "white" }}
            id="profile_button"
          >
            <p>{show ? HeaderData?.first_name : HeaderData?.first_name}</p>
            <img
              src={HeaderData?.image}
              alt="ProfilePhoto"
              onClick={(e) => {
                e.stopPropagation();
                ViewProfile();
              }}
            />
          </button>
        </div>
        <ul
          className={
            mode ? "header_navbar_ul light_navbar_ul" : "header_navbar_ul "
          }
        >
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
              <Link to="/MainPage/ProjectLeaderboard">Проекты</Link>
              <Link to="/MainPage/EmployerLeaderboard">Работники</Link>
            </ul>
          </div>
          <CustomLink className="CustomLink" to="/MainPage/Market">
            Маркет
          </CustomLink>
          {position !== "3" && (
            <CustomLink className="CustomLink" to="/MainPage/Instruments">
              Инструменты
            </CustomLink>
          )}
          {position !== "3" && (
            <CustomLink className="CustomLink" to="/MainPage/Employees">
              Сотрудники
            </CustomLink>
          )}
        </ul>
        <ul className="profile_button_info" id="time">
          <li className="profile_button_info_li">
            <p className="red">₸ {HeaderData?.tenge} </p>
          </li>
          <li className="profile_button_info_li">
            <p>{HeaderData?.mmr}MMR</p>
          </li>
          <li className="profile_button_info_li">
            <p className="orange">{HeaderData?.ttk}TTK</p>
          </li>
        </ul>
      </nav>
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
