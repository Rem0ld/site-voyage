import React, { ReactElement } from "react";
import MenuDropdown from "./elements/MenuDropdown";

export default function Header(): ReactElement {
  return (
    <div className="h-16 pl-4 pr-8 flex justify-between items-center shadow-md bg-white">
      <span>logo</span>
      <MenuDropdown notifCount={0} pseudo="PierrotLeFou" isConnected />
    </div>
  );
}
