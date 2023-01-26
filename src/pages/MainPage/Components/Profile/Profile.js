import React, { useEffect, useState } from "react";
import "./Profile.css";
import MainLogo from "./Profile Assets/MainLogo.svg";
import BackButton from "./Profile Assets/Back Button.svg";
import ProfileImg from "./Profile Assets/Profile Img.svg";
import Rank from "./Profile Assets/Rank.svg";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Corrector from "./Profile Assets/Corrector.svg";
import FormData from "form-data";
// import "bootstrap/dist/css/bootstrap.min.css";

let progressInterval = null;
const Profile = (status) => {
  const [marketAsset, SetMarketAsset] = useState();
  const [progress, setProgress] = useState(0);
  // PROGRESSBAR WITH REACT-BOOTSTRAP
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

  // console.log(marketAsset);

  const navigate = useNavigate();
  const BackButtonClick = () => {
    navigate("/MainPage");
  };

  const [edit, SetEdit] = useState(false);

  const [check, SetCheck] = useState(false);
  const editResult = document.querySelector(".profile_checkResult");
  const checkLogin = (e) => {
    // let value = e.target.value;
    // console.log(value.length);
    // if (
    //   e.target.value.length < 2 ||
    //   e.target.value.length > 10 ||
    //   value.match(/(\d+)/).length !== 0
    // ) {
    //   editResult.innerHTML = "";
    //   editResult.innerHTML += "Unvaild Username Length<br/>";
    //   console.log(value.match(/(\d+)/));
    // } else {
    //   editResult.innerHTML = "";
    // }
    // if (value.match(/(\d+)/).length == 0) {
    //   editResult.innerHTML += "Username Must Contains At Least 1 Number<br/>";
    // }
  };

  let MarketArr = [];
  const [profileInfo, SetProfileInfo] = useState();
  useEffect(() => {
    fetch("http://94.103.90.6:5000/get_profile_info", {
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
        // MarketArr = JSON.parse(result).data;
        MarketArr[0] = JSON.parse(result).data;
        SetProfileInfo(MarketArr);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  let arr = [];
  const EditProfile = (e) => {
    e.preventDefault();
    console.log(e.target);
    // console.log(e.target[0].value);
    const data = new FormData(document.querySelector(".form"));
    console.log(FormData.get("login"));
    // console.log(arr);
    // fetch("http://94.103.90.6:5000/edit_profile_info", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //     Token: localStorage.getItem("token"),
    //   },
    //   body: {

    // },
    // })
    //   .then((response) => {
    //     return response.text();
    //   })
    //   .then((result) => {})
    //   .catch((err) => {
    //     alert(err);
    //   });
  };
  return (
    <div className="profile">
      {profileInfo &&
        profileInfo.map((element) => {
          const {
            address,
            birth_date,
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
          } = element;
          {
            /* console.log(phone); */
          }
          return (
            <>
              <div className="profile_header">
                <div className="profile_header_left">
                  <img src={MainLogo} alt="MainLogo" className="MainLogo"></img>
                  <p>Аккаунт</p>
                  <div
                    className="profile_back_button"
                    onClick={BackButtonClick}
                  >
                    <img
                      src={BackButton}
                      alt="BackButton"
                      className="BackButton"
                    ></img>
                    <p href="#">на главную</p>
                  </div>
                </div>
                <div className="profile_header_right">
                  <div className="profile_header_right_info">
                    <p>{username}</p>
                    <div
                      className="profile_header_right_info_footer"
                      onClick={() => {
                        SetEdit(!edit);
                      }}
                    >
                      <p>редактировать профиль </p>{" "}
                      <img src={Corrector} alt="Corrector" />
                    </div>
                    <CSSTransition
                      in={edit}
                      classNames="alert"
                      timeout={300}
                      unmountOnExit
                    >
                      <form
                        action="PUT"
                        className="profile_edtForm profile_form"
                        onSubmit={EditProfile}
                      >
                        <div className="profile_checkResult"></div>
                        <ul>
                          <li>
                            <p>Логин</p>
                            <input
                              placeholder="Логин"
                              name="login"
                              onChange={checkLogin}
                              defaultValue={username}
                            />
                          </li>
                          <li>
                            <p>Пароль</p>
                            <input
                              placeholder="Пароль"
                              name="password"
                              defaultValue={pwd}
                            />
                          </li>
                          <li>
                            <p>Повторите пароль</p>
                            <input
                              placeholder="Повторите пароль"
                              name="repeatPassword"
                            />
                          </li>
                          <li>
                            <p>ФИО</p>
                            <input
                              placeholder="ФИО"
                              defaultValue={
                                first_name + " " + middle_name + " " + last_name
                              }
                            />
                          </li>
                          <li>
                            <p>Дата рождения</p>
                            <input
                              placeholder="Дата рождения"
                              name="birthdayDay"
                              defaultValue={birth_date}
                            />
                          </li>
                          <li>
                            <p>E-mail</p>
                            <input
                              placeholder="E-mail"
                              name="email"
                              defaultValue={email}
                            />
                          </li>
                          <li>
                            <p>Номер</p>
                            <input
                              placeholder="fs"
                              name="Номер"
                              defaultValue={phone}
                            />
                          </li>
                          <li>
                            <p>Адрес</p>
                            <input
                              placeholder="Адрес"
                              name="adress"
                              defaultValue={address}
                            />
                          </li>
                        </ul>
                        <button type="submit">
                          <i className="fa-solid fa-check"></i> Сохранить данные
                        </button>
                      </form>
                    </CSSTransition>
                  </div>
                  <div className="profile_header_right_img">
                    <img src={ProfileImg} alt="Profile Img"></img>
                  </div>
                </div>
              </div>
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
                    <p style={{ color: "#EA9127" }}>{ttk} TTK</p>
                    <p style={{ color: "#AB16CD" }}>₸ {tenge}</p>
                  </div>
                  <p className="profile_title">Ваш уровень</p>
                  <div className="profile_main_right_text">
                    <div className="profile_level">
                      <div className="profile_level_rank">
                        <div className="profile_level_rank_info">
                          <div className="profile_level_rank_info_img">
                            <p>{mmr} MMR</p>
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
            </>
          );
        })}
    </div>
  );
};

export default Profile;
