import { motion, Transition, Variants } from "framer-motion";
import React, { MouseEventHandler, ReactElement } from "react";

type AppProperties = {
  d?: string;
  variants?: Variants;
  transition?: Transition;
};

type Property = { toggle: MouseEventHandler<HTMLButtonElement> };

const Path = (properties: AppProperties) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#84CC16"
    strokeLinecap="round"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...properties}
  />
);

export default function MenuToggle({ toggle }: Property): ReactElement {
  return (
    <button
      type="button"
      onClick={toggle}
      className="absolute left-full shadow-md rounded-r-sm bg-white focus:outline-none"
      style={{ padding: "1px 2px 0px 1px" }}
    >
      <svg width="28" height="60" viewBox="0 0 21 21">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 17.5 L 18 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 18 17.346" },
          }}
        />
      </svg>
    </button>
  );
}
