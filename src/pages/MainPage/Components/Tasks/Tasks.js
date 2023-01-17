import React from "react";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import { AiFillCheckCircle } from "react-icons/ai";
import "./Tasks.css";
const Tasks = () => {
  return (
    <div className="main" id="active">
    
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
            <p className="tasks_header">Продумать креатив</p>
            <div>
              <p className="second_task_time">
                <p>60:00</p> <AiFillCheckCircle size="30px" />
              </p>
              <p className="tasks_footer">+40MMR</p>
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
  );
};

export default Tasks;
