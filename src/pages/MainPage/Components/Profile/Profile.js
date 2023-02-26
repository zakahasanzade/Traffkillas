import React, { useEffect, useState } from "react";
import "./Profile.css";
import MainLogo from "./Profile Assets/MainLogo.svg";
import AdminTeg from "./Profile Assets/AdminTeg.svg";
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
const Profile = (props) => {
  const position = props.position;
  const [progress, setProgress] = useState(0);
  // PROGRESSBAR WITH REACT-BOOTSTRAP
  var progressPercent;
  useEffect(() => {
    progressInterval = setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 50);
  }, []);
  useEffect(() => {
    if (progress >= 70) {
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
      console.log(usernameCheck);
      console.log(passwordCheck);
      console.log(repeatPasswordCheck);
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
    fetch("http://94.103.90.6:5000/get_profile_info", {
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
        console.log(ProfileInf);
      })
      .catch((err) => {
        alert(err);
      });
  };
  var AdminArr = [];
  const [AdminInfo, SetAdminInfo] = useState();
  const GetAdminData = () => {
    fetch("http://94.103.90.6:5000/get_admin_panel", {
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
        console.log(AdminInfo);
        console.log(JSON.parse(result)["data"]);
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
    formData.append("first_name", fullName[0]);
    formData.append("middle_name", fullName[1]);
    formData.append("last_name", fullName[2]);
    console.log(formData);

    axios
      .post("http://94.103.90.6:5000/edit_profile_info", formData, {
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.status);
        form.reset();
        GetProfileData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ChangeText = (el) => {
    console.log(document.querySelector(`.default_${el.target.id}`));
    document.querySelector(`.default_${el.target.id}`).style.display = "none";
    document.querySelector(`.onclick_${el.target.id}`).style.display = "block";
  };
  const EditSubmit = (el) => {
    let EditElement = document.querySelector(`.edit_${el.target.id}`).value;
    let element = el.target.id;
    let data = `{"${element}": "${EditElement}"}`;

    fetch("http://94.103.90.6:5000/edit_admin_panel", {
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
  const CancelEdit = (el) => {
    document.querySelector(`.default_${el.target.id}`).style.display = "block";
    document.querySelector(`.onclick_${el.target.id}`).style.display = "none";
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      e.stopPropagation();
      if (e.srcElement.className !== "dropdown") {
        SetEdit();
      }
    };
    document.body.addEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="profile">
      <>
        <div className="profile_header">
          <div className="profile_header_left">
            <img src={MainLogo} alt="MainLogo" className="MainLogo"></img>
            <p>Аккаунт </p>
            <div className="profile_back_button" onClick={BackButtonClick}>
              <i class="bi bi-box-arrow-in-left"></i>
              <p>Выйти из аккаунта</p>
            </div>
          </div>
          <div className="profile_header_right">
            <div className="profile_header_right_info">
              <p>{profileInformation?.username}</p>
              <div
                className="profile_header_right_info_footer dropdown"
                onClick={() => {
                  SetEdit(!edit);
                }}
              >
                <p className="dropdown">редактировать профиль </p>&nbsp;
                <img src={Corrector} alt="Corrector" className="dropdown" />
              </div>
              <CSSTransition
                in={edit}
                classNames="alert"
                timeout={300}
                unmountOnExit
              >
                <form
                  // action="PUT"
                  className="profile_edtForm profile_form dropdown"
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
                          // console.log(InputData);
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
                          profileInformation?.first_name +
                          " " +
                          profileInformation?.middle_name +
                          " " +
                          profileInformation?.last_name
                        }
                        // onChange={(e) => {
                        //   let fullName = e.target.value.split(" ");
                        //   InputData.first_name = fullName[0];
                        //   InputData.middle_name = fullName[1];
                        //   InputData.last_name = fullName[2];
                        //   console.log(InputData);
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
                        //   console.log(InputData);
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
                        //   console.log(InputData);
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
                        //   console.log(InputData);
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
                        //   console.log(InputData);
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
            <div className="profile_header_right_img">
              <img src={ProfileImg} alt="Profile Img"></img>
            </div>
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
                } = object;
                return (
                  <>
                    <div className="admin_statistics">
                      <p className="admin_statistics_title">
                        Статистика партнёрской программы
                      </p>
                      <div className="admin_statistics_info">
                        <div className="admin_statistics_info_teg">
                          <img src={AdminTeg}></img> <p>PinUp</p>
                        </div>
                        <div className="admin_statistics_info_balance">
                          <p>
                            avg <i className="bi bi-piggy-bank-fill"></i> 330
                          </p>
                          <p style={{ color: "#C21556" }}>
                            <i className="bi bi-piggy-bank-fill"></i> 647
                          </p>
                          <p style={{ color: "#AB16CD" }}>₸ 1 200 000</p>
                        </div>
                      </div>
                    </div>
                    <div className="admin_payments">
                      <div className="admin_payments_details ">
                        <p>KPI</p>
                        <div className="input_enable_default default_kpi">
                          <p className="admin_payments_details_input">
                            {kpi}₸{" "}
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
                          <input class="admin_input_edit edit_kpi"></input>₸{" "}
                          <i
                            class="bi bi-check-circle-fill"
                            id="kpi"
                            onClick={(e) => EditSubmit(e)}
                          ></i>
                          <i
                            style={{ marginLeft: "5px" }}
                            id="kpi"
                            onClick={(el) => CancelEdit(el)}
                            class="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                      <p className="admin_payments_title">Выплаты</p>
                      <div className="admin_payments_details">
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
                          <input class="admin_input_edit edit_prodaction"></input>
                          ₸{" "}
                          <i
                            class="bi bi-check-circle-fill"
                            id="prodaction"
                            onClick={(el) => EditSubmit(el)}
                          ></i>
                          <i
                            id="prodaction"
                            style={{ marginLeft: "5px" }}
                            onClick={(el) => CancelEdit(el)}
                            class="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                      <div className="admin_payments_details ">
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
                          <input class="admin_input_edit edit_contentmaker"></input>
                          ₸{" "}
                          <i
                            class="bi bi-check-circle-fill"
                            id="contentmaker"
                            onClick={(e) => EditSubmit(e)}
                          ></i>
                          <i
                            style={{ marginLeft: "5px" }}
                            id="contentmaker"
                            onClick={(el) => CancelEdit(el)}
                            class="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                      <div className="admin_payments_details ">
                        <p>Обработка(вечер)</p>
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
                          <input class="admin_input_edit edit_treat_1"></input>₸{" "}
                          <i
                            class="bi bi-check-circle-fill"
                            id="treat_1"
                            onClick={(e) => EditSubmit(e)}
                          ></i>
                          <i
                            style={{ marginLeft: "5px" }}
                            id="treat_1"
                            onClick={(el) => CancelEdit(el)}
                            class="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                      <div className="admin_payments_details ">
                        <p>Обработка(вечер дист.)</p>
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
                          <input class="admin_input_edit edit_treat_2"></input>₸{" "}
                          <i
                            class="bi bi-check-circle-fill"
                            id="treat_2"
                            onClick={(e) => EditSubmit(e)}
                          ></i>
                          <i
                            style={{ marginLeft: "5px" }}
                            id="treat_2"
                            onClick={(el) => CancelEdit(el)}
                            class="bi bi-x-circle-fill"
                          ></i>
                        </div>
                      </div>
                      <div className="admin_payments_details ">
                        <p>Обработка(утрен дист.)</p>
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
                          <input class="admin_input_edit edit_treat_3"></input>₸{" "}
                          <i
                            class="bi bi-check-circle-fill"
                            id="treat_3"
                            onClick={(e) => EditSubmit(e)}
                          ></i>
                          <i
                            style={{ marginLeft: "5px" }}
                            id="treat_3"
                            onClick={(el) => CancelEdit(el)}
                            class="bi bi-x-circle-fill"
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
              <div className="profile_main_left_text">
                <h5>30 декабря</h5>
                <div className="profile_main_left_text_div">
                  <p>16:45 Штраф за пропуск сроков по проекту</p>
                  <p className="red">-500₸</p>
                </div>
                <div className="profile_main_left_text_div">
                  <p>16:45 Штраф за пропуск сроков по проекту</p>
                  <p className="red">-500₸</p>
                </div>
                <div className="profile_main_left_text_div">
                  <p>10:11 Выполнение контетнт-плана</p>
                  <p className="green">+2 500₸</p>
                </div>
                <h5>31 декабря</h5>
                <div className="profile_main_left_text_div">
                  <p>10:11 Выполнение контетнт-плана</p>
                  <p className="green">+2 500₸</p>
                </div>
              </div>
            </div>
            <div className="profile_main_right">
              <p className="profile_title">Баланс</p>
              <div className="profile_balance">
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
                        <p>+500 TTK</p>
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
                      <p>250</p>
                      <p>500</p>
                    </div>
                  </div>
                  <div className="profile_messages">
                    <p className="green">+25</p>
                    <p>30/30 сообщений</p>
                    <p>31.12</p>
                  </div>
                  <div className="profile_messages">
                    <p className="red">-50</p>
                    <p>
                      Пропущенный дедлайн <br />
                      по задаче чаппалах <br />
                      сказочный
                    </p>
                    <p>31.12</p>
                  </div>
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
