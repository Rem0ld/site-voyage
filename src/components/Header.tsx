import React, { ReactElement } from "react";
import MenuDropdown from "./MenuDropdown";

export default function Header(): ReactElement {
  return (
    <div className="h-16 px-4 flex justify-between items-center drop-shadow-md bg-white">
      header is working
      <MenuDropdown notif={0} pseudo="PierrotLeFou" />
    </div>
  );
}
