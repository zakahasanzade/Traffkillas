import React, { useState, useEffect } from "react";
import { Input } from "semantic-ui-react";
import ProfilePhoto1 from "./Employee Assets/Profile Photo 1.svg";
// import ProfilePhoto2 from "./Employee Assets/Profile Photo 2.svg";
// import ProfilePhoto3 from "./Employee Assets/Profile Photo 3.svg";
import "./Employees.css";
import { CSSTransition } from "react-transition-group";
import { motion } from "framer-motion/dist/framer-motion";
import axios from "axios";

const Employees = () => {
  const [showUser, setShowUser] = useState();
  const [CreateEmployee, setCreateEmployee] = useState(false);
  const [showQuestion, setShowQuestion] = useState();

  let EmployeeArr = [];
  const [employee, SetEmployee] = useState();
  const [submitDelete, setsubmitDelete] = useState();
  const GetEmployeeData = () => {
    fetch("http://94.103.90.6:5000/get_users", {
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
      })
      .catch((err) => {
        alert(err);
      });
  };

  const submitCreate = (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    axios
      .post("http://94.103.90.6:5000/create_user", formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        form.reset();
        GetEmployeeData();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
  };

  let employeeUsername = document.getElementById("employeeUsername");
  const SubmitDelete = (e) => {
    e.preventDefault();
    fetch("http://94.103.90.6:5000/delete_user", {
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
              placeholder="Поиск..."
            />
          </div>
          <div className="employee_header_navbar">
            <p>А-я</p>
            <p className="active">должность</p>
            <p>баланс</p>
            <p>дата регистрации</p>
          </div>
          <div className="employee_header_gift">
            <i class="bi bi-gift-fill"></i>
          </div>
          <div className="employee_header_create">
            <i
              class="bi bi-person-plus-fill"
              onClick={() => setCreateEmployee(!CreateEmployee)}
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
                <h1>Добавление сотрудника</h1>
                <p className="employee_create_employee_title">Введите логин:</p>
                <input placeholder="Введите логин ..." name="username" />
                <p className="employee_create_employee_title">Авто-пароль:</p>
                <input placeholder="Введите авто-пароль ..." name="pwd" />
                <p className="employee_create_employee_title">Поле:</p>
                <input placeholder="Введите поле ..." name="title" />
                <button>
                  <i class="bi bi-plus-circle-fill"></i> Добавить сотрудника
                </button>
              </form>
            </div>
          </CSSTransition>
        </div>
        <div className="employee_title">
          <p>Продакшн</p>
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
              tenge,
              ttk,
              username,
            } = person;
            return (
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
                    <img src={ProfilePhoto1} alt="ProfilePhoto1"></img>
                    <div>
                      <p key={first_name.toString()}>{first_name}</p>
                      <p className="employee_account_left_position">
                        {position}{" "}
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
                    <p style={{ color: "#AB16CD" }}>₸ {tenge}</p>
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
                          {first_name} {last_name} {middle_name}
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
                        Удалить сотрудника
                      </button>
                    </div>
                    <CSSTransition
                      in={showQuestion[index]}
                      classNames="alert"
                      timeout={300}
                      unmountOnExit
                    >
                      <form className="employee_account_list_question">
                        <p className="employee_account_question">Вы уверены?</p>
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
            );
          })}

        <div className="employee_title">
          <p>Обработка</p>
        </div>

        <div className="employee_title">
          <p>Контент</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Employees;
