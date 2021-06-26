/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import InfoIcon from "components/Elements/IconsComponents/InfoIcon";
import MagnifyGlassIcon from "components/Elements/IconsComponents/MagnifyGlassIcon";
import React, { ReactElement, useState } from "react";
import { Country } from "types";
import classes from "./styles";

interface AppProperties {
  includedCountry: Country[];
  banACountry: (numericCode: number) => void;
}

export default function FilterInput({
  includedCountry,
  banACountry,
}: AppProperties): ReactElement {
  const [inputValue, setInputValue] = useState("");

  /**
   * Filters list of country from user input and maps it into a HTML list
   */
  const list =
    includedCountry.length > 0
      ? includedCountry
          .filter((element) =>
            element.name.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((element) => (
            <li
              key={element.numericCode}
              onClick={() => {
                banACountry(+element.numericCode);
              }}
              className="p-2 cursor-pointer hover:bg-primary rounded-md"
            >
              {element.name}
            </li>
          ))
      : "";

  return (
    <div className="py-4">
      <p className="text-sm pl-2">Country to remove</p>
      <div className="relative flex items-center -pt-2">
        <MagnifyGlassIcon />
        <input
          type="text"
          aria-label="Full name"
          tabIndex={0}
          className={classes.input}
          value={inputValue}
          onChange={(event) => {
            setInputValue(() => event.target.value);
          }}
        />
        {inputValue.length > 0 ? (
          <div className={classes.list}>
            <ul>
              {list.length === 0 ? (
                <li className="p-2 rounded-md">no result</li>
              ) : (
                list
              )}
            </ul>
          </div>
        ) : (
          ""
        )}
        <div className="relative focus:outline-none">
          <button
            className="focus:outline-primary transition delay-300"
            type="button"
            aria-labelledby="info-icon"
          >
            <InfoIcon />
          </button>
          <div
            className="absolute top-6 -right-32 z-50 w-60 p-2 shadow-sm border rounded-md bg-white text-center"
            role="tooltip"
            id="info-icon"
          >
            You can filter a list of country, if you click on a country, it will
            go in the &quot;Excluded list&quot; if it is not already there.
          </div>
        </div>
      </div>
    </div>
  );
}
