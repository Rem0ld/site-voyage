/* eslint-disable jsx-a11y/click-events-have-key-events */
import crossMarkButton from "@iconify/icons-emojione/cross-mark-button";
import { Icon } from "@iconify/react";
import React, { ReactElement } from "react";
import { Country } from "types";
import classes from "./styles";

interface AppProperties {
  height: string;
  list: Country[] | undefined;
  onclick: (numericCode: number) => void;
}

export default function DashboardList({
  height,
  list,
  onclick,
}: AppProperties): ReactElement {
  // Making LI elements
  const listItems = list?.map((element) => (
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
    <div className={`${height} ${classes.list}`}>
      <ul>{listItems}</ul>
    </div>
  );
}
