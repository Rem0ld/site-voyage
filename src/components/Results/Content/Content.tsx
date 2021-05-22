import formatNumberWithDots from "helpers/formatNumberWithDots";
import React, { ReactElement } from "react";
import { Country } from "types";
import FlightLinks from "../FlightLinks/FlightLinks";
import List from "./List";

interface AppProperties {
  country: Country;
}

export default function Content({ country }: AppProperties): ReactElement {
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
      <h1 className="pt-4 text-3xl font-bold text-center">{country.name}</h1>
      <img src={country.flag} alt="Country's flag" className=" w-40 m-auto" />
      <div className="xl:w-3/5 lg:w-4/5 m-auto">
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
        <FlightLinks />
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
