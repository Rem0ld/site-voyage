import { saveTravel } from "api/TravelRoutes";
import Button from "components/elements/Button";
import formatNumberWithDots from "helpers/formatNumberWithDots";
import React, { ReactElement, useContext, useState } from "react";
import { Country } from "types";
import { SessionContext } from "../../SessionProvider";
import FlightLinks from "../FlightLinks/FlightLinks";
import List from "./List";

interface AppProperties {
  country: Country;
}

interface Dates {
  depart: Date | undefined;
  return: Date | undefined;
}

const INITIAL_STATE: Dates = {
  depart: undefined,
  return: undefined,
};

export default function Content({ country }: AppProperties): ReactElement {
  const user = useContext(SessionContext);
  const [dates, setDates] = useState(INITIAL_STATE);
  const [disabled, setDisabled] = useState(false);

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

  const languages = country.languages
    ? country.languages.map((element) => element.name, [])
    : [""];

  const currencies = country.currencies
    ? country.currencies.map((element) => {
        if (element.code !== null) {
          return `${element.code} ${element.name} ${element.symbol} `;
        }
        return "";
      }, [])
    : [""];

  const population = country.population
    ? formatNumberWithDots(country.population)
    : "";

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
                saveTravel(country, dates)
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
        <div className="flex justify-between md:flex-row flex-col font-semibold text-lg">
          <List
            name="left"
            items={[
              ["Flag", ""],
              ["Capital", country.capital],
              ["Region", country.region],
              ["Sub Region", country.subregion],
              ["Population", population],
            ]}
          />
          <List
            name="right"
            items={[
              ["Languages", languages],
              ["Timezone", country.timezones],
              ["Currencies", currencies],
              ["Domain", country.topLevelDomain],
            ]}
          />
        </div>
        <FlightLinks setDates={handleChangeDate} />
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
