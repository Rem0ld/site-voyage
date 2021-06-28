import { motion, useCycle } from "framer-motion";
import Cookies from "js-cookie";
import React, { ReactElement, useEffect, useState } from "react";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ThirdStep from "./Steps/ThirdStep";

interface AppProperties {
  toggleMenu: () => void;
}

const transition = {
  duration: 0.8,
};

export default function ModalWelcome({
  toggleMenu,
}: AppProperties): ReactElement {
  const [needTutorial, setNeedTutorial] = useState(false);
  const [position, cyclePosition] = useCycle(
    { x: "0%", y: "0%" },
    { x: "-100%", y: "-70%" },
    { x: "140%", y: "-70%" }
  );
  const [size, cycleSize] = useCycle(
    { w: "33%", h: "16rem" },
    { w: "17%", h: "10rem" },
    { w: "17%", h: "10rem" }
  );

  const handleNext = () => {
    cyclePosition();
    cycleSize();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    cycleContent();
    toggleMenu();
  };

  const closeModal = () => {
    setNeedTutorial(false);
    Cookies.set("intro", "true", { expires: 365 });
  };

  const [content, cycleContent] = useCycle(
    <FirstStep handleNext={handleNext} closeModal={closeModal} />,
    <SecondStep handleNext={handleNext} closeModal={closeModal} />,
    <ThirdStep closeModal={closeModal} />
  );

  useEffect(() => {
    const intro = Cookies.get("intro");
    if (!intro) {
      setNeedTutorial(true);
    }
    if (window.innerWidth < 1260) {
      setNeedTutorial(false);
      Cookies.set("intro", "true", { expires: 365 });
    }
  }, []);

  return needTutorial ? (
    <motion.div
      animate={{
        x: position.x,
        y: position.y,
        width: size.w,
        height: size.h,
      }}
      transition={transition}
      className="bg-img absolute w-2/6 h-64 z-50 p-4 bg-white rounded-md border"
    >
      {content}
    </motion.div>
  ) : (
    <div />
  );
}
