import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
import { Navbar } from "react-bootstrap";
import Profile from "../pages/MainPage/Components/Profile/Profile";
import Authorization from "../pages/Authorization/Authorization";
import UserPage from "../pages/UserPage/UserPage";
import SecondPage from "../pages/UserPage/Components/SecondPage";
import MainPage from "../pages/MainPage/MainPage";
import News from "../pages/MainPage/Components/News/News";
import Tasks from "../pages/MainPage/Components/Tasks/Tasks";
import Statistics from "../pages/MainPage/Components/Statistics/Statistics";
import Leaderboard from "../pages/MainPage/Components/Leaderboard/Leaderboard";
import Market from "../pages/MainPage/Components/Market/Market";
import Instruments from "../pages/MainPage/Components/Instruments/Instruments";
import Employees from "../pages/MainPage/Components/Employees/Employees";
import Header from "../pages/MainPage/Components/Header/Header";
import NavBar from "../pages/MainPage/Components/NavBar/NavBar";
import { AnimatePresence } from "framer-motion/dist/framer-motion";

const AnimatedPage = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Authorization />}></Route>
        <Route path="/MainPage/" element={<MainPage />}></Route>
        <Route path="/MainPage/Profile" element={<Profile />} />
        <Route path="/MainPage/" element={<MainPage />}>
          {/* <Route path="/" element={<UserPage />} />
          <Route path="/SecondPage" element={<SecondPage />} /> */}
          <Route index element={<News />} />
          <Route path="/MainPage/Tasks" element={<Tasks />} />
          <Route path="/MainPage/Statistics" element={<Statistics />} />
          <Route path="/MainPage/Leaderboard" element={<Leaderboard />} />
          <Route path="/MainPage/Market" element={<Market />} />
          <Route path="/MainPage/Instruments" element={<Instruments />} />
          <Route path="/MainPage/Employees" element={<Employees />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedPage;
