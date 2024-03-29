import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
import Profile from "../pages/MainPage/Components/Profile/Profile";
import Authorization from "../pages/Authorization/Authorization";
import MainPage from "../pages/MainPage/MainPage";
import News from "../pages/MainPage/Components/News/News";
import Tasks from "../pages/MainPage/Components/Tasks/Tasks";
import Statistics from "../pages/MainPage/Components/Statistics/Statistics";
import Market from "../pages/MainPage/Components/Market/Market";
import Instruments from "../pages/MainPage/Components/Instruments/Instruments";
import Employees from "../pages/MainPage/Components/Employees/Employees";
import ProjectLeaderboard from "../pages/MainPage/Components/Leaderboard/ProjectLeaderboard/ProjectLeaderboard";
import EmployerLeaderboard from "../pages/MainPage/Components/Leaderboard/EmployerLeaderboard/EmployerLeaderboard";
import StatisticsBuyer from "../pages/MainPage/Components/Statistics/StatisticsBuyer/StatisticsBuyer";
import StatisticsInfluencer from "../pages/MainPage/Components/Statistics/StatisticsInfluencer/StatisticsInfluencer";
import { AnimatePresence } from "framer-motion/dist/framer-motion";

const AnimatedPage = ({ ChangeMode, mode }) => {
  // fetch("https://api1.tkcrmsystem.com/login", {
  //   method: "GET",
  //   headers: {
  //     "Token": localStorage.getItem("token"),
  //   },
  // })
  //   .then((response) => response.text())
  //   .then((result) => {
  //   });
  const position = localStorage.position;
  const channel_type = localStorage.channel_type;
  const location = useLocation();
  const ModeChange = () => {
    ChangeMode();
  };
  const [statisticsRole, setStatisticsRole] = useState("баинг");
  const editStatRole = (role) => {
    setStatisticsRole(role);
  };

  useEffect(() => {
  }, [statisticsRole]);
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Authorization position={position} />}></Route>
        <Route
          path="/MainPage/"
          element={
            <MainPage ModeChange={ModeChange} mode={mode} position={position} />
          }
        ></Route>
        <Route
          path="/MainPage/Profile"
          element={<Profile mode={mode} position={position} />}
        />
        <Route
          path="/MainPage/"
          element={
            <MainPage
              editStatRole={editStatRole}
              ModeChange={ModeChange}
              mode={mode}
              position={position}
            />
          }
        >
          {/* <Route path="/" element={<UserPage />} />
          <Route path="/SecondPage" element={<SecondPage />} /> */}
          <Route index element={<News mode={mode} position={position} />} />
          <Route
            path="/MainPage/Tasks"
            element={<Tasks mode={mode} position={position} />}
          />
          <Route
            path="/MainPage/Statistics"
            element={
              <Statistics
                statisticsRole={statisticsRole}
                mode={mode}
                position={position}
              />
            }
          />
          <Route
            path="/MainPage/StatisticsBuyer"
            element={<StatisticsBuyer mode={mode} position={position} />}
          />
          <Route
            path="/MainPage/StatisticsInfluencer"
            element={<StatisticsInfluencer mode={mode} position={position} />}
          />
          <Route
            path="/MainPage/ProjectLeaderboard"
            element={<ProjectLeaderboard mode={mode} position={position} />}
          />
          <Route
            path="/MainPage/EmployerLeaderboard"
            element={<EmployerLeaderboard mode={mode} position={position} />}
          />
          <Route
            path="/MainPage/Market"
            element={<Market mode={mode} position={position} />}
          />
          <Route
            path="/MainPage/Instruments"
            element={<Instruments mode={mode} position={position} />}
          />
          <Route
            path="/MainPage/Employees"
            element={
              <Employees
                channel_type={channel_type}
                mode={mode}
                position={position}
              />
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedPage;
