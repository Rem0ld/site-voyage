/* eslint-disable jsx-a11y/label-has-associated-control */
import Links from "components/Links/Links";
import React, { ReactElement, useState } from "react";
import classes from "./styles";

interface AppProperties {
  setDates: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FlightLinks({ setDates }: AppProperties): ReactElement {
  const [radioButton, setRadioButton] = useState("one_way");
  const handleChangeRadio = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRadioButton(event.target.value);
  };
  return (
    <div className="mb-4 border-t-2">
      <div className="flex">
        <div className="flex items-center m-2 ml-0">
          <input
            id="one_way"
            type="radio"
            name="type"
            value="one_way"
            defaultChecked
            className={classes.radio}
            onChange={(event) => {
              handleChangeRadio(event);
            }}
          />
          <label htmlFor="one_way">One way</label>
        </div>
        <div className="flex items-center">
          <input
            id="roundtrip"
            type="radio"
            name="type"
            value="roundtrip"
            className={classes.radio}
            onChange={(event) => {
              handleChangeRadio(event);
            }}
          />
          <label htmlFor="roundtrip">Roundtrip</label>
        </div>
      </div>

      <div className="flex md:flex-row flex-col pb-10">
        <input
          type="date"
          id="depart"
          name="depart"
          className={classes.input}
          onChange={(event) => {
            setDates(event);
          }}
        />
        <input
          type="date"
          id="return"
          name="return"
          className={classes.input}
          disabled={radioButton === "one_way"}
          onChange={(event) => {
            setDates(event);
          }}
        />
      </div>

      <div className="grid md:grid-cols-2 md:grid-rows-2 md:gap-10 gap-4 justify-items-center lg:w-full m-auto">
        <Links />
      </div>
    </div>
  );
}
