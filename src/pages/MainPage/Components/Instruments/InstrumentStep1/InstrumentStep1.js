import React, { useRef, useState, useEffect } from "react";
import "../Instruments.css";
import { motion } from "framer-motion/dist/framer-motion";
import PhoneInput from "react-phone-input-2";
import InstrumentStep2 from "../InstrumentStep2/InstrumentStep2";

const InstrumentStep1 = ({ ChangeStepState }) => {
  const checkbox = useRef();
  const [useProxy, setUseProxy] = useState(false);

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
            <a href="https://my.telegram.org/auth?to=apps/" target="_blank">
              получить ID и hash
            </a>
          </label>
          <input type="text" name="apiId" />
          <label>API Hash </label>
          <input type="text" name="apiHash" />
          <label>App version </label>
          <input
            type="text"
            name="appVersion"
            placeholder="Telegram iOS, 9.6.3 (25)"
          />
          <label>Device </label>
          <input type="text" name="device" placeholder="iPhone XR" />
          <label>System version </label>
          <input type="text" name="systemVersion" placeholder="iOS, 15.6.1" />
          <label>Язык </label>
          <input type="text" name="langCode" placeholder="ru" />
          <label>Телефон </label>

          <PhoneInput
            country={"ru"}
            disableSearchIcon={false}
            enableSearch={true}
            enableTerritories={true}
          />

          <div className="Instruments_form_checkbox">
            <label>Использовать прокси</label>
            <input
              onChange={() => setUseProxy(checkbox.current.checked)}
              type="checkbox"
              ref={checkbox}
            />
          </div>
          <label style={{ fontSize: "14px" }}>
            рекомендуем использовать прокси для входа{" "}
          </label>
          {useProxy && (
            <span>
              <label>Scheme</label>
              <select className="Instruments_form_selection" name="typeChannel">
                <option value="">Выберите схему</option>
                <option value="Баинг">scheme1</option>
                <option value="Продакшн">scheme2</option>
              </select>
              <label>Host </label>
              <input type="text" name="host" placeholder="185.70.185.101" />
              <label>Port </label>
              <input type="text" name="port" placeholder="61118" />
              <label>User </label>
              <input type="text" name="device" />
              <label>Password </label>
              <input type="password" name="password" />
            </span>
          )}
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              ChangeStepState(
                <InstrumentStep2 ChangeStepState={ChangeStepState} />
              );
            }}
          >
            Запросить код <i class="bi bi-arrow-right-circle-fill"></i>
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default InstrumentStep1;
