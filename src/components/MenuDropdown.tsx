/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import personIcon from "@iconify/icons-akar-icons/person";
import { Icon } from "@iconify/react";
import ctl from "helpers/ctl";
import stopPropa from "helpers/stopPropagation";
import React, { ReactElement } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

type AppProperties = {
  notifCount: number;
  pseudo: string;
  isConnected: boolean;
};

const classMenu = ctl(`
menu
opacity-0
absolute
top-8
right-2
w-40
h-auto
py-1
px-2
transition-opacity
drop-shadow 
bg-white
rounded-md
border
border-gray-200
leading-7
`);

const classNotif = ctl(`
absolute 
-top-2 
left-4 
min-w-min
min-h-min 
flex 
justify-center 
items-center 
bg-red-600 
rounded-md
`);

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
  return isConnected ? (
    <Router>
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
          <div className={classNotif}>
            <div className="p-0.5 text-white text-xs leading-3">
              {notifCount}
            </div>
          </div>
          <Icon icon={personIcon} className="w-6 h-6 text-primary" />
        </div>
        <ul
          className={classMenu}
          onClick={(event) => {
            stopPropa(event);
          }}
        >
          <li>
            <a href="/trips">Trips</a>
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
        </ul>
      </div>
    </Router>
  ) : (
    <Router>
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
        <ul className={classMenu}>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      </div>
    </Router>
  );
}
