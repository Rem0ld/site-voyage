/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from "react";
import { Localisation } from "types";
import classes from "../styles";

interface AppProperties {
  setLocalisation: (event: React.ChangeEvent<HTMLInputElement>) => void;
  localisation: Localisation;
}

export default function FormLocalisation({
  setLocalisation,
  localisation,
}: AppProperties): ReactElement {
  return (
    <div className="flex xl:flex-row flex-col lg:space-x-0">
      <div>
        <label htmlFor="from" className="block mb-2">
          From:
        </label>
        <input
          type="text"
          id="from"
          name="from"
          value={localisation.from}
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
          value={localisation.to}
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
