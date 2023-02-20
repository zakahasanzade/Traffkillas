import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 150,
    color: "#FFFFFF",
  },
  inputLabel: {
    color: "white",
    fontSize: "16px",
  },
  indeterminateColor: {
    color: "#f50057",
  },
  selectAllText: {
    fontWeight: 500,
  },
  listItemIcon: {
    color: "white",
  },
  menuItem: {
    fontSize: "2px",
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
}));

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      borderRadius: "25px",
      marginTop:"10px"
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

let WorkersData = null;
let options = [];
const App = () => {
  fetch("http://94.103.90.6:5000/get_workers", {
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
      // SetWorkers(JSON.parse(result)["data"]);
      WorkersData = JSON.parse(result)["data"];
      WorkersData.map((block) => {
        options.push(block);
      });
    })
    .catch((err) => {
      alert(err);
    });
};

export { useStyles, MenuProps, options, App };
