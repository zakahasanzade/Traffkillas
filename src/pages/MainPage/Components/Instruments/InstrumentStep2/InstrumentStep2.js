import React, { useEffect, useState } from "react";
import "../Instruments.css";
import { motion } from "framer-motion/dist/framer-motion";
import InstrumentStep3 from "../InstrumentStep3/InstrumentStep3";
import { submitCodeRequest } from "../InstrumentsRequest";
import { getChannels } from "../InstrumentsRequest";

const InstrumentStep2 = ({ ChangeStepState }) => {
  // useEffect(() => {
  //   getChannels();
  // }, []);
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState();
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
        <p>Шаг 2</p>
        <form id="InstrumentForm" className="Instruments_form">
          <label>Тип канала</label>
          <select
            onChange={(e) => getChannelsOfProject(e.target.value)}
            className="Instruments_form_selection"
            name="channelType"
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
              return <option value={name + ":;:;" + channelId}>{name}</option>;
            })}
          </select>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              submitCodeRequest(selectedChannel);
              ChangeStepState(<InstrumentStep3 />);
            }}
          >
            Подтвердить выбор канала{" "}
            <i class="bi bi-arrow-right-circle-fill"></i>
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default InstrumentStep2;
