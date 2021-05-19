/* eslint-disable jsx-a11y/click-events-have-key-events */
import crossMarkButton from "@iconify/icons-emojione/cross-mark-button";
import { Icon } from "@iconify/react";
import React, { ReactElement } from "react";
import { Country } from "types";
import classes from "./styles";

interface AppProperties {
  title: string;
  list: Country[] | undefined;
  onclick: (numericCode: number) => void;
}

const DashboardList = React.memo(
  ({ title, list, onclick }: AppProperties): ReactElement => {
    // Making LI elements
    const listItems = list
      ?.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .map((element) => (
        <li
          key={+element.numericCode}
          className="flex justify-between items-center p-1 pr-4"
        >
          {element.name}
          <div
            className="w-4 h-4"
            onClick={() => {
              onclick(+element.numericCode);
            }}
            role="button"
            tabIndex={-2}
          >
            <Icon icon={crossMarkButton} />
          </div>
        </li>
      ));

    return (
      <div className=" md:w-2/4 w-11/12 p-2 h-full md:h-96 max-h-screen">
        <h3 className="text-md font-semibold text-secondary">{title}</h3>
        <ul className={`${classes.list}`}>{listItems}</ul>
      </div>
    );
  }
);

export default DashboardList;
