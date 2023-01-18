import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import Mark from "./Tasks Assets/Mark.svg";
import Dropdown from "./Tasks Assets/Dropdown arrow bottom.svg";
import BlackMark from "./Tasks Assets/Black Mark.svg";
import ArrowRight from "./Tasks Assets/Arrow Right.svg";
import Select from "react-select";
import { CSSTransition } from "react-transition-group";
import { motion } from "framer-motion/dist/framer-motion";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import "./Tasks.css";
const Tasks = () => {
  const Countries = [
    { label: "Albania", value: 355 },
    { label: "Argentina", value: 54 },
    { label: "Austria", value: 43 },
    { label: "Cocos Islands", value: 61 },
    { label: "Kuwait", value: 965 },
    { label: "Sweden", value: 46 },
    { label: "Venezuela", value: 58 },
  ];

  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="tasks">
        <div className="task_sendData">
          <input className="sendData_taskTitle" placeholder="Название" />
          <input
            className="sendData_taskCcontent"
            placeholder="Описание задания..."
          />
          <hr style={{ opacity: 0.5 }} />
          <div className="sendData_tasks">
            <div className="sendData_task">
              <CSSTransition
                in={true}
                classNames="alert"
                timeout={3000}
                unmountOnExit
              >
                <Select options={Countries} />
              </CSSTransition>
              <p>48:00</p>
              <p>-600 MMR</p>
              <p>
                Feedback <img src={BlackMark} />
              </p>
            </div>
            <div className="sendData_submit">
              <button type="submit">
                Отправить задание <img src={ArrowRight} alt="ArrowRight" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="date">В работе</p>
          <div className="tasks_page_div">
            <div className="tasks_div">
              <p className="tasks_header">Написать 30 постов</p>
              <div>
                <p className="first_task_time">25:35</p>
                <p className="tasks_footer">+30MMR</p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div>
          <p className="date">Доступные</p>
          <div className="tasks_page_div">
            <div className="tasks_div">
              <p className="tasks_header">Пранк сотрудников</p>
              <div>
                <p className="second_task_time">
                  <p>24:00</p> <img src={Mark} />
                </p>
                <p className="tasks_footer" style={{ color: "#AB16CD" }}>
                  +600 ₸
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="tasks_page_div">
            <div className="tasks_div">
              <p className="tasks_header">Пранк над сотрудниками</p>
              <div>
                <p className="second_task_time">
                  <p>120:00</p>
                  <AiFillCheckCircle size="30px" />
                </p>
                <p className="tasks_footer">+600MMR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Tasks;
