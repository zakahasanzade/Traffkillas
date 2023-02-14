import React, { useEffect, useState } from "react";
import ArrowRight from "./Tasks Assets/Arrow Right.svg";
import TextareaAutosize from "react-textarea-autosize";
import { motion } from "framer-motion/dist/framer-motion";
import FormData from "form-data";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import { Checkmark } from "react-checkmark";
import Checkbox from "@mui/material/Checkbox";
import "./Tasks.css";
import { width } from "@mui/system";

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
      .post("http://94.103.90.6:5000/post_task", formData, {
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
  const ConfirmAvailableTask = (e) => {
    fetch("http://94.103.90.6:5000/confirm_task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id: e.target.id }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {})
      .catch((err) => {
        alert(err);
      });
  };
  const CompleteInProcessTask = (e) => {
    fetch("http://94.103.90.6:5000/complate_task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id: e.target.id }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {})
      .catch((err) => {
        alert(err);
      });
  };
  const ReopenCompleteTask = (e) => {
    fetch("http://94.103.90.6:5000/reopen_task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id: e.target.id }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {})
      .catch((err) => {
        alert(err);
      });
  };
  const FinishInProcessTask = (e) => {
    fetch("http://94.103.90.6:5000/finish_task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id: e.target.id }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {})
      .catch((err) => {
        alert(err);
      });
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
        WorkDataArr = [JSON.parse(result).work];
        SetWorkData(JSON.parse(result).work);
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
        ManageDataArr = [JSON.parse(result).manage];
        SetManageData(JSON.parse(result).manage);
        console.log(JSON.parse(result).manage);
        console.log(ManageData);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const [Workers, SetWorkers] = useState();
  const getWorkers = () => {
    fetch("http://94.103.90.6:5000/get_workers", {
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
        SetWorkers(JSON.parse(result)["data"]);
        console.log(Workers);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getWorkData();
    getManageData();
    getWorkers();
  }, []);
  const [CalendarValue, ChangeCalendar] = useState(new Date());

  const GetCalendarData = () => {
    var Date = CalendarValue.toDateString().slice(4);
    console.log(Date);
  };

  // useEffect(() => {
  //   // Set the date we're counting down to
  //   var countDownDate = new Date("Mar 11 2023 22:30").getTime();

  //   // Update the count down every 1 second
  //   var x = setInterval(function () {
  //     // Get today's date and time
  //     var now = new Date().getTime();

  //     // Find the distance between now and the count down date
  //     var distance = countDownDate - now;

  //     // If the count down is over, write some text
  //     if (distance < 0) {
  //       clearInterval(x);
  //       console.log("EXPIRED");
  //     }

  //     // Time calculations for days, hours, minutes and seconds
  //     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     var hours = Math.floor(
  //       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //     // Output the result in an element with id="demo"
  //     document.querySelector(".timer").innerHTML =
  //       (days != 0 ? days + "д " : "") +
  //       (hours != 0 ? hours + "ч " : "") +
  //       (minutes != 0 ? minutes + "м " : "") +
  //       (seconds != 0 ? seconds + "с " : "");
  //   }, 1000);
  // }, []);
  const position = props.position;
  console.log(props);
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
          <p className="date">В работе</p>
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
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p className="timer">{timer}</p>
                            <i
                              id={_id}
                              class="bi bi-check-circle-fill"
                              onClick={(e) => CompleteInProcessTask(e)}
                            ></i>
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
          <p className="date">На доработку</p>
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
              if (state == 3) {
                return (
                  <>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "black" }}
                          >
                            <p className="timer">{timer}</p>
                            <i
                              id={_id}
                              class="bi bi-check-circle-fill"
                              onClick={(e) => ConfirmAvailableTask(e)}
                            ></i>
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
          <p className="date">Доступные</p>
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
              if (state == 0) {
                return (
                  <>
                    {console.log(document.querySelector(".date"))}
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p className="timer">
                              {timer}{" "}
                              <i
                                id={_id}
                                className="bi bi-plus-circle-fill"
                                onClick={(e) => ConfirmAvailableTask(e)}
                              ></i>
                            </p>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} MMR
                          </p>
                        </div>
                      </div>
                      {feedback == "true" ? (
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div className="sendData_task">
                  <select name="worker" className="autorSelect">
                    {Workers &&
                      Workers.map((el) => {
                        const { _id, username } = el;
                        return (
                          <option id={_id} value={_id}>
                            {username}
                          </option>
                        );
                      })}
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

                  <p
                    className="SendData_fine"
                    onClick={() => {
                      GetCalendarData();
                    }}
                  >
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
                <Calendar onChange={ChangeCalendar} value={CalendarValue} />
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
          <p className="date">Мои задания</p>
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
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p className="timer">{timer}</p>
                            <i
                              id={_id}
                              class="bi bi-check-circle-fill"
                              onClick={(e) => CompleteInProcessTask(e)}
                            ></i>
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
          <p className="date">На доработку</p>
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
              if (state == 3) {
                return (
                  <>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "black" }}
                          >
                            <p className="timer">{timer}</p>
                            <i
                              id={_id}
                              class="bi bi-check-circle-fill"
                              onClick={(e) => ConfirmAvailableTask(e)}
                            ></i>
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
          <p className="date">Созданные</p>
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
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">
                          {title} <i className="bi bi-trash3-fill"></i>
                        </p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p className="timer">{timer} </p>
                            <i className="bi bi-hourglass-split"></i>
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
          <p className="date">Выполенные</p>
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
              if (state == 2) {
                return (
                  <>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <div className="tasks_div_complete">
                          <p className="tasks_header">{title}</p>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p className="timer">{timer}</p>
                          </p>
                          <i
                            className="bi bi-trash3-fill"
                            style={{ color: "red" }}
                          ></i>
                        </div>
                        <div className="tasks_div_complete_submit">
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "#EA9127" }}
                          >
                            <p className="timer">Доработать </p>
                            <i
                              class="bi bi-exclamation-circle-fill"
                              id={_id}
                              onClick={(e) => ReopenCompleteTask(e)}
                            ></i>
                          </p>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "#16C784" }}
                          >
                            <p className="timer">Принять </p>
                            <i
                              id={_id}
                              class="bi bi-check-circle-fill"
                              onClick={(e) => FinishInProcessTask(e)}
                            ></i>
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
          <p className="date">Доступные</p>
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
              if (state == 0) {
                return (
                  <>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p className="timer">
                              {timer}{" "}
                              <i
                                id={_id}
                                className="bi bi-plus-circle-fill"
                                onClick={(e) => ConfirmAvailableTask(e)}
                              ></i>
                            </p>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div className="sendData_task">
                  <select name="worker" className="autorSelect">
                    {Workers &&
                      Workers.map((el) => {
                        const { _id, username } = el;
                        return (
                          <option id={_id} value={_id}>
                            {username}
                          </option>
                        );
                      })}
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

                  <p
                    className="SendData_fine"
                    onClick={() => {
                      GetCalendarData();
                    }}
                  >
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
                <Calendar onChange={ChangeCalendar} value={CalendarValue} />
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
          <p className="date">Мои задания</p>
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
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p className="timer">
                              {timer}
                              {/* {timer} */}
                            </p>
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
          <p className="date">На доработку</p>
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
              if (state == 3) {
                return (
                  <>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p className="timer">{timer}</p>
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
          <p className="date">Созданные</p>
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
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">
                          {title} <i className="bi bi-trash3-fill"></i>
                        </p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p className="timer">{timer} </p>
                            <i className="bi bi-hourglass-split"></i>
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
          <p className="date">Выполенные</p>
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
              if (state == 2) {
                return (
                  <>
                    <div className="tasks_page_div">
                      <div className="tasks_div">
                        <div className="tasks_div_complete">
                          <p className="tasks_header">{title}</p>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p className="timer">{timer}</p>
                          </p>
                          <i
                            className="bi bi-trash3-fill"
                            style={{ color: "red" }}
                          ></i>
                        </div>
                        <div className="tasks_div_complete_submit">
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "#EA9127" }}
                          >
                            <p className="timer">Доработать </p>
                            <i
                              class="bi bi-exclamation-circle-fill"
                              id={_id}
                              onClick={(e) => ReopenCompleteTask(e)}
                            ></i>
                          </p>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "#16C784" }}
                          >
                            <p className="timer">Принять </p>
                            <i
                              id={_id}
                              class="bi bi-check-circle-fill"
                              onClick={(e) => FinishInProcessTask(e)}
                            ></i>
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
