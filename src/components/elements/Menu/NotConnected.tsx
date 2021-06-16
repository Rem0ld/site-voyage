/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "../IconsComponents/PersonIcon";
import classes from "./style";

interface AppProperties {
  toggleMenu: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isMenuOpen: boolean;
}

export default function NotConnected({
  toggleMenu,
  isMenuOpen,
}: AppProperties): ReactElement {
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
          className={
            isMenuOpen ? `${classes.menu}` : `${classes.menu} opacity-0`
          }
        >
          <li>
            <Link to="/signup" className={classes.link} onClick={toggleMenu}>
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/login" className={classes.link} onClick={toggleMenu}>
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
            Sign Up
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

  return <>{listNotConnected}</>;
}
