/* eslint-disable jsx-a11y/click-events-have-key-events */
import LogoutButton from "components/Login/LogoutButton";
import Cookies from "js-cookie";
import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "types";
import BellIcon from "../IconsComponents/BellIcon";
import PersonIcon from "../IconsComponents/PersonIcon";
import SettingsIcon from "../IconsComponents/SettingsIcon";
import TripIcon from "../IconsComponents/TripIcon";
import classes from "./style";

interface AppProperties {
  toggleMenu: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isOpen: boolean;
}

export default function Connected({
  toggleMenu,
  isOpen,
}: AppProperties): ReactElement {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!user) {
      setUser(Cookies.getJSON("user") as User);
    }
  }, [user]);

  const cssLinks = window.innerWidth < 640 ? classes.link : classes.linkDesktop;

  // Instead of having an object with the list and passing the object
  // I wrote it 2 times because of onClick event which should be there only for mobile
  return window.innerWidth < 640 ? (
    <>
      <div
        className="relative focus:outline-primary"
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
      >
        <PersonIcon />
      </div>
      <ul
        role="menu"
        className={isOpen ? `${classes.menu}` : `${classes.menu} opacity-0`}
      >
        {isOpen ? (
          <>
            <span className="lg:grid place-items-center sm:hidden xs:block px-2">
              Hello {user?.username}
            </span>
            <li>
              <Link to="/trips" className={cssLinks} onClick={toggleMenu}>
                <TripIcon />
                Trips
              </Link>
            </li>
            <li>
              <Link
                to="/notifications"
                className={cssLinks}
                onClick={toggleMenu}
              >
                <BellIcon />
                Notifications
              </Link>
            </li>
            <li>
              <Link to="/settings" className={cssLinks} onClick={toggleMenu}>
                <SettingsIcon />
                Settings
              </Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </>
  ) : (
    <ul className="flex space-x-2">
      <span className="lg:grid place-items-center sm:hidden xs:block px-2">
        Hello {user?.username}
      </span>
      <li>
        <Link to="/trips" className={cssLinks}>
          <TripIcon />
          Trips
        </Link>
      </li>
      <li>
        <Link to="/notifications" className={cssLinks}>
          <BellIcon />
          Notifications
        </Link>
      </li>
      <li>
        <Link to="/settings" className={cssLinks}>
          <SettingsIcon />
          Settings
        </Link>
      </li>
      <li>
        <LogoutButton />
      </li>
    </ul>
  );
}
