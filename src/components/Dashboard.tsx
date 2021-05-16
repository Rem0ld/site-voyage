/* eslint-disable jsx-a11y/click-events-have-key-events */
import hamburgerMenu from "@iconify-icons/radix-icons/hamburger-menu";
import { Icon } from "@iconify/react";
import React, { ReactElement } from "react";

const toggleDashboard = (
  event: React.MouseEvent<HTMLElement, MouseEvent>
): void => {
  event.currentTarget.parentElement?.classList.toggle("-translate-x-full");
};

export default function Dashboard(): ReactElement {
  return (
    <div className="absolute h-4/5 w-2/12 mt-1 transform-gpu transition-transform shadow-md bg-white">
      <div
        onClick={(event) => {
          toggleDashboard(event);
        }}
        role="button"
        tabIndex={0}
        className="absolute left-full shadow-md rounded-r-sm bg-white"
      >
        <Icon
          icon={hamburgerMenu}
          color="#84CC16"
          style={{ fontSize: "24px" }}
        />
      </div>
      dashboard is working
    </div>
  );
}
