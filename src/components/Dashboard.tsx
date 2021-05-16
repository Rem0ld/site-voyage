/* eslint-disable jsx-a11y/click-events-have-key-events */
// import hamburgerMenu from "@iconify-icons/radix-icons/hamburger-menu";
// import { Icon } from "@iconify/react";
import { motion, useCycle } from "framer-motion";
import React, { ReactElement } from "react";
import ButtonToggle from "./elements/ButtonToggle";

// Objects used by framer-motion for animations
const variants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

const transition = {
  duration: 0.8,
};

export default function Dashboard(): ReactElement {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      transition={transition}
      initial={{ x: "-100%" }}
      className="absolute z-10 h-4/5 w-2/12 mt-1 transform-gpu shadow-md bg-white"
    >
      {/* <Icon
          icon={hamburgerMenu}
          color="#84CC16"
          style={{ fontSize: "24px" }}
        /> */}
      <ButtonToggle
        toggle={() => {
          toggleOpen();
        }}
      />
      dashboard is working
    </motion.div>
  );
}
