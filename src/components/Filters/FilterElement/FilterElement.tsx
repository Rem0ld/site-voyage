/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import chevronRight from "@iconify-icons/akar-icons/chevron-right";
import Icon from "@iconify/react";
import { motion } from "framer-motion";
import ctl from "helpers/ctl";
import React, { ReactElement } from "react";
import { Continents, Hobbies } from "types";

interface AppProperties {
  list: Continents | Hobbies;
  filterName: string;
  isOpen: boolean;
  onClickToggleMenu: (
    event: React.MouseEvent<HTMLDivElement>,
    name: string
  ) => void;
  onClickToggleFilter: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const classesFilterList = ctl(`
shadow-inset-outset 
absolute 
top-8 
left-12 
z-10 
w-40 
h-40 
p-2
transition-opacity
border 
bg-gray-100 
rounded-md
`);

const classesCheckbox = ctl(`
outline-none 
focus:outline-none 
focus:border-primary 
focus:ring-primary 
text-primary`);

// Objects used by framer-motion for animations
const variants = {
  open: { transform: "rotate(0deg)" },
  closed: { transform: "rotate(90deg)" },
};
const transition = {
  duration: 0.5,
};

export default function FilterElement({
  filterName,
  list,
  onClickToggleMenu,
  onClickToggleFilter,
  isOpen,
}: AppProperties): ReactElement {
  const filter = filterName.toLowerCase();
  const opacity = !isOpen ? "opacity-0" : "";

  let listItems;
  if (list) {
    listItems = Object.entries(list).map((element, index) => {
      if (index < 5) {
        return (
          <li key={element[0]} className="flex items-center">
            <input
              type="checkbox"
              name={element[0].toLowerCase()}
              id={element[0].toLowerCase()}
              value={element[0]}
              className={classesCheckbox}
              onClick={(event) => {
                onClickToggleFilter(event);
              }}
            />
            <label className="pl-2" htmlFor={element[0].toLowerCase()}>
              {element[0]}
            </label>
          </li>
        );
      }
      return "";
    });
  }
  return (
    <div className="relative pt-2.5 pb-4 pr-4">
      <div
        onClick={(event) => {
          onClickToggleMenu(event, filter);
        }}
        role="button"
        tabIndex={0}
        className="flex items-center"
      >
        <span className="text-sm">{filterName}</span>
        <motion.div
          animate={isOpen ? "closed" : "open"}
          variants={variants}
          transition={transition}
        >
          <Icon icon={chevronRight} />
        </motion.div>
      </div>
      <div className={`${filter} ${classesFilterList} ${opacity}`}>
        <ul>{listItems}</ul>
      </div>
    </div>
  );
}
