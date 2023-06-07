import React, { useEffect, useState } from "react";
import ProfileImage from "../StatisticsAssets/Profile Img.svg";
import { DateRangePicker } from "react-date-range";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-pro-sidebar/dist/css/styles.css";
import { motion } from "framer-motion/dist/framer-motion";
import { CSSTransition } from "react-transition-group";
import ReverseVector from "../StatisticsAssets/Vector.svg";
import StatisticsGraph from "../StatisticsGraph/StatisticsGraph";
import IntervalCalendar from "@knightburton/react-interval-calendar";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Switch from "@mui/material/Switch";
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
import "../Statistics.css";

const StatisticsBuyer = ({ position, mode }) => {
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
  const [filerStatistics, setFilterStatistics] = useState(Statistics);
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
        setStatistics(JSON.parse(result)["data"]);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    setFilterStatistics(Statistics);
  }, [Statistics]);

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
        GetStatisticsData();
      })
      .catch((error) => {
        console.log(error);
      });
    form.reset();
  };

  const [StatisticsInfo, SetStatisticsInfo] = useState(false);
  // const [RegValue, SetRegValue] = useState();
  // const [DepValue, SetDepValue] = useState();
  // const [DateValue, SetDateValue] = useState();
  const [signalGraph, setSignalGraph] = useState(false);
  const EditStatisticsInfo = (e, channel_id, dateTime, reg, dep) => {
    let RegValue = null;
    let DepValue = null;
    let DateValue = null;
    filerStatistics.map((el, index) => {
      if (el.channel_id === channel_id) {
        RegValue = el.stat.map((element) => {
          return element.reg;
        });
        DepValue = el.stat.map((element) => {
          return element.dep;
        });
        DateValue = el.stat.map((element) => {
          return element.date;
        });
      }
    });
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
          date: DateValue,
          dep: DepValue,
          reg: RegValue,
          channel_id: channel_id,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            filerStatistics.map((el) => {
              if (el.channel_id === channel_id) {
                var SumDep = null;
                var SumReg = null;
                var SumTick = null;
                el.stat.map((el) => {
                  SumReg += Number(el.reg);
                  SumDep += Number(el.dep);
                  SumTick += Number(el.ticket);
                  SetStatisticsInfo(!StatisticsInfo);
                });
                el.weekly_reg = SumReg;
                el.weekly_dep = SumDep;
                el.weekly_ticket = SumTick;
              }
            });
          }
          return response.text();
        })
        .then((result) => {
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
              let res = JSON.parse(result)["data"];
              res.map((el) => {
                if (el.channel_id === channel_id) {
                  let DepGraph = el.dep_chart;
                  let RegGraph = el.reg_chart;
                  filerStatistics.map((element) => {
                    if (element.channel_id === channel_id) {
                      element.dep_chart = DepGraph;
                      element.reg_chart = RegGraph;
                    }
                  });
                }
                setSignalGraph(!signalGraph);
              });
            });
        });
    }
  };
  const [timeInterval, setTimeInterval] = useState();
  useEffect(() => {
    GetStatisticsData();
  }, []);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  let from_time = null;
  let to_time = null;
  const formatStartDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    from_time = [day, month, year].join(".");
  };
  const formatEndDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    to_time = [day, month, year].join(".");
  };

  const handleSelect = (ranges) => {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
    setSelectionRange(ranges.selection);
    console.log(selectionRange.startDate);
    console.log(selectionRange.endDate);
  };
  const EditCalendar = (channel_id) => {
    formatStartDate(selectionRange.startDate);
    formatEndDate(selectionRange.endDate);
    EditCalendarValue(channel_id);
  };
  const EditCalendarValue = (channel_id) => {
    fetch(
      `https://api1.traffkillas.kz/get_statistic?from_time=${from_time}&to_time=${to_time}&channel_id=${channel_id}`,
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
        var SumDep = null;
        var SumReg = null;
        var SumTick = null;
        let channelId = JSON.parse(result)["data"][0].channel_id;
        let channelStat = JSON.parse(result)["data"][0].stat;
        channelStat.map((el) => {
          SumReg += el.reg;
          SumDep += el.dep;
          SumTick += el.ticket;
        });
        Statistics.map((el) => {
          if (el.channel_id == channelId) {
            el.stat = JSON.parse(result)["data"][0].stat;
            console.log(el);
            el.weekly_reg = SumReg;
            el.weekly_dep = SumDep;
            el.weekly_ticket = SumTick;
          }
        });
        console.log(JSON.parse(result)["data"][0].stat);

        console.log(SumReg);
        // StatisticsArray[0] = JSON.parse(result)["data"];
        // setGraph(new Array(StatisticsArray[0].length).fill(false));
        // setStatistics(StatisticsArray[0]);
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

  const handleLabelClick = (channel_id) => {
    document.getElementById(channel_id).click();
  };
  const [statisticsState, setStatisticsState] = useState("All");
  useEffect(() => {
    if (statisticsState === "All") {
      setFilterStatistics(Statistics);
    } else if (statisticsState === "Active") {
      setFilterStatistics(Statistics?.filter((item) => item.active === true));
    } else if (statisticsState === "Passive") {
      setFilterStatistics(Statistics?.filter((item) => item.active === false));
    }
  }, [statisticsState]);
  const setChecked = (channel_id, e) => {
    e.preventDefault();
    fetch("https://api1.traffkillas.kz/change_active", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        channel_id: channel_id,
        active: e.target.checked,
      }),
    })
      .then((response) => {
        response.status === 200 &&
          setFilterStatistics(
            filerStatistics.map((el) => {
              if (el.channel_id === channel_id) {
                el.active = !el.active;
              }
              return el;
            })
          );
        // GetStatisticsData();
        return response.text();
      })
      .then((result) => {});
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
        <div className={mode ? "leader_date lightColor" : "leader_date"}>
          <p
            style={
              statisticsState === "All"
                ? {
                    textDecoration: "underline",
                    opacity: "0.7",
                    cursor: "pointer",
                  }
                : { opacity: "0.3", cursor: "pointer" }
            }
            className="first_date"
            onClick={() => {
              setStatisticsState("All");
            }}
          >
            Все{" "}
          </p>
          <p
            style={
              statisticsState === "Active"
                ? {
                    textDecoration: "underline",
                    opacity: "0.7",
                    cursor: "pointer",
                  }
                : { opacity: "0.3", cursor: "pointer" }
            }
            onClick={() => {
              setStatisticsState("Active");
            }}
          >
            Активы
          </p>
          <p
            style={
              statisticsState === "Passive"
                ? {
                    textDecoration: "underline",
                    opacity: "0.7",
                    cursor: "pointer",
                  }
                : { opacity: "0.3", cursor: "pointer" }
            }
            onClick={() => {
              setStatisticsState("Passive");
            }}
          >
            Пассивы
          </p>
        </div>
        {position == 3 && <p className="statistics_title">Мои проекты</p>}
        {position != 3 && <p className="statistics_title">Все проекты</p>}
      
      </div>
    </motion.div>
  );
};

export default StatisticsBuyer;
