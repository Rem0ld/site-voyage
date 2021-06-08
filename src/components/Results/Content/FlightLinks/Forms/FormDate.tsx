/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from "react";
import classes from "../styles";

interface AppProperties {
  setDates: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormDate({ setDates }: AppProperties): ReactElement {
  const [radioButton, setRadioButton] = useState("one_way");

  const handleChangeRadio = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRadioButton(event.target.value);
  };

  return (
    <div className="space-x-1">
      <div className="flex mb-2 space-x-2">
        <div className="flex items-center lg:m-0 ">
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
            className={`${classes.radio}`}
            onChange={(event) => {
              handleChangeRadio(event);
            }}
          />
          <label htmlFor="roundtrip">Roundtrip</label>
        </div>
      </div>
      <div className="flex xl:flex-row flex-col space-y-3 lg:space-y-0">
        <input
          type="date"
          id="depart"
          name="depart"
          className={`${classes.input} mb-3`}
          onChange={(event) => {
            setDates(event);
          }}
        />
        <input
          type="date"
          id="return"
          name="return"
          className={`${classes.input} lg:mb-3`}
          disabled={radioButton === "one_way"}
          onChange={(event) => {
            setDates(event);
          }}
        />
      </div>
    </div>
  );
}
