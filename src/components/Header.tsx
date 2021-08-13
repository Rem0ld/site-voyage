import ctl from "helpers/ctl";
import logo from "public/logo_with_plane.svg";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import Menu from "./Elements/Menu/Menu";

const mainDiv = ctl(`
fixed 
z-special 
w-full 
h-16 
px-4
flex 
justify-between 
items-center 
shadow-lg 
bg-white
`);

export default function Header(): ReactElement {
  return (
    <div className={mainDiv}>
      <h1 className="absolute w-full lg:text-3xl text-center text-lg font-bold text-primary">
        Audacious Venture
      </h1>
      <Link to="/" className="relative z-50 focus:outline-primary">
        <img src={logo} alt="logo" width="80px" height="80px" />
      </Link>
      <Menu />
    </div>
  );
}
