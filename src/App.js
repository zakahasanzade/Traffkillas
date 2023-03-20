import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import "./reset.css";
import "./common.css";

import AnimatedPage from "./AnimatedPage/AnimatedPage";

const App = () => {
  const [mode, setMode] = useState();
  const ChangeMode = () => {
    setMode(!mode);
    console.log(mode);
  };

  // useEffect(() => {
  //   mode
  //     ? window.localStorage.setItem("mode", true)
  //     : window.localStorage.setItem("mode", false);
  // }, [mode]);

  return (
    <div className="app">
      <Helmet>
        <style>
          {mode
            ? "body { background-color: #ebedf0;transition:all 1s }"
            : "body { background-color: #222226;transition:all 1s }"}
        </style>
      </Helmet>
      <AnimatedPage ChangeMode={ChangeMode} mode={mode} />
    </div>
  );
};

export default App;
