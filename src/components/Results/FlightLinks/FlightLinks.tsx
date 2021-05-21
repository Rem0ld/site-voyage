/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useEffect, useState } from "react";
import classes from "./styles";

const urlSkyScanner = "https://www.skyscanner.com/";
const urlKayak = "https://www.kayak.fr/flights";
const urlGovoyages = "https://www.govoyages.com/";
const urlLastMinutes = "https://www.lastminute.com/";
const INITIAL_STATE = {
  depart: "",
  return: "",
};

export default function FlightLinks(): ReactElement {
  const [radioButton, setRadioButton] = useState("one_way");
  const [dates, setDates] = useState(INITIAL_STATE);

  const handleChangeRadio = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRadioButton(event.target.value);
  };

  const handleChangeDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.name === "depart") {
      setDates((previousState) => ({
        ...previousState,
        depart: event.target.value,
      }));
    } else {
      setDates((previousState) => ({
        ...previousState,
        return: event.target.value,
      }));
    }
  };

  useEffect(() => {
    console.log(radioButton);
    console.log(dates);
  }, [radioButton, dates]);
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
            onChange={handleChangeRadio}
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
              setRadioButton(event.target.value);
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
          onChange={handleChangeDate}
        />
        <input
          type="date"
          id="return"
          name="return"
          className={classes.input}
          disabled={radioButton === "one_way"}
          onChange={handleChangeDate}
        />
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-10 lg:w-3/5 m-auto">
        <a
          href={urlSkyScanner}
          className={`${classes.link} bg-skyScanner`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <span>skyscanner</span>
        </a>
        <a
          href={urlLastMinutes}
          className={`${classes.link} bg-lastMinutes`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <span>Last minutes</span>
        </a>
        <a
          href={urlGovoyages}
          className={`${classes.link} bg-goVoyages`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <span>Govoyages</span>
        </a>
        <a
          href={urlKayak}
          className={`${classes.link} bg-kayak`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <span>Kayak</span>
        </a>
      </div>
    </div>
  );
}
