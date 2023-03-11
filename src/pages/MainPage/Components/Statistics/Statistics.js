import React, { useEffect, useState } from "react";
import ProfileImage from "./StatisticsAssets/Profile Img.svg";
import ProfileImage2 from "./StatisticsAssets/Profile Img2.svg";
import Graph from "./StatisticsAssets/Statistics Graph.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-pro-sidebar/dist/css/styles.css";
import { motion } from "framer-motion/dist/framer-motion";
import { CSSTransition } from "react-transition-group";
// import { piggyBank } from "./StatisticsAssets/piggyBank.svg";
import ReverseVector from "./StatisticsAssets/Vector.svg";
import StatisticsGraph from "./StatisticsGraph/StatisticsGraph.js";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import {
  faCaretUp,
  faTicket,
  faEye,
  faMars,
  faClock,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import "./Statistics.css";

const Statistics = (props) => {
  const [graph, setGraph] = useState();

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

  // const SubMenuTitle = (
  //   /* DROPDOWN SIDEBAR */

  //   <div>
  //     {Statistics &&
  //       Statistics.map((el, index) => {
  //         const {
  //           all_join,
  //           all_left,
  //           all_subscribers,
  //           aud_gender,
  //           channel_id,
  //           channel_name,
  //           date,
  //           left_join_stat,
  //         } = el;
  //         return (
  //           <>
  //             <div className="statistics_submenu ">
  //               <div className="statistics_submenu_div yellow">{date}</div>
  //               <div className="statistics_submenu_div black">
  //                 {all_subscribers}{" "}
  //                 <span className="green" style={{ fontSize: "16px" }}>
  //                   +{all_join}
  //                 </span>
  //                 /
  //                 <span className="red" style={{ fontSize: "16px" }}>
  //                   -{all_left}
  //                 </span>
  //               </div>

  //               <div className="statistics_submenu_div black">
  //                 <i class="bi bi-people-fill"></i>
  //               </div>
  //               <div className="statistics_submenu_div black">
  //                 <i class="bi bi-clock-fill"></i> 5 мин
  //               </div>
  //               <div className="statistics_submenu_div orange">
  //                 <i class="bi bi-ticket-perforated-fill"></i> 54
  //               </div>
  //               <div className="statistics_submenu_div pink">
  //                 <i class="bi bi-piggy-bank-fill"></i> 32
  //               </div>
  //             </div>
  //           </>
  //         );
  //       })}
  //   </div>
  // );

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
          <i class="bi bi-people-fill"></i> 10 000
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
  const position = props.position;
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
                    <img
                      className="statistics_account_left_img"
                      src={image ? image : ProfileImage}
                      alt="Profile"
                    ></img>
                    <div className="statistics_account_info">
                      <div className="statistics_account_info_up">
                        <p>{channel_name}</p>
                        <p
                          className="statistics_up"
                          style={
                            percen < 0
                              ? { backgroundColor: "red" }
                              : { backgroundColor: "#16C784" }
                          }
                        >
                          {percen > 0 && <i class="bi bi-caret-up-fill"></i>}
                          {percen < 0 && <i class="bi bi-caret-down-fill"></i>}
                          {Math.abs(percen)}%
                        </p>
                      </div>
                      <div className="statistics_account_info_down">
                        <p>{sub_count} подписчиков</p>
                      </div>
                    </div>
                  </div>
                  <div className="statistics_submenu statistics_icons">
                    {/* <div className="statistics_submenu_div white">
                      <i class="bi bi-eye-fill"></i> 600
                    </div> */}
                    {/* <div className="statistics_submenu_div orange">
                      <i class="bi bi-ticket-perforated-fill"></i> 54
                    </div> */}
                    <div className="statistics_submenu_div blue">
                      {aud_gender == "male" ? (
                        <i class="bi bi-gender-male"> 54.2%</i>
                      ) : (
                        <i class="bi bi-gender-female"> 54.2%</i>
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
                    <div className="statistics_graph">
                      <div className="statistics_grapgh_info">
                        <div className="statistics_graph_left">
                          <p>Депозиты</p>
                          <p style={{ color: "purple" }}>190,090.36</p>
                        </div>
                        <div className="statistics_graph_right">
                          <img src={ReverseVector} alt="ReverseVector"></img>
                        </div>
                      </div>
                      <div className="statistics_grapg_img">
                        {/* <img src={Graph} alt="Graph"></img> */}
                        <StatisticsGraph />
                      </div>
                    </div>
                    <div className="statistics_general">
                      <h2>Общая статистика</h2>
                      <p>
                        Количество депозитов:{" "}
                        <span style={{ color: "#C21556" }}>
                          {" "}
                          <i class="bi bi-piggy-bank-fill"></i> {two_week_dep}
                        </span>
                      </p>
                      <p>
                        Обработано тикетов:{" "}
                        <span style={{ color: "#EA9127" }}>
                          {" "}
                          <i class="bi bi-ticket-perforated-fill"></i> 647
                        </span>
                      </p>
                      <p>
                        Количество регистраций:{" "}
                        <span style={{ color: "white" }}>
                          {" "}
                          <i class="bi bi-people-fill"></i> {two_week_reg}
                        </span>
                      </p>
                    </div>
                    <div className="statistics_hours">
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
                                      <i class="bi bi-clock-fill"></i>{" "}
                                      {all_reply_time} мин
                                    </div>
                                    <div className="statistics_submenu_div orange">
                                      <i class="bi bi-ticket-perforated-fill"></i>{" "}
                                      {all_ticket}
                                    </div>
                                    <div className="statistics_submenu_div black">
                                      <i class="bi bi-people-fill"></i>{" "}
                                      {reg ? reg : 0}
                                    </div>
                                    <div className="statistics_submenu_div pink">
                                      <i class="bi bi-piggy-bank-fill"></i>{" "}
                                      {dep ? dep : 0}
                                    </div>
                                  </div>
                                }
                              >
                                <MenuItem>
                                  {left_join_stat &&
                                    left_join_stat?.map((object) => {
                                      const {
                                        join,
                                        left,
                                        ticket,
                                        subscribers,
                                        time,
                                        reply_time,
                                      } = object;
                                      return (
                                        <div className="statistics_submenu ">
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
                                            <i class="bi bi-clock-fill"></i>{" "}
                                            {reply_time} мин
                                          </div>
                                          <div className="statistics_submenu_div orange">
                                            <i class="bi bi-ticket-perforated-fill"></i>{" "}
                                            {ticket}
                                          </div>
                                          <div className="statistics_submenu_div black">
                                            <i class="bi bi-people-fill"></i> 0
                                          </div>
                                          <div className="statistics_submenu_div pink">
                                            <i class="bi bi-piggy-bank-fill"></i>{" "}
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
