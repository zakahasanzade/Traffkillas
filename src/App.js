import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import "./reset.css";
import "./common.css";

import AnimatedPage from "./AnimatedPage/AnimatedPage";

const App = () => {
  const [mode, setMode] = useState(JSON.parse(localStorage.getItem("mode")));

  const ChangeMode = () => {
    setMode(!mode);
  };

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

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
