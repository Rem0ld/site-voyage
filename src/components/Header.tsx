import ctl from "helpers/ctl";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo_with_plane.svg";
import MenuDropdown from "./elements/MenuDropdown/MenuDropdown";

const mainDiv = ctl(`
fixed 
z-special 
w-full 
h-16 
pl-4 
pr-8 
flex 
justify-between 
items-center 
shadow-lg 
bg-white
`);

export default function Header(): ReactElement {
  return (
    <div className={mainDiv}>
      <Link to="/" className="sm:w-40 focus:outline-primary">
        <img src={logo} alt="logo" width="80px" height="80px" />
      </Link>
      <h1 className="lg:text-3xl text-center text-lg font-bold text-primary">
        Audacious Venture
      </h1>
      <MenuDropdown />
    </div>
  );
}
