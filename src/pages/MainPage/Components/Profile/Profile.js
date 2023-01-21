import React, { useEffect, useState } from "react";
import "./Profile.css";
import MainLogo from "./Profile Assets/MainLogo.svg";
import BackButton from "./Profile Assets/Back Button.svg";
import ProfileImg from "./Profile Assets/Profile Img.svg";
import Rank from "./Profile Assets/Rank.svg";
import { useNavigate } from "react-router-dom";
import Corrector from "./Profile Assets/Corrector.svg";
// import "bootstrap/dist/css/bootstrap.min.css";

let progressInterval = null;
const Profile = () => {
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
  //

  const navigate = useNavigate();
  const BackButtonClick = () => {
    navigate("/MainPage");
  };

  return (
    <div className="profile">
      <div className="profile_header">
        <div className="profile_header_left">
          <img src={MainLogo} alt="MainLogo" className="MainLogo"></img>
          <p>Аккаунт</p>
          <div className="profile_back_button" onClick={BackButtonClick}>
            <img src={BackButton} alt="BackButton" className="BackButton"></img>
            <a>на главную</a>
          </div>
        </div>
        <div className="profile_header_right">
          <div className="profile_header_right_info">
            <p>Абобус_2002</p>
            <div className="profile_header_right_info_footer">
              <p>редактировать профиль </p>
              <img src={Corrector} />
            </div>
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
            <h5>31 декабря</h5>
            <div className="profile_main_left_text_div">
              <p>16:45 Штраф за пропуск сроков по проекту</p>
              <a className="red">-500₸</a>
            </div>
            <div className="profile_main_left_text_div">
              <p>16:45 Штраф за пропуск сроков по проекту</p>
              <a className="red">-500₸</a>
            </div>
            <div className="profile_main_left_text_div">
              <p>10:11 Выполнение контетнт-плана</p>
              <a className="green">+2 500₸</a>
            </div>
            <h5>31 декабря</h5>
            <div className="profile_main_left_text_div">
              <p>10:11 Выполнение контетнт-плана</p>
              <a className="green">+2 500₸</a>
            </div>
          </div>
        </div>
        <div className="profile_main_right">
          <p className="profile_title">Баланс</p>
          <div className="profile_balance">
            <p style={{ color: "#EA9127" }}>54 TTK</p>
            <p style={{ color: "#AB16CD" }}>1 200 000</p>
          </div>
          <p className="profile_title">Ваш уровень</p>
          <div className="profile_main_right_text">
            <div className="profile_level">
              <div className="profile_level_rank">
                <div className="profile_level_rank_info">
                  <div className="profile_level_rank_info_img">
                    <p>448 MMR</p>
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
    </div>
  );
};

export default Profile;
