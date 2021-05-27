/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import ChevronRightIcon from "components/elements/ChevronRightIcon";
import { motion } from "framer-motion";
import ctl from "helpers/ctl";
import { getSessionStorageFilter } from "helpers/sessionStorage";
import React, { ReactElement, useEffect, useState } from "react";
import { Continent, Hobby } from "types";

interface AppProperties {
  list: Continent | Hobby;
  filterName: string;
  isOpen: boolean;
  onClickToggleMenu: (
    event: React.MouseEvent<HTMLDivElement>,
    name: string
  ) => void;
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
  isOpen,
}: AppProperties): ReactElement {
  const filter = filterName.toLowerCase();
  const opacity = !isOpen ? "opacity-0" : "";
  const [continents, setContinents] = useState<Continent>();
  const [hobbies, setHobbies] = useState<Hobby>();

  useEffect(() => {
    setContinents(getSessionStorageFilter("continents") as Continent);
    setHobbies(getSessionStorageFilter("hobbies") as Hobby);
  }, []);

  let listItems;
  if (list) {
    listItems = Object.entries(list).map((element, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      if (index < 5) {
        return (
          <li key={element[0]} className="flex items-center">
            <input
              type="checkbox"
              name={element[0].toLowerCase()}
              id={element[0].toLowerCase()}
              value={element[0]}
              className={classesCheckbox}
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
          <ChevronRightIcon />
        </motion.div>
      </div>
      <div className={`${filter} ${classesFilterList} ${opacity}`}>
        <ul>{listItems}</ul>
      </div>
    </div>
  );
}
