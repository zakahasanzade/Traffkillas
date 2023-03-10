import React, { useState, useEffect } from "react";
import { Input } from "semantic-ui-react";
import ProfilePhoto1 from "./Employee Assets/Profile Photo 1.svg";
// import ProfilePhoto2 from "./Employee Assets/Profile Photo 2.svg";
// import ProfilePhoto3 from "./Employee Assets/Profile Photo 3.svg";
import "./Employees.css";
import { CSSTransition } from "react-transition-group";
import { motion } from "framer-motion/dist/framer-motion";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import axios from "axios";

const Employees = () => {
  const [showUser, setShowUser] = useState();
  const [CreateEmployee, setCreateEmployee] = useState(false);
  const [EmployeeGift, setEmployeeGift] = useState(false);
  const [showQuestion, setShowQuestion] = useState();

  let EmployeeArr = [];
  const [employee, SetEmployee] = useState();
  const [submitDelete, setsubmitDelete] = useState();
  const [enableCreate, setEnableCreate] = useState(true);

  const GetEmployeeData = () => {
    fetch("https://api1.traffkillas.kz/get_users", {
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
    fetch("https://api1.traffkillas.kz/get_orders", {
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

        console.log(JSON.parse(result)["data"]);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const GiveGift = (e) => {
    e.preventDefault();
    const ElementId = e.target.id;
    axios
      .post("https://api1.traffkillas.kz/accept_order", ElementId, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        GetEmployeeGifts();
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitCreate = (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const title = document.querySelector(".pro-item-content").textContent;
    let positionEmployer = null;
    title === "??????????????????" && (positionEmployer = "treat_1");
    title === "????????????????" && (positionEmployer = "prodaction");
    title === "??????????????????(??????????)" && (positionEmployer = "treat_2");
    title === "??????????????????(??????????)" && (positionEmployer = "treat_3");
    title === "??????????????" && (positionEmployer = "contentmaker");

    formData.append("title", positionEmployer);
    axios
      .post("https://api1.traffkillas.kz/create_user", formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        form.reset();
        document.querySelector(".pro-item-content").innerHTML =
          "<div>???????????????? ??????????????????</div>";
        document.querySelector(".pro-inner-item").style.opacity = 0.5;
        GetEmployeeData();
        setCreateEmployee(false);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
  };

  let employeeUsername = document.getElementById("employeeUsername");
  const SubmitDelete = (e) => {
    e.preventDefault();
    fetch("https://api1.traffkillas.kz/delete_user", {
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
    console.log(e.target.id);
  };

  const EnableCreateButton = () => {
    if (
      document.querySelector(".employee_create_employee_login").value !== "" &&
      document.querySelector(".employee_create_employee_password").value !==
        "" &&
      document.querySelector(".pro-item-content").textContent !==
        "???????????????? ??????????????????"
    ) {
      setEnableCreate(false);
      console.log("kdsjnfosdj");
    } else {
      setEnableCreate(true);
    }
    // console.log(
    //   document.querySelector(".employee_create_employee_input").value
    // );
  };

  const SelectPosition = (e) => {
    document.querySelector(
      ".pro-item-content"
    ).innerHTML = `${e.target.textContent}`;
    document.querySelector(".pro-inner-item").style.opacity = 1;
    console.log(document.querySelector(".pro-item-content").textContent);
  };

  useEffect(() => {
    GetEmployeeData();
  }, []);

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
        <div className="employee_header">
          <div className="employee_header_search">
            <Input
              size="mini"
              icon="search"
              iconPosition="right"
              placeholder="??????????..."
            />
          </div>
          <div className="employee_header_navbar">
            <p>??-??</p>
            <p className="active">??????????????????</p>
            <p>????????????</p>
            <p>???????? ??????????????????????</p>
          </div>
          <div className="employee_header_gift">
            <i
              class="bi bi-gift-fill"
              onClick={() => {
                setEmployeeGift(!EmployeeGift);
                setCreateEmployee(false);
              }}
            ></i>
          </div>
          <div className="employee_header_create">
            <i
              class="bi bi-person-plus-fill"
              onClick={() => {
                setCreateEmployee(!CreateEmployee);
                setEmployeeGift(false);
              }}
            ></i>
          </div>
          <CSSTransition
            in={CreateEmployee}
            classNames="alert"
            timeout={300}
            unmountOnExit
          >
            <div className="employee_create_employee">
              <form id="form" onSubmit={(e) => submitCreate(e)}>
                <h1>???????????????????? ????????????????????</h1>
                <p className="employee_create_employee_title">?????????????? ??????????:</p>
                <input
                  onChange={() => EnableCreateButton()}
                  className="employee_create_employee_login"
                  placeholder="?????????????? ?????????? ..."
                  name="username"
                />
                <p className="employee_create_employee_title">
                  ?????????????? ????????????:
                </p>
                <input
                  onChange={() => EnableCreateButton()}
                  className="employee_create_employee_password"
                  placeholder="?????????????? ???????????? ..."
                  name="pwd"
                />
                <p className="employee_create_employee_title">
                  ?????????????? ??????????????????:
                </p>
                <ProSidebar>
                  <SidebarContent>
                    <Menu>
                      <SubMenu
                        className="employee_create_position"
                        title={"???????????????? ??????????????????"}
                      >
                        <MenuItem
                          onClick={(e) => {
                            SelectPosition(e);
                            EnableCreateButton();
                          }}
                        >
                          ????????????????
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            SelectPosition(e);
                            EnableCreateButton();
                          }}
                        >
                          ??????????????????
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            SelectPosition(e);
                            EnableCreateButton();
                          }}
                        >
                          ??????????????????(??????????)
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            SelectPosition(e);
                            EnableCreateButton();
                          }}
                        >
                          ??????????????????(??????????)
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            SelectPosition(e);
                            EnableCreateButton();
                          }}
                        >
                          ??????????????
                        </MenuItem>
                      </SubMenu>
                    </Menu>
                  </SidebarContent>
                </ProSidebar>
                <button
                  disabled={enableCreate && true}
                  style={enableCreate ? { opacity: "0.5" } : { opacity: "1" }}
                >
                  <i class="bi bi-plus-circle-fill"></i> ???????????????? ????????????????????
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
            <div className="employee_gifts">
              <div className="employee_gifts_title">
                <p>??????????</p>
                <p>????????</p>
                <p>??????</p>
                <p>????????????</p>
              </div>
              {employeeGiftData &&
                employeeGiftData?.map((gift) => {
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
                              ????????????<i class="bi bi-check-circle-fill"></i>
                            </button>
                          </div>
                        </form>
                        <hr></hr>
                      </>
                    );
                  }
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
                              ????????????<i class="bi bi-check-circle-fill"></i>
                            </button>
                          </div>
                        </div>
                        <hr></hr>
                      </>
                    );
                  }
                })}
            </div>
          </CSSTransition>
        </div>
        <div className="employee_title">
          <p>????????????????</p>
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
              project,
              pwd,
              session,
              title,
              tenge,
              ttk,
              username,
              image,
            } = person;
            return (
              <>
                {title === "prodaction" && position !== 2 && (
                  <div className="wrapper" key={person + index}>
                    <button
                      id={index}
                      className="button employee_account"
                      onClick={(e) => {
                        let IndexElement = index;
                        var res = showUser.map((e, i) => {
                          if (i == IndexElement) {
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
                          src={image ? image : ProfilePhoto1}
                          alt="ProfilePhoto1"
                        ></img>
                        <div>
                          <p key={first_name.toString()}>{first_name}</p>
                          <p className="employee_account_left_position">
                            {position === 1 && "??????????"}
                            {position === 2 && "????????????"}
                            {position === 3 && "??????????????????"}{" "}
                            <i
                              class="bi bi-chevron-down"
                              style={{ fontSize: "12px" }}
                            ></i>
                          </p>
                        </div>
                      </div>
                      <div className="employee_account_right">
                        <p>{mmr}MMR</p>
                        <p className="orange">{ttk}TTK</p>
                        <p style={{ color: "#AB16CD" }}>??? {tenge}</p>
                      </div>
                    </button>
                    <CSSTransition
                      in={showUser[index]}
                      classNames="alert"
                      timeout={300}
                      unmountOnExit
                    >
                      <ul className="employee_account_list list">
                        <div style={{ fontWeight: "700" }}>
                          <li className="list-item employee_info">
                            <p style={{ color: "orange" }}>Login</p>
                          </li>
                          <li className="list-item employee_info">
                            <p style={{ color: "orange" }}>Password</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>??????</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>???????? ????????????????</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>?????????????????????? ?? ??????????????</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>E-mail</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>??????????</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>??????????</p>
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
                                if (i == IndexElement) {
                                  return !e;
                                } else {
                                  return e;
                                }
                              });
                              setShowQuestion(res);
                            }}
                          >
                            ?????????????? ????????????????????
                          </button>
                        </div>
                        <CSSTransition
                          in={showQuestion[index]}
                          classNames="alert"
                          timeout={300}
                          unmountOnExit
                        >
                          <form className="employee_account_list_question">
                            <p className="employee_account_question">
                              ???? ???????????????
                            </p>
                            <p className="employee_account_title">
                              ?????????????? ?? ???????? ????????????????? ???????????????????????
                            </p>
                            <div className="employee_account_question_input">
                              <input
                                placeholder="..."
                                onChange={(e) => {
                                  setsubmitDelete(e.target.value);
                                }}
                              />
                              {submitDelete === "?????????????? ????????????????????" ? (
                                <i
                                  id={username}
                                  onClick={(e) => {
                                    SubmitDelete(e);
                                    setsubmitDelete();
                                  }}
                                  class="bi bi-arrow-right-circle-fill submit_delete "
                                ></i>
                              ) : (
                                <i
                                  id={username}
                                  style={{ opacity: "0.5" }}
                                  class="bi bi-arrow-right-circle-fill submit_delete "
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
          <p>??????????????????</p>
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
              project,
              pwd,
              session,
              title,
              tenge,
              ttk,
              username,
              image,
            } = person;
            return (
              <>
                {(title === "treat_1" ||
                  title === "treat_2" ||
                  title === "treat_3") &&
                  position !== 2 && (
                    <div className="wrapper" key={person + index}>
                      <button
                        id={index}
                        className="button employee_account"
                        onClick={(e) => {
                          let IndexElement = index;
                          var res = showUser.map((e, i) => {
                            if (i == IndexElement) {
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
                            src={image ? image : ProfilePhoto1}
                            alt="ProfilePhoto1"
                          ></img>
                          <div>
                            <p key={first_name.toString()}>{first_name}</p>
                            <p className="employee_account_left_position">
                              {position === 1 && "??????????"}
                              {position === 2 && "????????????"}
                              {position === 3 && "??????????????????"}{" "}
                              <i
                                class="bi bi-chevron-down"
                                style={{ fontSize: "12px" }}
                              ></i>
                            </p>
                          </div>
                        </div>
                        <div className="employee_account_right">
                          <p>{mmr}MMR</p>
                          <p className="orange">{ttk}TTK</p>
                          <p style={{ color: "#AB16CD" }}>??? {tenge}</p>
                        </div>
                      </button>
                      <CSSTransition
                        in={showUser[index]}
                        classNames="alert"
                        timeout={300}
                        unmountOnExit
                      >
                        <ul className="employee_account_list list">
                          <div style={{ fontWeight: "700" }}>
                            <li className="list-item employee_info">
                              <p style={{ color: "orange" }}>Login</p>
                            </li>
                            <li className="list-item employee_info">
                              <p style={{ color: "orange" }}>Password</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>??????</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>???????? ????????????????</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>?????????????????????? ?? ??????????????</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>E-mail</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>??????????</p>
                            </li>
                            <li className="list-item employee_info">
                              <p>??????????</p>
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
                              <p key={created_time.toString()}>
                                {created_time}
                              </p>
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
                                  if (i == IndexElement) {
                                    return !e;
                                  } else {
                                    return e;
                                  }
                                });
                                setShowQuestion(res);
                              }}
                            >
                              ?????????????? ????????????????????
                            </button>
                          </div>
                          <CSSTransition
                            in={showQuestion[index]}
                            classNames="alert"
                            timeout={300}
                            unmountOnExit
                          >
                            <form className="employee_account_list_question">
                              <p className="employee_account_question">
                                ???? ???????????????
                              </p>
                              <p className="employee_account_title">
                                ?????????????? ?? ???????? ????????????????? ???????????????????????
                              </p>
                              <div className="employee_account_question_input">
                                <input
                                  placeholder="..."
                                  onChange={(e) => {
                                    setsubmitDelete(e.target.value);
                                  }}
                                />
                                {submitDelete === "?????????????? ????????????????????" ? (
                                  <i
                                    id={username}
                                    onClick={(e) => {
                                      SubmitDelete(e);
                                      setsubmitDelete();
                                    }}
                                    class="bi bi-arrow-right-circle-fill submit_delete "
                                  ></i>
                                ) : (
                                  <i
                                    id={username}
                                    style={{ opacity: "0.5" }}
                                    class="bi bi-arrow-right-circle-fill submit_delete "
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
          <p>??????????????</p>
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
              project,
              pwd,
              session,
              title,
              tenge,
              ttk,
              username,
              image,
            } = person;
            return (
              <>
                {title === "contentmaker" && position !== 2 && (
                  <div className="wrapper" key={person + index}>
                    <button
                      id={index}
                      className="button employee_account"
                      onClick={(e) => {
                        let IndexElement = index;
                        var res = showUser.map((e, i) => {
                          if (i == IndexElement) {
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
                          src={image ? image : ProfilePhoto1}
                          alt="ProfilePhoto1"
                        ></img>
                        <div>
                          <p key={first_name.toString()}>{first_name}</p>
                          <p className="employee_account_left_position">
                            {position === 1 && "??????????"}
                            {position === 2 && "????????????"}
                            {position === 3 && "??????????????????"}{" "}
                            <i
                              class="bi bi-chevron-down"
                              style={{ fontSize: "12px" }}
                            ></i>
                          </p>
                        </div>
                      </div>
                      <div className="employee_account_right">
                        <p>{mmr}MMR</p>
                        <p className="orange">{ttk}TTK</p>
                        <p style={{ color: "#AB16CD" }}>??? {tenge}</p>
                      </div>
                    </button>
                    <CSSTransition
                      in={showUser[index]}
                      classNames="alert"
                      timeout={300}
                      unmountOnExit
                    >
                      <ul className="employee_account_list list">
                        <div style={{ fontWeight: "700" }}>
                          <li className="list-item employee_info">
                            <p style={{ color: "orange" }}>Login</p>
                          </li>
                          <li className="list-item employee_info">
                            <p style={{ color: "orange" }}>Password</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>??????</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>???????? ????????????????</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>?????????????????????? ?? ??????????????</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>E-mail</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>??????????</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>??????????</p>
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
                                if (i == IndexElement) {
                                  return !e;
                                } else {
                                  return e;
                                }
                              });
                              setShowQuestion(res);
                            }}
                          >
                            ?????????????? ????????????????????
                          </button>
                        </div>
                        <CSSTransition
                          in={showQuestion[index]}
                          classNames="alert"
                          timeout={300}
                          unmountOnExit
                        >
                          <form className="employee_account_list_question">
                            <p className="employee_account_question">
                              ???? ???????????????
                            </p>
                            <p className="employee_account_title">
                              ?????????????? ?? ???????? ????????????????? ???????????????????????
                            </p>
                            <div className="employee_account_question_input">
                              <input
                                placeholder="..."
                                onChange={(e) => {
                                  setsubmitDelete(e.target.value);
                                }}
                              />
                              {submitDelete === "?????????????? ????????????????????" ? (
                                <i
                                  id={username}
                                  onClick={(e) => {
                                    SubmitDelete(e);
                                    setsubmitDelete();
                                  }}
                                  class="bi bi-arrow-right-circle-fill submit_delete "
                                ></i>
                              ) : (
                                <i
                                  id={username}
                                  style={{ opacity: "0.5" }}
                                  class="bi bi-arrow-right-circle-fill submit_delete "
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
          <p>????????????</p>
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
              project,
              pwd,
              session,
              title,
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
                      className="button employee_account"
                      onClick={(e) => {
                        let IndexElement = index;
                        var res = showUser.map((e, i) => {
                          if (i == IndexElement) {
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
                          <p key={first_name.toString()}>{first_name}</p>
                          <p className="employee_account_left_position">
                            {position === 1 && "??????????"}
                            {position === 2 && "????????????"}
                            {position === 3 && "??????????????????"}{" "}
                            <i
                              class="bi bi-chevron-down"
                              style={{ fontSize: "12px" }}
                            ></i>
                          </p>
                        </div>
                      </div>
                      <div className="employee_account_right">
                        <p>{mmr}MMR</p>
                        <p className="orange">{ttk}TTK</p>
                        <p style={{ color: "#AB16CD" }}>??? {tenge}</p>
                      </div>
                    </button>
                    <CSSTransition
                      in={showUser[index]}
                      classNames="alert"
                      timeout={300}
                      unmountOnExit
                    >
                      <ul className="employee_account_list list">
                        <div style={{ fontWeight: "700" }}>
                          <li className="list-item employee_info">
                            <p style={{ color: "orange" }}>Login</p>
                          </li>
                          <li className="list-item employee_info">
                            <p style={{ color: "orange" }}>Password</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>??????</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>???????? ????????????????</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>?????????????????????? ?? ??????????????</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>E-mail</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>??????????</p>
                          </li>
                          <li className="list-item employee_info">
                            <p>??????????</p>
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
                                if (i == IndexElement) {
                                  return !e;
                                } else {
                                  return e;
                                }
                              });
                              setShowQuestion(res);
                            }}
                          >
                            ?????????????? ????????????????????
                          </button>
                        </div>
                        <CSSTransition
                          in={showQuestion[index]}
                          classNames="alert"
                          timeout={300}
                          unmountOnExit
                        >
                          <form className="employee_account_list_question">
                            <p className="employee_account_question">
                              ???? ???????????????
                            </p>
                            <p className="employee_account_title">
                              ?????????????? ?? ???????? ????????????????? ???????????????????????
                            </p>
                            <div className="employee_account_question_input">
                              <input
                                placeholder="..."
                                onChange={(e) => {
                                  setsubmitDelete(e.target.value);
                                }}
                              />
                              {submitDelete === "?????????????? ????????????????????" ? (
                                <i
                                  id={username}
                                  onClick={(e) => {
                                    SubmitDelete(e);
                                    setsubmitDelete();
                                  }}
                                  class="bi bi-arrow-right-circle-fill submit_delete "
                                ></i>
                              ) : (
                                <i
                                  id={username}
                                  style={{ opacity: "0.5" }}
                                  class="bi bi-arrow-right-circle-fill submit_delete "
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
      </div>
    </motion.div>
  );
};

export default Employees;
