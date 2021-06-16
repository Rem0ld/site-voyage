/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import LogoutButton from "components/Login/LogoutButton";
import Cookies from "js-cookie";
import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Travel, User } from "types";
import BellIcon from "../IconsComponents/BellIcon";
import PersonIcon from "../IconsComponents/PersonIcon";
import SettingsIcon from "../IconsComponents/SettingsIcon";
import TripIcon from "../IconsComponents/TripIcon";
import Notifications from "./Notifications";
import classes from "./style";

interface AppProperties {
  toggleMenu: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isMenuOpen: boolean;
}

export default function Connected({
  toggleMenu,
  isMenuOpen,
}: AppProperties): ReactElement {
  const [user, setUser] = useState<User>();
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Travel[]>();

  useEffect(() => {
    if (!user) {
      setUser(Cookies.getJSON("user") as User);
    }
  }, [user, setUser]);

  useEffect(() => {
    if (user?.notifications) {
      const travels = user.notifications.map((notification) =>
        user.travel.find((element) => element.id === notification.travelId)
      );
      if (travels && travels.length > 0) {
        setNotifications(() => travels);
      }
    }
  }, [user]);

  /**
   * Will open and close Notification menu
   * @param event onclick event
   */
  const toggleNotificationMenu = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    setIsNotificationMenuOpen((previousState) => !previousState);
  };

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
        className={isMenuOpen ? `${classes.menu}` : `${classes.menu} opacity-0`}
      >
        {isMenuOpen ? (
          <>
            <span className="lg:grid place-items-center sm:hidden xs:block px-2">
              Hello {user && user.username}
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
        Hello {user && user.username}
      </span>
      <li>
        <Link to="/trips" className={cssLinks}>
          <TripIcon />
          Trips
        </Link>
      </li>
      <li>
        <button
          onClick={toggleNotificationMenu}
          className={`${cssLinks} relative`}
        >
          {notifications && notifications.length > 0 ? (
            <span className="absolute flex h-3 w-3 -top-1 right-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
          ) : (
            ""
          )}
          <BellIcon />
          Notifications
        </button>
        {isNotificationMenuOpen ? (
          <Notifications notifications={notifications} />
        ) : (
          ""
        )}
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
