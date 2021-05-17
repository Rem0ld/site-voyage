/* eslint-disable jsx-a11y/click-events-have-key-events */
import personIcon from "@iconify/icons-akar-icons/person";
import { Icon } from "@iconify/react";
import stopPropagation from "helpers/stopPropagation";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import classes from "./style";

type AppProperties = {
  notifCount: number;
  pseudo: string;
  isConnected: boolean;
};

const listConnected = (
  <>
    <li>
      <Link to="/trips">Trips</Link>
    </li>
    <li>
      <Link to="/notifications">Notifications</Link>
    </li>
    <li>
      <Link to="/settings">Settings</Link>
    </li>
    <li>
      <Link to="/">Log out</Link>
    </li>
  </>
);

const listNotConnected = (
  <>
    <li>
      <Link to="/signup">Sign Up</Link>
    </li>
    <li>
      <Link to="/login">Log In</Link>
    </li>
  </>
);

const toggleMenu = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
): void => {
  event.stopPropagation();
  document.querySelector(".menu")?.classList.toggle("opacity-0");
};

export default function MenuDropdown({
  notifCount,
  pseudo,
  isConnected,
}: AppProperties): ReactElement {
  const list = isConnected ? listConnected : listNotConnected;
  return isConnected ? (
    <div className="relative flex justify-center space-x-1">
      <span className="">{pseudo}</span>
      <div
        className="relative"
        onClick={(event) => {
          toggleMenu(event);
        }}
        role="button"
        tabIndex={0}
      >
        <div className={classes.notif}>
          <div className="p-0.5 text-white text-xs leading-3">{notifCount}</div>
        </div>
        <Icon icon={personIcon} className="w-6 h-6 text-primary" />
      </div>
      <ul
        role="menu"
        className={classes.menu}
        onClick={(event) => {
          stopPropagation(event);
        }}
      >
        {list}
      </ul>
    </div>
  ) : (
    <div className="relative flex justify-center space-x-1">
      <div
        onClick={(event) => {
          toggleMenu(event);
        }}
        role="button"
        tabIndex={0}
        className="relative"
      >
        <Icon icon={personIcon} className="w-6 h-6 text-primary" />
      </div>
      <ul
        role="menu"
        className={classes.menu}
        onClick={(event) => {
          stopPropagation(event);
        }}
      >
        {list}
      </ul>
    </div>
  );
}
