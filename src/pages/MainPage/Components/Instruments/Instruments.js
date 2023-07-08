import React, { useState } from "react";
import "./Instruments.css";
import { motion } from "framer-motion/dist/framer-motion";
import { sendCodeRequest } from "./InstrumentsRequest";
import InstrumentStep1 from "./InstrumentStep1/InstrumentStep1";
import InstrumentStep2 from "./InstrumentStep2/InstrumentStep2";
import InstrumentStep3 from "./InstrumentStep3/InstrumentStep3";

const Instruments = () => {
  const SendRequest = (e) => {
    e.preventDefault();
    const form = document.getElementById("InstrumentForm");
    const formData = new FormData(form);
    sendCodeRequest(formData);
  };
  const ChangeStepState = (state) => {
    setStepState(state);
  };
  const [stepState, setStepState] = useState(
    <InstrumentStep1
      ChangeStepState={ChangeStepState}
      SendRequest={SendRequest}
    />
  );

  return (
    <motion.div
      className="main"
      id="active"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      {stepState}
    </motion.div>
  );
};

export default Instruments;
