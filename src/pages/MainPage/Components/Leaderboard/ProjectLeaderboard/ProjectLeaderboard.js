import React from "react";
import "../Leaderboard.css";
import { motion } from "framer-motion/dist/framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import Leader from "../Leaderboard Assets/Leader_Photo.svg";
import { DateRangePicker } from "react-date-range";
import { CSSTransition } from "react-transition-group";

const ProjectLeaderboard = ({ position, mode }) => {
  const [projectLeaderboard, setProjectLeaderboard] = useState([]);
  const GetProjectLeaderboard = () => {
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
        setProjectLeaderboard(JSON.parse(result)["data"]);

        console.log(JSON.parse(result)["data"]);
      });
  };
  const GetProjectLeaderboardForWeek = () => {
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
        setProjectLeaderboard(JSON.parse(result)["data"]);

        console.log(JSON.parse(result)["data"]);
      });
  };
  const GetProjectLeaderboardForTwoWeek = () => {
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
        setProjectLeaderboard(JSON.parse(result)["data"]);

        console.log(JSON.parse(result)["data"]);
      });
  };
  const [statisticsState, setStatisticsState] = useState("one_day_dep");
  useEffect(() => {
    if (statisticsState === "one_day_dep") {
      GetProjectLeaderboard();
    } else if (statisticsState === "one_week_dep") {
      GetProjectLeaderboardForWeek();
    } else if (statisticsState === "two_week_dep") {
      GetProjectLeaderboardForTwoWeek();
    }
  }, [statisticsState]);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };
  const [timeInterval, setTimeInterval] = useState(false);
  const EditCalendar = () => {
    EditCalendarValue();
  };
  const EditCalendarValue = (channel_id) => {
    // fetch(
    //   `https://api1.traffkillas.kz/get_statistic?from_time=${from_time}&to_time=${to_time}&channel_id=${channel_id}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       token: localStorage.getItem("token"),
    //     },
    //   }
    // )
    //   .then((response) => {
    //     return response.text();
    //   })
    //   .then((result) => {
    //     let channelId = JSON.parse(result)["data"][0].channel_id;
    //     Statistics.map((el) => {
    //       if (el.channel_id == channelId) {
    //         el.stat = JSON.parse(result)["data"][0].stat;
    //       }
    //     });
    //     console.log(JSON.parse(result)["data"][0].stat);
    //     setTimeInterval(false);
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
    console.log("Will be soon");
  };
  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.srcElement.className !== "statistics_submenu_calendar") {
        setTimeInterval(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
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
      <div className="leaderboard_main">
        <div className={mode ? "leader_date lightColor" : "leader_date"}>
          <p
            style={
              statisticsState === "one_day_dep"
                ? {
                    textDecoration: "underline",
                    opacity: "0.7",
                    cursor: "pointer",
                  }
                : { opacity: "0.3", cursor: "pointer" }
            }
            className="first_date"
            onClick={() => {
              setStatisticsState("one_day_dep");
            }}
          >
            день{" "}
          </p>
          <p
            style={
              statisticsState === "one_week_dep"
                ? {
                    textDecoration: "underline",
                    opacity: "0.7",
                    cursor: "pointer",
                  }
                : { opacity: "0.3", cursor: "pointer" }
            }
            onClick={() => {
              setStatisticsState("one_week_dep");
            }}
          >
            неделя
          </p>
          <p
            style={
              statisticsState === "two_week_dep"
                ? {
                    textDecoration: "underline",
                    opacity: "0.7",
                    cursor: "pointer",
                  }
                : { opacity: "0.3", cursor: "pointer" }
            }
            onClick={() => {
              setStatisticsState("two_week_dep");
            }}
          >
            2 недели
          </p>
        </div>
        <div
          className={
            mode
              ? "Liderboardchannel_calendar lightColor"
              : "Liderboardchannel_calendar"
          }
          onClick={(e) => {
            setTimeInterval(!timeInterval);
            e.stopPropagation();
          }}
        >
          Показать по календарю
          <CSSTransition
            in={timeInterval}
            classNames="alert"
            timeout={300}
            unmountOnExit
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="liderboard_submenu_calendar"
            >
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
              />
              <div
                className="EditCalendarButton"
                onClick={(e) => EditCalendar()}
              >
                Submit
              </div>
            </div>
          </CSSTransition>
        </div>

        <div className="leader_page_div">
          {projectLeaderboard &&
            projectLeaderboard?.map((element, index) => {
              const { channel_name, percen, weekly_dep, subs, image } = element;

              return (
                <div className={mode ? "leader_div light" : "leader_div"}>
                  <div className="responsive_statistics">
                    <div
                      style={{
                        backgroundColor:
                          index === 0
                            ? "gold"
                            : index === 1
                            ? "#CCCCCC"
                            : index === 2
                            ? "#EA9127"
                            : "none",
                        color:
                          index === 0
                            ? "black"
                            : index === 1
                            ? "black"
                            : index === 2
                            ? "black"
                            : "none",
                        border: mode ? "1px solid black" : "1px solid white",
                      }}
                      className="first_leader_number"
                    >
                      <p>{index + 1}</p>
                    </div>
                    <div className="leader_balance">
                      {weekly_dep ? weekly_dep : 0} депозитов
                    </div>
                  </div>
                  <div className="leader_left_div">
                    <div
                      style={{
                        backgroundColor:
                          index === 0
                            ? "gold"
                            : index === 1
                            ? "#CCCCCC"
                            : index === 2
                            ? "#EA9127"
                            : "none",
                        color:
                          index === 0
                            ? "black"
                            : index === 1
                            ? "black"
                            : index === 2
                            ? "black"
                            : "none",
                      }}
                      className="first_leader_number"
                    >
                      <p>{index + 1}</p>
                    </div>
                    <div className="leader_img">
                      <img src={image ? image : Leader} alt="Leader" />
                    </div>
                    <div className="leader_info">
                      <div className="leader_info_header">
                        <p>{channel_name}</p>
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
                      <div className="leader_info_footer">
                        <p>{subs} подписчиков</p>
                      </div>
                    </div>
                  </div>

                  <div className="leader_balance">
                    {weekly_dep ? weekly_dep : 0} депозитов
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectLeaderboard;
