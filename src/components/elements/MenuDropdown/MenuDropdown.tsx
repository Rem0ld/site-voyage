/* eslint-disable jsx-a11y/click-events-have-key-events */
import personIcon from "@iconify/icons-akar-icons/person";
import { Icon } from "@iconify/react";
import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, useHistory } from "react-router-dom";
import auth from "../../../../firebase-auth";
import { SessionContext } from "../../SessionProvider";
import classes from "./style";

export default function MenuDropdown(): ReactElement {
  const history = useHistory();
  const user = useContext(SessionContext);
  const [isOpen, setIsOpen] = useState(false);

  const signOut = async (): Promise<void> => {
    await auth.signOut();
    history.push("/");
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
        <button
          onClick={signOut}
          className={`${classes.link} w-full text-left`}
          type="button"
          tabIndex={0}
        >
          Log out
        </button>
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

  const list = user ? listConnected : listNotConnected;

  return user ? (
    <div className="relative flex justify-center space-x-1">
      <span className="">{user.displayName || user.email}</span>
      <div className="relative" onClick={toggleMenu} role="button" tabIndex={0}>
        <div className={classes.notif}>
          <div className="p-0.5 text-white text-xs leading-3">{0}</div>
        </div>
        <Icon icon={personIcon} className="w-6 h-6 text-primary" />
      </div>
      <ul
        role="menu"
        className={isOpen ? `${classes.menu}` : `${classes.menu} opacity-0`}
      >
        {isOpen ? list : ""}
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
      >
        {isOpen ? list : ""}
      </ul>
    </div>
  );
}
