import { saveTravel } from "api/server/TravelRoutes";
import Button from "components/elements/Button";
import React, { ReactElement, useContext, useState } from "react";
import { Country, Localisation } from "types";
import { SessionContext } from "../../SessionProvider";
import FlightLinks from "./FlightLinks/FlightLinks";
import Main from "./Main/Main";

interface AppProperties {
  country: Country;
}

interface Dates {
  depart: Date | undefined;
  return: Date | undefined;
}

const INITIAL_STATE_DATE: Dates = {
  depart: undefined,
  return: undefined,
};

const INITIAL_STATE_LOCALISATION: Localisation = {
  from: undefined,
  to: undefined,
};

export default function Content({ country }: AppProperties): ReactElement {
  const user = useContext(SessionContext);
  const [disabled, setDisabled] = useState(false);
  const [dates, setDates] = useState(INITIAL_STATE_DATE);
  const [localisation, setLocalisation] = useState(INITIAL_STATE_LOCALISATION);

  /**
   * Will update date state
   * @param event To know which input we're working with
   */
  const handleChangeDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.name === "depart") {
      setDates((previousState) => ({
        ...previousState,
        depart: new Date(event.target.value),
      }));
    } else {
      setDates((previousState) => ({
        ...previousState,
        return: new Date(event.target.value),
      }));
    }
  };

  /**
   * Will update localisation state
   * @param event To know which input we're working with
   */
  const handleChangeLocalisation = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.name === "from") {
      setLocalisation((previousState) => ({
        ...previousState,
        from: event.target.value,
      }));
    } else {
      setLocalisation((previousState) => ({
        ...previousState,
        to: event.target.value,
      }));
    }
  };

  return (
    <div className="w-full bg-gray-100 px-4">
      <div className="relative xl:w-4/5 lg:w-4/5 h-16 m-auto">
        {user && !disabled ? (
          <div className="absolute bottom-0 right-0">
            <Button
              text="Save"
              type="valid"
              size="medium"
              isButton
              onclick={() => {
                saveTravel(country, dates, localisation)
                  .then(() => {
                    setDisabled(true);
                  })
                  .finally(() => {});
              }}
            />
          </div>
        ) : (
          ""
        )}

        <h1 className="pt-4 text-3xl font-bold text-center">{country.name}</h1>
      </div>
      <img src={country.flag} alt="Country's flag" className=" w-40 m-auto" />
      <div className="xl:w-4/5 lg:w-4/5 m-auto">
        <Main country={country} />
        <FlightLinks
          setDates={handleChangeDate}
          setLocalisation={handleChangeLocalisation}
        />
      </div>
      <div className="grid place-items-center h-40 mb-4 bg-gray-300">
        No comments yet...
      </div>
      <div className="grid place-items-center h-40 bg-gray-300">
        No pictures yet...
      </div>
    </div>
  );
}
