import React from "react";
import "./Instruments.css";
import { motion } from "framer-motion/dist/framer-motion";
import { CheckBox } from "@mui/icons-material";

const Instruments = () => {
  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="Instruments_general">
        <p>Шаг 1</p>
        <form className="Instruments_form">
          <label>
            API ID{" "}
            <small onClick={() => alert("Отстань я еще не готов")}>
              получить ID и hash
            </small>
          </label>
          <input type="text" name="name" />
          <label>API Hash </label>
          <input type="text" name="name" />
          <label>App version </label>
          <input
            type="text"
            name="name"
            placeholder="Telegram iOS, 9.6.3 (25)"
          />
          <label>Device </label>
          <input type="text" name="name" placeholder="iPhone XR" />
          <label>System version </label>
          <input type="text" name="name" placeholder="iOS, 15.6.1" />
          <label>Язык </label>
          <input type="text" name="name" placeholder="ru" />
          <label>Телефон </label>
          <input type="text" name="name" placeholder="+7 (800) 555-35-35" />
          <div className="Instruments_form_checkbox">
            <label>Использовать прокси</label>
            <input type="checkbox" />
          </div>
          <label style={{ fontSize: "14px" }}>
            рекомендуем использовать прокси для входа{" "}
          </label>
          <button type="submit" onClick={() => alert("Отстань я еще не готов")}>
            Запросить код <i class="bi bi-arrow-right-circle-fill"></i>
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Instruments;
