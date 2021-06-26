import { motion } from "framer-motion";
import React, { ReactElement } from "react";
import Button from "../Button";

interface AppProperties {
  closeModal: () => void;
}

export default function FirstStep({ closeModal }: AppProperties): ReactElement {
  return (
    <div className="grid gap-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="h-4/6 text-center font-semibold"
      >
        <p>
          When you’re happy with your list, click on &quot;Next
          destination&quot; and let the magic happen.
        </p>
      </motion.div>
      <div className="flex justify-center">
        <Button
          text="Got it!"
          type="valid"
          size="small"
          isButton
          onclick={closeModal}
        />
      </div>
    </div>
  );
}
