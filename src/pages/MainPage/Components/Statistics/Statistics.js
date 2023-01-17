import React, { useState } from "react";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import ProfileImage from "./Statistics Assets/Profile Img.svg";
import ProfileImage2 from "./Statistics Assets/Profile Img2.svg";
import Graph from "./Statistics Assets/Statistics Graph.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "react-pro-sidebar/dist/css/styles.css";
import { CSSTransition } from "react-transition-group";

import { piggyBank } from "./Statistics Assets/piggyBank.svg";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import {
  faCaretUp,
  faTicket,
  faEye,
  faMars,
  faRotateLeft,
  faClock,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import "./Statistics.css";
import { from } from "form-data";

const SubMenuTitle = (
  /* DROPDOWN SIDEBAR */
  <div className="statistics_submenu">
    <div className="statistics_submenu">
      <div className="statistics_submenu_div blue">11.12</div>
      <div className="statistics_submenu_div black">
        11 287{" "}
        <span className="green" style={{ fontSize: "16px" }}>
          +46
        </span>
      </div>
      <div className="statistics_submenu_div black">
        <FontAwesomeIcon icon={faEye} /> 47
      </div>
      <div className="statistics_submenu_div orange">
        <FontAwesomeIcon icon={faTicket} /> 54
      </div>
      <div className="statistics_submenu_div black">
        <FontAwesomeIcon icon={faClock} /> 5 минут
      </div>
      <div className="statistics_submenu_div red">500 000₸</div>
      <div className="statistics_submenu_div pink">
        <FontAwesomeIcon icon={faPiggyBank} /> 32
      </div>
    </div>
  </div>
);

// const [show1, setShow1] = useState(false);
// const [graph, setGraph] = useState(false);

const Statistics = () => {
  const SubMenuSecondTitle = (
    <div className="statistics_submenu">
      <div className="statistics_submenu">
        <div className="statistics_submenu_div blue">11.12</div>
        <div className="statistics_submenu_div black">
          25 009 000{" "}
          <span className="green" style={{ fontSize: "16px" }}>
            +46
          </span>
        </div>
        <div className="statistics_submenu_div black">
          <FontAwesomeIcon icon={faEye} /> 47
        </div>
        <div className="statistics_submenu_div orange">
          <FontAwesomeIcon icon={faTicket} /> 54
        </div>
        <div className="statistics_submenu_div black">
          <FontAwesomeIcon icon={faClock} /> 5 минут
        </div>
        <div className="statistics_submenu_div red">500 000₸</div>
        <div className="statistics_submenu_div pink">
          <FontAwesomeIcon icon={faPiggyBank} /> 32
        </div>
      </div>
    </div>
  );

  return (
    <div className="main" id="active">
      {/* <div className="main_header">{<Header />}</div>
      <div className="NavBar">{<NavBar />}</div> */}
      <div className="statistics">
        <p className="profile_title">Мои проекты</p>
        <div
          className="statistics_account"
          //  onClick={() => setGraph(!graph)}
        >
          <div className="statistics_account_left">
            <img src={ProfileImage} alt="Profile Image"></img>
            <div className="statistics_account_info">
              <div className="statistics_account_info_up">
                <p>AKOSYBAY</p>
                <p className="statistics_up">
                  <FontAwesomeIcon icon={faCaretUp} size="xl" />
                  5.84%
                </p>
              </div>
              <div className="statistics_account_info_down">
                <p>11 867 подписчиков</p>
              </div>
            </div>
          </div>
          <div className="statistics_submenu statistics_icons">
            <div className="statistics_submenu_div white">
              <FontAwesomeIcon icon={faEye} /> 600
            </div>
            <div className="statistics_submenu_div orange">
              <FontAwesomeIcon icon={faTicket} /> 54
            </div>
            <div className="statistics_submenu_div blue">
              <FontAwesomeIcon icon={faMars} /> 54.2%
            </div>
            <div className="statistics_submenu_div red">1 200 000₸</div>
          </div>
        </div>

        {/* <CSSTransition
          in={graph}
          classNames="alert"
          timeout={300}
          unmountOnExit
        > */}
        <div className="statistics_graph">
          <div className="statistics_grapgh_info">
            <div className="statistics_graph_left">
              <p>Выручка</p>
              <p>190,090.36₸</p>
            </div>
            <div className="statistics_graph_right">
              {/* <FontAwesomeIcon icon={piggyBank} /> */}
              <img src={piggyBank}></img>
            </div>
          </div>
          <div className="statistics_grapg_img">
            <img src={Graph}></img>
          </div>
        </div>
        {/* </CSSTransition> */}
        <div className="statistics_general">
          <h2>Общая статистика</h2>
          <p>
            Сумма депозитов: <span className="red">13 200 000₸</span>
          </p>
          <p>Обработано тикетов: 2150</p>
          <p>Суммарное кол-во просмотров: 546 340</p>
          <p>Количество публикаций: 1567</p>
        </div>
        <div className="statistics_hours">
          <h2>Дневная/часовая статистика</h2>
          <div className="statistics_hours_div">
            {/* DROPDOWN SIDEBAR */}
            <ProSidebar>
              <SidebarContent>
                <Menu>
                  <SubMenu title={SubMenuTitle}>
                    <MenuItem>
                      <div className="statistics_submenu">
                        <div className="statistics_submenu">
                          <div className="statistics_submenu_div yellow">
                            23:00
                          </div>
                          <div className="statistics_submenu_div black">
                            806{" "}
                            <span className="red" style={{ fontSize: "16px" }}>
                              -20
                            </span>
                          </div>
                          <div className="statistics_submenu_div orange">
                            <FontAwesomeIcon icon={faTicket} /> 54
                          </div>
                          <div className="statistics_submenu_div black">
                            <FontAwesomeIcon icon={faClock} /> 5 минут
                          </div>
                          <div className="statistics_submenu_div red">
                            500 000₸
                          </div>
                          <div className="statistics_submenu_div pink">
                            <FontAwesomeIcon icon={faPiggyBank} /> 32
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="statistics_s`ubmenu">
                        <div className="statistics_submenu">
                          <div className="statistics_submenu_div yellow">
                            22:00
                          </div>
                          <div className="statistics_submenu_div black">
                            806{" "}
                            <span
                              className="green"
                              style={{ fontSize: "16px" }}
                            >
                              +46
                            </span>
                          </div>
                          <div className="statistics_submenu_div orange">
                            <FontAwesomeIcon icon={faTicket} /> 54
                          </div>
                          <div className="statistics_submenu_div black">
                            <FontAwesomeIcon icon={faClock} /> 5 минут
                          </div>
                          <div className="statistics_submenu_div red">
                            500 000₸
                          </div>
                          <div className="statistics_submenu_div pink">
                            <FontAwesomeIcon icon={faPiggyBank} /> 32
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="statistics_submenu">
                        <div className="statistics_submenu">
                          <div className="statistics_submenu_div yellow">
                            21:00
                          </div>
                          <div className="statistics_submenu_div black">
                            806{" "}
                            <span
                              className="green"
                              style={{ fontSize: "16px" }}
                            >
                              +46
                            </span>
                          </div>
                          <div className="statistics_submenu_div orange">
                            <FontAwesomeIcon icon={faTicket} /> 54
                          </div>
                          <div className="statistics_submenu_div black">
                            <FontAwesomeIcon icon={faClock} /> 5 минут
                          </div>
                          <div className="statistics_submenu_div red">
                            500 000₸
                          </div>
                          <div className="statistics_submenu_div pink">
                            <FontAwesomeIcon icon={faPiggyBank} /> 32
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="statistics_submenu">
                        <div className="statistics_submenu">
                          <div className="statistics_submenu_div yellow">
                            20:00
                          </div>
                          <div className="statistics_submenu_div black">
                            806{" "}
                            <span
                              className="green"
                              style={{ fontSize: "16px" }}
                            >
                              +46
                            </span>
                          </div>
                          <div className="statistics_submenu_div orange">
                            <FontAwesomeIcon icon={faTicket} /> 54
                          </div>
                          <div className="statistics_submenu_div black">
                            <FontAwesomeIcon icon={faClock} /> 5 минут
                          </div>
                          <div className="statistics_submenu_div red">
                            500 000₸
                          </div>
                          <div className="statistics_submenu_div pink">
                            <FontAwesomeIcon icon={faPiggyBank} /> 32
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="statistics_submenu">
                        <div className="statistics_submenu">
                          <div className="statistics_submenu_div yellow">
                            00:00
                          </div>
                          <div className="statistics_submenu_div black">
                            806{" "}
                            <span
                              className="green"
                              style={{ fontSize: "16px" }}
                            >
                              {" "}
                              +46
                            </span>
                          </div>
                          <div className="statistics_submenu_div orange">
                            <FontAwesomeIcon icon={faTicket} /> 54
                          </div>
                          <div className="statistics_submenu_div black">
                            <FontAwesomeIcon icon={faClock} /> 5 минут
                          </div>
                          <div className="statistics_submenu_div red">
                            500 000₸
                          </div>
                          <div className="statistics_submenu_div pink">
                            <FontAwesomeIcon icon={faPiggyBank} /> 32
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                  </SubMenu>
                </Menu>
              </SidebarContent>
            </ProSidebar>
          </div>
          <div className="statistics_hours_div">
            {/* DROPDOWN SIDEBAR */}
            <ProSidebar>
              <SidebarContent>
                <Menu>
                  <SubMenu title={SubMenuSecondTitle}>
                    <MenuItem>
                      <div className="statistics_submenu">
                        <div className="statistics_submenu">
                          <div className="statistics_submenu_div yellow">
                            23:00
                          </div>
                          <div className="statistics_submenu_div black">
                            806{" "}
                            <span className="red" style={{ fontSize: "16px" }}>
                              -20
                            </span>
                          </div>
                          <div className="statistics_submenu_div orange">
                            <FontAwesomeIcon icon={faTicket} /> 54
                          </div>
                          <div className="statistics_submenu_div black">
                            <FontAwesomeIcon icon={faClock} /> 5 минут
                          </div>
                          <div className="statistics_submenu_div red">
                            500 000₸
                          </div>
                          <div className="statistics_submenu_div pink">
                            <FontAwesomeIcon icon={faPiggyBank} /> 32
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="statistics_submenu">
                        <div className="statistics_submenu">
                          <div className="statistics_submenu_div yellow">
                            22:00
                          </div>
                          <div className="statistics_submenu_div black">
                            806{" "}
                            <span
                              className="green"
                              style={{ fontSize: "16px" }}
                            >
                              +46
                            </span>
                          </div>
                          <div className="statistics_submenu_div orange">
                            <FontAwesomeIcon icon={faTicket} /> 54
                          </div>
                          <div className="statistics_submenu_div black">
                            <FontAwesomeIcon icon={faClock} /> 5 минут
                          </div>
                          <div className="statistics_submenu_div red">
                            500 000₸
                          </div>
                          <div className="statistics_submenu_div pink">
                            <FontAwesomeIcon icon={faPiggyBank} /> 32
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="statistics_submenu">
                        <div className="statistics_submenu">
                          <div className="statistics_submenu_div yellow">
                            21:00
                          </div>
                          <div className="statistics_submenu_div black">
                            806{" "}
                            <span
                              className="green"
                              style={{ fontSize: "16px" }}
                            >
                              +46
                            </span>
                          </div>
                          <div className="statistics_submenu_div orange">
                            <FontAwesomeIcon icon={faTicket} /> 54
                          </div>
                          <div className="statistics_submenu_div black">
                            <FontAwesomeIcon icon={faClock} /> 5 минут
                          </div>
                          <div className="statistics_submenu_div red">
                            500 000₸
                          </div>
                          <div className="statistics_submenu_div pink">
                            <FontAwesomeIcon icon={faPiggyBank} /> 32
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="statistics_submenu">
                        <div className="statistics_submenu">
                          <div className="statistics_submenu_div yellow">
                            20:00
                          </div>
                          <div className="statistics_submenu_div black">
                            806{" "}
                            <span
                              className="green"
                              style={{ fontSize: "16px" }}
                            >
                              +46
                            </span>
                          </div>
                          <div className="statistics_submenu_div orange">
                            <FontAwesomeIcon icon={faTicket} /> 54
                          </div>
                          <div className="statistics_submenu_div black">
                            <FontAwesomeIcon icon={faClock} /> 5 минут
                          </div>
                          <div className="statistics_submenu_div red">
                            500 000₸
                          </div>
                          <div className="statistics_submenu_div pink">
                            <FontAwesomeIcon icon={faPiggyBank} /> 32
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="statistics_submenu">
                        <div className="statistics_submenu">
                          <div className="statistics_submenu_div yellow">
                            00:00
                          </div>
                          <div className="statistics_submenu_div black">
                            806{" "}
                            <span
                              className="green"
                              style={{ fontSize: "16px" }}
                            >
                              {" "}
                              +46
                            </span>
                          </div>
                          <div className="statistics_submenu_div orange">
                            <FontAwesomeIcon icon={faTicket} /> 54
                          </div>
                          <div className="statistics_submenu_div black">
                            <FontAwesomeIcon icon={faClock} /> 5 минут
                          </div>
                          <div className="statistics_submenu_div red">
                            500 000₸
                          </div>
                          <div className="statistics_submenu_div pink">
                            <FontAwesomeIcon icon={faPiggyBank} /> 32
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                  </SubMenu>
                </Menu>
              </SidebarContent>
            </ProSidebar>
          </div>
        </div>
        <p className="profile_title">Все проекты</p>
        <div className="statistics_account statistics_footer">
          <div className="statistics_account_left">
            <img src={ProfileImage2} alt="Profile Image 2"></img>
            <div className="statistics_account_info">
              <div className="statistics_account_info_up">
                <p>MYRAVEL...</p>
                <p className="statistics_up">
                  <FontAwesomeIcon icon={faCaretUp} size="xl" />
                  228.84%
                </p>
              </div>
              <div className="statistics_account_info_down">
                <p>10 000 000 подписчиков</p>
              </div>
            </div>
          </div>
          <div className="statistics_submenu">
            <div className="statistics_submenu_div white">
              <FontAwesomeIcon icon={faEye} /> 600
            </div>
            <div className="statistics_submenu_div orange">
              <FontAwesomeIcon icon={faTicket} /> 54
            </div>
            <div className="statistics_submenu_div blue">
              <FontAwesomeIcon icon={faMars} /> 54.2%
            </div>
            <div className="statistics_submenu_div red">1 200 000₸</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
