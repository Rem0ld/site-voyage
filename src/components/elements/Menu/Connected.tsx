/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  getNotificationsUser,
  UpdateNotifications,
} from "api/server/notificationRoute";
import LogoutButton from "components/Login/LogoutButton";
import { SessionContext } from "components/SessionProvider";
import Cookies from "js-cookie";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { MyNotification, ResponseServer, User } from "types";
import PersonIcon from "../IconsComponents/PersonIcon";
import SettingsIcon from "../IconsComponents/SettingsIcon";
import TripIcon from "../IconsComponents/TripIcon";
import IndicatorNotification from "../IndicatorNotification";
import DisplayUsername from "./DisplayUsername";
import classes from "./style";

interface AppProperties {
  toggleMenu: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isMenuOpen: boolean;
}

export default function Connected({
  toggleMenu,
  isMenuOpen,
}: AppProperties): ReactElement {
  const sessionContext = useContext(SessionContext);
  const [user, setUser] = useState<User>();
  const [notifications, setNotifications] = useState<MyNotification[]>();
  const { data } = useQuery<MyNotification[] | undefined>(
    "notifications",
    async () => {
      const response: ResponseServer = (await getNotificationsUser()) as ResponseServer;
      if (response.type === "error") throw new Error(response.error);
      return response.payload;
    }
  );

  useEffect(() => {
    // const checkIfWeNeedToRefreshToken = (userConnected: firebase.User) => {
    //   const tenMinutes = 10 * 60 * 1000;
    //   const lastSignIn: string = userConnected?.metadata
    //     .lastSignInTime as string;
    //   const now = Date.now();

    //   if (lastSignIn && now - +lastSignIn >= tenMinutes) {
    //     console.log("more than 10 minutes");
    //     sessionContext?.getIdToken().then((newToken) => {
    //       const currentToken = localStorage.getItem("@token");

    //       if (currentToken !== newToken) {
    //         localStorage.setItem("@token", newToken);
    //       }
    //     });
    //   }
    // };
    // if (sessionContext) {
    //   checkIfWeNeedToRefreshToken(sessionContext);
    // }
    sessionContext?.getIdToken().then((newToken) => {
      const currentToken = localStorage.getItem("@token");

      if (currentToken !== newToken) {
        localStorage.setItem("@token", newToken);
      }
    });
  }, [sessionContext]);

  useEffect(() => {
    if (!user) {
      setUser(Cookies.getJSON("user") as User);
    }
    if (data) {
      setNotifications(data);
    }
  }, [user, setUser, data]);

  const handleNotifications = () => {
    if (notifications && notifications.length > 0) {
      UpdateNotifications()
        .then((result: ResponseServer) => {
          if (result && result.type === "valid") {
            setNotifications([]);
          }
        })
        .finally(() => {});
    }
  };

  const cssLinks = window.innerWidth < 640 ? classes.link : classes.linkDesktop;

  // Instead of having an object with the list and passing the object
  // I wrote it 2 times because of onClick event which should be there only for mobile
  return window.innerWidth < 640 ? (
    <>
      {/* MOBILE MENU */}
      <div
        className="relative focus:outline-primary"
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
      >
        {notifications && notifications.length > 0 ? (
          <span className="absolute w-3 h-3 -right-1 -top-1">
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
              <Link
                to="/trips"
                className={cssLinks}
                onClick={(event) => {
                  toggleMenu(event);
                  handleNotifications();
                }}
              >
                <TripIcon />
                Trips
              </Link>
            </li>
            {/* <li>
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
            </li> */}
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
      {/* DESKTOP MENU */}
      <DisplayUsername username={user && user.username} />
      <li className="relative">
        {notifications && notifications.length > 0 ? (
          <IndicatorNotification />
        ) : (
          ""
        )}
        <Link to="/trips" className={cssLinks} onClick={handleNotifications}>
          <TripIcon />
          Trips
        </Link>
      </li>
      {/* <li>
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
      </li> */}
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
