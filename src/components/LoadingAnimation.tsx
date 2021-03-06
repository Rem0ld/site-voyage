import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loader from "public/loading_earth_globe.json";
import train from "public/train.json";
import React, { ReactElement } from "react";

export default function LoadingAnimation(): ReactElement {
  return (
    <div className="min-height-animation flex items-center justify-center">
      <div>
        <Lottie animationData={loader} className="md:w-96 md:h-96 w-60 h-60" />
        <motion.div
          className="absolute z-0 transform-gpu bottom-24 right-full -translate-y-full -translate-x-full"
          animate={{
            x: 2000,
          }}
          transition={{
            duration: 11,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <Lottie
            animationData={train}
            className="scale-spe absolute md:w-30 md:h-30 w-20 h-20"
          />
        </motion.div>
      </div>
    </div>
  );
}
