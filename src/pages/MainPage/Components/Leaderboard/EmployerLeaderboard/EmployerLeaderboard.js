import React, { useState, useEffect } from "react";
import "../Leaderboard.css";
import Leader from "../Leaderboard Assets/Leader_Photo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion/dist/framer-motion";
import { Background } from "devextreme-react/range-selector";
import ProjectPhoto from "../Leaderboard Assets/ProjectPhoto.svg";

const EmployerLeaderboard = () => {
  const [employerLeaderboard, setEmployerLeaderboard] = useState([]);
  const GetEmployerLeaderboard = () => {
    fetch(`https://api1.traffkillas.kz/get_leaderboard`, {
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

        console.log(JSON.parse(result)["data"]);
      });
  };
  const GetEmployerLeaderboardForWeek = () => {
    fetch(`https://api1.traffkillas.kz/get_leaderboard`, {
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

        console.log(JSON.parse(result)["data"]);
      });
  };
  const GetEmployerLeaderboardForTwoWeek = () => {
    fetch(`https://api1.traffkillas.kz/get_leaderboard`, {
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

        console.log(JSON.parse(result)["data"]);
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

  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="leader_date">
        <p
          style={
            statisticsState === "one_day_dep"
              ? {
                  textDecoration: "underline",
                  color: "white",
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
                  color: "white",
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
                  color: "white",
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
      <div className="leader_page_div">
        {employerLeaderboard &&
          employerLeaderboard?.map((element) => {
            const { channel_name, percen, two_week_dep, sub_count } = element;

            return (
              <div className="leader_div">
                <div className="leader_left_div">
                  <div className="first_leader_number">
                    <p>1</p>
                  </div>
                  <div className="leader_img">
                    <img src={Leader} alt="Leader" />
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
                        {percen > 0 && <i class="bi bi-caret-up-fill"></i>}
                        {percen < 0 && <i class="bi bi-caret-down-fill"></i>}
                        {Math.abs(percen)}%
                      </p>
                    </div>
                    <div className="leader_info_footer">
                      <p>{sub_count} подписчиков</p>
                    </div>
                  </div>
                </div>

                <div className="leader_balance">{two_week_dep} депозитов</div>
              </div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default EmployerLeaderboard;
