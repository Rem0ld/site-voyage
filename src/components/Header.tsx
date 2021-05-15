import hamburgerMenu from "@iconify-icons/radix-icons/hamburger-menu";
import { Icon } from "@iconify/react";
import React, { ReactElement } from "react";
import MenuDropdown from "./MenuDropdown";

export default function Header(): ReactElement {
  return (
    <div className="h-16 pl-4 pr-8 flex justify-between items-center drop-shadow-md bg-white">
      <Icon icon={hamburgerMenu} color="#84CC16" className="w-6 h-6" />
      <MenuDropdown notifCount={0} pseudo="PierrotLeFou" isConnected />
    </div>
  );
}
