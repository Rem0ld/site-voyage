/* eslint-disable jsx-a11y/click-events-have-key-events */
import InfoIcon from "components/Elements/IconsComponents/InfoIcon";
import SwipeIcon from "components/Elements/IconsComponents/SwipeIcon";
import ctl from "helpers/ctl";
import React, { ReactElement } from "react";
import { Country } from "types";
import classes from "./styles";

interface AppProperties {
  title: string;
  list: Country[];
  onclick: (numericCode: number) => void;
  removeAll: (argument: string) => void;
}

const link = ctl(`
inline-block 
align-baseline
text-xs
text-primary
hover:underline
focus:outline-primary
`);

const SideMenuList = React.memo(
  ({ title, list, onclick, removeAll }: AppProperties): ReactElement => {
    // Making LI elements
    const listItems =
      list.length > 0
        ? list
            .sort((a, b) => {
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
                    <SwipeIcon type="valid" />
                  ) : (
                    <SwipeIcon type="danger" />
                  )}
                </div>
              </li>
            ))
        : "";

    const toggleTipText =
      title === "Excluded"
        ? "This is your excluded list of countries, so basically you don't want to travel there or may be there are just dangerous."
        : "This is your included list of countries, the application will randomly choose one of them, be sure to keep only the ones you wanna travel in.";

    return (
      <div className=" md:w-2/4 w-11/12 p-2 h-full md:h-96 max-h-screen">
        <div className="flex justify-between items-center">
          <div className="flex">
            <h3 className="text-md font-semibold text-secondary">{title}</h3>
            <div className="relative flex self-center pl-1 focus:outline-none">
              <button
                className="focus:outline-primary"
                type="button"
                aria-labelledby="info-icon"
              >
                <InfoIcon />
              </button>
              <div
                className="absolute top-6 -right-36 z-50 w-60 p-2 shadow-sm border rounded-md bg-white text-center"
                role="tooltip"
                id="info-icon"
              >
                {toggleTipText}
              </div>
            </div>
          </div>
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

export default SideMenuList;
