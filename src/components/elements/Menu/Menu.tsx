/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement, useContext, useState } from "react";
import { SessionContext } from "../../SessionProvider";
import Connected from "./Connected";
import NotConnected from "./NotConnected";

export default function MenuDropdown(): ReactElement {
  const sessionContext = useContext(SessionContext);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Will open and close User menu
   * @param event onclick event
   */
  const toggleMenu = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    setIsOpen((previousState) => !previousState);
  };

  return sessionContext ? (
    <div className="relative flex justify-end items-center space-x-2 md:w-auto">
      <Connected toggleMenu={toggleMenu} isOpen={isOpen} />
    </div>
  ) : (
    <div className="w-16 sm:w-40 relative flex justify-end space-x-1">
      <NotConnected toggleMenu={toggleMenu} isOpen={isOpen} />
    </div>
  );
}
