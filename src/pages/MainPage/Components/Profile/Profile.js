import React, { useEffect, useState } from "react";
import "./Profile.css";
import MainLogo from "./Profile Assets/MainLogo.svg";
import MainLogoLight from "../../../../assets/MainLogoLight.svg";
import AdminTeg from "./Profile Assets/PinUp.jpeg";
import BackButton from "./Profile Assets/Back Button.svg";
import ProfileImg from "./Profile Assets/Profile Img.svg";
import Rank from "./Profile Assets/Rank.svg";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import EdiText from "react-editext";
import Corrector from "./Profile Assets/Corrector.svg";
import FormData from "form-data";
import axios from "axios";

let progressInterval = null;
const Profile = ({ position, mode }) => {
  const [progress, setProgress] = useState(0);
  // PROGRESSBAR WITH REACT-BOOTSTRAP
  var progressPercent;
  useEffect(() => {
    progressInterval = setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 50);
  }, []);
  useEffect(() => {
    if (progress >= profileInformation?.reminder) {
      clearInterval(progressInterval);
    }
  }, [progress]);
  // PROGRESSBAR WITH REACT-BOOTSTRAP

  const refreshPage = () => {
    window.location.reload();
  };
  const navigate = useNavigate();
  const BackButtonClick = () => {
    navigate("/MainPage");
  };

  const [edit, SetEdit] = useState(false);

  // VALIDATION FORM //
  const [usernameCheck, SetUsername] = useState(true);
  const [passwordCheck, SetPassword] = useState(true);
  const [repeatPasswordCheck, SetRepeatPassword] = useState(true);
  const [ButtonEnable, SetButtonEnable] = useState(false);

  const checkLogin = (e) => {
    var SubButt = document.querySelector(".profile_form_submit");
    const usernameRegex = /^[a-z0-9_\.]+$/;
    var validUsername = usernameRegex.test(e.target.value);

    if (validUsername == false) {
      e.target.style.border = "red solid 1px";
      SetButtonEnable(true);
      SubButt.style.opacity = 0.5;
      SetUsername(false);
    } else if (validUsername != false) {
      e.target.style.border = "1px solid #16c784";
      passwordCheck && repeatPasswordCheck
        ? SetButtonEnable(false)
        : SetButtonEnable(true);
      SubButt.style.opacity = 1;
      SetUsername(true);
    }
  };
  const checkPassword = (e) => {
    var SubButt = document.querySelector(".profile_form_submit");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    var validPassword = passwordRegex.test(e.target.value);
    if (validPassword == false) {
      e.target.style.border = "red solid 1px";
      SetPassword(false);
      SetButtonEnable(true);
      SubButt.style.opacity = 0.5;
    } else if (validPassword == true) {
      e.target.style.border = "1px solid #16c784";
      SetPassword(true);
      usernameCheck && repeatPasswordCheck
        ? SetButtonEnable(false)
        : SetButtonEnable(true);
      SubButt.style.opacity = 1;
      checkRepeatPassword();
    }
  };
  const checkRepeatPassword = (e) => {
    var SubButt = document.querySelector(".profile_form_submit");
    var RepeatPassword = document.querySelector(".form_repeate_pwd");
    if (
      document.querySelector(".form_repeate_pwd").value ==
      document.querySelector(".form_pwd").value
    ) {
      SetRepeatPassword(true);
      RepeatPassword.style.border = "1px solid #16c784";
      usernameCheck && passwordCheck
        ? SetButtonEnable(false)
        : SetButtonEnable(true);
      SubButt.style.opacity = 1;
    } else {
      SetRepeatPassword(false);
      RepeatPassword.style.border = "red solid 1px";
      SetButtonEnable(true);
      SubButt.style.opacity = 0.5;
    }
  };

  // GET DATA FROM SERVER //
  var ProfileInf = null;
  const [profileInformation, SetProfileInformation] = useState();
  var ProfileArr = [];
  const [profileInfo, SetProfileInfo] = useState();
  const GetProfileData = () => {
    fetch("https://api1.traffkillas.kz/get_profile_info", {
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
        ProfileInf = JSON.parse(result).data;
        SetProfileInformation(ProfileInf);
      })
      .catch((err) => {
        alert(err);
      });
  };
  var AdminArr = [];
  const [AdminInfo, SetAdminInfo] = useState();
  const GetAdminData = () => {
    fetch("https://api1.traffkillas.kz/get_admin_panel", {
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
        AdminArr[0] = JSON.parse(result)["data"];
        SetAdminInfo(AdminArr);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    GetProfileData();
    GetAdminData();
  }, []);

  const EditProfile = (e) => {
    e.preventDefault();

    const form = document.getElementById("form");
    const formData = new FormData(form);
    let fullName = document.querySelector(".form_fullName").value.split(" ");
    formData.append("last_name", fullName[0]);
    formData.append("first_name", fullName[1]);
    formData.append("middle_name", fullName[2]);

    axios
      .post("https://api1.traffkillas.kz/edit_profile_info", formData, {
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        form.reset();
        GetProfileData();
      })
      .catch((error) => {
      });
  };
  const ChangeText = (el) => {
    document.querySelector(`.default_${el.target.id}`).style.display = "none";
    document.querySelector(`.onclick_${el.target.id}`).style.display = "block";
  };
  const EditSubmit = (el) => {
    let EditElement = document.querySelector(`.edit_${el.target.id}`).value;
    let element = el.target.id;
    let data = `{"${element}": "${EditElement}"}`;

    fetch("https://api1.traffkillas.kz/edit_admin_panel", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Token: localStorage.getItem("token"),
      },
      body: data,
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        GetAdminData();
      })
      .catch((err) => {
        alert(err);
      });

    document.querySelector(`.default_${el.target.id}`).style.display = "block";
    document.querySelector(`.onclick_${el.target.id}`).style.display = "none";
  };
  const [notifications, setNotifications] = useState([]);
  const GetNotifications = () => {
    fetch("https://api1.traffkillas.kz/get_notifications", {
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
        setNotifications(JSON.parse(result)["data"]);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    const payments = document.querySelectorAll(".admin_payments_details");
    for (var i = 0; i < payments.length; i++) {
      payments[i].style.color = mode ? "black" : "white";
      payments[i].style.backgroundColor = mode ? "white" : "#141414";
    }
  }, [mode]);

  const CancelEdit = (el) => {
    document.querySelector(`.default_${el.target.id}`).style.display = "block";
    document.querySelector(`.onclick_${el.target.id}`).style.display = "none";
  };
  const ExitFromAccount = () => {
    navigate("/");
  };
  useEffect(() => {
    const closeDropdown = (e) => {
      e.stopPropagation();
      if (e.srcElement.className !== "dropdown") {
        SetEdit();
      }
    };
    document.body.addEventListener("click", closeDropdown);
    GetNotifications();
  }, []);
  const ChangeProjectAvatar = (e) => {
    e.preventDefault();
    const form = document.querySelector(`.profile_header_right_img`);
    const formData = new FormData(form);
    axios
      .post("https://api1.traffkillas.kz/edit_profile_photo", formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        GetProfileData();
      })
      .catch((error) => {
      });
    form.reset();
  };
  const handleLabelClick = (e) => {
    document.querySelector("#profileImage").click();
  };
  return (
    <div
      style={
        mode
          ? {
              color: "black",
            }
          : {
              color: "white",
            }
      }
      className="profile"
    >
      <>
        <div className="profile_header">
          <div className="profile_header_left">
            <img
              src={mode ? MainLogoLight : MainLogo}
              alt="MainLogo"
              className="MainLogo"
            ></img>
            <p>Аккаунт </p>
            <div className="profile_back_button" onClick={BackButtonClick}>
              <i className="bi bi-house-door-fill"></i>
              <p>На главную</p>
            </div>
          </div>
          <div className="profile_header_right">
            <div className="profile_header_right_info">
              <p
                style={
                  mode
                    ? {
                        color: "white",
                      }
                    : {
                        color: "black",
                      }
                }
                className="profile_header_left_ProfileName"
              >
                {profileInformation?.first_name}
              </p>
              <div
                className="profile_header_right_info_footer dropdown"
                onClick={() => {
                  SetEdit(!edit);
                }}
              >
                <p className="dropdown">
                  <i
                    style={{ marginRight: "8px" }}
                    className="bi bi-pencil-square"
                  ></i>{" "}
                  Редактировать профиль
                </p>

                {/* <img
                  style={{
                    maxHeight: "60px",
                    maxWidth: "60px",
                    borderRadius: "100%",
                  }}
                  src={profileInformation?.image}
                  alt="Corrector"
                  className="dropdown"
                /> */}
                <div
                  style={{}}
                  className="profile_back_button"
                  onClick={() => ExitFromAccount()}
                >
                  <i
                    style={{ color: "black" }}
                    className="bi bi-box-arrow-in-left"
                  ></i>
                  <p style={{ color: "black" }}>Выйти из аккаунта</p>
                </div>
              </div>
              <CSSTransition
                in={edit}
                classNames="alert"
                timeout={300}
                unmountOnExit
              >
                <form
                  // action="PUT"
                  className={
                    mode
                      ? "profile_edtForm profile_form dropdown light"
                      : "profile_edtForm profile_form dropdown"
                  }
                  onSubmit={(e) => EditProfile(e)}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  id="form"
                >
                  <div className="profile_checkResult"></div>
                  <ul>
                    <li>
                      <p>Логин</p>
                      <input
                        placeholder="Логин"
                        // name="login"
                        defaultValue={profileInformation?.username}
                        onChange={(e) => {
                          // InputData.username = e.target.value;
                          checkLogin(e);
                        }}
                        name="username"
                      />
                      {usernameCheck ? (
                        ""
                      ) : (
                        <p
                          style={{
                            color: "red",
                            opacity: "0.5",
                            fontStyle: "oblique",
                          }}
                        >
                          Имя пользователя может иметь только:
                          <br />- Строчные буквы (a-z)
                          <br />- Числа (0-9)
                          <br />- Точки (.)
                          <br /> - Подчеркивание (_)
                        </p>
                      )}
                    </li>
                    <li>
                      <p>Пароль</p>
                      <input
                        placeholder="Пароль"
                        defaultValue={profileInformation?.pwd}
                        type="password"
                        className="form_pwd"
                        onChange={(e) => {
                          checkPassword(e);
                        }}
                        name="pwd"
                      />
                      {passwordCheck ? (
                        ""
                      ) : (
                        <p
                          style={{
                            color: "red",
                            opacity: "0.5",
                            fontStyle: "oblique",
                          }}
                        >
                          Пароль должен иметь:
                          <br />- Минимум 8 символов
                          <br />- Минимум одну заглавную букву (A-Z)
                          {/* <br />- Минимум одну строчную букву (a-z) */}
                          <br />- Минимум одну цифру (0-9)
                        </p>
                      )}
                    </li>
                    <li>
                      <p>Повторите пароль</p>
                      <input
                        placeholder="Повторите пароль"
                        className="form_repeate_pwd"
                        defaultValue={profileInformation?.pwd}
                        type="password"
                        onChange={(e) => {
                          checkRepeatPassword(e);
                        }}
                      />
                      {repeatPasswordCheck ? (
                        ""
                      ) : (
                        <p
                          style={{
                            color: "red",
                            opacity: "0.5",
                            fontStyle: "oblique",
                          }}
                        >
                          Пароль не совпадает
                        </p>
                      )}
                    </li>
                    <li>
                      <p>ФИО</p>
                      <input
                        className="form_fullName"
                        placeholder="ФИО"
                        defaultValue={
                          profileInformation?.last_name +
                          " " +
                          profileInformation?.first_name +
                          " " +
                          profileInformation?.middle_name
                        }
                        // onChange={(e) => {
                        //   let fullName = e.target.value.split(" ");
                        //   InputData.first_name = fullName[0];
                        //   InputData.middle_name = fullName[1];
                        //   InputData.last_name = fullName[2];
                        // }}
                      />
                    </li>
                    <li>
                      <p>Дата рождения</p>
                      <input
                        placeholder="Дата рождения"
                        // name="birthdayDay"
                        defaultValue={profileInformation?.birth_date}
                        // onChange={(e) => {
                        //   InputData.birth_date = e.target.value;
                        // }}
                        name="birth_date"
                      />
                    </li>
                    <li>
                      <p>E-mail</p>
                      <input
                        placeholder="E-mail"
                        // name="email"
                        defaultValue={profileInformation?.email}
                        // onChange={(e) => {
                        //   InputData.email = e.target.value;
                        // }}
                        name="email"
                      />
                    </li>
                    <li>
                      <p>Номер</p>
                      <input
                        placeholder="fs"
                        // name="Номер"
                        defaultValue={profileInformation?.phone}
                        // onChange={(e) => {
                        //   InputData.phone = e.target.value;
                        // }}
                        name="phone"
                      />
                    </li>
                    <li>
                      <p>Адрес</p>
                      <input
                        placeholder="Адрес"
                        // name="adress"
                        defaultValue={profileInformation?.address}
                        // onChange={(e) => {
                        //   InputData.address = e.target.value;
                        // }}
                        name="address"
                      />
                    </li>
                  </ul>
                  <span className="form_error"></span>
                  <button
                    disabled={ButtonEnable}
                    className="profile_form_submit"
                    type="submit"
                  >
                    <i className="fa-solid fa-check"></i>&nbsp;Сохранить данные
                  </button>
                </form>
              </CSSTransition>
            </div>
            <form className="profile_header_right_img">
              <label
                htmlFor="file-input"
                onClick={(e) => {
                  handleLabelClick(e);
                  e.stopPropagation();
                }}
              >
                <img
                  style={{
                    maxHeight: "85px",
                    maxWidth: "85px",
                    borderRadius: "100%",
                  }}
                  src={profileInformation?.image}
                  alt="Profile Img"
                ></img>
              </label>

              <input
                accept="image/*"
                maxfiles="1"
                type="file"
                id="profileImage"
                name="Image"
                onClick={(e) => e.stopPropagation()}
                onChangeCapture={(e) => {
                  ChangeProjectAvatar(e);
                }}
                style={{ display: "none" }}
              ></input>
            </form>
          </div>
        </div>
        {position == 1 ? (
          <div className="admin">
            {AdminInfo &&
              AdminInfo.map((object) => {
                const {
                  contentmaker,
                  kpi,
                  prodaction,
                  treat_1,
                  treat_2,
                  treat_3,
                  team_1,
                  team_2,
                  team_3,
                } = object;
                return (
                  <>
                    <div className="admin_statistics">
                      <p className="admin_statistics_title">
                        Статистика партнёрской программы
                      </p>
                      <div
                        className="admin_statistics_info"
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
                      >
                        <div className="admin_statistics_info_teg">
                          <img src={AdminTeg}></img> <p>PinUp</p>
                        </div>
                        <div className="admin_statistics_info_balance">
                          <p>
                            <i className="bi bi-people-fill"></i> 330
                          </p>
                          <p style={{ color: "#C21556" }}>
                            <i className="bi bi-piggy-bank-fill"></i> 647
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="admin_payments">
                      <div
                        className={
                          mode
                            ? "admin_payments_details light"
                            : "admin_payments_details "
                        }
                      >
                        <p>KPI</p>
                        <div className="input_enable_default default_kpi">
                          <p className="admin_payments_details_input">
                            {kpi}{" "}
                            <i
                              className="bi bi-pencil-square"
                              id="kpi"
                              onClick={(el) => ChangeText(el)}
                            >
                              {" "}
                            </i>
                          </p>
                        </div>

                        <div className="input_enable_onclick onclick_kpi">
                          <input className="admin_input_edit edit_kpi"></input>₸{" "}
                          <i
                            className="bi bi-check-circle-fill"
                            id="kpi"
                            onClick={(e) => EditSubmit(e)}
                          ></i>
                          <i
                            style={{ marginLeft: "5px" }}
                            id="kpi"
                            onClick={(el) => CancelEdit(el)}
                            className="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                      <p className="admin_payments_title">Выплаты</p>
                      <div
                        className={
                          mode
                            ? "admin_payments_details light"
                            : "admin_payments_details "
                        }
                      >
                        <p>Продакшн</p>
                        <div className="input_enable_default default_prodaction">
                          <p className="admin_payments_details_input">
                            {prodaction}₸{" "}
                            <i
                              className="bi bi-pencil-square"
                              id="prodaction"
                              onClick={(el) => ChangeText(el)}
                            >
                              {" "}
                            </i>
                          </p>
                        </div>

                        <div className="input_enable_onclick onclick_prodaction">
                          <input className="admin_input_edit edit_prodaction"></input>
                          ₸{" "}
                          <i
                            className="bi bi-check-circle-fill"
                            id="prodaction"
                            onClick={(el) => EditSubmit(el)}
                          ></i>
                          <i
                            id="prodaction"
                            style={{ marginLeft: "5px" }}
                            onClick={(el) => CancelEdit(el)}
                            className="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                      <div
                        className={
                          mode
                            ? "admin_payments_details light"
                            : "admin_payments_details "
                        }
                      >
                        <p>Контентмейкер</p>
                        <div className="input_enable_default default_contentmaker">
                          <p className="admin_payments_details_input">
                            {contentmaker}₸{" "}
                            <i
                              className="bi bi-pencil-square"
                              id="contentmaker"
                              onClick={(el) => ChangeText(el)}
                            >
                              {" "}
                            </i>
                          </p>
                        </div>

                        <div className="input_enable_onclick onclick_contentmaker">
                          <input className="admin_input_edit edit_contentmaker"></input>
                          ₸{" "}
                          <i
                            className="bi bi-check-circle-fill"
                            id="contentmaker"
                            onClick={(e) => EditSubmit(e)}
                          ></i>
                          <i
                            style={{ marginLeft: "5px" }}
                            id="contentmaker"
                            onClick={(el) => CancelEdit(el)}
                            className="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                      <div
                        className={
                          mode
                            ? "admin_payments_details light"
                            : "admin_payments_details "
                        }
                      >
                        <p>Обработка</p>
                        <div className="input_enable_default default_treat_1">
                          <p className="admin_payments_details_input">
                            {treat_1}₸{" "}
                            <i
                              className="bi bi-pencil-square"
                              id="treat_1"
                              onClick={(el) => ChangeText(el)}
                            >
                              {" "}
                            </i>
                          </p>
                        </div>

                        <div className="input_enable_onclick onclick_treat_1">
                          <input className="admin_input_edit edit_treat_1"></input>
                          ₸{" "}
                          <i
                            className="bi bi-check-circle-fill"
                            id="treat_1"
                            onClick={(e) => EditSubmit(e)}
                          ></i>
                          <i
                            style={{ marginLeft: "5px" }}
                            id="treat_1"
                            onClick={(el) => CancelEdit(el)}
                            className="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                      <div
                        className={
                          mode
                            ? "admin_payments_details light"
                            : "admin_payments_details "
                        }
                      >
                        <p>Обработка(вечер)</p>
                        <div className="input_enable_default default_treat_2">
                          <p className="admin_payments_details_input">
                            {treat_2}₸{" "}
                            <i
                              className="bi bi-pencil-square"
                              id="treat_2"
                              onClick={(el) => ChangeText(el)}
                            >
                              {" "}
                            </i>
                          </p>
                        </div>

                        <div className="input_enable_onclick onclick_treat_2">
                          <input className="admin_input_edit edit_treat_2"></input>
                          ₸{" "}
                          <i
                            className="bi bi-check-circle-fill"
                            id="treat_2"
                            onClick={(e) => EditSubmit(e)}
                          ></i>
                          <i
                            style={{ marginLeft: "5px" }}
                            id="treat_2"
                            onClick={(el) => CancelEdit(el)}
                            className="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                      <div
                        className={
                          mode
                            ? "admin_payments_details light"
                            : "admin_payments_details "
                        }
                      >
                        <p>Обработка(утрен)</p>
                        <div className="input_enable_default default_treat_3">
                          <p className="admin_payments_details_input">
                            {treat_3}₸{" "}
                            <i
                              className="bi bi-pencil-square"
                              id="treat_3"
                              onClick={(el) => ChangeText(el)}
                            >
                              {" "}
                            </i>
                          </p>
                        </div>

                        <div className="input_enable_onclick onclick_treat_3">
                          <input className="admin_input_edit edit_treat_3"></input>
                          ₸{" "}
                          <i
                            className="bi bi-check-circle-fill"
                            id="treat_3"
                            onClick={(e) => EditSubmit(e)}
                          ></i>
                          <i
                            style={{ marginLeft: "5px" }}
                            id="treat_3"
                            onClick={(el) => CancelEdit(el)}
                            className="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                      <div
                        className={
                          mode
                            ? "admin_payments_details light"
                            : "admin_payments_details "
                        }
                      >
                        <p>Тимлид(продакшн)</p>
                        <div className="input_enable_default default_team_1">
                          <p className="admin_payments_details_input">
                            {team_1}₸{" "}
                            <i
                              className="bi bi-pencil-square"
                              id="team_1"
                              onClick={(el) => ChangeText(el)}
                            >
                              {" "}
                            </i>
                          </p>
                        </div>

                        <div className="input_enable_onclick onclick_team_1">
                          <input className="admin_input_edit edit_team_1"></input>
                          ₸{" "}
                          <i
                            className="bi bi-check-circle-fill"
                            id="team_1"
                            onClick={(e) => EditSubmit(e)}
                          ></i>
                          <i
                            style={{ marginLeft: "5px" }}
                            id="team_1"
                            onClick={(el) => CancelEdit(el)}
                            className="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                      <div
                        className={
                          mode
                            ? "admin_payments_details light"
                            : "admin_payments_details "
                        }
                      >
                        <p>Тимлид(обработка)</p>
                        <div className="input_enable_default default_team_2">
                          <p className="admin_payments_details_input">
                            {team_2}₸{" "}
                            <i
                              className="bi bi-pencil-square"
                              id="team_2"
                              onClick={(el) => ChangeText(el)}
                            >
                              {" "}
                            </i>
                          </p>
                        </div>

                        <div className="input_enable_onclick onclick_team_2">
                          <input className="admin_input_edit edit_team_2"></input>
                          ₸{" "}
                          <i
                            className="bi bi-check-circle-fill"
                            id="team_2"
                            onClick={(e) => EditSubmit(e)}
                          ></i>
                          <i
                            style={{ marginLeft: "5px" }}
                            id="team_2"
                            onClick={(el) => CancelEdit(el)}
                            className="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                      <div
                        className={
                          mode
                            ? "admin_payments_details light"
                            : "admin_payments_details "
                        }
                      >
                        <p>Тимлид(контент)</p>
                        <div className="input_enable_default default_team_3">
                          <p className="admin_payments_details_input">
                            {team_3}₸{" "}
                            <i
                              className="bi bi-pencil-square"
                              id="team_3"
                              onClick={(el) => ChangeText(el)}
                            >
                              {" "}
                            </i>
                          </p>
                        </div>

                        <div className="input_enable_onclick onclick_team_3">
                          <input className="admin_input_edit edit_team_3"></input>
                          ₸{" "}
                          <i
                            className="bi bi-check-circle-fill"
                            id="team_3"
                            onClick={(e) => EditSubmit(e)}
                          ></i>
                          <i
                            style={{ marginLeft: "5px" }}
                            id="team_3"
                            onClick={(el) => CancelEdit(el)}
                            className="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        ) : (
          <div className="profile_main">
            <div className="profile_main_left">
              <p className="profile_title"> История операций</p>
              <div
                className={
                  mode
                    ? "profile_main_left_text light"
                    : "profile_main_left_text"
                }
              >
                {notifications &&
                  notifications?.map((el, index, array) => {
                    const { value, message, date, currency } = el;
                    const genDate = date.split(" ");
                    const dateMes = genDate[0].split(".");
                    if (currency === "tenge") {
                      return (
                        <>
                          <h5>{genDate[0]}</h5>
                          <div className="profile_main_left_text_div">
                            <p>
                              {genDate[1]} {message}
                            </p>
                            <p
                              style={
                                value < 0
                                  ? { color: "red" }
                                  : { color: "yellow" }
                              }
                            >
                              {value} ₸
                            </p>
                          </div>
                        </>
                      );
                    }
                  })}
              </div>
            </div>
            <div className="profile_main_right">
              <p className="profile_title">Баланс</p>
              <div
                className={mode ? "profile_balance light" : "profile_balance"}
              >
                <p style={{ color: "#EA9127" }}>
                  {profileInformation?.ttk} TTK
                </p>
                <p style={{ color: "#AB16CD" }}>
                  ₸ {profileInformation?.tenge}
                </p>
              </div>
              <p className="profile_title">Ваш уровень</p>
              <div className="profile_main_right_text">
                <div className="profile_level">
                  <div className="profile_level_rank">
                    <div className="profile_level_rank_info">
                      <div className="profile_level_rank_info_img">
                        <p>{profileInformation?.mmr} MMR</p>
                        <img src={Rank} alt="Rank"></img>
                      </div>
                      <div className="profile_level_rank_info_num">
                        <p>+1250 TTK</p>
                      </div>
                    </div>
                    <div className="profile_level_rank_progress">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{
                          width: `${progress}%`,
                          fontSize: "15px",
                          fontWeight: "700",
                          background: "black",
                        }}
                      >
                        {progress}%
                      </div>
                    </div>
                    <div className="profile_progress_num">
                      <p>{profileInformation?.from_mmr}</p>
                      <p>{profileInformation?.to_mmr}</p>
                    </div>
                  </div>
                  {notifications &&
                    notifications?.map((el, index, array) => {
                      const { value, message, date, currency } = el;
                      const genDate = date.split(" ");
                      const dateMes = genDate[0].split(".");
                      if (currency === "mmr") {
                        return (
                          <div
                            className={
                              mode
                                ? "profile_messages light"
                                : "profile_messages"
                            }
                          >
                            <p
                              style={
                                value < 0
                                  ? { color: "red" }
                                  : { color: "yellow" }
                              }
                            >
                              {value}
                            </p>
                            <p>{message}</p>
                            <p>
                              {dateMes[0]}.{dateMes[1]}
                            </p>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Profile;
