/* eslint-disable jsx-a11y/click-events-have-key-events */
import Button from "components/elements/Button";
import DeleteIcon from "components/elements/DeleteIcon";
import ValidIcon from "components/elements/ValidIcon";
import Links from "components/Links/Links";
import React, { ReactElement, useState } from "react";
import { Travel } from "types";

interface AppProperties {
  travel: Travel;
  updateTravel: (id: number) => void;
  deleteTravel: (id: number) => void;
}

export default function TripItem({
  travel,
  updateTravel,
  deleteTravel,
}: AppProperties): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (): void => {
    setIsOpen((previousState) => !previousState);
  };

  const departureDate = travel.departureDate
    ? new Date().toISOString().replace("-", "/").split("T")[0].replace("-", "/")
    : "";
  const returnDate = travel.returnDate
    ? new Date().toISOString().replace("-", "/").split("T")[0].replace("-", "/")
    : "";

  return (
    <div className="w-full mt-4 pb-2 border-gray-400 border-b-2">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-2 ">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleOpen}
          tabIndex={0}
          role="button"
        >
          <h4 className="pr-4 text-lg font-semibold ">{travel.destination}</h4>
          <span>
            {departureDate} - {returnDate}
          </span>
        </div>
        <div className="margin-children flex justify-end items-center  w-full">
          <Button text="Detail" type="standard" size="medium" isButton />
          {travel.done ? (
            <>
              <Button text="Comment" type="standard" size="medium" isButton />
              <Button
                text="Add picture"
                type="standard"
                size="medium"
                isButton
              />
            </>
          ) : (
            ""
          )}

          <div className="flex">
            {!travel.done ? (
              <div
                className="pr-2"
                onClick={() => {
                  updateTravel(travel.id as number);
                }}
                tabIndex={0}
                role="button"
              >
                <ValidIcon />
              </div>
            ) : (
              ""
            )}
            <div
              onClick={() => {
                deleteTravel(travel.id as number);
              }}
              tabIndex={0}
              role="button"
            >
              <DeleteIcon />
            </div>
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
