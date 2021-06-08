/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import LogoutButton from "components/Login/LogoutButton";
import Cookies from "js-cookie";
import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { User } from "types";
import { SessionContext } from "../../SessionProvider";
import PersonIcon from "../IconsComponents/PersonIcon";
import classes from "./style";

export default function MenuDropdown(): ReactElement {
  const sessionContext = useContext(SessionContext);
  const [user, setUser] = useState<User>();
  const [isOpen, setIsOpen] = useState(false);

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
    setUser(Cookies.getJSON("user") as User);

    return function cleanup() {
      document.removeEventListener("click", closeMenu);
    };
  }, [closeMenu]);

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
        <LogoutButton />
      </li>
    </>
  );

  const listNotConnected =
    window.innerWidth < 640 ? (
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
          <li>
            <Link to="/signup" className={classes.link}>
              SignUp
            </Link>
          </li>
          <li>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
          </li>
        </ul>
      </>
    ) : (
      <ul className="flex space-x-1">
        <li>
          <Link
            to="/signup"
            className={`${classes.variant} ${classes.variantPrimary}`}
          >
            SignUp
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className={`${classes.variant} ${classes.variantSecondary}`}
          >
            Login
          </Link>
        </li>
      </ul>
    );

  return sessionContext ? (
    <div className="relative flex justify-end space-x-1 md:w-40">
      <span className="lg:inline hidden">{user?.username}</span>
      <div
        className="relative focus:outline-primary"
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
      >
        <div className={classes.notif}>
          <div className="p-0.5 text-white text-xs leading-3">
            {user?.notifications.length}
          </div>
        </div>
        <PersonIcon />
      </div>
      <ul
        role="menu"
        className={isOpen ? `${classes.menu}` : `${classes.menu} opacity-0`}
      >
        {isOpen ? listConnected : ""}
      </ul>
    </div>
  ) : (
    <div className="w-16 sm:w-40 relative flex justify-end space-x-1">
      {listNotConnected}
    </div>
  );
}
