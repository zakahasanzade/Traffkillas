import React, { useEffect, useState } from "react";
import "../Instruments.css";
import { motion } from "framer-motion/dist/framer-motion";
import InstrumentStep3 from "../InstrumentStep3/InstrumentStep3";
import { submitPassword } from "../InstrumentsRequest";

const InstrumentStep2 = ({ ChangeStepState, UserPhoneRes }) => {

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
          <p>Шаг 2</p>
          <form className="Instruments_form" id="Instruments_form_password">
            <label>Код</label>
            <input type="text" name="code" />
            <label>Пароль </label>
            <input
              type="text"
              name="password"
              placeholder="не заполнять если нет"
            />

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                submitPassword(UserPhoneRes);
                ChangeStepState(
                  <InstrumentStep3 UserPhoneRes={UserPhoneRes} />
                );
              }}
            >
              Отправить код <i class="bi bi-check-circle-fill"></i>
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default InstrumentStep2;
