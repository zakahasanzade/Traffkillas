import React, { useEffect, useState } from "react";
import ProfileImage from "./StatisticsAssets/Profile Img.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-pro-sidebar/dist/css/styles.css";
import { motion } from "framer-motion/dist/framer-motion";
import { CSSTransition } from "react-transition-group";
// import { piggyBank } from "./StatisticsAssets/piggyBank.svg";
import ReverseVector from "./StatisticsAssets/Vector.svg";
import StatisticsGraph from "./StatisticsGraph/StatisticsGraph.js";
import IntervalCalendar from "@knightburton/react-interval-calendar";
import axios from "axios";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import {
  faTicket,
  faClock,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import "./Statistics.css";

const Statistics = ({ position, mode }) => {
  const [graph, setGraph] = useState();

  useEffect(() => {
    const title = document.querySelectorAll(".statistics_title");
    var i;
    for (i = 0; i < title.length; i++) {
      title[i].style.color = mode ? "black" : "white";
    }
  }, [mode]);

  const StatisticsArray = [];
  const [Statistics, setStatistics] = useState();
  const GetStatisticsData = () => {
    fetch("https://api1.traffkillas.kz/get_statistic", {
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
        StatisticsArray[0] = JSON.parse(result)["data"];
        setGraph(new Array(StatisticsArray[0].length).fill(false));
        setStatistics(StatisticsArray[0]);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const ChangeProjectAvatar = (e, index) => {
    e.preventDefault();
    const form = document.querySelector(`.ChangeAvatar_${index}`);
    const formData = new FormData(form);
    formData.append("channel_id", e.target.id);
    axios
      .post(
        "https://api1.traffkillas.kz/add_project_image",
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        GetStatisticsData();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
    form.reset();
  };

  const [StatisticsInfo, SetStatisticsInfo] = useState(false);
  const [RegValue, SetRegValue] = useState();
  const [DepValue, SetDepValue] = useState();
  const EditStatisticsInfo = (e, channel_id, date) => {
    console.log(StatisticsInfo);
    if (StatisticsInfo == false) {
      SetStatisticsInfo(!StatisticsInfo);
    } else if (StatisticsInfo == true) {
      e.preventDefault();
      fetch("https://api1.traffkillas.kz/add_dep_reg", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          date: `${date}.2023`,
          dep: DepValue ? DepValue : 0,
          reg: RegValue ? RegValue : 0,
          channel_id: channel_id,
        }),
      })
        .then((response) => {
          return response.text();
        })
        .then((result) => {
          GetStatisticsData();
          SetStatisticsInfo(!StatisticsInfo);
        });
    }
  };

  useEffect(() => {
    GetStatisticsData();
  }, []);
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
          <i className="bi bi-people-fill"></i> 10 000
        </div>
        <div className="statistics_submenu_div black">
          <FontAwesomeIcon icon={faClock} /> 5 мин
        </div>
        <div className="statistics_submenu_div orange">
          <FontAwesomeIcon icon={faTicket} /> 54
        </div>
        <div className="statistics_submenu_div" style={{ color: "purple" }}>
          500 000₸
        </div>
        <div className="statistics_submenu_div pink">
          <FontAwesomeIcon icon={faPiggyBank} /> 32
        </div>
      </div>
    </div>
  );
  const handleLabelClick = (channel_id) => {
    document.getElementById(channel_id).click();
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
      <div className="statististics_main">
        {position == 3 && <p className="statistics_title">Мои проекты</p>}
        {position != 3 && <p className="statistics_title">Все проекты</p>}
        {Statistics &&
          Statistics.map((el, index) => {
            const {
              all_join,
              all_left,
              all_subscribers,
              date,
              aud_gender,
              channel_id,
              channel_name,
              left_join_stat,
              recent_sub_count,
              sub_count,
              total_posts,
              reg,
              dep,
              all_reply_time,
              all_ticket,
              percen,
              image,
              two_week_dep,
              two_week_reg,
            } = el;
            return (
              <div className="statistics" key={el + index}>
                <div
                  className="statistics_account"
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
                  onClick={(e) => {
                    let IndexElement = index;
                    var res = graph.map((e, i) => {
                      if (i == IndexElement) {
                        return !e;
                      } else {
                        return e;
                      }
                    });
                    setGraph(res);
                  }}
                >
                  <div className="statistics_account_left">
                    <div className="statistics_account_left_img">
                      <img
                        // className="statistics_account_left_img"
                        src={image ? image : ProfileImage}
                        alt="Profile"
                      ></img>
                      {position !== "3" && (
                        <form
                          className={
                            "ChangeAvatar_" + index + " statistics_avata"
                          }
                          // id={channel_id}
                          // onSubmit={(e) => ChangeProjectAvatar(e, index)}
                        >
                          <label
                            htmlFor="file-input"
                            onClick={(e) => {
                              handleLabelClick(channel_id);
                              e.stopPropagation();
                            }}
                          >
                            <i
                              style={{
                                color: "#ea9127",
                                fontSize: "16px",
                                cursor: "pointer",
                              }}
                              className="bi bi-pencil-square"
                            ></i>
                          </label>

                          <input
                            accept="image/*"
                            maxfiles="1"
                            type="file"
                            name="Image"
                            onClick={(e) => e.stopPropagation()}
                            id={channel_id}
                            onChangeCapture={(e) => {
                              ChangeProjectAvatar(e, index);
                            }}
                            style={{ display: "none" }}
                          ></input>
                          {/* <button
                            className="statistics_account_left_button"
                            onClick={(e) => e.stopPropagation()}
                            type="submit"
                          >
                            <i className="bi bi-check-circle-fill"></i>
                          </button> */}
                        </form>
                      )}
                    </div>
                    <div className="statistics_account_info">
                      <div className="statistics_account_info_up">
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
                        >
                          {channel_name}
                        </p>
                        <p
                          className="statistics_up"
                          style={
                            percen < 0
                              ? { backgroundColor: "red" }
                              : { backgroundColor: "#16C784" }
                          }
                        >
                          {percen > 0 && (
                            <i className="bi bi-caret-up-fill"></i>
                          )}
                          {percen < 0 && (
                            <i className="bi bi-caret-down-fill"></i>
                          )}
                          {Math.abs(percen)}%
                        </p>
                      </div>
                      <div className="statistics_account_info_down">
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
                        >
                          {sub_count} подписчиков
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="statistics_submenu statistics_icons">
                    {/* <div className="statistics_submenu_div white">
                      <i className="bi bi-eye-fill"></i> 600
                    </div> */}
                    {/* <div className="statistics_submenu_div orange">
                      <i className="bi bi-ticket-perforated-fill"></i> 54
                    </div> */}
                    <div className="statistics_submenu_div blue">
                      {aud_gender == "male" ? (
                        <i className="bi bi-gender-male"> 54.2%</i>
                      ) : (
                        <i className="bi bi-gender-female"> 54.2%</i>
                      )}
                    </div>
                    {/* <div className="statistics_submenu_div red">1 200 000₸</div> */}
                  </div>
                </div>
                <CSSTransition
                  in={graph[index]}
                  classNames="alert"
                  timeout={300}
                  unmountOnExit
                >
                  <div>
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
                      className="statistics_graph"
                    >
                      <div className="statistics_grapgh_info">
                        <div className="statistics_graph_left">
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
                          >
                            Депозиты
                          </p>
                          <p style={{ color: "purple" }}>190,090.36</p>
                        </div>
                        <div className="statistics_graph_right">
                          <i class="bi bi-arrow-counterclockwise"></i>
                        </div>
                      </div>
                      <div className="statistics_grapg_img">
                        {/* <img src={Graph} alt="Graph"></img> */}
                        <StatisticsGraph />
                      </div>
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
                      className="statistics_general"
                    >
                      <h2>Общая статистика</h2>
                      <p>
                        Количество депозитов:{" "}
                        <span style={{ color: "#C21556" }}>
                          {" "}
                          <i className="bi bi-piggy-bank-fill"></i>{" "}
                          {two_week_dep ? two_week_dep : 0}
                        </span>
                      </p>
                      <p>
                        Обработано тикетов:{" "}
                        <span style={{ color: "#EA9127" }}>
                          {" "}
                          <i className="bi bi-ticket-perforated-fill"></i> 647
                        </span>
                      </p>
                      <p>
                        Количество регистраций:{" "}
                        <span>
                          {" "}
                          <i className="bi bi-people-fill"></i>{" "}
                          {two_week_reg ? two_week_reg : 0}
                        </span>
                      </p>
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
                      className="statistics_hours"
                    >
                      <h2>Дневная/часовая статистика</h2>
                      <div className="statistics_hours_div">
                        {/* DROPDOWN SIDEBAR */}
                        <ProSidebar>
                          <SidebarContent>
                            <Menu>
                              <SubMenu
                                title={
                                  <div className="statistics_submenu ">
                                    <div className="statistics_submenu_div yellow black">
                                      {date}
                                    </div>
                                    <div className="statistics_submenu_div black">
                                      {sub_count}{" "}
                                      <span
                                        className="green"
                                        style={{ fontSize: "16px" }}
                                      >
                                        +{all_join}
                                      </span>
                                      /
                                      <span
                                        className="red"
                                        style={{ fontSize: "16px" }}
                                      >
                                        -{all_left}
                                      </span>
                                    </div>

                                    <div className="statistics_submenu_div black">
                                      <i className="bi bi-clock-fill"></i>{" "}
                                      {all_reply_time} мин
                                    </div>
                                    <div className="statistics_submenu_div orange">
                                      <i className="bi bi-ticket-perforated-fill"></i>{" "}
                                      {all_ticket}
                                    </div>
                                    <div className="statistics_submenu_div black">
                                      <i
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // EditStatisticsReg(e, channel_id, date)
                                          EditStatisticsInfo(
                                            e,
                                            channel_id,
                                            date
                                          );
                                        }}
                                        className="bi bi-people-fill"
                                      ></i>{" "}
                                      {StatisticsInfo ? (
                                        <input
                                          defaultValue={reg}
                                          onChange={(e) => {
                                            e.preventDefault();
                                            SetRegValue(e.target.value);
                                            console.log(RegValue);
                                          }}
                                          className="statistics_submenu_div_editInfo"
                                        />
                                      ) : reg ? (
                                        reg
                                      ) : (
                                        0
                                      )}
                                    </div>
                                    <div className="statistics_submenu_div pink">
                                      <i
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // EditStatisticsReg(e, channel_id, date)
                                          EditStatisticsInfo(
                                            e,
                                            channel_id,
                                            date
                                          );
                                        }}
                                        className="bi bi-piggy-bank-fill"
                                      ></i>{" "}
                                      {StatisticsInfo ? (
                                        <input
                                          defaultValue={dep}
                                          onChange={(e) => {
                                            e.preventDefault();
                                            SetDepValue(e.target.value);
                                          }}
                                          className="statistics_submenu_div_editInfo"
                                        />
                                      ) : dep ? (
                                        dep
                                      ) : (
                                        0
                                      )}
                                    </div>
                                  </div>
                                }
                              >
                                <MenuItem>
                                  {left_join_stat &&
                                    left_join_stat?.map((object, index) => {
                                      const {
                                        join,
                                        left,
                                        ticket,
                                        subscribers,
                                        time,
                                        reply_time,
                                      } = object;
                                      return (
                                        <div
                                          key={object + index}
                                          className="statistics_submenu "
                                        >
                                          <div
                                            className="statistics_submenu_div yellow"
                                            style={{
                                              color: "black",
                                              opacity: "0.5",
                                            }}
                                          >
                                            {time}
                                          </div>
                                          <div className="statistics_submenu_div black">
                                            {subscribers}{" "}
                                            <span
                                              className="green"
                                              style={{ fontSize: "16px" }}
                                            >
                                              +{join}
                                            </span>
                                            /
                                            <span
                                              className="red"
                                              style={{ fontSize: "16px" }}
                                            >
                                              -{left}
                                            </span>
                                          </div>

                                          <div className="statistics_submenu_div black">
                                            <i className="bi bi-clock-fill"></i>{" "}
                                            {reply_time} мин
                                          </div>
                                          <div className="statistics_submenu_div orange">
                                            <i className="bi bi-ticket-perforated-fill"></i>{" "}
                                            {ticket}
                                          </div>
                                          <div className="statistics_submenu_div black">
                                            <i className="bi bi-people-fill"></i>{" "}
                                            0
                                          </div>
                                          <div className="statistics_submenu_div pink">
                                            <i className="bi bi-piggy-bank-fill"></i>{" "}
                                            0
                                          </div>
                                        </div>
                                      );
                                    })}
                                </MenuItem>
                              </SubMenu>
                            </Menu>
                          </SidebarContent>
                        </ProSidebar>
                      </div>
                      <div className="statistics_hours_div">
                        {/* DROPDOWN SIDEBAR */}
                        {/* <ProSidebar>
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
                                        <span
                                          className="red"
                                          style={{ fontSize: "16px" }}
                                        >
                                          -20
                                        </span>
                                      </div>
                                      <div className="statistics_submenu_div orange">
                                        <FontAwesomeIcon icon={faTicket} /> 54
                                      </div>
                                      <div className="statistics_submenu_div black">
                                        <FontAwesomeIcon icon={faClock} /> 5
                                        минут
                                      </div>
                                      <div
                                        className="statistics_submenu_div"
                                        style={{ color: "purple" }}
                                      >
                                        500 000₸
                                      </div>
                                      <div className="statistics_submenu_div pink">
                                        <FontAwesomeIcon icon={faPiggyBank} />{" "}
                                        32
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
                                        <FontAwesomeIcon icon={faClock} /> 5
                                        минут
                                      </div>
                                      <div
                                        className="statistics_submenu_div"
                                        style={{ color: "purple" }}
                                      >
                                        500 000₸
                                      </div>
                                      <div className="statistics_submenu_div pink">
                                        <FontAwesomeIcon icon={faPiggyBank} />{" "}
                                        32
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
                                        <FontAwesomeIcon icon={faClock} /> 5
                                        минут
                                      </div>
                                      <div
                                        className="statistics_submenu_div"
                                        style={{ color: "purple" }}
                                      >
                                        500 000₸
                                      </div>
                                      <div className="statistics_submenu_div pink">
                                        <FontAwesomeIcon icon={faPiggyBank} />{" "}
                                        32
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
                                        <FontAwesomeIcon icon={faClock} /> 5
                                        минут
                                      </div>
                                      <div
                                        className="statistics_submenu_div"
                                        style={{ color: "purple" }}
                                      >
                                        500 000₸
                                      </div>
                                      <div className="statistics_submenu_div pink">
                                        <FontAwesomeIcon icon={faPiggyBank} />{" "}
                                        32
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
                                        <FontAwesomeIcon icon={faClock} /> 5
                                        минут
                                      </div>
                                      <div
                                        className="statistics_submenu_div"
                                        style={{ color: "purple" }}
                                      >
                                        500 000₸
                                      </div>
                                      <div className="statistics_submenu_div pink">
                                        <FontAwesomeIcon icon={faPiggyBank} />{" "}
                                        32
                                      </div>
                                    </div>
                                  </div>
                                </MenuItem>
                              </SubMenu>
                            </Menu>
                          </SidebarContent>
                        </ProSidebar> */}
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              </div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default Statistics;

{
  /* <div className="statistics_account statistics_footer">
  <div className="statistics_account_left">
    <img src={ProfileImage2} alt="Profile 2"></img>
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
    <div className="statistics_submenu_div" style={{ color: "purple" }}>
      1 200 000₸
    </div>
  </div>
</div>; */
}
