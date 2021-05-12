import personIcon from "@iconify/icons-akar-icons/person";
import { Icon } from "@iconify/react";
import React, { ReactElement } from "react";

type AppProperties = {
  notif: number;
  pseudo: string;
};

export default function MenuDropdown({
  notif,
  pseudo,
}: AppProperties): ReactElement {
  const toggleMenu = (): void => {};

  return (
    <div className="relative flex justify-center space-x-1">
      <span className="">{pseudo}</span>
      <div className="relative">
        <div
          onClick={toggleMenu}
          className="absolute -top-2 left-4 w-3.5 h-4 flex justify-center items-center bg-red-600 rounded-lg"
        >
          <div className="p-1 text-white">{notif}</div>
        </div>
        <Icon icon={personIcon} className="w-6 h-6 text-primary" />
      </div>
      <ul className="absolute top-8 right-2 w-40 h-auto py-1 px-2 drop-shadow bg-white rounded-md border border-gray-200 leading-7">
        <li>test1</li>
        <li>test1</li>
        <li>test1</li>
        <li>test1</li>
      </ul>
    </div>
  );
}
