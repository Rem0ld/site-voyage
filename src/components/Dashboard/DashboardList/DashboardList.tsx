/* eslint-disable jsx-a11y/click-events-have-key-events */
import crossMarkButton from "@iconify/icons-emojione/cross-mark-button";
import { Icon } from "@iconify/react";
import ctl from "helpers/ctl";
import React, { ReactElement } from "react";
import { Country } from "types";
// import arrowRight from "../../../../public/arrow_right.svg";
import classes from "./styles";

interface AppProperties {
  title: string;
  list: Country[] | undefined;
  onclick: (numericCode: number) => void;
  removeAll: (argument: string) => void;
}

const link = ctl(`
inline-block 
align-baseline
text-xs 
text-primary 
hover:underline
`);

const DashboardList = React.memo(
  ({ title, list, onclick, removeAll }: AppProperties): ReactElement => {
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
          className="flex justify-between items-center p-2 pr-4 hover:bg-gray-200 rounded-md"
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
            {title === "Excluded" ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 12.4439C15 13.8128 13.875 14.9327 12.5 14.9327H2.5C1.125 14.9327 0 13.8128 0 12.4439V2.48879C0 1.11995 1.125 0 2.5 0H12.5C13.875 0 15 1.11995 15 2.48879V12.4439Z"
                  fill="#84CC16"
                />
                <path
                  d="M3 7.5625H11.1429"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.58032 4L11.1428 7.5625L7.58032 11.125"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <Icon icon={crossMarkButton} />
            )}
          </div>
        </li>
      ));

    return (
      <div className=" md:w-2/4 w-11/12 p-2 h-full md:h-96 max-h-screen">
        <div className="flex justify-between">
          <h3 className="text-md font-semibold text-secondary">{title}</h3>
          <span
            className={link}
            onClick={() => {
              removeAll(title.toLowerCase());
            }}
            role="button"
            tabIndex={0}
          >
            Remove all
          </span>
        </div>
        <ul className={`${classes.list}`}>{listItems}</ul>
      </div>
    );
  }
);

export default DashboardList;
