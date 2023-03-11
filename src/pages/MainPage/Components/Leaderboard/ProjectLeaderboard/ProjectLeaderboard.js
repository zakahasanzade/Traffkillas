import React from "react";
import "../Leaderboard.css";
import { motion } from "framer-motion/dist/framer-motion";
import ProjectPhoto from "../Leaderboard Assets/ProjectPhoto.svg";
import { useEffect } from "react";
import { useState } from "react";

const ProjectLeaderboard = () => {
  const [projectLeaderboard, setProjectLeaderboard] = useState([]);
  const GetProjectLeaderboard = () => {
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
        setProjectLeaderboard(JSON.parse(result)["data"]);

        console.log(JSON.parse(result)["data"]);
      });
  };
  const GetProjectLeaderboardForWeek = () => {
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
        setProjectLeaderboard(JSON.parse(result)["data"]);

        console.log(JSON.parse(result)["data"]);
      });
  };
  const GetProjectLeaderboardForTwoWeek = () => {
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
  const [employerNumeration, setEmployerNumeration] = useState(1);
  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      {/* <div className="main_header">{<Header />}</div>
      <div className="NavBar">{<NavBar />}</div> */}
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
      {console.log(projectLeaderboard)}
      <div className="leader_page_div">
        {projectLeaderboard &&
          projectLeaderboard?.map((element) => {
            const { image, mmr } = element;
            return (
              <div className="leader_div">
                <div className="leader_left_div">
                  <div className="first_leader_number">
                    <p>{employerNumeration}</p>
                  </div>
                  <div className="leader_img">
                    <img src={image} alt="Leader"></img>
                  </div>
                  <div className="leader_info">
                    <div className="leader_info_header">
                      <p>Name</p>
                    </div>
                  </div>
                </div>

                <div className="leader_balance">{mmr} MMR</div>
              </div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default ProjectLeaderboard;
