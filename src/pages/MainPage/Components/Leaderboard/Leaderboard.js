import React from "react";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import "./Leaderboard.css";
import Leader from "./Leaderboard Assets/Leader_Photo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Leaderboard = () => {
  return (
    <div className="main" id="active">
      {/* <div className="main_header">{<Header />}</div>
      <div className="NavBar">{<NavBar />}</div> */}
      <div className="leader_date">
        <p className="first_date">день </p>
        <p className="second_date">неделя</p>
        <p className="second_date week">2 недели</p>
      </div>
      <div className="leader_page_div">
        <div className="leader_div">
          <div className="leader_left_div">
            <div className="first_leader_number">
              <p>1</p>
            </div>
            <div className="leader_img">
              <img src={Leader} alt="Leader Photo"></img>
            </div>
            <div className="leader_info">
              <div className="leader_info_header">
                <p>AKKOSYBAY</p>
                <p className="leader_info_header_icon">
                  <FontAwesomeIcon icon={faCaretUp} size="xl" />
                  <p>5.84%</p>
                </p>
              </div>
              <div className="leader_info_footer">
                <p>11 867 подписчиков</p>
              </div>
            </div>
          </div>

          <div className="leader_balance">145 депозитов</div>
        </div>
        <div className="leader_div">
          <div className="leader_left_div">
            <div className="second_leader_number">
              <p>2</p>
            </div>
            <div className="leader_img">
              <img src={Leader} alt="Leader Photo"></img>
            </div>
            <div className="leader_info">
              <div className="leader_info_header">
                <p>AKKOSYBAY</p>
                <p className="leader_info_header_icon leader_reduce">
                  <FontAwesomeIcon icon={faCaretDown} size="xl" />
                  <p>2.44%</p>
                </p>
              </div>
              <div className="leader_info_footer">
                <p>11 867 подписчиков</p>
              </div>
            </div>
          </div>

          <div className="leader_balance">251 депозит</div>
        </div>
        <div className="leader_div">
          <div className="leader_left_div">
            <div className="first_leader_number third">
              <p>3</p>
            </div>
            <div className="leader_img">
              <img src={Leader} alt="Leader Photo"></img>
            </div>
            <div className="leader_info">
              <div className="leader_info_header">
                <p>AKKOSYBAY</p>
                <p className="leader_info_header_icon">
                  <FontAwesomeIcon icon={faCaretUp} size="xl" />
                  <p>5.84%</p>
                </p>
              </div>
              <div className="leader_info_footer">
                <p>11 867 подписчиков</p>
              </div>
            </div>
          </div>

          <div className="leader_balance">45 депозитов</div>
        </div>
        <div className="leader_div">
          <div className="leader_left_div">
            <div className="first_leader_number fourth">
              <p>4</p>
            </div>
            <div className="leader_img">
              <img src={Leader} alt="Leader Photo"></img>
            </div>
            <div className="leader_info">
              <div className="leader_info_header">
                <p>AKKOSYBAY</p>
                <p className="leader_info_header_icon">
                  <FontAwesomeIcon icon={faCaretUp} size="xl" />
                  <p>5.84%</p>
                </p>
              </div>
              <div className="leader_info_footer">
                <p>11 867 подписчиков</p>
              </div>
            </div>
          </div>

          <div className="leader_balance">26 депозит</div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
