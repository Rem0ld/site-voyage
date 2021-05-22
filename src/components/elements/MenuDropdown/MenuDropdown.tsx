/* eslint-disable jsx-a11y/click-events-have-key-events */
import personIcon from "@iconify/icons-akar-icons/person";
import { Icon } from "@iconify/react";
import stopPropagation from "helpers/stopPropagation";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
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
      <Link to="/trips" className={classes.link}>
        Trips
      </Link>
    </li>
    <li>
      <Link to="/notifications" className={classes.link}>
        Notifications
      </Link>
    </li>
    <li>
      <Link to="/settings" className={classes.link}>
        Settings
      </Link>
    </li>
    <li>
      <Link to="/" className={classes.link}>
        Log out
      </Link>
    </li>
  </>
);

const listNotConnected = (
  <>
    <li>
      <Link to="/signup" className={classes.link}>
        Sign Up
      </Link>
    </li>
    <li>
      <Link to="/login" className={classes.link}>
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

  /**
   * Will open and close User menu
   * @param event onclick event
   */
  const toggleMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    event.stopPropagation();

    setIsOpen((previousState) => !previousState);
  };

  /**
   * Will close menu when User clicks anywhere else on the screen
   */
  const closeMenu = useCallback(
    (event: MouseEvent): void => {
      event.stopPropagation();
      setIsOpen(() => false);
    },
    [setIsOpen]
  );

  // Add event listener when component is mounted and remove it when unmounted
  useEffect(() => {
    document.querySelector("body")?.addEventListener("click", closeMenu);

    return function cleanup() {
      document.removeEventListener("click", closeMenu);
    };
  }, [closeMenu]);

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
