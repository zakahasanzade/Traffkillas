import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import Mark from "./Tasks Assets/Mark.svg";
import Dropdown from "./Tasks Assets/Dropdown arrow bottom.svg";
import BlackMark from "./Tasks Assets/Black Mark.svg";
import ArrowRight from "./Tasks Assets/Arrow Right.svg";
import TextareaAutosize from "react-textarea-autosize";
import TimePicker from "react-time-picker";
// import Select from "react-select";
// import { CSSTransition } from "react-transition-group";
import { motion } from "framer-motion/dist/framer-motion";
// import {
//   ProSidebar,
//   Menu,
//   MenuItem,
//   SubMenu,
//   SidebarContent,
// } from "react-pro-sidebar";
import "./Tasks.css";
// import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { borderRadius } from "@mui/system";
const sendTask = () => {
  const taskTitle = document.querySelector(".sendData_taskTitle").value;
  const taskContent = document.querySelector(".sendData_taskContent").value;
  const autorSelect = document.querySelector(".autorSelect").value;

  // fetch("http://94.103.90.6:5000/post_news", {
  //   method: "POST",
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     taskTitle: taskTitle,
  //     taskContent: taskContent,
  //     autorSelect: autorSelect,
  //   }),
  // })
  //   .then((response) => {
  //     // console.log(response.status);
  //     return response.text();
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     alert(err);
  //   });
};
const Tasks = (props) => {
  const [value, onChange] = useState("10:00");
  const position = props.example;
  if (position == "employee") {
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
              className="sendData_taskContent"
              placeholder="Описание задания..."
            />
            <hr style={{ opacity: 0.5 }} />
            <div className="sendData_tasks">
              <div className="sendData_task">
                <select name="pets" className="autorSelect">
                  <option value="Исполнитель">Исполнитель</option>
                  <option value="Исполнитель1">Исполнитель1</option>
                  <option value="Исполнитель2">Исполнитель2</option>
                  <option value="Исполнитель3">Исполнитель3</option>
                </select>
                <p>48:00</p>
                <p>-600 MMR</p>
                <p>
                  Feedback <i className="fa-solid fa-check"></i>
                </p>
              </div>
              <div className="sendData_submit">
                <button type="submit" onClick={sendTask}>
                  Отправить задание <img src={ArrowRight} alt="rightArrow" />
                </button>
              </div>
            </div>
          </div>
          <p className="date">В работе</p>
          <div className="tasks_page_div">
            <div className="tasks_div">
              <p className="tasks_header">Написать 30 постов</p>
              <div>
                <p
                  className="second_task_time"
                  style={{ backgroundColor: "red" }}
                >
                  <p>25:35</p>
                </p>
                <p className="tasks_footer" style={{ color: "#EA9127" }}>
                  -30 MMR
                </p>
              </div>
            </div>
            <div className="tasks_div_submit">
              <TextareaAutosize placeholder="Впишите обратную связь..." />
              <button>
                <div
                  style={{
                    backgroundColor: "#0f82f5",
                    padding: "4px",
                    borderRadius: "25px",
                  }}
                >
                  <i class="fa-sharp fa-solid fa-arrow-right"></i>
                </div>
              </button>
            </div>
          </div>
          <div>
            <div className="tasks_page_div">
              <div className="tasks_div">
                <p className="tasks_header">Отправить Путлера в Гаагу</p>
                <div>
                  <p
                    className="second_task_time"
                    style={{ backgroundColor: "red" }}
                  >
                    <p>25:35</p>
                  </p>
                  <p className="tasks_footer" style={{ color: "#EA9127" }}>
                    -30 MMR
                  </p>
                </div>
              </div>
              <div className="tasks_div_submit">
                <TextareaAutosize placeholder="Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом!" />
                <button>
                  <div
                    style={{
                      backgroundColor: "#0f82f5",
                      padding: "4px",
                      borderRadius: "25px",
                    }}
                  >
                    <i class="fa-sharp fa-solid fa-arrow-right"></i>
                  </div>
                </button>
              </div>
            </div>
            <div></div>
            <p className="date">Доступные</p>
            <div className="tasks_page_div">
              <div className="tasks_div">
                <p className="tasks_header">Пранк сотрудников</p>
                <div>
                  <p className="second_task_time">
                    <p>48:00</p>
                    {/* <img src={Mark} /> */}
                    <i className="fa-solid fa-check"></i>
                  </p>
                  <p className="tasks_footer" style={{ color: "#AB16CD" }}>
                    -600 ₸
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="tasks_page_div">
              <div className="tasks_div">
                <p className="tasks_header">Накатать донос на Путлера</p>
                <div>
                  <p className="second_task_time">
                    <p>24:00</p>
                    {/* <AiFillCheckCircle size="30px" /> */}
                    <i className="fa-solid fa-check"></i>
                  </p>
                  <p className="tasks_footer">-30 MMR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  } else if (position == "teamlead") {
    return (
      <motion.div
        className="main"
        id="active"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="tasks_teamlead">
          <p>Мои задания</p>
          <p>Созданные</p>
          <p>Выполенные</p>
        </div>
        <div className="tasks">
          <div className="task_sendData">
            <input className="sendData_taskTitle" placeholder="Название" />
            <input
              className="sendData_taskContent"
              placeholder="Описание задания..."
            />
            <hr style={{ opacity: 0.5 }} />
            <div className="sendData_tasks">
              <div className="sendData_task">
                <select name="pets" className="autorSelect">
                  <option value="Исполнитель">Исполнитель</option>
                  <option value="Исполнитель1">Исполнитель1</option>
                  <option value="Исполнитель2">Исполнитель2</option>
                  <option value="Исполнитель3">Исполнитель3</option>
                </select>
                <p>48:00</p>
                <p>-600 MMR</p>
                <p>
                  Feedback <i className="fa-solid fa-check"></i>
                </p>
              </div>
              <div className="sendData_submit">
                <button type="submit" onClick={sendTask}>
                  Отправить задание <img src={ArrowRight} alt="rightArrow" />
                </button>
              </div>
            </div>
          </div>
          <p className="date">В работе</p>
          <div className="tasks_page_div">
            <div className="tasks_div">
              <p className="tasks_header">Написать 30 постов</p>
              <div>
                <p
                  className="second_task_time"
                  style={{ backgroundColor: "red" }}
                >
                  <p>25:35</p>
                </p>
                <p className="tasks_footer" style={{ color: "#EA9127" }}>
                  -30 MMR
                </p>
              </div>
            </div>
            <div className="tasks_div_submit">
              <TextareaAutosize placeholder="Впишите обратную связь..." />
              <button>
                <div
                  style={{
                    backgroundColor: "#0f82f5",
                    padding: "4px",
                    borderRadius: "25px",
                  }}
                >
                  <i class="fa-sharp fa-solid fa-arrow-right"></i>
                </div>
              </button>
            </div>
          </div>
          <div>
            <div className="tasks_page_div">
              <div className="tasks_div">
                <p className="tasks_header">Отправить Путлера в Гаагу</p>
                <div>
                  <p
                    className="second_task_time"
                    style={{ backgroundColor: "red" }}
                  >
                    <p>25:35</p>
                  </p>
                  <p className="tasks_footer" style={{ color: "#EA9127" }}>
                    -30 MMR
                  </p>
                </div>
              </div>
              <div className="tasks_div_submit">
                <TextareaAutosize placeholder="Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом!" />
                <button>
                  <div
                    style={{
                      backgroundColor: "#0f82f5",
                      padding: "4px",
                      borderRadius: "25px",
                    }}
                  >
                    <i class="fa-sharp fa-solid fa-arrow-right"></i>
                  </div>
                </button>
              </div>
            </div>
            <div></div>
            <p className="date">Доступные</p>
            <div className="tasks_page_div">
              <div className="tasks_div">
                <p className="tasks_header">Пранк сотрудников</p>
                <div>
                  <p className="second_task_time">
                    <p>48:00</p>
                    {/* <img src={Mark} /> */}
                    <i className="fa-solid fa-check"></i>
                  </p>
                  <p className="tasks_footer" style={{ color: "#AB16CD" }}>
                    -600 ₸
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="tasks_page_div">
              <div className="tasks_div">
                <p className="tasks_header">Накатать донос на Путлера</p>
                <div>
                  <p className="second_task_time">
                    <p>24:00</p>
                    {/* <AiFillCheckCircle size="30px" /> */}
                    <i className="fa-solid fa-check"></i>
                  </p>
                  <p className="tasks_footer">-30 MMR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  } else if (position == "admin") {
    return (
      <motion.div
        className="main"
        id="active"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="tasks_teamlead">
          <p>Созданные</p>
          <p>Выполенные</p>
        </div>
        <div className="tasks">
          <div className="task_sendData">
            <input className="sendData_taskTitle" placeholder="Название" />
            <input
              className="sendData_taskContent"
              placeholder="Описание задания..."
            />
            <hr style={{ opacity: 0.5 }} />
            <div className="sendData_tasks">
              <div className="sendData_task">
                <select name="pets" className="autorSelect">
                  <option value="Исполнитель">Исполнитель</option>
                  <option value="Исполнитель1">Исполнитель1</option>
                  <option value="Исполнитель2">Исполнитель2</option>
                  <option value="Исполнитель3">Исполнитель3</option>
                </select>
                <TimePicker
                  onChange={onChange}
                  value={value}
                />
                <p>-600 MMR</p>
                <p>
                  Feedback <i className="fa-solid fa-check"></i>
                </p>
              </div>
              <div className="sendData_submit">
                <button type="submit" onClick={sendTask}>
                  Отправить задание <img src={ArrowRight} alt="rightArrow" />
                </button>
              </div>
            </div>
          </div>
          <p className="date">В работе</p>
          <div className="tasks_page_div">
            <div className="tasks_div">
              <p className="tasks_header">Написать 30 постов</p>
              <div>
                <p
                  className="second_task_time"
                  style={{ backgroundColor: "red" }}
                >
                  <p>25:35</p>
                </p>
                <p className="tasks_footer" style={{ color: "#EA9127" }}>
                  -30 MMR
                </p>
              </div>
            </div>
            <div className="tasks_div_submit">
              <TextareaAutosize placeholder="Впишите обратную связь..." />
              <button>
                <div
                  style={{
                    backgroundColor: "#0f82f5",
                    padding: "4px",
                    borderRadius: "25px",
                  }}
                >
                  <i class="fa-sharp fa-solid fa-arrow-right"></i>
                </div>
              </button>
            </div>
          </div>
          <div>
            <div className="tasks_page_div">
              <div className="tasks_div">
                <p className="tasks_header">Отправить Путлера в Гаагу</p>
                <div>
                  <p
                    className="second_task_time"
                    style={{ backgroundColor: "red" }}
                  >
                    <p>25:35</p>
                  </p>
                  <p className="tasks_footer" style={{ color: "#EA9127" }}>
                    -30 MMR
                  </p>
                </div>
              </div>
              <div className="tasks_div_submit">
                <TextareaAutosize placeholder="Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом! Да отправил я вчера последним рейсом!" />
                <button>
                  <div
                    style={{
                      backgroundColor: "#0f82f5",
                      padding: "4px",
                      borderRadius: "25px",
                    }}
                  >
                    <i class="fa-sharp fa-solid fa-arrow-right"></i>
                  </div>
                </button>
              </div>
            </div>
            <div></div>
            <p className="date">Доступные</p>
            <div className="tasks_page_div">
              <div className="tasks_div">
                <p className="tasks_header">Пранк сотрудников</p>
                <div>
                  <p className="second_task_time">
                    <p>48:00</p>
                    {/* <img src={Mark} /> */}
                    <i className="fa-solid fa-check"></i>
                  </p>
                  <p className="tasks_footer" style={{ color: "#AB16CD" }}>
                    -600 ₸
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="tasks_page_div">
              <div className="tasks_div">
                <p className="tasks_header">Накатать донос на Путлера</p>
                <div>
                  <p className="second_task_time">
                    <p>24:00</p>
                    {/* <AiFillCheckCircle size="30px" /> */}
                    <i className="fa-solid fa-check"></i>
                  </p>
                  <p className="tasks_footer">-30 MMR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
};

export default Tasks;

{
  /* <div class=" css-b62m3t-container">
  <span
    id="react-select-2-live-region"
    class="css-1f43avz-a11yText-A11yText"
  ></span>
  <span
    aria-live="polite"
    aria-atomic="false"
    aria-relevant="additions text"
    class="css-1f43avz-a11yText-A11yText"
  ></span>
  <div class=" css-13cymwt-control">
    <div class=" css-1fdsijx-ValueContainer">
      <div class=" css-1dimb5e-singleValue">Cocos Islands</div>
      <div class=" css-qbdosj-Input" data-value="">
        <input
          class=""
          autocapitalize="none"
          autocomplete="off"
          autocorrect="off"
          id="react-select-2-input"
          spellcheck="false"
          tabindex="0"
          type="text"
          aria-autocomplete="list"
          aria-expanded="false"
          aria-haspopup="true"
          role="combobox"
          value=""
          style="color: inherit; background: 0px center; opacity: 1; width: 100%; grid-area: 1 / 2 / auto / auto; font: inherit; min-width: 2px; border: 0px; margin: 0px; outline: 0px; padding: 0px;"
          fdprocessedid="l6j4ku"
        />
      </div>
    </div>
    <div class=" css-1hb7zxy-IndicatorsContainer">
      <span class=" css-1u9des2-indicatorSeparator"></span>
      <div class=" css-1xc3v61-indicatorContainer" aria-hidden="true">
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
          class="css-tj5bde-Svg"
        >
          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
      </div>
    </div>
  </div>
</div>; */
}
