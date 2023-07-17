import React, { useState } from "react";

import "../Instruments.css";
import { motion } from "framer-motion/dist/framer-motion";
import PhoneInput from "react-phone-input-2";
import InstrumentStep2 from "../InstrumentStep2/InstrumentStep2";
import { useNavigate } from "react-router-dom";
import { submitCodeRequest } from "../InstrumentsRequest";
import { getChannels } from "../InstrumentsRequest";

const InstrumentStep3 = ({ ChangeStepState2, UserPhoneRes }) => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [codeSent, setCodeSent] = useState(false);
  async function getChannelsOfProject(e) {
    if (e !== "") {
      const channels = await getChannels(e);
      setChannels(channels);
    } else {
      setChannels("");
    }
  }

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
        <p>Шаг 3</p>
        <form id="InstrumentForm" className="Instruments_form">
          <label>Тип канала</label>
          <select
            onChange={(e) => getChannelsOfProject(e.target.value)}
            className="Instruments_form_selection"
          >
            <option value="">Выберите тип канала</option>
            <option value="баинг">баинг</option>
            <option value="инфлюенс">инфлюенс</option>
            <option value="баинг астана">баинг астана</option>
          </select>
          <label>
            Канал{" "}
            <span
              target="_blank"
              onClick={() =>
                navigator.clipboard.writeText("Copy this text to clipboard")
              }
            >
              скопировать ID в буфер
            </span>
          </label>
          <select
            className="Instruments_form_selection"
            id="Instruments_form_channel"
          >
            <option value="">Выберите канал</option>
            {channels?.map((el) => {
              const { channelType, name, channelId } = el;
              return <option value={channelId}>{name}</option>;
            })}
          </select>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setCodeSent(true);
              submitCodeRequest(UserPhoneRes);
            }}
          >
            Подтвердить выбор канала{" "}
            <i class="bi bi-arrow-right-circle-fill"></i>
          </button>
        </form>
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
