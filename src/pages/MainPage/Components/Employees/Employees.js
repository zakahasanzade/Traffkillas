import React, { useState, useEffect } from "react";
import { Input } from "semantic-ui-react";
import ProfilePhoto1 from "./Employee Assets/Profile Photo 1.svg";
// import ProfilePhoto2 from "./Employee Assets/Profile Photo 2.svg";
// import ProfilePhoto3 from "./Employee Assets/Profile Photo 3.svg";
import "./Employees.css";
import { CSSTransition } from "react-transition-group";
import { motion } from "framer-motion/dist/framer-motion";

const Employees = () => {
  const [show1, setShow1] = useState(false);
  // const [show2, setShow2] = useState(false);
  // const [show3, setShow3] = useState(false);
  const [showQuestion1, deleteEmployee1] = useState(false);
  // const [showQuestion2, deleteEmployee2] = useState(false);
  // const [showQuestion3, deleteEmployee3] = useState(false);
  // const DeleteIcon = document.querySelector("employee_account_list_question");
  let EmployeeArr = [];
  const [employee, SetEmployee] = useState();

  // e.preventDefault();
  useEffect(() => {
    fetch("http://94.103.90.6:5000/get_users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
    })
      .then((response) => {
        // console.log(response.status);
        return response.text();
      })
      .then((result) => {
        // console.log(result);
        EmployeeArr = JSON.parse(result)["data"];
        SetEmployee(EmployeeArr);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  let employeeUsername = document.getElementById("employeeUsername");
  console.log(employeeUsername);
  const SubmitDelete = (e) => {
    // e.preventDefault();
    // fetch("http://94.103.90.6:5000/delete_user", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify("test"),
    // })
    //   .then((response) => {
    //     // console.log(response.status);
    //     return response.text();
    //   })
    //   .then((result) => {
    //     // console.log(result);
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  };
  useEffect(SubmitDelete, []);
  console.log(employee);
  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      {/* <div className="main_header">{<Header />}</div>
      <div className="NavBar">{<NavBar />}</div> */}

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
        </div>
        <div className="employee_title">
          <p>Продакшн</p>
        </div>
        {employee &&
          employee.map((person) => {
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
              <div className="wrapper">
                <button
                  className="button employee_account"
                  onClick={() => setShow1(!show1)}
                >
                  <div className="employee_account_left">
                    <img src={ProfilePhoto1} alt="ProfilePhoto1"></img>
                    <p key={first_name.toString()}>{first_name}</p>
                  </div>
                  <div className="employee_account_right">
                    <p>{position}</p>
                    <p>{mmr}MMR</p>
                    <p className="orange">{ttk}TTK</p>
                    <p className="red">₸ {tenge}</p>
                  </div>
                </button>
                <CSSTransition
                  in={show1}
                  classNames="alert"
                  timeout={300}
                  unmountOnExit
                >
                  <ul className="employee_account_list list">
                    <div>
                      <li className="list-item employee_info">
                        <p style={{ color: "orange" }}>Login</p>
                        <p
                          key={username.toString()}
                          value="value"
                          id="employeeUsername"
                        >
                          {username}
                        </p>
                      </li>
                      <li className="list-item employee_info">
                        <p style={{ color: "orange" }}>Password</p>
                        <p key={pwd.toString()}>{pwd}</p>
                      </li>
                      <li className="list-item employee_info">
                        <p>ФИО</p>
                        <p key={first_name.toString()}>
                          {first_name} {last_name} {middle_name}
                        </p>
                      </li>
                      <li className="list-item employee_info">
                        <p>Дата рождения</p>
                        <p key={birth_date.toString()}>{birth_date}</p>
                      </li>
                      <li className="list-item employee_info">
                        <p>Регистрация в системе</p>
                        <p key={created_time.toString()}>{created_time}</p>
                      </li>
                      <li className="list-item employee_info">
                        <p>E-mail</p>
                        <p key={email.toString()}>{email}</p>
                      </li>
                      <li className="list-item employee_info">
                        <p>Номер</p>
                        <p key={phone.toString()}>{phone}</p>
                      </li>
                      <li className="list-item employee_info">
                        <p>Адрес</p>
                        <p key={address.toString()}>{address}</p>
                      </li>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          deleteEmployee1(!showQuestion1);
                        }}
                      >
                        Удалить сотрудника
                      </button>
                    </div>
                    <CSSTransition
                      in={showQuestion1}
                      classNames="alert"
                      timeout={300}
                      unmountOnExit
                    >
                      <form className="employee_account_list_question">
                        <p>Вы уверены?</p>
                        <a href="#/">Впишите в поле “Удалить сотрудника”</a>
                        {/* <Input
                    size="mini"
                    icon="arrow right"
                    className="page_autorization_inputs_submit"
                    placeholder="..."
                  /> */}
                        <input />
                        <button type="submit" onSubmit={SubmitDelete}>
                          Delete
                        </button>
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

        {/* <div className="wrapper">
          <button
            className="button employee_account"
            onClick={() => setShow2(!show2)}
          >
            <div className="employee_account_left">
              <img src={ProfilePhoto2} alt="ProfilePhoto1"></img>
              <p>Тимуша</p>
            </div>
            <div className="employee_account_right">
              <p>teamlead</p>
              <p>600MMR</p>
              <p className="orange">54TTK</p>
              <p className="red">₸ 1 200 000</p>
            </div>
          </button>
          <CSSTransition
            in={show2}
            classNames="alert"
            timeout={300}
            unmountOnExit
          >
            <ul className="employee_account_list list">
              <div>
                <li className="list-item employee_info">
                  <p>ФИО</p>
                  <p>Зубенко Михаил Петрович</p>
                </li>
                <li className="list-item employee_info">
                  <p>Дата рождения</p>
                  <p>21.01.1942</p>
                </li>
                <li className="list-item employee_info">
                  <p>Регистрация в системе</p>
                  <p>01.01.2023</p>
                </li>
                <li className="list-item employee_info">
                  <p>E-mail</p>
                  <p>zubenkopinksuit@mail.ru</p>
                </li>
                <li className="list-item employee_info">
                  <p>Номер</p>
                  <p>8 (800) 555-35-35</p>
                </li>
                <li className="list-item employee_info">
                  <p>Адрес</p>
                  <p>г. Алматы, проспект 4-го рейха, д. 7</p>
                </li>
              </div>
              <div>
                <button
                  onClick={() => {
                    deleteEmployee2(!showQuestion2);
                  }}
                >
                  Удалить сотрудника
                </button>
              </div>
              <CSSTransition
                in={showQuestion2}
                classNames="alert"
                timeout={300}
                unmountOnExit
              >
                <form className="employee_account_list_question">
                  <p>Вы уверены?</p>
                  <a>Впишите в поле “Удалить сотрудника”</a>
                  <Input
                    size="mini"
                    icon="arrow right"
                    className="page_autorization_inputs_submit"
                    placeholder="..."
                  />
                </form>
              </CSSTransition>
            </ul>
          </CSSTransition>
        </div> */}

        <div className="employee_title">
          <p>Контент</p>
        </div>
        {/* <div className="wrapper">
          <button
            className="button employee_account"
            onClick={() => setShow3(!show3)}
          >
            <div className="employee_account_left">
              <img src={ProfilePhoto3} alt="ProfilePhoto1"></img>
              <p>Саньчоус</p>
            </div>
            <div className="employee_account_right">
              <p>teamlead</p>
              <p>600MMR</p>
              <p className="orange">54TTK</p>
              <p className="red">₸ 1 200 000</p>
            </div>
          </button>
          <CSSTransition
            in={show3}
            classNames="alert"
            timeout={300}
            unmountOnExit
          >
            <ul className="employee_account_list list">
              <div>
                <li className="list-item employee_info">
                  <p>ФИО</p>
                  <p>Зубенко Михаил Петрович</p>
                </li>
                <li className="list-item employee_info">
                  <p>Дата рождения</p>
                  <p>21.01.1942</p>
                </li>
                <li className="list-item employee_info">
                  <p>Регистрация в системе</p>
                  <p>01.01.2023</p>
                </li>
                <li className="list-item employee_info">
                  <p>E-mail</p>
                  <p>zubenkopinksuit@mail.ru</p>
                </li>
                <li className="list-item employee_info">
                  <p>Номер</p>
                  <p>8 (800) 555-35-35</p>
                </li>
                <li className="list-item employee_info">
                  <p>Адрес</p>
                  <p>г. Алматы, проспект 4-го рейха, д. 7</p>
                </li>
              </div>
              <div>
                <button
                  onClick={() => {
                    deleteEmployee3(!showQuestion3);
                  }}
                >
                  Удалить сотрудника
                </button>
              </div>
              <CSSTransition
                in={showQuestion3}
                classNames="alert"
                timeout={300}
                unmountOnExit
              >
                <form className="employee_account_list_question">
                  <p>Вы уверены?</p>
                  <a>Впишите в поле “Удалить сотрудника”</a>
                  <Input
                    size="mini"
                    icon="arrow right"
                    className="page_autorization_inputs_submit"
                    placeholder="..."
                  />
                </form>
              </CSSTransition>
            </ul>
          </CSSTransition>
        </div> */}
      </div>
    </motion.div>
  );
};

export default Employees;
