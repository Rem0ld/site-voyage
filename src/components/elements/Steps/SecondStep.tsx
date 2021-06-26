import { motion } from "framer-motion";
import React, { ReactElement } from "react";
import Button from "../Button";
import InfoIcon from "../IconsComponents/InfoIcon";

interface AppProperties {
  handleNext: () => void;
  closeModal: () => void;
}

export default function FirstStep({
  handleNext,
  closeModal,
}: AppProperties): ReactElement {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="h-5/6 text-center font-semibold text-sm"
      >
        <p className="inline">
          Here you choose which country should stay in the list and which
          shouldn’t, you can find more information by clicking on
        </p>
        <span>
          <InfoIcon />
        </span>
      </motion.div>
      <div className="flex justify-center space-x-4">
        <Button
          text="Cancel"
          type="standard"
          size="small"
          isButton
          onclick={closeModal}
        />
        <Button
          text="Next"
          type="valid"
          size="small"
          isButton
          onclick={handleNext}
        />
      </div>
    </>
  );
}
