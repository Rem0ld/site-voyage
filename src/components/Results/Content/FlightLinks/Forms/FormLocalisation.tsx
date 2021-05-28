/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from "react";
import classes from "../styles";

interface AppProperties {
  setLocalisation: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormLocalisation({
  setLocalisation,
}: AppProperties): ReactElement {
  return (
    <div className="flex lg:flex-row flex-col lg:space-x-1">
      <div>
        <label htmlFor="from" className="block mb-2">
          From:
        </label>
        <input
          type="text"
          id="from"
          name="from"
          className={classes.input}
          onChange={(event) => {
            setLocalisation(event);
          }}
        />
      </div>
      <div>
        <label htmlFor="to" className="block lg:mb-2">
          To:
        </label>
        <input
          type="text"
          id="to"
          name="to"
          className={classes.input}
          disabled
          onChange={(event) => {
            setLocalisation(event);
          }}
        />
      </div>
    </div>
  );
}
