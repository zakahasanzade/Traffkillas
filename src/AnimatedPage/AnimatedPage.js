import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
import Profile from "../pages/MainPage/Components/Profile/Profile";
import Authorization from "../pages/Authorization/Authorization";
import MainPage from "../pages/MainPage/MainPage";
import News from "../pages/MainPage/Components/News/News";
import Tasks from "../pages/MainPage/Components/Tasks/Tasks";
import Statistics from "../pages/MainPage/Components/Statistics/Statistics";
import Leaderboard from "../pages/MainPage/Components/Leaderboard/Leaderboard";
import Market from "../pages/MainPage/Components/Market/Market";
import Instruments from "../pages/MainPage/Components/Instruments/Instruments";
import Employees from "../pages/MainPage/Components/Employees/Employees";
import ProjectLeaderboard from "../pages/MainPage/Components/Leaderboard/ProjectLeaderboard/ProjectLeaderboard";
import { AnimatePresence } from "framer-motion/dist/framer-motion";

const AnimatedPage = () => {
  // fetch("https://api1.traffkillas.kz/login", {
  //   method: "GET",
  //   headers: {
  //     "Token": localStorage.getItem("token"),
  //   },
  // })
  //   .then((response) => response.text())
  //   .then((result) => {
  //     console.log(result)
  //   });
  const position = localStorage.position;
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Authorization position={position} />}></Route>
        <Route
          path="/MainPage/"
          element={<MainPage position={position} />}
        ></Route>
        <Route
          path="/MainPage/Profile"
          element={<Profile position={position} />}
        />
        <Route path="/MainPage/" element={<MainPage position={position} />}>
          {/* <Route path="/" element={<UserPage />} />
          <Route path="/SecondPage" element={<SecondPage />} /> */}
          <Route index element={<News position={position} />} />
          <Route
            path="/MainPage/Tasks"
            element={<Tasks position={position} />}
          />
          <Route
            path="/MainPage/Statistics"
            element={<Statistics position={position} />}
          />
          <Route
            path="/MainPage/ProjectLeaderboard"
            element={<ProjectLeaderboard position={position} />}
          />
          <Route
            path="/MainPage/Market"
            element={<Market position={position} />}
          />
          <Route
            path="/MainPage/Instruments"
            element={<Instruments position={position} />}
          />
          <Route
            path="/MainPage/Employees"
            element={<Employees position={position} />}
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedPage;
