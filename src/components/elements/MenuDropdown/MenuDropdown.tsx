/* eslint-disable jsx-a11y/click-events-have-key-events */
import personIcon from "@iconify/icons-akar-icons/person";
import { Icon } from "@iconify/react";
import stopPropagation from "helpers/stopPropagation";
import React, { ReactElement, useEffect, useState } from "react";
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
      <Link to="/trips" className="block py-1 px-2 rounded-md">
        Trips
      </Link>
    </li>
    <li>
      <Link to="/notifications" className="block py-1 px-2 rounded-md">
        Notifications
      </Link>
    </li>
    <li>
      <Link to="/settings" className="block py-1 px-2 rounded-md">
        Settings
      </Link>
    </li>
    <li>
      <Link to="/" className="block py-1 px-2 rounded-md">
        Log out
      </Link>
    </li>
  </>
);

const listNotConnected = (
  <>
    <li>
      <Link to="/signup" className="block py-1 px-2 rounded-md">
        Sign Up
      </Link>
    </li>
    <li>
      <Link to="/login" className="block py-1 px-2 rounded-md">
        Log In
      </Link>
    </li>
  </>
);

export default function MenuDropdown({
  notifCount,
  pseudo,
  isConnected,
}: AppProperties): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const list = isConnected ? listConnected : listNotConnected;

  const toggleMenu = (): void => {
    setIsOpen((previousState) => !previousState);
  };
  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  return isConnected ? (
    <div className="relative flex justify-center space-x-1">
      <span className="">{pseudo}</span>
      <div className="relative" onClick={toggleMenu} role="button" tabIndex={0}>
        <div className={classes.notif}>
          <div className="p-0.5 text-white text-xs leading-3">{notifCount}</div>
        </div>
        <Icon icon={personIcon} className="w-6 h-6 text-primary" />
      </div>
      <ul
        role="menu"
        className={isOpen ? `${classes.menu}` : `${classes.menu} opacity-0`}
        onClick={(event) => {
          stopPropagation(event);
        }}
      >
        {list}
      </ul>
    </div>
  ) : (
    <div className="relative flex justify-center space-x-1">
      <div className="relative" onClick={toggleMenu} role="button" tabIndex={0}>
        <Icon icon={personIcon} className="w-6 h-6 text-primary" />
      </div>
      <ul
        role="menu"
        className={isOpen ? `${classes.menu}` : `${classes.menu} opacity-0`}
        onClick={(event) => {
          stopPropagation(event);
        }}
      >
        {list}
      </ul>
    </div>
  );
}
