/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import magnifyIcon from "@iconify-icons/mdi-light/magnify";
import { InlineIcon } from "@iconify/react";
import React, { ReactElement, useState } from "react";
import { Country } from "types";
import classes from "./styles";

interface AppProperties {
  includedCountry: Country[];
  setIncludedCountry: React.Dispatch<React.SetStateAction<Country[]>>;
}

export default function FilterInput({
  includedCountry,
  setIncludedCountry,
}: AppProperties): ReactElement {
  const [inputValue, setInputValue] = useState("");

  /**
   * Filters list of country from user input and maps it into a HTML list
   */
  const list = includedCountry
    .filter((element) =>
      element.name.toLowerCase().includes(inputValue.toLowerCase())
    )
    .map((element) => (
      <li
        key={element.name}
        onClick={() => {
          setIncludedCountry(
            includedCountry.filter(
              (predicate) => predicate.name !== element.name
            )
          );
        }}
        className="p-2 cursor-pointer hover:bg-primary rounded-md"
      >
        {element.name}
      </li>
    ));

  return (
    <div className="py-4">
      <p className="text-sm pl-2">Country to remove</p>
      <div className="relative flex items-center -pt-2">
        <InlineIcon icon={magnifyIcon} />
        <input
          type="text"
          aria-label="Full name"
          tabIndex={-1}
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
      </div>
    </div>
  );
}
