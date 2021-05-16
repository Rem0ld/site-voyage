import { motion } from "framer-motion";
import React, { ReactElement } from "react";
import content from "../../public/Content.svg";
import Button from "./elements/Button";

export default function Home(): ReactElement {
  return (
    <div className="h-screen">
      <div className="h-full bg-gray-200 grid place-items-center">
        <motion.div
          className="relative"
          initial={{ y: 0, x: 0 }}
          animate={{
            y: [-10, 0, -10],
            x: [-10, 0, -10],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <div className="absolute z-10 top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 ">
            <Button
              text="Next destination"
              type="standard"
              size="big"
              isButton
            />
          </div>
          <img src={content} alt="logo" />
        </motion.div>
      </div>
    </div>
  );
}
