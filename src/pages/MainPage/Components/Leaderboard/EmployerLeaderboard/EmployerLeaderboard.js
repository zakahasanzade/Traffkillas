import React, { useState, useEffect } from "react";
import "../Leaderboard.css";
import { motion } from "framer-motion/dist/framer-motion";
import { DateRangePicker } from "react-date-range";
import { CSSTransition } from "react-transition-group";

const EmployerLeaderboard = ({ position, mode }) => {
  const [employerLeaderboard, setEmployerLeaderboard] = useState([]);
  const GetEmployerLeaderboard = () => {
    fetch(`https://api1.traffkillas.kz/get_leaderboard_users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        key: "dep",
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        setEmployerLeaderboard(JSON.parse(result)["data"]);

      });
  };
  const GetEmployerLeaderboardForWeek = () => {
    fetch(`https://api1.traffkillas.kz/get_leaderboard_users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        key: "one_week_dep",
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        setEmployerLeaderboard(JSON.parse(result)["data"]);

      });
  };
  const GetEmployerLeaderboardForTwoWeek = () => {
    fetch(`https://api1.traffkillas.kz/get_leaderboard_users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        key: "two_week_dep",
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        setEmployerLeaderboard(JSON.parse(result)["data"]);

      });
  };
  const [statisticsState, setStatisticsState] = useState("one_day_dep");
  useEffect(() => {
    if (statisticsState === "one_day_dep") {
      GetEmployerLeaderboard();
    } else if (statisticsState === "one_week_dep") {
      GetEmployerLeaderboardForWeek();
    } else if (statisticsState === "two_week_dep") {
      GetEmployerLeaderboardForTwoWeek();
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
  const ChangeFormatDate = (date) => {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  };
  const EditCalendarValue = (channel_id) => {
    fetch(
      `https://api1.traffkillas.kz/get_statistic?from_time=${ChangeFormatDate(
        selectionRange.startDate
      )}&to_time=${ChangeFormatDate(selectionRange.endDate)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        setEmployerLeaderboard(JSON.parse(result)["data"]);
        setTimeInterval(false);
      })
      .catch((err) => {
        alert(err);
      });
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
        {/* <div
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
        </div> */}
        <div className="leader_page_div">
          {employerLeaderboard &&
            employerLeaderboard?.map((element, index) => {
              const { image, mmr, username } = element;
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
                    <div className="leader_balance">{mmr} MMR</div>
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
                      <img src={image} alt="Leader"></img>
                    </div>
                    <div className="leader_info">
                      <div className="leader_info_header">
                        <p>{username}</p>
                      </div>
                    </div>
                  </div>

                  <div className="leader_balance">{mmr} MMR</div>
                </div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
};

export default EmployerLeaderboard;
