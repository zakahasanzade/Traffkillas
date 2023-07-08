import React, { useState } from "react";
import "../Instruments.css";
import { motion } from "framer-motion/dist/framer-motion";
import InstrumentStep3 from "../InstrumentStep3/InstrumentStep3";

const InstrumentStep2 = ({ ChangeStepState }) => {
  const [selectedType, setSelectedType] = useState([]);

  const handleSelectChangeType = (event) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
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
      <div className="Instruments_general">
        <p>Шаг 2</p>
        <form className="Instruments_form">
          <label>Тип канала</label>
          <select className="Instruments_form_selection" name="typeChannel">
            <option value="">Выберите тип канала</option>
            <option value="Баинг">Баинг</option>
            <option value="Продакшн">Продакшн</option>
          </select>
          <label>
            Канал <span target="_blank">скопировать ID в буфер</span>
          </label>
          <select className="Instruments_form_selection" name="typeChannel">
            <option value="">Выберите канал</option>
            <option value="Баинг">Канал-каналович</option>
            <option value="Продакшн">Тим-тимович</option>
          </select>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
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
