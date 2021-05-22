/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement, useState } from "react";
import Button from "./elements/Button";
import TopLine from "./elements/TopLine";
import ValidIcon from "./elements/ValidIcon";
import Links from "./Links/Links";

export default function Trips(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (): void => {
    setIsOpen((previousState) => !previousState);
  };

  return (
    <div className="min-height-screen pt-16 md:w-10/12 m-auto pb-10 mt-1 bg-white">
      <TopLine title="My trips" />

      <div className="grid gap-y-28 mt-20">
        <div className="h-auto md:w-4/5 w-full md:px-4 px-1 m-auto border-gray-400 md:border-l-2">
          <h3 className="mb-2 text-xl font-semibold border-gray-400 border-b">
            Upcoming
          </h3>

          <div className="w-full mt-4 pb-2 border-gray-400 border-b-2">
            <div className="flex md:flex-row flex-col justify-between gap-2 md:items-center">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleOpen}
                tabIndex={0}
                role="button"
              >
                <h4 className="pr-4 text-lg font-semibold ">England</h4>
                <span>26/02/2021 - 13/03/2021</span>
              </div>
              <div className="flex justify-evenly items-center lg:w-2/4 w-full">
                <Button text="Detail" type="standard" size="medium" isButton />
                <Button text="Comment" type="standard" size="medium" isButton />
                <Button
                  text="Add picture"
                  type="standard"
                  size="medium"
                  isButton
                />
                <ValidIcon />
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
        </div>

        <div className="h-auto md:w-4/5 w-full md:px-4 px-1 m-auto border-gray-400 md:border-l-2">
          <h3 className="text-xl font-semibold border-b">Done</h3>
          <div className="w-full mt-4 pb-2 border-gray-400 border-b-2">
            <div className="flex md:flex-row flex-col justify-between gap-2 md:items-center">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleOpen}
                tabIndex={0}
                role="button"
              >
                <h4 className="pr-4 text-lg font-semibold ">England</h4>
                <span>26/02/2021 - 13/03/2021</span>
              </div>
              <div className="flex justify-evenly items-center lg:w-2/4 w-full">
                <Button text="Detail" type="standard" size="medium" isButton />
                <Button text="Comment" type="standard" size="medium" isButton />
                <Button
                  text="Add picture"
                  type="standard"
                  size="medium"
                  isButton
                />
                <ValidIcon />
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
        </div>
      </div>
    </div>
  );
}
