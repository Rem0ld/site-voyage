import React, { ReactElement } from "react";
import MenuDropdown from "./MenuDropdown";

export default function Header(): ReactElement {
  return (
    <div className="h-16 pl-4 pr-8 flex justify-between items-center drop-shadow-md bg-white">
      <span>logo</span>
      <MenuDropdown notifCount={0} pseudo="PierrotLeFou" isConnected />
    </div>
  );
}
