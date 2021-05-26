/* eslint-disable jsx-a11y/click-events-have-key-events */
import Button from "components/elements/Button";
import ValidIcon from "components/elements/ValidIcon";
import Links from "components/Links/Links";
import React, { ReactElement, useState } from "react";
import { Travel } from "types";

interface AppProperties {
  travel: Travel;
  updateTravel: (id: number) => void;
}

export default function TripItem({
  travel,
  updateTravel,
}: AppProperties): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (): void => {
    setIsOpen((previousState) => !previousState);
  };

  return (
    <div className="w-full mt-4 pb-2 border-gray-400 border-b-2">
      <div className="flex md:flex-row flex-col justify-between gap-2 md:items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleOpen}
          tabIndex={0}
          role="button"
        >
          <h4 className="pr-4 text-lg font-semibold ">{travel.destination}</h4>
          <span>
            {travel.departureDate} - {travel.returnDate}
          </span>
        </div>
        <div className="flex justify-evenly items-center lg:w-2/4 w-full">
          <Button text="Detail" type="standard" size="medium" isButton />
          <Button text="Comment" type="standard" size="medium" isButton />
          <Button text="Add picture" type="standard" size="medium" isButton />
          <div
            onClick={() => {
              updateTravel(travel.id as number);
            }}
            tabIndex={0}
            role="button"
          >
            <ValidIcon />
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className="flex md:flex-row flex-col justify-between gap-4 w-4/5 mx-auto mt-4 mb-2 ">
          <Links />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
