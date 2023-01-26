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
import { AnimatePresence } from "framer-motion/dist/framer-motion";

const AnimatedPage = () => {
  // fetch("http://94.103.90.6:5000/login", {
  //   method: "GET",
  //   headers: {
  //     "Token": localStorage.getItem("token"),
  //   },
  // })
  //   .then((response) => response.text())
  //   .then((result) => {
  //     console.log(result)
  //   });
  const status = localStorage.status;
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Authorization status={status} />}></Route>
        <Route path="/MainPage/" element={<MainPage status={status} />}></Route>
        <Route path="/MainPage/Profile" element={<Profile status={status} />} />
        <Route path="/MainPage/" element={<MainPage status={status} />}>
          {/* <Route path="/" element={<UserPage />} />
          <Route path="/SecondPage" element={<SecondPage />} /> */}
          <Route index element={<News status={status} />} />
          <Route path="/MainPage/Tasks" element={<Tasks status={status} />} />
          <Route
            path="/MainPage/Statistics"
            element={<Statistics status={status} />}
          />
          <Route
            path="/MainPage/Leaderboard"
            element={<Leaderboard status={status} />}
          />
          <Route path="/MainPage/Market" element={<Market status={status} />} />
          <Route
            path="/MainPage/Instruments"
            element={<Instruments status={status} />}
          />
          <Route
            path="/MainPage/Employees"
            element={<Employees status={status} />}
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedPage;
