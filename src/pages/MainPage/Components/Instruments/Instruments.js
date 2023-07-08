import React, { useState } from "react";
import "./Instruments.css";
import { motion } from "framer-motion/dist/framer-motion";
import InstrumentStep1 from "./InstrumentStep1/InstrumentStep1";
import InstrumentStep2 from "./InstrumentStep2/InstrumentStep2";
import InstrumentStep3 from "./InstrumentStep3/InstrumentStep3";

const Instruments = () => {
  const ChangeStepState = (state) => {
    setStepState(state);
    console.log(state);
  };
  const [stepState, setStepState] = useState(
    <InstrumentStep1 ChangeStepState={ChangeStepState} />
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
