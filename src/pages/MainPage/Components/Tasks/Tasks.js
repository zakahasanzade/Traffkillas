import React, { useEffect, useState } from "react";
import ArrowRight from "./Tasks Assets/Arrow Right.svg";
import TextareaAutosize from "react-textarea-autosize";
import { motion } from "framer-motion/dist/framer-motion";
import FormData from "form-data";
import axios from "axios";
import { Checkmark } from "react-checkmark";
import Checkbox from "@mui/material/Checkbox";
import "./Tasks.css";

const Tasks = (props) => {
  const sendTask = (e) => {
    e.preventDefault();
    console.log();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    formData.append(
      "feedback",
      document.querySelector(".PrivateSwitchBase-input").checked
    );
    axios
      .post("https://httpbin.org/post_task", formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
  };
  let WorkDataArr = [];
  const [WorkData, SetWorkData] = useState();

  const getWorkData = () => {
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
      .then((result) => {
        WorkDataArr = [JSON.parse(result).work[0]];
        SetWorkData(WorkDataArr);
        console.log(WorkDataArr);
      })
      .catch((err) => {
        alert(err);
      });
  };
  let ManageDataArr = [];
  const [ManageData, SetManageData] = useState();

  const getManageData = () => {
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
      .then((result) => {
        ManageDataArr = [JSON.parse(result).manage[0]];
        SetManageData(ManageDataArr);
        console.log(ManageDataArr);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getWorkData();
    getManageData();
  }, []);
  const [counter, setCounter] = useState("22:22");
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);
  // const [value, onChange] = useState("10:00");
  const position = props.status;
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
          {WorkData &&
            WorkData.map((block) => {
              const {
                content,
                feedback,
                fine,
                hour,
                manager,
                minute,
                state,
                title,
                worker,
                _id,
              } = block;
              const timer = hour + ":" + minute;
              console.log(counter);
              if (state == 1) {
                return (
                  <>
                    <p className="date">В работе</p>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p>{timer}</p>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} MMR
                          </p>
                        </div>
                      </div>
                      {feedback ? (
                        <div className="tasks_content">
                          <p>{content}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                );
              }

              if (state == 3) {
                return (
                  <>
                    <p className="date">На доработку</p>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p>{timer}</p>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} MMR
                          </p>
                        </div>
                      </div>
                      {feedback ? (
                        <div className="tasks_content">
                          <p>{content}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                );
              }
              if (state == 0) {
                return (
                  <>
                    <p className="date">Доступные</p>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p>{timer}</p>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} MMR
                          </p>
                        </div>
                      </div>
                      {feedback ? (
                        <div className="tasks_div_submit">
                          <TextareaAutosize placeholder="Впишите обратную связь..." />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                );
              }
            })}
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
            <input
              className="sendData_taskTitle"
              name="Title"
              placeholder="Название"
            />
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
                    maxLength="2"
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
                    maxLength="2"
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
                    maxLength="5"
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
          {ManageData &&
            ManageData.map((block) => {
              const {
                content,
                feedback,
                fine,
                hour,
                manager,
                minute,
                state,
                title,
                worker,
                _id,
              } = block;
              const timer = hour + ":" + minute;
              if (state == 0 || state == 1) {
                return (
                  <>
                    <p className="date">Созданные</p>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p>{timer}</p>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} MMR
                          </p>
                        </div>
                      </div>
                      {feedback ? (
                        <div className="tasks_content">
                          <p>{content}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                );
              }
              if (state == 2) {
                return (
                  <>
                    <p className="date">Выполенные</p>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p>{timer}</p>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} MMR
                          </p>
                        </div>
                      </div>
                      {feedback ? (
                        <div className="tasks_content">
                          <p>{content}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                );
              }
            })}
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
          <p>Мои задания</p>
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
            <input
              className="sendData_taskTitle"
              name="title"
              placeholder="Название"
            />
            <input
              className="sendData_taskContent"
              placeholder="Описание задания..."
              name="content"
            />
            <hr style={{ opacity: 0.5 }} />
            <div className="sendData_tasks">
              <div className="sendData_task">
                <select name="worker" className="autorSelect">
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
                    name="hour"
                    maxLength="2"
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
                    maxLength="2"
                    name="minute"
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
                    maxLength="5"
                    name="fine"
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
                  Feedback{" "}
                  <Checkbox
                    size="small"
                    className="feedback"
                    onChange={(e) => {
                      console.log(e.target.checked);
                    }}
                  />
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
          {WorkData &&
            WorkData.map((block) => {
              const {
                content,
                feedback,
                fine,
                hour,
                manager,
                minute,
                state,
                title,
                worker,
                _id,
              } = block;
              const timer = hour + ":" + minute;
              if (state == 1) {
                return (
                  <>
                    <p className="date">Мои задания</p>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p>{timer}</p>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} MMR
                          </p>
                        </div>
                      </div>
                      {feedback ? (
                        <div className="tasks_content">
                          <p>{content}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                );
              }

              if (state == 3) {
                return (
                  <>
                    <p className="date">На доработку</p>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p>{timer}</p>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} MMR
                          </p>
                        </div>
                      </div>
                      {feedback ? (
                        <div className="tasks_content">
                          <p>{content}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                );
              }
            })}
          {ManageData &&
            ManageData.map((block) => {
              const {
                content,
                feedback,
                fine,
                hour,
                manager,
                minute,
                state,
                title,
                worker,
                _id,
              } = block;
              const timer = hour + ":" + minute;
              if (state == 0 || state == 1) {
                return (
                  <>
                    <p className="date">Созданные</p>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p>{timer}</p>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} MMR
                          </p>
                        </div>
                      </div>
                      {feedback ? (
                        <div className="tasks_content">
                          <p>{content}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                );
              }
              if (state == 2) {
                return (
                  <>
                    <p className="date">Выполенные</p>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p>{timer}</p>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} MMR
                          </p>
                        </div>
                      </div>
                      {feedback ? (
                        <div className="tasks_content">
                          <p>{content}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                );
              }
            })}
        </div>
      </motion.div>
    );
  }
};

export default Tasks;
{
  /* <p className="date">В работе</p>
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
                  <i className="fa-sharp fa-solid fa-arrow-right"></i>
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
                    <i className="fa-sharp fa-solid fa-arrow-right"></i>
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
                    <AiFillCheckCircle size="30px" />
                    <i className="fa-solid fa-check"></i>
                  </p>
                  <p className="tasks_footer">-30 MMR</p>
                </div>
              </div>
            </div>
          </div> */
}
