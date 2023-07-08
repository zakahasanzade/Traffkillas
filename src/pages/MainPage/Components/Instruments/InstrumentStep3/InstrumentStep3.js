import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Instruments.css";
import { motion } from "framer-motion/dist/framer-motion";
import PhoneInput from "react-phone-input-2";
import InstrumentStep2 from "../InstrumentStep2/InstrumentStep2";

const InstrumentStep3 = ({ ChangeStepState2 }) => {
  const navigate = useNavigate();
  const [codeSent, setCodeSent] = useState(false);
  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="Instruments_general_lastStep">
        <div className="Instruments_general">
          <p>Шаг 3</p>
          <form className="Instruments_form">
            <label>Код</label>
            <input type="text" name="apiHash" />
            <label>Пароль </label>
            <input
              type="text"
              name="appVersion"
              placeholder="не заполнять если нет"
            />

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setCodeSent(true);
              }}
            >
              Отправить код <i class="bi bi-check-circle-fill"></i>
            </button>
          </form>
        </div>
        {codeSent && (
          <div className="Instruments_general">
            <p>Успешно!</p>
            <span>
              Обработчик добавлен и настроен.
              <br /> Вы можете обновить страницу для добавления нового.
            </span>
            <form className="Instruments_form">
              <button
                type="submit"
                onClick={() => navigate("/MainPage/Instruments")}
              >
                Обновить страницу <i class="bi bi-arrow-counterclockwise"></i>
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default InstrumentStep3;
