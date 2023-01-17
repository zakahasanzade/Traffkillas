import React from "react";
import "./NavBar.css";
import { useNavigate, Route, Outlet } from "react-router-dom";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  // let activeStyle = {
  //   textDecoration: "underline",
  // };

  // let activeClassName = "underline";

  
  return (
    <div className="navbar_list">
      {/* <div id="news">
        <button onClick={() => navigate("/MainPage/News")}>Новости</button>
      </div>
      <div id="tasks">
        <button onClick={() => navigate("/MainPage/Tasks")}>Задания</button>
      </div>
      <div>
        <button onClick={() => navigate("/MainPage/Statistics")}>
          Статистика
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/MainPage/Leaderboard")}>
          Лидерборд
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/MainPage/Market")}>Маркет</button>
      </div>
      <div>
        <button onClick={() => navigate("/MainPage/Instruments")}>
          Инструменты
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/MainPage/Employees")}>
          Соотрудники
        </button>
      </div> */}

      <nav className="nav">
        <ul>
          <CustomLink to="/MainPage/News">Новости</CustomLink>
          <CustomLink to="/MainPage/Tasks">Задания</CustomLink>
          <CustomLink to="/MainPage/Statistics">Статистика</CustomLink>
          <CustomLink to="/MainPage/Leaderboard">Лидерборд</CustomLink>
          <CustomLink to="/MainPage/Market">Маркет</CustomLink>
          <CustomLink to="/MainPage/Instruments">Инструменты</CustomLink>
          <CustomLink to="/MainPage/Employees">Соотрудники</CustomLink>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

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