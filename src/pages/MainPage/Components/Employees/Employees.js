import React, { useState, useEffect, useRef } from "react";
import { Input } from "semantic-ui-react";
import ProfilePhoto1 from "./Employee Assets/Profile Photo 1.svg";
// import ProfilePhoto2 from "./Employee Assets/Profile Photo 2.svg";
// import ProfilePhoto3 from "./Employee Assets/Profile Photo 3.svg";
import "./Employees.css";
import { CSSTransition } from "react-transition-group";
import { motion } from "framer-motion/dist/framer-motion";
import { MultiSelect } from "react-multi-select-component";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import axios from "axios";
import { color } from "@mui/system";

const Employees = ({ position, mode, channel_type }) => {
  const [showUser, setShowUser] = useState();
  const [CreateEmployee, setCreateEmployee] = useState(false);
  const [EmployeeGift, setEmployeeGift] = useState(false);
  const [showQuestion, setShowQuestion] = useState();

  let EmployeeArr = [];
  const [employee, SetEmployee] = useState();
  const [submitDelete, setsubmitDelete] = useState();
  const [enableCreate, setEnableCreate] = useState(true);
  const positionOfEmployee = position;
  const GetEmployeeData = () => {
    fetch("https://api1.tkcrmsystem.com/get_users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        EmployeeArr = JSON.parse(result)["data"];
        setShowUser(new Array(EmployeeArr.length).fill(false));
        setShowQuestion(new Array(EmployeeArr.length).fill(false));
        SetEmployee(EmployeeArr);
        GetEmployeeGifts();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const [employeeGiftData, SetEmployeeGiftData] = useState();
  const GetEmployeeGifts = () => {
    fetch("https://api1.tkcrmsystem.com/get_orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        SetEmployeeGiftData(JSON.parse(result)["data"]);
      })
      .catch((err) => {
        alert("Акшин исправь баг милый мой");
      });
  };

  const GiveGift = (e) => {
    e.preventDefault();
    const ElementId = e.target.id;
    axios
      .post(
        "https://api1.tkcrmsystem.com/accept_order",
        { _id: ElementId },
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        GetEmployeeGifts();
      })
      .catch((error) => {});
  };

  const submitCreate = (e) => {
    e.preventDefault();

    const form = document.getElementById("form");
    const formData = new FormData(form);
    const title = document.querySelector(".pro-item-content").textContent;
    let positionEmployer = null;
    title === "Обработка" && (positionEmployer = "treat_1");
    (title === "Продюсер" || title === "Байер") &&
      (positionEmployer = "prodaction");
    // title === "Обработка(вечер)" && (positionEmployer = "treat_2");
    // title === "Обработка(утрен)" && (positionEmployer = "treat_3");
    title === "Контент" && (positionEmployer = "contentmaker");
    // document.querySelector(".employee_create_employee_title_checkbox")
    //   .checked && formData.append("position", 2);
    formData.append("title", positionEmployer);
    (title === "Продюсер" || title === "Байер") &&
      formData.append("position", 2);
    var TestArr = new Array();
    selectedNewUserProject.filter((el) => {
      TestArr.push(el.value);
    });
    formData.append("project", Array.from(TestArr));
    axios
      .post("https://api1.tkcrmsystem.com/create_user", formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        form.reset();
        document.querySelector(".pro-item-content").innerHTML =
          "<div>Выберите должность</div>";
        document.querySelector(".pro-inner-item").style.opacity = 0.5;
        GetEmployeeData();
        setCreateEmployee(false);
        setSelectedNewUserProject([]);
      })
      .catch((error) => {});
  };

  // let employeeUsername = document.getElementById("employeeUsername");
  const SubmitDelete = (e) => {
    e.preventDefault();
    fetch("https://api1.tkcrmsystem.com/delete_user", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username: e.target.id,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        GetEmployeeData();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const EnableCreateButton = () => {
    if (
      document.querySelector(".employee_create_employee_login").value !== "" &&
      document.querySelector(".employee_create_employee_password").value !==
        "" &&
      document.querySelector(".pro-item-content").textContent !==
        "Выберите должность"
    ) {
      setEnableCreate(false);
    } else {
      setEnableCreate(true);
    }
    //
    //   document.querySelector(".employee_create_employee_input").value
    // );
  };

  const SelectPosition = (e) => {
    document.querySelector(
      ".pro-item-content"
    ).innerHTML = `${e.target.textContent}`;
    document.querySelector(".pro-inner-item").style.opacity = 1;
  };

  useEffect(() => {
    const title = document.querySelectorAll(".employee_title");

    for (var i = 0; i < title.length; i++) {
      title[i].style.color = mode ? "black" : "white";
    }
  }, [mode]);

  useEffect(() => {
    GetEmployeeData();
  }, []);

  const innerProject = useRef(null);
  // const SelectProjects = (e, channel_id) => {
  //   innerProject.current.innerHTML = `${e.target.textContent}`;
  //   innerProject.current.style.color = "black";
  //   innerProject.current.style.fontWeight = 700;
  //   innerProject.current.style.paddingLeft = "20px";
  // };

  const [ProjectName, SetProjectName] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const GetProjectName = () => {
    fetch("https://api1.tkcrmsystem.com/get_statistic_name", {
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
        SetProjectName(JSON.parse(result)["data"]);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    GetProjectName();
  }, []);
  const [selectedUserProject, setSelectedUserProject] = useState([]);
  const [selectedNewUserProject, setSelectedNewUserProject] = useState([]);

  const options = ProjectName?.map((el) => {
    return {
      label: el.channel_name + ", " + el.channel_id,
      value: el.channel_id,
    };
  });

  const EditUserProject = (username) => {
    const ResultEditProject = new Array();
    const test = employee.map((el) => {
      if (el.username === username) {
        ResultEditProject.push(el.project);
      }
    });
    fetch("https://api1.tkcrmsystem.com/edit_project", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        project: ResultEditProject[0],
        username: username,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
        }
        return response.text();
      })
      .then((result) => {});
  };
  const [statusEditSalary, setStatusEditSalary] = useState(false);
  const [editSalary, setEditSalary] = useState();
  const EditSubmit = (username) => {
    fetch("https://api1.tkcrmsystem.com/edit_salary", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        salary: editSalary,
        username: username,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        fetch("https://api1.tkcrmsystem.com/get_users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        })
          .then((response) => {
            return response.text();
          })
          .then((result) => {
            EmployeeArr = JSON.parse(result)["data"];
            SetEmployee(EmployeeArr);
          })
          .catch((err) => {
            alert(err);
          });
        setStatusEditSalary(false);
      });
  };
  useEffect(() => {}, [employee]);
  const CancelEdit = () => {
    setStatusEditSalary(false);
  };
  const editSelectedProject = (e, index) => {
    SetEmployee(
      employee.map((el, i) => {
        if (i === index) {
          el.project = e.map((element) => {
            return element.value;
          });
        }
        return el;
      })
    );
  };
  const EmployeePositionGet = localStorage.position;
  const getSelectedProject = (projects) => {
    const arr = [];
    ProjectName.map((elem) => {
      if (projects.includes(elem.channel_id)) {
        arr.push({ label: elem.channel_name, value: elem.channel_id });
      }
    });
    return arr;
  };
  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="employee">
        <div>
          <div className="employee_header">
            <div className="employee_header_search">
              <Input
                size="mini"
                icon="search"
                iconPosition="left"
                placeholder="Поиск..."
              />
            </div>
            <div
              style={
                mode
                  ? {
                      backgroundColor: "white",
                      color: "black",
                    }
                  : {
                      backgroundColor: "#141414",
                      color: "white",
                    }
              }
              className="employee_header_navbar"
            >
              <p>А-я</p>
              <p className="active">должность</p>
              <p>баланс</p>
              <p>дата регистрации</p>
            </div>
            <div
              style={
                mode
                  ? {
                      backgroundColor: "white",
                      color: "black",
                    }
                  : {
                      backgroundColor: "#141414",
                      color: "white",
                    }
              }
              className="employee_header_gift"
            >
              <i
                className="bi bi-gift-fill"
                onClick={() => {
                  setEmployeeGift(!EmployeeGift);
                  setCreateEmployee(false);
                }}
              ></i>
            </div>
            <div
              style={
                mode
                  ? {
                      backgroundColor: "white",
                      color: "black",
                    }
                  : {
                      backgroundColor: "#141414",
                      color: "white",
                    }
              }
              className="employee_header_create"
            >
              <i
                className="bi bi-person-plus-fill"
                onClick={() => {
                  setCreateEmployee(!CreateEmployee);
                  setEmployeeGift(false);
                }}
              ></i>
            </div>{" "}
          </div>
          <div
            style={
              mode
                ? {
                    backgroundColor: "white",
                    color: "black",
                  }
                : {
                    backgroundColor: "#141414",
                    color: "white",
                  }
            }
            className="employee_header_navbar_responsive"
          >
            <p>А-я</p>
            <p className="active">должность</p>
            <p>баланс</p>
            <p>дата регистрации</p>
          </div>
          <CSSTransition
            in={CreateEmployee}
            classNames="alert"
            timeout={300}
            unmountOnExit
          >
            <div
              style={
                mode
                  ? {
                      backgroundColor: "white",
                    }
                  : {
                      backgroundColor: "#141414",
                    }
              }
              className="employee_create_employee"
            >
              <form id="form" onSubmit={(e) => submitCreate(e)}>
                <h1
                  style={
                    mode
                      ? {
                          color: "black",
                        }
                      : {
                          color: "white",
                        }
                  }
                >
                  Добавление сотрудника
                </h1>
                <p
                  style={
                    mode
                      ? {
                          color: "black",
                        }
                      : {
                          color: "white",
                        }
                  }
                  className="employee_create_employee_title"
                >
                  Введите логин:
                </p>
                <input
                  onChange={() => EnableCreateButton()}
                  className="employee_create_employee_login"
                  placeholder="Введите логин ..."
                  name="username"
                />
                {/* <p
                  style={
                    mode
                      ? {
                          color: "black",
                        }
                      : {
                          color: "white",
                        }
                  }
                  className="employee_create_employee_title"
                >
                  Назначить Тимлидом?{" "}
                  <input
                    className="employee_create_employee_title_checkbox"
                    type="checkbox"
                  />
                </p> */}
                <p
                  style={
                    mode
                      ? {
                          color: "black",
                        }
                      : {
                          color: "white",
                        }
                  }
                  className="employee_create_employee_title"
                >
                  Введите пароль:
                </p>
                <input
                  onChange={() => EnableCreateButton()}
                  className="employee_create_employee_password"
                  placeholder="Введите пароль ..."
                  name="pwd"
                />
                <p
                  style={
                    mode
                      ? {
                          color: "black",
                        }
                      : {
                          color: "white",
                        }
                  }
                  className="employee_create_employee_title"
                >
                  Введите должность:
                </p>
                <ProSidebar>
                  <SidebarContent>
                    <Menu>
                      <SubMenu
                        className="employee_create_position"
                        title={"Выберите должность"}
                      >
                        <MenuItem
                          onClick={(e) => {
                            SelectPosition(e);
                            EnableCreateButton();
                          }}
                        >
                          {position != 2 &&
                            (channel_type !== "инфлюенс"
                              ? "Байер"
                              : "Продюсер")}
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            SelectPosition(e);
                            EnableCreateButton();
                          }}
                        >
                          Обработка
                        </MenuItem>
                        {/* <MenuItem
                          onClick={(e) => {
                            SelectPosition(e);
                            EnableCreateButton();
                          }}
                        >
                          Обработка(вечер)
                        </MenuItem> */}
                        {/* <MenuItem
                          onClick={(e) => {
                            SelectPosition(e);
                            EnableCreateButton();
                          }}
                        >
                          Обработка(утрен)
                        </MenuItem> */}
                        <MenuItem
                          onClick={(e) => {
                            SelectPosition(e);
                            EnableCreateButton();
                          }}
                        >
                          Контент
                        </MenuItem>
                      </SubMenu>
                    </Menu>
                  </SidebarContent>
                </ProSidebar>
                {/* <ProSidebar>
                  <SidebarContent>
                    <Menu>
                      <SubMenu
                        className="employee_create_position employee_create_pproject"
                        title={"Выберите проект"}
                        ref={innerProject}
                      >
                        {ProjectName?.map((project) => {
                          const { channel_id, channel_name } = project;
                          return (
                            <MenuItem
                              onClick={(e) => {
                                SelectProjects(e, channel_id);
                                setSelectedProject(channel_id);
                              }}
                            >
                              {channel_name}
                            </MenuItem>
                          );
                        })}
                      </SubMenu>
                    </Menu>
                  </SidebarContent>
                </ProSidebar> */}
                <p
                  style={
                    mode
                      ? {
                          color: "black",
                        }
                      : {
                          color: "white",
                        }
                  }
                  className="employee_create_employee_title"
                >
                  Выберите проект:
                </p>
                <MultiSelect
                  options={options}
                  value={selectedNewUserProject}
                  onChange={(e) => {
                    setSelectedNewUserProject(e);
                  }}
                  labelledBy={"Select"}
                  isCreatable={true}
                />

                <button
                  disabled={enableCreate && true}
                  style={enableCreate ? { opacity: "0.5" } : { opacity: "1" }}
                >
                  <i className="bi bi-plus-circle-fill"></i> Добавить сотрудника
                </button>
              </form>
            </div>
          </CSSTransition>
          <CSSTransition
            in={EmployeeGift}
            classNames="alert"
            timeout={300}
            unmountOnExit
          >
            <div
              style={
                mode
                  ? {
                      backgroundColor: "white",
                      color: "black",
                    }
                  : {
                      backgroundColor: "#141414",
                      color: "white",
                    }
              }
              className="employee_gifts"
            >
              <div className="employee_gifts_title">
                <p>Товар</p>
                <p>Цена</p>
                <p>ФИО</p>
                <p>Ваучер</p>
              </div>
              {employeeGiftData &&
                employeeGiftData?.map((gift, index) => {
                  const { name, stuff_name, code, complated, _id } = gift;
                  if (complated === 0) {
                    return (
                      <>
                        <form
                          id={_id}
                          onSubmit={(e) => GiveGift(e)}
                          className="employee_gifts_notgiven"
                        >
                          <p name="stuff_name">{stuff_name}</p>
                          <p style={{ color: "#EA9127" }}>50 000 TTK</p>
                          <p>{name}</p>
                          <div className="employee_gifts_code">
                            <p>{code}</p>
                            <button
                              type="submit"
                              style={{ backgroundColor: "#EA9127" }}
                              className="employee_gifts_button"
                            >
                              Выдать<i className="bi bi-check-circle-fill"></i>
                            </button>
                          </div>
                        </form>
                        <hr></hr>
                      </>
                    );
                  }
                  return null;
                })}

              {employeeGiftData &&
                employeeGiftData?.map((gift) => {
                  const { name, stuff_name, code, complated } = gift;
                  if (complated !== 0) {
                    return (
                      <>
                        <div className="employee_gifts_given">
                          <p>{stuff_name}</p>
                          <p style={{ color: "#EA9127" }}>24 000 TTK</p>
                          <p>{name}</p>
                          <div className="employee_gifts_code">
                            <p>{code}</p>
                            <button
                              style={{ backgroundColor: "#16C784" }}
                              className="employee_gifts_button"
                            >
                              Выдано<i className="bi bi-check-circle-fill"></i>
                            </button>
                          </div>
                        </div>
                        <hr></hr>
                      </>
                    );
                  }
                  return null;
                })}
            </div>
          </CSSTransition>
        </div>
        <div className="employee_title">
          <p> Админы</p>
        </div>
        {employee &&
          employee.map((person, index) => {
            const {
              address,
              birth_date,
              created_time,
              email,
              first_name,
              last_name,
              middle_name,
              mmr,
              phone,
              position,
              pwd,
              title,
              tenge,
              ttk,
              username,
              image,
              project,
              salary,
              agentAnswerTime,
            } = person;
            let projectName = null;
            ProjectName.map((el) => {
              if (el.channel_id === project) {
                projectName = el.channel_name;
              }
            });
            const dateObject = new Date(created_time);
            const optionsDate = {
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const formattedDate = dateObject.toLocaleString(
              "ru-RU",
              optionsDate
            );

            const Project_Name = ProjectName.filter((value) =>
              project.includes(value.channel_id)
            );
            return (
              <>
                {(position == 0 || position == 1) && (
                  <div className="wrapper" key={person + index}>
                    <button
                      id={index}
                      className={
                        mode
                          ? "button employee_account light"
                          : "button employee_account"
                      }
                      onClick={(e) => {
                        let IndexElement = index;
                        var res = showUser.map((e, i) => {
                          if (i === IndexElement) {
                            return !e;
                          } else {
                            return e;
                          }
                        });
                        setShowUser(res);
                      }}
                    >
                      <div className="employee_account_left">
                        <div className="employee_account_left_pictureAvatar">
                          {" "}
                          <img
                            src={image ? image : ProfilePhoto1}
                            alt="ProfilePhoto1"
                          ></img>
                        </div>

                        <div>
                          <p key={first_name.toString()}>
                            {username}{" "}
                            {position !== 3 && (
                              <i
                                style={{ color: "#0f82f5", fontSize: "14px" }}
                                class="bi bi-bookmark-check-fill"
                              ></i>
                            )}
                          </p>
                          <p className="employee_account_left_position">
                            {position === 1 && "Админ"}
                            {position === 2 && "Тимлид"}
                            {position === 3 && "Сотрудник"}{" "}
                            <i
                              className="bi bi-chevron-down"
                              style={{ fontSize: "12px" }}
                            ></i>
                          </p>
                        </div>
                      </div>
                      <div className="employee_account_right">
                        <p>{mmr} MMR</p>
                        <p className="orange">{ttk} TTK</p>
                        <p style={{ color: "#AB16CD" }}>₸ {tenge}</p>
                      </div>
                    </button>
                    <CSSTransition
                      in={showUser[index]}
                      classNames="alert"
                      timeout={300}
                      unmountOnExit
                    >
                      <ul
                        className={
                          mode
                            ? "employee_account_list list light"
                            : "employee_account_list list"
                        }
                      >
                        <div style={{ fontWeight: "700" }}>
                          <li className="list-item employee_info">
                            <p style={{ color: "orange" }}>Login</p>
                          </li>

                          {(EmployeePositionGet == 1 ||
                            EmployeePositionGet == 0) && (
                            <li className="list-item employee_info">
                              <p style={{ color: "orange" }}>Password</p>
                            </li>
                          )}
                          <li className="list-item employee_info">
                            <p>ФИО</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>Дата рождения</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>Регистрация в системе</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>E-mail</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>Номер</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>Адрес</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>Зарпата</p>
                          </li>

                          <li className="list-item employee_info">
                            <p>Проекты</p>
                          </li>
                        </div>
                        <div id="EditEmployeesBlocks">
                          <li className="list-item employee_info">
                            <p
                              key={username.toString()}
                              value="value"
                              id="employeeUsername"
                            >
                              {username ? username : "(Пусто)"}
                            </p>
                          </li>
                          {(EmployeePositionGet == 1 ||
                            EmployeePositionGet == 0) && (
                            <li className="list-item employee_info">
                              <p>{pwd ? pwd : "(Пусто)"}</p>
                            </li>
                          )}
                          <li className="list-item employee_info">
                            <p key={first_name.toString()}>
                              {last_name || first_name || middle_name
                                ? last_name +
                                  " " +
                                  first_name +
                                  " " +
                                  middle_name
                                : "(Пусто)"}
                            </p>
                          </li>
                          <li className="list-item employee_info">
                            <p key={birth_date.toString()}>
                              {birth_date ? birth_date : "(Пусто)"}
                            </p>
                          </li>
                          <li className="list-item employee_info">
                            <p key={created_time.toString()}>
                              {created_time ? formattedDate : "(Пусто)"}
                            </p>
                          </li>
                          <li className="list-item employee_info">
                            <p key={email.toString()}>
                              {email ? email : "(Пусто)"}
                            </p>
                          </li>
                          <li className="list-item employee_info">
                            <p key={phone.toString()}>
                              {phone ? phone : "(Пусто)"}
                            </p>
                          </li>
                          <li className="list-item employee_info">
                            <p key={address.toString()}>
                              {address ? address : "(Пусто)"}
                            </p>
                          </li>{" "}
                          <li className="list-item employee_info">
                            {statusEditSalary ? (
                              <>
                                <input
                                  onChange={(e) =>
                                    setEditSalary(e.target.value)
                                  }
                                  placeholder={salary}
                                ></input>
                                <i
                                  className="bi bi-check-circle-fill"
                                  onClick={(el) => EditSubmit(username)}
                                ></i>
                                <i
                                  style={{ marginLeft: "5px" }}
                                  onClick={(el) => CancelEdit(el)}
                                  className="bi bi-x-circle-fill"
                                ></i>
                              </>
                            ) : (
                              <p
                                onClick={() => setStatusEditSalary(true)}
                                key={salary}
                              >
                                {salary ? salary : "(Пусто)"}
                              </p>
                            )}
                          </li>
                          <li className="list-item employee_info">
                            <p
                              className="employee_info_addProject"
                              key={project.toString()}
                            >
                              {project
                                ? Project_Name.map((el) => {
                                    return el.channel_name + ", ";
                                  })
                                : "(Пусто)"}
                              {(positionOfEmployee == 1 ||
                                positionOfEmployee == 0) && (
                                <div className="employee_info_SelectProjects">
                                  <MultiSelect
                                    options={options}
                                    value={getSelectedProject(project)}
                                    onChange={(e) =>
                                      editSelectedProject(e, index)
                                    }
                                    labelledBy={"Select"}
                                    isCreatable={true}
                                  />
                                  <button
                                    onClick={(e) => EditUserProject(username)}
                                  >
                                    Сохранить проект
                                  </button>
                                </div>
                              )}
                            </p>
                          </li>
                          <li className="list-item employee_info">
                            {/* <ProSidebar>
                              <SidebarContent>
                                <Menu>
                                  <SubMenu
                                    className="employee_create_position employee_create_pproject"
                                    title={"Выберите проект"}
                                    ref={innerProject}
                                  >
                                    {ProjectName?.map((project) => {
                                      const { channel_id, channel_name } =
                                        project;
                                      return (
                                        <MenuItem
                                          onClick={(e) => {
                                            SelectProjects(e, channel_id);
                                            setSelectedProject(channel_id);
                                          }}
                                        >
                                          {channel_name}
                                        </MenuItem>
                                      );
                                    })}
                                  </SubMenu>
                                </Menu>
                              </SidebarContent>
                            </ProSidebar> */}
                          </li>
                        </div>
                        <div>
                          <button
                            onClick={(e) => {
                              let IndexElement = index;
                              var res = showQuestion.map((e, i) => {
                                if (i === IndexElement) {
                                  return !e;
                                } else {
                                  return e;
                                }
                              });
                              setShowQuestion(res);
                            }}
                          >
                            <span>Удалить сотрудника</span>{" "}
                            <i class="bi bi-trash3-fill"></i>
                          </button>
                        </div>
                        <CSSTransition
                          in={showQuestion[index]}
                          classNames="alert"
                          timeout={300}
                          unmountOnExit
                        >
                          <form
                            className={
                              mode
                                ? "employee_account_list_question light"
                                : "employee_account_list_question"
                            }
                          >
                            <p className="employee_account_question">
                              Вы уверены?
                            </p>
                            <p className="employee_account_title">
                              Впишите в поле “Удалить сотрудника”
                            </p>
                            <div className="employee_account_question_input">
                              <input
                                placeholder="..."
                                onChange={(e) => {
                                  setsubmitDelete(e.target.value);
                                }}
                              />
                              {submitDelete === "Удалить сотрудника" ? (
                                <i
                                  id={username}
                                  onClick={(e) => {
                                    SubmitDelete(e);
                                    setsubmitDelete();
                                  }}
                                  className="bi bi-arrow-right-circle-fill submit_delete "
                                ></i>
                              ) : (
                                <i
                                  id={username}
                                  style={{ opacity: "0.5" }}
                                  className="bi bi-arrow-right-circle-fill submit_delete "
                                ></i>
                              )}
                            </div>
                          </form>
                        </CSSTransition>
                      </ul>
                    </CSSTransition>
                  </div>
                )}
              </>
            );
          })}
        <div className="employee_title">
          <p> {channel_type !== "инфлюенс" ? "Байер" : "Продюсер"}</p>
        </div>
        {employee &&
          employee.map((person, index) => {
            const {
              address,
              birth_date,
              created_time,
              email,
              first_name,
              last_name,
              middle_name,
              mmr,
              phone,
              position,
              pwd,
              title,
              tenge,
              ttk,
              username,
              image,
              project,
              salary,
              agentAnswerTime,
            } = person;
            let projectName = null;
            ProjectName.map((el) => {
              if (el.channel_id === project) {
                projectName = el.channel_name;
              }
            });
            const dateObject = new Date(created_time);
            const optionsDate = {
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const formattedDate = dateObject.toLocaleString(
              "ru-RU",
              optionsDate
            );

            const Project_Name = ProjectName.filter((value) =>
              project.includes(value.channel_id)
            );
            return (
              <>
                {title === "prodaction" &&
                  position != "0" &&
                  position != "1" && (
                    <div className="wrapper" key={person + index}>
                      <button
                        id={index}
                        className={
                          mode
                            ? "button employee_account light"
                            : "button employee_account"
                        }
                        onClick={(e) => {
                          let IndexElement = index;
                          var res = showUser.map((e, i) => {
                            if (i === IndexElement) {
                              return !e;
                            } else {
                              return e;
                            }
                          });
                          setShowUser(res);
                        }}
                      >
                        <div className="employee_account_left">
                          <div className="employee_account_left_pictureAvatar">
                            {" "}
                            <img
                              src={image ? image : ProfilePhoto1}
                              alt="ProfilePhoto1"
                            ></img>
                          </div>
                          <div>
                            <p key={first_name.toString()}>
                              {username}{" "}
                              {position !== 3 && (
                                <i
                                  style={{ color: "#0f82f5", fontSize: "14px" }}
                                  class="bi bi-bookmark-check-fill"
                                ></i>
                              )}
                            </p>
                            <p className="employee_account_left_position">
                              {position === 1 && "Админ"}
                              {position === 2 && "Тимлид"}
                              {position === 3 && "Сотрудник"}{" "}
                              <i
                                className="bi bi-chevron-down"
                                style={{ fontSize: "12px" }}
                              ></i>
                            </p>
                          </div>
                        </div>
                        <div className="employee_account_right">
                          <p>{mmr} MMR</p>
                          <p className="orange">{ttk} TTK</p>
                          <p style={{ color: "#AB16CD" }}>₸ {tenge}</p>
                        </div>
                      </button>
                      <CSSTransition
                        in={showUser[index]}
                        classNames="alert"
                        timeout={300}
                        unmountOnExit
                      >
                        <ul
                          className={
                            mode
                              ? "employee_account_list list light"
                              : "employee_account_list list"
                          }
                        >
                          <div style={{ fontWeight: "700" }}>
                            <li className="list-item employee_info">
                              <p style={{ color: "orange" }}>Login</p>
                            </li>

                            {(EmployeePositionGet == 1 ||
                              EmployeePositionGet == 0) && (
                              <li className="list-item employee_info">
                                <p style={{ color: "orange" }}>Password</p>
                              </li>
                            )}
                            <li className="list-item employee_info">
                              <p>ФИО</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Дата рождения</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Регистрация в системе</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>E-mail</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Номер</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Адрес</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Зарпата</p>
                            </li>

                            <li className="list-item employee_info">
                              <p>Проекты</p>
                            </li>
                          </div>
                          <div id="EditEmployeesBlocks">
                            <li className="list-item employee_info">
                              <p
                                key={username.toString()}
                                value="value"
                                id="employeeUsername"
                              >
                                {username ? username : "(Пусто)"}
                              </p>
                            </li>
                            {(EmployeePositionGet == 1 ||
                              EmployeePositionGet == 0) && (
                              <li className="list-item employee_info">
                                <p>{pwd ? pwd : "(Пусто)"}</p>
                              </li>
                            )}
                            <li className="list-item employee_info">
                              <p key={first_name.toString()}>
                                {last_name || first_name || middle_name
                                  ? last_name +
                                    " " +
                                    first_name +
                                    " " +
                                    middle_name
                                  : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={birth_date.toString()}>
                                {birth_date ? birth_date : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={created_time.toString()}>
                                {created_time ? formattedDate : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={email.toString()}>
                                {email ? email : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={phone.toString()}>
                                {phone ? phone : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={address.toString()}>
                                {address ? address : "(Пусто)"}
                              </p>
                            </li>{" "}
                            <li className="list-item employee_info">
                              {statusEditSalary ? (
                                <>
                                  <input
                                    onChange={(e) =>
                                      setEditSalary(e.target.value)
                                    }
                                    placeholder={salary}
                                  ></input>
                                  <i
                                    className="bi bi-check-circle-fill"
                                    onClick={(el) => EditSubmit(username)}
                                  ></i>
                                  <i
                                    style={{ marginLeft: "5px" }}
                                    onClick={(el) => CancelEdit(el)}
                                    className="bi bi-x-circle-fill"
                                  ></i>
                                </>
                              ) : (
                                <p
                                  onClick={() => setStatusEditSalary(true)}
                                  key={salary}
                                >
                                  {salary ? salary : "(Пусто)"}
                                </p>
                              )}
                            </li>
                            <li className="list-item employee_info">
                              <p
                                className="employee_info_addProject"
                                key={project.toString()}
                              >
                                {project
                                  ? Project_Name.map((el) => {
                                      return el.channel_name + ", ";
                                    })
                                  : "(Пусто)"}
                                {(positionOfEmployee == 1 ||
                                  positionOfEmployee == 0) && (
                                  <div className="employee_info_SelectProjects">
                                    <MultiSelect
                                      options={options}
                                      value={getSelectedProject(project)}
                                      onChange={(e) =>
                                        editSelectedProject(e, index)
                                      }
                                      labelledBy={"Select"}
                                      isCreatable={true}
                                    />
                                    <button
                                      onClick={(e) => EditUserProject(username)}
                                    >
                                      Сохранить проект
                                    </button>
                                  </div>
                                )}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              {/* <ProSidebar>
                              <SidebarContent>
                                <Menu>
                                  <SubMenu
                                    className="employee_create_position employee_create_pproject"
                                    title={"Выберите проект"}
                                    ref={innerProject}
                                  >
                                    {ProjectName?.map((project) => {
                                      const { channel_id, channel_name } =
                                        project;
                                      return (
                                        <MenuItem
                                          onClick={(e) => {
                                            SelectProjects(e, channel_id);
                                            setSelectedProject(channel_id);
                                          }}
                                        >
                                          {channel_name}
                                        </MenuItem>
                                      );
                                    })}
                                  </SubMenu>
                                </Menu>
                              </SidebarContent>
                            </ProSidebar> */}
                            </li>
                          </div>
                          <div>
                            <button
                              onClick={(e) => {
                                let IndexElement = index;
                                var res = showQuestion.map((e, i) => {
                                  if (i === IndexElement) {
                                    return !e;
                                  } else {
                                    return e;
                                  }
                                });
                                setShowQuestion(res);
                              }}
                            >
                              <span>Удалить сотрудника</span>{" "}
                              <i class="bi bi-trash3-fill"></i>
                            </button>
                          </div>
                          <CSSTransition
                            in={showQuestion[index]}
                            classNames="alert"
                            timeout={300}
                            unmountOnExit
                          >
                            <form
                              className={
                                mode
                                  ? "employee_account_list_question light"
                                  : "employee_account_list_question"
                              }
                            >
                              <p className="employee_account_question">
                                Вы уверены?
                              </p>
                              <p className="employee_account_title">
                                Впишите в поле “Удалить сотрудника”
                              </p>
                              <div className="employee_account_question_input">
                                <input
                                  placeholder="..."
                                  onChange={(e) => {
                                    setsubmitDelete(e.target.value);
                                  }}
                                />
                                {submitDelete === "Удалить сотрудника" ? (
                                  <i
                                    id={username}
                                    onClick={(e) => {
                                      SubmitDelete(e);
                                      setsubmitDelete();
                                    }}
                                    className="bi bi-arrow-right-circle-fill submit_delete "
                                  ></i>
                                ) : (
                                  <i
                                    id={username}
                                    style={{ opacity: "0.5" }}
                                    className="bi bi-arrow-right-circle-fill submit_delete "
                                  ></i>
                                )}
                              </div>
                            </form>
                          </CSSTransition>
                        </ul>
                      </CSSTransition>
                    </div>
                  )}
              </>
            );
          })}

        <div className="employee_title">
          <p>Обработка</p>
        </div>
        {employee &&
          employee.map((person, index) => {
            const {
              address,
              birth_date,
              created_time,
              email,
              first_name,
              last_name,
              middle_name,
              mmr,
              phone,
              position,
              pwd,
              title,
              tenge,
              ttk,
              username,
              image,
              project,
              salary,
              agentAnswerTime,
            } = person;
            let projectName = null;
            ProjectName.map((el) => {
              if (el.channel_id === project) {
                projectName = el.channel_name;
              }
            });
            const dateObject = new Date(created_time);
            const optionsDate = {
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const formattedDate = dateObject.toLocaleString(
              "ru-RU",
              optionsDate
            );

            const Project_Name = ProjectName.filter((value) =>
              project.includes(value.channel_id)
            );

            return (
              <>
                {(title === "treat_1" ||
                  title === "treat_2" ||
                  title === "treat_3") &&
                  position !== "0" &&
                  position !== "1" && (
                    <div className="wrapper" key={person + index}>
                      <button
                        id={index}
                        className={
                          mode
                            ? "button employee_account light"
                            : "button employee_account"
                        }
                        onClick={(e) => {
                          let IndexElement = index;
                          var res = showUser.map((e, i) => {
                            if (i === IndexElement) {
                              return !e;
                            } else {
                              return e;
                            }
                          });
                          setShowUser(res);
                        }}
                      >
                        <div className="employee_account_left">
                          <div className="employee_account_left_pictureAvatar">
                            {" "}
                            <img
                              src={image ? image : ProfilePhoto1}
                              alt="ProfilePhoto1"
                            ></img>
                          </div>
                          <div>
                            <p key={first_name.toString()}>
                              {username}
                              {position !== 3 && (
                                <i
                                  style={{ color: "#0f82f5" }}
                                  class="bi bi-bookmark-check-fill"
                                ></i>
                              )}
                            </p>
                            <p className="employee_account_left_position">
                              {position === 1 && "Админ"}
                              {position === 2 && "Тимлид"}
                              {position === 3 && "Сотрудник"}{" "}
                              <i
                                className="bi bi-chevron-down"
                                style={{ fontSize: "12px" }}
                              ></i>
                            </p>
                          </div>
                        </div>
                        <div className="employee_account_right">
                          <p>{agentAnswerTime && agentAnswerTime}</p>
                          <p>
                            {position === 3 &&
                              (agentAnswerTime
                                ? parseInt(
                                    parseInt(
                                      agentAnswerTime
                                        .toString()
                                        .substring(0, 10)
                                    )
                                  ) + " мин"
                                : 0 + " мин")}{" "}
                          </p>
                          <p>{mmr}MMR</p>
                          <p className="orange">{ttk}TTK</p>
                          <p style={{ color: "#AB16CD" }}>₸ {tenge}</p>
                        </div>
                      </button>
                      <CSSTransition
                        in={showUser[index]}
                        classNames="alert"
                        timeout={300}
                        unmountOnExit
                      >
                        <ul
                          className={
                            mode
                              ? "employee_account_list list light"
                              : "employee_account_list list"
                          }
                        >
                          <div style={{ fontWeight: "700" }}>
                            <li className="list-item employee_info">
                              <p style={{ color: "orange" }}>Login</p>
                            </li>
                            {(EmployeePositionGet == 1 ||
                              EmployeePositionGet == 0) && (
                              <li className="list-item employee_info">
                                <p style={{ color: "orange" }}>Password</p>
                              </li>
                            )}
                            <li className="list-item employee_info">
                              <p>ФИО</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Дата рождения</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Регистрация в системе</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>E-mail</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Номер</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Адрес</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Зарпата</p>
                            </li>

                            <li className="list-item employee_info">
                              <p>Проекты</p>
                            </li>
                          </div>
                          <div id="EditEmployeesBlocks">
                            <li className="list-item employee_info">
                              <p
                                key={username.toString()}
                                value="value"
                                id="employeeUsername"
                              >
                                {username ? username : "(Пусто)"}
                              </p>
                            </li>
                            {(EmployeePositionGet == 0 ||
                              EmployeePositionGet == 1) && (
                              <li className="list-item employee_info">
                                <p>{pwd ? pwd : "(Пусто)"}</p>
                              </li>
                            )}
                            <li className="list-item employee_info">
                              <p key={first_name.toString()}>
                                {last_name || first_name || middle_name
                                  ? last_name +
                                    " " +
                                    first_name +
                                    " " +
                                    middle_name
                                  : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={birth_date.toString()}>
                                {birth_date ? birth_date : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={created_time.toString()}>
                                {created_time ? formattedDate : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={email.toString()}>
                                {email ? email : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={phone.toString()}>
                                {phone ? phone : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={address.toString()}>
                                {address ? address : "(Пусто)"}
                              </p>
                            </li>{" "}
                            <li className="list-item employee_info">
                              {statusEditSalary ? (
                                <>
                                  <input
                                    onChange={(e) =>
                                      setEditSalary(e.target.value)
                                    }
                                    placeholder={salary}
                                  ></input>
                                  <i
                                    className="bi bi-check-circle-fill"
                                    onClick={(el) => EditSubmit(username)}
                                  ></i>
                                  <i
                                    style={{ marginLeft: "5px" }}
                                    onClick={(el) => CancelEdit(el)}
                                    className="bi bi-x-circle-fill"
                                  ></i>
                                </>
                              ) : (
                                <p
                                  onClick={() => setStatusEditSalary(true)}
                                  key={salary}
                                >
                                  {salary ? salary : "(Пусто)"}
                                </p>
                              )}
                            </li>
                            <li className="list-item employee_info">
                              <p
                                className="employee_info_addProject"
                                key={project.toString()}
                              >
                                {project
                                  ? Project_Name.map((el) => {
                                      return el.channel_name + ", ";
                                    })
                                  : "(Пусто)"}
                                {(positionOfEmployee == 1 ||
                                  positionOfEmployee == 0) && (
                                  <div className="employee_info_SelectProjects">
                                    <MultiSelect
                                      options={options}
                                      value={getSelectedProject(project)}
                                      onChange={(e) =>
                                        editSelectedProject(e, index)
                                      }
                                      labelledBy={"Select"}
                                      isCreatable={true}
                                    />
                                    <button
                                      onClick={(e) => EditUserProject(username)}
                                    >
                                      Сохранить проект
                                    </button>
                                  </div>
                                )}
                              </p>
                            </li>
                            <li className="list-item employee_info"></li>
                          </div>
                          <div>
                            <button
                              onClick={(e) => {
                                let IndexElement = index;
                                var res = showQuestion.map((e, i) => {
                                  if (i === IndexElement) {
                                    return !e;
                                  } else {
                                    return e;
                                  }
                                });
                                setShowQuestion(res);
                              }}
                            >
                              <span>Удалить сотрудника</span>{" "}
                              <i class="bi bi-trash3-fill"></i>
                            </button>
                          </div>
                          <CSSTransition
                            in={showQuestion[index]}
                            classNames="alert"
                            timeout={300}
                            unmountOnExit
                          >
                            <form
                              className={
                                mode
                                  ? "employee_account_list_question light"
                                  : "employee_account_list_question"
                              }
                            >
                              <p className="employee_account_question">
                                Вы уверены?
                              </p>
                              <p className="employee_account_title">
                                Впишите в поле “Удалить сотрудника”
                              </p>
                              <div className="employee_account_question_input">
                                <input
                                  placeholder="..."
                                  onChange={(e) => {
                                    setsubmitDelete(e.target.value);
                                  }}
                                />
                                {submitDelete === "Удалить сотрудника" ? (
                                  <i
                                    id={username}
                                    onClick={(e) => {
                                      SubmitDelete(e);
                                      setsubmitDelete();
                                    }}
                                    className="bi bi-arrow-right-circle-fill submit_delete "
                                  ></i>
                                ) : (
                                  <i
                                    id={username}
                                    style={{ opacity: "0.5" }}
                                    className="bi bi-arrow-right-circle-fill submit_delete "
                                  ></i>
                                )}
                              </div>
                            </form>
                          </CSSTransition>
                        </ul>
                      </CSSTransition>
                    </div>
                  )}
              </>
            );
          })}
        <div className="employee_title">
          <p>Контент</p>
        </div>
        {employee &&
          employee.map((person, index) => {
            const {
              address,
              birth_date,
              created_time,
              email,
              first_name,
              last_name,
              middle_name,
              mmr,
              phone,
              position,
              pwd,
              title,
              tenge,
              ttk,
              username,
              image,
              project,
              salary,
              agentAnswerTime,
            } = person;
            let projectName = null;
            ProjectName.map((el) => {
              if (el.channel_id === project) {
                projectName = el.channel_name;
              }
            });
            const dateObject = new Date(created_time);
            const optionsDate = {
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const formattedDate = dateObject.toLocaleString(
              "ru-RU",
              optionsDate
            );

            const Project_Name = ProjectName.filter((value) =>
              project.includes(value.channel_id)
            );
            return (
              <>
                {title === "contentmaker" &&
                  position !== "0" &&
                  position !== "1" && (
                    <div className="wrapper" key={person + index}>
                      <button
                        id={index}
                        className={
                          mode
                            ? "button employee_account light"
                            : "button employee_account"
                        }
                        onClick={(e) => {
                          let IndexElement = index;
                          var res = showUser.map((e, i) => {
                            if (i === IndexElement) {
                              return !e;
                            } else {
                              return e;
                            }
                          });
                          setShowUser(res);
                        }}
                      >
                        <div className="employee_account_left">
                          <div className="employee_account_left_pictureAvatar">
                            {" "}
                            <img
                              src={image ? image : ProfilePhoto1}
                              alt="ProfilePhoto1"
                            ></img>
                          </div>
                          <div>
                            <p key={first_name.toString()}>
                              {username}{" "}
                              {position !== 3 && (
                                <i
                                  style={{ color: "#0f82f5", fontSize: "14px" }}
                                  class="bi bi-bookmark-check-fill"
                                ></i>
                              )}
                            </p>
                            <p className="employee_account_left_position">
                              {position === 1 && "Админ"}
                              {position === 2 && "Тимлид"}
                              {position === 3 && "Сотрудник"}{" "}
                              <i
                                className="bi bi-chevron-down"
                                style={{ fontSize: "12px" }}
                              ></i>
                            </p>
                          </div>
                        </div>
                        <div className="employee_account_right">
                          <p>{mmr}MMR</p>
                          <p className="orange">{ttk}TTK</p>
                          <p style={{ color: "#AB16CD" }}>₸ {tenge}</p>
                        </div>
                      </button>
                      <CSSTransition
                        in={showUser[index]}
                        classNames="alert"
                        timeout={300}
                        unmountOnExit
                      >
                        <ul
                          className={
                            mode
                              ? "employee_account_list list light"
                              : "employee_account_list list"
                          }
                        >
                          <div style={{ fontWeight: "700" }}>
                            <li className="list-item employee_info">
                              <p style={{ color: "orange" }}>Login</p>
                            </li>
                            {(EmployeePositionGet == 1 ||
                              EmployeePositionGet == 0) && (
                              <li className="list-item employee_info">
                                <p style={{ color: "orange" }}>Password</p>
                              </li>
                            )}
                            <li className="list-item employee_info">
                              <p>ФИО</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Дата рождения</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Регистрация в системе</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>E-mail</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Номер</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Адрес</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>Зарпата</p>
                            </li>

                            <li className="list-item employee_info">
                              <p>Проекты</p>
                            </li>
                          </div>
                          <div id="EditEmployeesBlocks">
                            <li className="list-item employee_info">
                              <p
                                key={username.toString()}
                                value="value"
                                id="employeeUsername"
                              >
                                {username ? username : "(Пусто)"}
                              </p>
                            </li>
                            {(EmployeePositionGet == 1 ||
                              EmployeePositionGet == 0) && (
                              <li className="list-item employee_info">
                                <p>{pwd ? pwd : "(Пусто)"}</p>
                              </li>
                            )}
                            <li className="list-item employee_info">
                              <p key={first_name.toString()}>
                                {last_name || first_name || middle_name
                                  ? last_name +
                                    " " +
                                    first_name +
                                    " " +
                                    middle_name
                                  : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={birth_date.toString()}>
                                {birth_date ? birth_date : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={created_time.toString()}>
                                {created_time ? formattedDate : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={email.toString()}>
                                {email ? email : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={phone.toString()}>
                                {phone ? phone : "(Пусто)"}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              <p key={address.toString()}>
                                {address ? address : "(Пусто)"}
                              </p>
                            </li>{" "}
                            <li className="list-item employee_info">
                              {statusEditSalary ? (
                                <>
                                  <input
                                    onChange={(e) =>
                                      setEditSalary(e.target.value)
                                    }
                                    placeholder={salary}
                                  ></input>
                                  <i
                                    className="bi bi-check-circle-fill"
                                    onClick={(el) => EditSubmit(username)}
                                  ></i>
                                  <i
                                    style={{ marginLeft: "5px" }}
                                    onClick={(el) => CancelEdit(el)}
                                    className="bi bi-x-circle-fill"
                                  ></i>
                                </>
                              ) : (
                                <p
                                  onClick={() => setStatusEditSalary(true)}
                                  key={salary}
                                >
                                  {salary ? salary : "(Пусто)"}
                                </p>
                              )}
                            </li>
                            <li className="list-item employee_info">
                              <p
                                className="employee_info_addProject"
                                key={project.toString()}
                              >
                                {project
                                  ? Project_Name.map((el) => {
                                      return el.channel_name + ", ";
                                    })
                                  : "(Пусто)"}

                                {(positionOfEmployee == 1 ||
                                  positionOfEmployee == 0) && (
                                  <div className="employee_info_SelectProjects">
                                    <MultiSelect
                                      options={options}
                                      value={getSelectedProject(project)}
                                      onChange={(e) =>
                                        editSelectedProject(e, index)
                                      }
                                      labelledBy={"Select"}
                                      isCreatable={true}
                                    />
                                    <button
                                      onClick={(e) => EditUserProject(username)}
                                    >
                                      Сохранить проект
                                    </button>
                                  </div>
                                )}
                              </p>
                            </li>
                            <li className="list-item employee_info">
                              {/* <ProSidebar>
                              <SidebarContent>
                                <Menu>
                                  <SubMenu
                                    className="employee_create_position employee_create_pproject"
                                    title={"Выберите проект"}
                                    ref={innerProject}
                                  >
                                    {ProjectName?.map((project) => {
                                      const { channel_id, channel_name } =
                                        project;
                                      return (
                                        <MenuItem
                                          onClick={(e) => {
                                            SelectProjects(e, channel_id);
                                            setSelectedProject(channel_id);
                                          }}
                                        >
                                          {channel_name}
                                        </MenuItem>
                                      );
                                    })}
                                  </SubMenu>
                                </Menu>
                              </SidebarContent>
                            </ProSidebar> */}
                            </li>
                          </div>
                          <div>
                            <button
                              onClick={(e) => {
                                let IndexElement = index;
                                var res = showQuestion.map((e, i) => {
                                  if (i === IndexElement) {
                                    return !e;
                                  } else {
                                    return e;
                                  }
                                });
                                setShowQuestion(res);
                              }}
                            >
                              <span>Удалить сотрудника</span>{" "}
                              <i class="bi bi-trash3-fill"></i>
                            </button>
                          </div>
                          <CSSTransition
                            in={showQuestion[index]}
                            classNames="alert"
                            timeout={300}
                            unmountOnExit
                          >
                            <form
                              className={
                                mode
                                  ? "employee_account_list_question light"
                                  : "employee_account_list_question"
                              }
                            >
                              <p className="employee_account_question">
                                Вы уверены?
                              </p>
                              <p className="employee_account_title">
                                Впишите в поле “Удалить сотрудника”
                              </p>
                              <div className="employee_account_question_input">
                                <input
                                  placeholder="..."
                                  onChange={(e) => {
                                    setsubmitDelete(e.target.value);
                                  }}
                                />
                                {submitDelete === "Удалить сотрудника" ? (
                                  <i
                                    id={username}
                                    onClick={(e) => {
                                      SubmitDelete(e);
                                      setsubmitDelete();
                                    }}
                                    className="bi bi-arrow-right-circle-fill submit_delete "
                                  ></i>
                                ) : (
                                  <i
                                    id={username}
                                    style={{ opacity: "0.5" }}
                                    className="bi bi-arrow-right-circle-fill submit_delete "
                                  ></i>
                                )}
                              </div>
                            </form>
                          </CSSTransition>
                        </ul>
                      </CSSTransition>
                    </div>
                  )}
              </>
            );
          })}
        {/* <div className="employee_title">
          <p>Тимлид</p>
        </div>
        {employee &&
          employee.map((person, index) => {
            const {
              address,
              birth_date,
              created_time,
              email,
              first_name,
              last_name,
              middle_name,
              mmr,
              phone,
              position,
              pwd,
              tenge,
              ttk,
              username,
              image,
            } = person;
            return (
              <>
                {position === 2 && (
                  <div className="wrapper" key={person + index}>
                    <button
                      id={index}
                      className={
                        mode
                          ? "button employee_account light"
                          : "button employee_account"
                      }
                      onClick={(e) => {
                        let IndexElement = index;
                        var res = showUser.map((e, i) => {
                          if (i === IndexElement) {
                            return !e;
                          } else {
                            return e;
                          }
                        });
                        setShowUser(res);
                      }}
                    >
                      <div className="employee_account_left">
                        <img
                          className="employee_account_left_image"
                          src={image ? image : ProfilePhoto1}
                          alt="ProfilePhoto1"
                        ></img>
                        <div>
                          <p key={first_name.toString()}>
                            {first_name}{" "}
                            {position !== 3 && (
                              <i
                                style={{ color: "#0f82f5", fontSize: "14px" }}
                                class="bi bi-bookmark-check-fill"
                              ></i>
                            )}
                          </p>
                          <p className="employee_account_left_position">
                            {position === 1 && "Админ"}
                            {position === 2 && "Тимлид"}
                            {position === 3 && "Сотрудник"}{" "}
                            <i
                              className="bi bi-chevron-down"
                              style={{ fontSize: "12px" }}
                            ></i>
                          </p>
                        </div>
                      </div>
                      <div className="employee_account_right">
                        <p>{mmr}MMR</p>
                        <p className="orange">{ttk}TTK</p>
                        <p style={{ color: "#AB16CD" }}>₸ {tenge}</p>
                      </div>
                    </button>
                    <CSSTransition
                      in={showUser[index]}
                      classNames="alert"
                      timeout={300}
                      unmountOnExit
                    >
                      <ul
                        className={
                          mode
                            ? "employee_account_list list light"
                            : "employee_account_list list"
                        }
                      >
                        <div style={{ fontWeight: "700" }}>
                          <li className="list-item employee_info">
                            <p style={{ color: "orange" }}>Login</p>
                          </li>
                          <li className="list-item employee_info">
                            <p style={{ color: "orange" }}>Password</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>ФИО</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>Дата рождения</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>Регистрация в системе</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>E-mail</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>Номер</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>Адрес</p>
                          </li>
                        </div>
                        <div>
                          <li className="list-item employee_info">
                            <p
                              key={username.toString()}
                              value="value"
                              id="employeeUsername"
                            >
                              {username}
                            </p>
                          </li>
                          <li className="list-item employee_info">
                            <p key={pwd.toString()}>{pwd}</p>
                          </li>
                          <li className="list-item employee_info">
                            <p key={first_name.toString()}>
                              {last_name} {first_name} {middle_name}
                            </p>
                          </li>
                          <li className="list-item employee_info">
                            <p key={birth_date.toString()}>{birth_date}</p>
                          </li>
                          <li className="list-item employee_info">
                            <p key={created_time.toString()}>{created_time}</p>
                          </li>
                          <li className="list-item employee_info">
                            <p key={email.toString()}>{email}</p>
                          </li>
                          <li className="list-item employee_info">
                            <p key={phone.toString()}>{phone}</p>
                          </li>
                          <li className="list-item employee_info">
                            <p key={address.toString()}>{address}</p>
                          </li>
                        </div>
                        <div>
                          <button
                            onClick={(e) => {
                              let IndexElement = index;
                              var res = showQuestion.map((e, i) => {
                                if (i === IndexElement) {
                                  return !e;
                                } else {
                                  return e;
                                }
                              });
                              setShowQuestion(res);
                            }}
                          >
                            <span>Удалить сотрудника</span>{" "}
                            <i class="bi bi-trash3-fill"></i>
                          </button>
                        </div>
                        <CSSTransition
                          in={showQuestion[index]}
                          classNames="alert"
                          timeout={300}
                          unmountOnExit
                        >
                          <form
                            className={
                              mode
                                ? "employee_account_list_question light"
                                : "employee_account_list_question"
                            }
                          >
                            <p className="employee_account_question">
                              Вы уверены?
                            </p>
                            <p className="employee_account_title">
                              Впишите в поле “Удалить сотрудника”
                            </p>
                            <div className="employee_account_question_input">
                              <input
                                placeholder="..."
                                onChange={(e) => {
                                  setsubmitDelete(e.target.value);
                                }}
                              />
                              {submitDelete === "Удалить сотрудника" ? (
                                <i
                                  id={username}
                                  onClick={(e) => {
                                    SubmitDelete(e);
                                    setsubmitDelete();
                                  }}
                                  className="bi bi-arrow-right-circle-fill submit_delete "
                                ></i>
                              ) : (
                                <i
                                  id={username}
                                  style={{ opacity: "0.5" }}
                                  className="bi bi-arrow-right-circle-fill submit_delete "
                                ></i>
                              )}
                            </div>
                          </form>
                        </CSSTransition>
                      </ul>
                    </CSSTransition>
                  </div>
                )}
              </>
            );
          })} */}
      </div>
    </motion.div>
  );
};

export default Employees;
