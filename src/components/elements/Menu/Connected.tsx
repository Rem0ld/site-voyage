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
import IndicatorNotification from "../IndicatorNotification";
import DisplayUsername from "./DisplayUsername";
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
    if (user?.notifications) {
      const travels = user.notifications.map((notification) =>
        user.travel.find((element) => element.id === notification.travelId)
      );
      if (travels && travels.length > 0) {
        setNotifications(() => travels as Travel[]);
      }
    }
  }, [user, setUser]);

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

  const closeNotificationMenu = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    if (isNotificationMenuOpen) {
      setIsNotificationMenuOpen(false);
    }
  };

  const cssLinks = window.innerWidth < 640 ? classes.link : classes.linkDesktop;

  // Instead of having an object with the list and passing the object
  // I wrote it 2 times because of onClick event which should be there only for mobile
  return window.innerWidth < 640 ? (
    <>
      {/* Mobile menu */}
      <div
        className="relative focus:outline-primary"
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
      >
        {notifications && notifications.length > 0 ? (
          <span className="relative w-3 h-3 left-12 -top-1">
            <IndicatorNotification />
          </span>
        ) : (
          ""
        )}
        <PersonIcon />
      </div>
      <ul
        role="menu"
        className={isMenuOpen ? `${classes.menu}` : `${classes.menu} opacity-0`}
      >
        {isMenuOpen ? (
          <>
            <DisplayUsername username={user && user.username} />
            <li>
              <Link to="/trips" className={cssLinks} onClick={toggleMenu}>
                <TripIcon />
                Trips
              </Link>
            </li>
            <li>
              <button
                onClick={toggleNotificationMenu}
                className={`${cssLinks} relative`}
              >
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
      {/* desktop menu */}
      <DisplayUsername username={user && user.username} />
      <li>
        <Link to="/trips" className={cssLinks} onClick={closeNotificationMenu}>
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
            <IndicatorNotification />
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
        <Link
          to="/settings"
          className={cssLinks}
          onClick={closeNotificationMenu}
        >
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
