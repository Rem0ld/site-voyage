import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo_with_plane.svg";
import MenuDropdown from "./elements/MenuDropdown/MenuDropdown";

export default function Header(): ReactElement {
  return (
    <div className="fixed z-special w-full h-16 pl-4 pr-8 flex justify-between items-center shadow-lg bg-white">
      <Link to="/">
        <img src={logo} alt="logo" width="80px" height="80px" />
      </Link>
      <MenuDropdown />
    </div>
  );
}
