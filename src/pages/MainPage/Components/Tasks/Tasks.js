import React, { componentDidMount, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ArrowRight from "./Tasks Assets/Arrow Right.svg";
import TextareaAutosize from "react-textarea-autosize";
import { motion } from "framer-motion/dist/framer-motion";
import FormData from "form-data";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { CSSTransition } from "react-transition-group";
import { MenuProps, useStyles, options, App } from "./Utilities/utils";
import "./Tasks.css";

const Tasks = (props) => {
  const sendTask = (e) => {
    e.preventDefault();
    console.log(CalendarValue.getMonth() + 1);
    const form = document.getElementById("form");
    const formData = new FormData(form);
    formData.append(
      "feedback",
      document.querySelector(".PrivateSwitchBase-input").checked
    );
    formData.append(
      "date",
      CalendarValue.getMonth() + 1 + CalendarValue.toDateString().slice(7)
    );
    console.log(
      CalendarValue.getMonth() + 1 + CalendarValue.toDateString().slice(7)
    );

    formData.append("worker", selected);
    formData.append("type", TextCurrency);

    axios
      .post("https://api1.traffkillas.kz/post_task", formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        getManageData();
        getWorkData();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
    console.log(CalendarValue.toDateString().slice(4, 10));
    console.log(Currency);
    ChangeCalendar(new Date());
    setSelected([]);
    document.querySelector(".PrivateSwitchBase-input").checked = false;

    console.log(CalendarValue);
    form.reset();
  };
  const ConfirmAvailableTask = (e) => {
    e.preventDefault();
    fetch("https://api1.traffkillas.kz/confirm_task", {
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
      .then((result) => {
        getManageData();
        getWorkData();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const CompleteInProcessTask = (e, TextArea) => {
    e.preventDefault();
    fetch("https://api1.traffkillas.kz/complate_task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        _id: e.target.id,
        message: TextArea,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        getManageData();
        getWorkData();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const ReopenCompleteTask = (e) => {
    e.preventDefault();
    fetch("https://api1.traffkillas.kz/reopen_task", {
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
      .then((result) => {
        getManageData();
        getWorkData();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const FinishInProcessTask = (e) => {
    e.preventDefault();
    fetch("https://api1.traffkillas.kz/finish_task", {
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
      .then((result) => {
        getManageData();
        getWorkData();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const DeletePost = (e) => {
    e.preventDefault();
    fetch("https://api1.traffkillas.kz/delete_task", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        _id: e.target.id,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        getManageData();
        getWorkData();
      })
      .catch((err) => {
        alert(err);
      });

    console.log(e.target.id);
  };
  let WorkDataArr = [];
  const [WorkData, SetWorkData] = useState();

  const getWorkData = () => {
    fetch("https://api1.traffkillas.kz/get_task", {
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
  let TimerInfo = null;
  let ManageDataArr = [];
  const [ManageData, SetManageData] = useState();
  const getManageData = () => {
    fetch("https://api1.traffkillas.kz/get_task", {
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
        TimerInfo = JSON.parse(result).manage[0].date;
        console.log(TimerInfo);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const [CalendarValue, ChangeCalendar] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const GetCalendarData = () => {
    var Date = CalendarValue.toDateString().slice(4);
    console.log(Date);
  };

  var arr = [0];

  const setTimer = (date, className, id) => {
    arr[id - 1] = setInterval(function () {
      var el = document.querySelector(`.${className}${id}`);

      var countDownDate = new Date(date).getTime();
      var now = new Date().getTime();

      var distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(arr[id - 1]);
        console.log("EXPIRED");
        getManageData();
        getWorkData();
      }
      if (el === null) {
        clearInterval(arr[id - 1]);
      } else {
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        el.innerHTML =
          (days != 0 ? days + "д " : "") +
          (hours != 0 ? hours + "ч " : "") +
          (minutes != 0 ? minutes + "м " : "") +
          (seconds != 0 ? seconds + "с " : "");
      }
    }, 1000);
    arr.push(0);
  };

  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(
        selected.length === options.length
          ? []
          : options.map((block) => block._id)
      );
      return;
    }
    setSelected(value);
  };

  const isSelected = (id) => {
    return selected.indexOf(id) > -1;
  };
  const closeDropdown = () => {
    SetCurrency(false);
    console.log(TextCurrency);
  };

  const [Currency, SetCurrency] = useState(false);
  const [TextCurrency, SetTextCurrency] = useState("MMR");
  const ChangeCurrency = (e) => {
    SetTextCurrency(e.target.innerHTML);
  };
  const position = props.position;
  useEffect(() => {
    getWorkData();
    getManageData();
    GetCalendarData();
    if (position !== "3") {
      document.body.addEventListener("click", closeDropdown);
      App();
    }

    const CloseCalendar = (e) => {
      setShowCalendar(false);
    };
    document.body.addEventListener("click", CloseCalendar);
  }, []);
  if (position == "3") {
    console.log("Hi Worker");
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
            WorkData.map((block, index) => {
              const {
                content,
                date,
                feedback,
                fine,
                manager,
                state,
                title,
                type,
                worker,
                _id,
              } = block;

              if (state == 1) {
                setTimer(date, "timer_inproccess", index);

                var TextArea = "";
                return (
                  <>
                    <div key={block} className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p className={"timer_inproccess" + index}></p>
                            <i
                              id={_id}
                              className="bi bi-check-circle-fill"
                              onClick={(e) =>
                                CompleteInProcessTask(e, TextArea)
                              }
                            ></i>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} {type}
                          </p>
                        </div>
                      </div>
                      {console.log(feedback)}
                      {feedback == "true" ? (
                        <div className="tasks_content">
                          <TextareaAutosize
                            className="tasks_content_text"
                            placeholder="Оставьте отзыв"
                            onChange={(e) => {
                              TextArea = e.target.value;
                              console.log(TextArea);
                            }}
                          />
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
            WorkData.map((block, index) => {
              const {
                content,
                date,
                feedback,
                fine,
                manager,
                messages,
                state,
                type,
                title,
                worker,
                _id,
              } = block;

              if (state == 3) {
                setTimer(date, "timer_revision", index);
                return (
                  <>
                    <div key={block} className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "black" }}
                          >
                            <p className={"timer_revision" + index}></p>
                            <i
                              id={_id}
                              className="bi bi-check-circle-fill"
                              onClick={(e) => ConfirmAvailableTask(e)}
                            ></i>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} {type}
                          </p>
                        </div>
                      </div>
                      {feedback == "true" ? (
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
            WorkData.map((block, index) => {
              const {
                content,
                date,
                feedback,
                fine,
                manager,
                type,
                state,
                title,
                worker,
                _id,
              } = block;

              if (state == 0) {
                setTimer(date, "timer_avialable", index);
                return (
                  <>
                    <div key={block} className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "#16C784" }}
                          >
                            <p className={"timer_avialable" + index}></p>
                            <i
                              id={_id}
                              className="bi bi-plus-circle-fill"
                              onClick={(e) => ConfirmAvailableTask(e)}
                            ></i>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} {type}
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
  } else if (position == "2") {
    console.log("TeamLead");
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
                  <div>
                    <FormControl
                      className={classes.formControl}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <InputLabel
                        className={classes.inputLabel}
                        id="mutiple-select-label"
                      >
                        Исполнитель
                      </InputLabel>
                      <Select
                        labelId="mutiple-select-label"
                        multiple
                        value={selected}
                        onChange={handleChange}
                        renderValue={() =>
                          options
                            .filter((block) => isSelected(block._id))
                            .map((block) => block.username)
                            .join(", ")
                        }
                        MenuProps={MenuProps}
                      >
                        <MenuItem
                          value="all"
                          classes={{
                            root: isAllSelected ? classes.selectedAll : "",
                          }}
                        >
                          <ListItemIcon>
                            <Checkbox
                              classes={{
                                indeterminate: classes.indeterminateColor,
                              }}
                              checked={isAllSelected}
                              indeterminate={
                                selected.length > 0 &&
                                selected.length < options.length
                              }
                            />
                          </ListItemIcon>
                          <ListItemText
                            classes={{ primary: classes.selectAllText }}
                            primary="Select All"
                          />
                        </MenuItem>
                        {options.map((option, index) => (
                          <MenuItem key={option._id} value={option._id}>
                            <ListItemIcon>
                              <Checkbox
                                className={classes.listItemIcon}
                                checked={selected.indexOf(option._id) > -1}
                              />
                            </ListItemIcon>
                            <ListItemText primary={option.username} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
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
                  <div
                    className="SendData_calendarDate"
                    onClick={(e) => {
                      setShowCalendar(!showCalendar);
                      e.stopPropagation();
                    }}
                  >
                    {CalendarValue.toDateString().slice(4, 10)}
                  </div>
                  <p className="SendData_fine Tasks_fine">
                    <div className="SendData_fine_div">
                      -
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
                      <p
                        className="SendData_fine_currency"
                        onClick={(e) => {
                          e.stopPropagation();
                          SetCurrency(!Currency);
                          console.log(Currency);
                        }}
                      >
                        {TextCurrency}
                      </p>
                    </div>
                    <CSSTransition
                      in={Currency}
                      classNames="alert"
                      timeout={1000}
                      unmountOnExit
                    >
                      <ul
                        className="SendData_fine_currency_dropdown"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <li
                          onClick={(e) => {
                            ChangeCurrency(e);
                            closeDropdown();
                          }}
                        >
                          MMR
                        </li>
                        <li
                          onClick={(e) => {
                            ChangeCurrency(e);
                            closeDropdown();
                          }}
                        >
                          Tenge
                        </li>
                      </ul>
                    </CSSTransition>
                  </p>

                  <p name="Checked" className="Tasks_fine_checkbox">
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
              </div>

              <div className="sendData_submit">
                <button type="submit">
                  Отправить задание <img src={ArrowRight} alt="rightArrow" />
                </button>
              </div>
            </div>
          </form>
          <div
            className="calendar_general"
            onClick={(e) => e.stopPropagation()}
          >
            <CSSTransition
              in={showCalendar}
              classNames="alert"
              timeout={1000}
              unmountOnExit
            >
              <Calendar onChange={ChangeCalendar} value={CalendarValue} />
            </CSSTransition>
          </div>{" "}
          <p className="date">Мои задания</p>
          {WorkData &&
            WorkData.map((block, index) => {
              const {
                content,
                date,
                feedback,
                fine,
                manager,
                state,
                title,
                type,
                worker,
                _id,
              } = block;

              if (state == 1) {
                {
                  setTimer(date, "timer_myTask", index);
                }
                var TextArea = "";
                return (
                  <>
                    <div key={block} className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "red" }}
                          >
                            <p className={"timer_myTask" + index}></p>
                            <i
                              id={_id}
                              className="bi bi-check-circle-fill"
                              onClick={(e) =>
                                CompleteInProcessTask(e, TextArea)
                              }
                            ></i>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} {type}
                          </p>
                        </div>
                      </div>
                      {console.log(feedback)}
                      {feedback == "true" ? (
                        <div className="tasks_content">
                          <TextareaAutosize
                            className="tasks_content_text"
                            placeholder="Оставьте отзыв"
                            onChange={(e) => {
                              TextArea = e.target.value;
                              console.log(TextArea);
                            }}
                          />
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
            WorkData.map((block, index) => {
              const {
                content,
                date,
                feedback,
                fine,
                manager,
                messages,
                state,
                title,
                worker,
                _id,
              } = block;

              if (state == 3) {
                setTimer(date, "timer_revision", index);
                return (
                  <>
                    <div key={block} className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">{title}</p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "black" }}
                          >
                            <p className={"timer_revision" + index}></p>
                            <i
                              id={_id}
                              className="bi bi-check-circle-fill"
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
                      {feedback == "true" ? (
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
            ManageData.map((block, index) => {
              const {
                content,
                date,
                feedback,
                fine,
                manager,
                state,
                title,
                type,
                worker,
                worker_username,
                _id,
              } = block;

              if (state == 0 || state == 1) {
                setTimer(date, "timer_created", index);
                return (
                  <>
                    <div key={block} className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">
                          <div>
                            {title}{" "}
                            <i
                              id={_id}
                              onClick={(e) => {
                                DeletePost(e);
                                console.log("lajsdfb");
                              }}
                              className="bi bi-trash3-fill"
                            ></i>
                          </div>
                          <p className="tasks_header_worker">
                            {worker_username}
                          </p>
                        </p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "#EA9127" }}
                          >
                            <p className={"timer_created" + index}></p>
                            <i className="bi bi-hourglass-split"></i>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} {type}
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
            ManageData.map((block, index) => {
              const {
                content,
                date,
                feedback,
                fine,
                manager,
                messages,
                state,
                title,
                worker_username,
                worker,
                _id,
              } = block;

              if (state == 2) {
                setTimer(date, "timer_completed", index);
                return (
                  <>
                    <div key={block} className="tasks_page_div">
                      <div className="tasks_div">
                        <div className="tasks_div_gap">
                          <div className="tasks_div_complete">
                            <p className="tasks_header">{title}</p>
                            <p
                              className="second_task_time"
                              style={{ backgroundColor: "red" }}
                            >
                              <p className={"timer_completed" + index}></p>
                            </p>
                            <i
                              id={_id}
                              onClick={(e) => {
                                DeletePost(e);
                              }}
                              className="bi bi-trash3-fill"
                              style={{ color: "red" }}
                            ></i>
                          </div>
                          <p className="tasks_header_worker">
                            {worker_username}
                          </p>
                        </div>
                        <div className="tasks_div_complete_submit">
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "#EA9127" }}
                          >
                            <p className="timer">Доработать </p>
                            <i
                              className="bi bi-exclamation-circle-fill"
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
                              className="bi bi-check-circle-fill"
                              onClick={(e) => FinishInProcessTask(e)}
                            ></i>
                          </p>
                        </div>
                      </div>
                      {feedback == "true" ? (
                        <div className="tasks_content">
                          <p>{messages}</p>
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
                  <div>
                    <FormControl
                      className={classes.formControl}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <InputLabel
                        className={classes.inputLabel}
                        id="mutiple-select-label"
                      >
                        Исполнитель
                      </InputLabel>
                      <Select
                        labelId="mutiple-select-label"
                        multiple
                        value={selected}
                        onChange={handleChange}
                        renderValue={() =>
                          options
                            .filter((block) => isSelected(block._id))
                            .map((block) => block.username)
                            .join(", ")
                        }
                        MenuProps={MenuProps}
                      >
                        <MenuItem
                          value="all"
                          classes={{
                            root: isAllSelected ? classes.selectedAll : "",
                          }}
                        >
                          <ListItemIcon>
                            <Checkbox
                              classes={{
                                indeterminate: classes.indeterminateColor,
                              }}
                              checked={isAllSelected}
                              indeterminate={
                                selected.length > 0 &&
                                selected.length < options.length
                              }
                            />
                          </ListItemIcon>
                          <ListItemText
                            classes={{ primary: classes.selectAllText }}
                            primary="Select All"
                          />
                        </MenuItem>
                        {options.map((option, index) => (
                          <MenuItem key={option._id} value={option._id}>
                            <ListItemIcon>
                              <Checkbox
                                className={classes.listItemIcon}
                                checked={selected.indexOf(option._id) > -1}
                              />
                            </ListItemIcon>
                            <ListItemText primary={option.username} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
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
                  <div
                    className="SendData_calendarDate"
                    onClick={(e) => {
                      setShowCalendar(!showCalendar);
                      e.stopPropagation();
                    }}
                  >
                    {CalendarValue.toDateString().slice(4, 10)}
                  </div>
                  <p className="SendData_fine Tasks_fine">
                    <div className="SendData_fine_div">
                      -
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
                      <p
                        className="SendData_fine_currency"
                        onClick={(e) => {
                          e.stopPropagation();
                          SetCurrency(!Currency);
                          console.log(Currency);
                        }}
                      >
                        {TextCurrency}
                      </p>
                    </div>
                    <CSSTransition
                      in={Currency}
                      classNames="alert"
                      timeout={1000}
                      unmountOnExit
                    >
                      <ul
                        className="SendData_fine_currency_dropdown"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <li
                          onClick={(e) => {
                            ChangeCurrency(e);
                            closeDropdown();
                          }}
                        >
                          MMR
                        </li>
                        <li
                          onClick={(e) => {
                            ChangeCurrency(e);
                            closeDropdown();
                          }}
                        >
                          Tenge
                        </li>
                      </ul>
                    </CSSTransition>
                  </p>

                  <p name="Checked" className="Tasks_fine_checkbox">
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
              </div>

              <div className="sendData_submit">
                <button type="submit">
                  Отправить задание <img src={ArrowRight} alt="rightArrow" />
                </button>
              </div>
            </div>
          </form>
          <div
            className="calendar_general"
            onClick={(e) => e.stopPropagation()}
          >
            <CSSTransition
              in={showCalendar}
              classNames="alert"
              timeout={1000}
              unmountOnExit
            >
              <Calendar onChange={ChangeCalendar} value={CalendarValue} />
            </CSSTransition>
          </div>{" "}
          <p className="date">Созданные</p>
          {ManageData &&
            ManageData.map((block, index) => {
              const {
                content,
                date,
                feedback,
                fine,
                manager,
                state,
                title,
                type,
                worker,
                worker_username,
                _id,
              } = block;
              if (state == 0 || state == 1) {
                setTimer(date, "timer_created", index);
                return (
                  <>
                    <div key={block} className="tasks_page_div">
                      <div className="tasks_div">
                        <p className="tasks_header">
                          <div>
                            {title}{" "}
                            <i
                              id={_id}
                              onClick={(e) => {
                                DeletePost(e);
                              }}
                              className="bi bi-trash3-fill"
                            ></i>
                          </div>
                          <p className="tasks_header_worker">
                            {worker_username}
                          </p>
                        </p>
                        <div>
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "#EA9127" }}
                          >
                            <p className={"timer_created" + index}></p>
                            <i className="bi bi-hourglass-split"></i>
                          </p>
                          <p
                            className="tasks_footer"
                            style={{ color: "#EA9127" }}
                          >
                            -{fine} {type}
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
            ManageData.map((block, index) => {
              const {
                content,
                date,
                feedback,
                fine,
                manager,
                messages,
                state,
                title,
                worker,
                worker_username,
                _id,
              } = block;

              if (state == 2) {
                setTimer(date, "timer_completed", index);
                return (
                  <>
                    <div key={block} className="tasks_page_div">
                      <div className="tasks_div">
                        <div className="tasks_div_gap">
                          <div className="tasks_div_complete">
                            <p className="tasks_header">{title}</p>
                            <p
                              className="second_task_time"
                              style={{ backgroundColor: "red" }}
                            >
                              <p className={"timer_completed" + index}></p>
                            </p>
                            <i
                              id={_id}
                              onClick={(e) => {
                                DeletePost(e);
                              }}
                              className="bi bi-trash3-fill"
                              style={{ color: "red" }}
                            ></i>
                          </div>
                          <p className="tasks_header_worker">
                            {worker_username}
                          </p>
                        </div>
                        <div className="tasks_div_complete_submit">
                          <p
                            className="second_task_time"
                            style={{ backgroundColor: "#EA9127" }}
                          >
                            <p className="timer">Доработать </p>
                            <i
                              className="bi bi-exclamation-circle-fill"
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
                              className="bi bi-check-circle-fill"
                              onClick={(e) => FinishInProcessTask(e)}
                            ></i>
                          </p>
                        </div>
                      </div>
                      {feedback == "true" ? (
                        <div className="tasks_content">
                          <p>{messages}</p>
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
          <div key={block} className="tasks_page_div">
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
            <div key={block} className="tasks_page_div">
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
            <div key={block} className="tasks_page_div">
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
            <div key={block} className="tasks_page_div">
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
