/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import ChevronRightIcon from "components/Elements/IconsComponents/ChevronRightIcon";
import { motion } from "framer-motion";
import capitalize from "helpers/capitalize";
import ctl from "helpers/ctl";
import React, { ReactElement } from "react";
import { Continent } from "types";

interface AppProperties {
  continents: Continent;
  filterName: string;
  isOpen: boolean;
  onClickToggleMenu: (
    event: React.MouseEvent<HTMLDivElement>,
    name: string
  ) => void;
  toggleCheckboxContinents: (element: string) => void;
}

const classesFilterList = ctl(`
shadow-inset-outset 
absolute 
top-12 
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
text-primary
cursor-pointer
`);

const classButtonToggle = ctl(`
flex 
items-center 
p-1 
border 
rounded-md 
bg-gray-100 
shadow-sm 
outline-none 
focus:outline-primary
`);

// Objects used by framer-motion for animations
const variants = {
  open: { transform: "rotate(0deg)" },
  closed: { transform: "rotate(90deg)" },
};
const transition = {
  duration: 0.5,
};

export default function Continents({
  continents,
  filterName,
  onClickToggleMenu,
  isOpen,
  toggleCheckboxContinents,
}: AppProperties): ReactElement {
  const filter = filterName.toLowerCase();
  const opacity = !isOpen ? "opacity-0" : "";

  let listItems;
  if (continents) {
    listItems = Object.entries(continents).map((element, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      if (index < 5) {
        return (
          <li key={element[0]} className="flex items-center">
            <input
              type="checkbox"
              name={element[0].toLowerCase()}
              id={element[0].toLowerCase()}
              checked={element[1].isChecked}
              value={element[0]}
              className={classesCheckbox}
              onChange={() => {
                toggleCheckboxContinents(element[0]);
              }}
            />
            <label
              className="pl-2 cursor-pointer"
              htmlFor={element[0].toLowerCase()}
            >
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
        className={classButtonToggle}
      >
        <span className="text-sm">{capitalize(filterName)}</span>
        <motion.div
          animate={isOpen ? "closed" : "open"}
          variants={variants}
          transition={transition}
        >
          <ChevronRightIcon />
        </motion.div>
      </div>
      {isOpen ? (
        <div className={`${filter} ${classesFilterList} ${opacity}`}>
          <ul>{listItems}</ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
