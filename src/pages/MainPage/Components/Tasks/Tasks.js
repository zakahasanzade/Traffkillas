import React, { useEffect } from "react";
import ArrowRight from "./Tasks Assets/Arrow Right.svg";
import TextareaAutosize from "react-textarea-autosize";
import { motion } from "framer-motion/dist/framer-motion";
import FormData from "form-data";
import axios from "axios";
import "./Tasks.css";

const getTaskData = () => {
  fetch("http://94.103.90.6:5000/get_task", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  })
    .then((response) => {
      return response.text();
    })

    .catch((err) => {
      alert(err);
    });
};
const sendTask = (e) => {
  e.preventDefault();
  const form = document.getElementById("form");
  const formData = new FormData(form);
  axios
    .post("https://httpbin.org/post_task", formData, {
      headers: {},
    })
    .then((res) => {
      console.log(res.data.status);
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(formData);
};
const Tasks = (props) => {
  useEffect(() => {
    getTaskData();
    console.log(localStorage.getItem("token"))
  }, []);
  // const [value, onChange] = useState("10:00");
  const position = "1";
  if (position == "3") {
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
          <form className="task_sendData">
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
                <button type="submit">
                  Отправить задание <img src={ArrowRight} alt="rightArrow" />
                </button>
              </div>
            </div>
          </form>
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
  } else if (position == "2") {
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
  } else if (position === "1") {
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
          <form
            className="task_sendData"
            onSubmit={(e) => {
              sendTask(e);
              console.log("Hello");
            }}
            id="form"
          >
            <input className="sendData_taskTitle" name="Title" placeholder="Название" />
            <input
              className="sendData_taskContent"
              placeholder="Описание задания..."
              name="Description"
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
                <div className="senData_task_inputsForm">
                  <input
                    type="text"
                    className="firstinput"
                    placeholder="Ч"
                    name="TimerHours"
                    maxlength="2"
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*)\./g, "$1")
                        .slice(0, 11);
                    }}
                  />
                  :
                  <input
                    type="text"
                    className="secondinput"
                    placeholder="М"
                    maxlength="2"
                    name="TimerMinut"
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*)\./g, "$1")
                        .slice(0, 11);
                    }}
                  />
                </div>
                <p className="SendData_fine">
                  -{" "}
                  <input
                    type="text"
                    placeholder="Штраф"
                    maxlength="5"
                    name="Fine"
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*)\./g, "$1")
                        .slice(0, 11);
                    }}
                  />{" "}
                  MMR
                </p>
                <p name="Checked">
                  Feedback <i className="fa-solid fa-check"></i>
                </p>
              </div>
              <div className="sendData_submit">
                <button
                  type="submit"
                  // onClick={sendTask}
                >
                  Отправить задание <img src={ArrowRight} alt="rightArrow" />
                </button>
              </div>
            </div>
          </form>
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
