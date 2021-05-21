import React, { ReactElement } from "react";
import { Country } from "types";
import List from "./List";

interface AppProperties {
  country: Country;
}

export default function Content({ country }: AppProperties): ReactElement {
  const languages = country.languages
    ? country.languages.map((element) => element.name, [])
    : [""];

  const currencies = country.currencies
    ? country.currencies.map(
        (element) => `${element.code} ${element.name} ${element.symbol} `,
        []
      )
    : [""];

  return (
    <div className="w-full bg-gray-100">
      <h1 className="pt-4 text-3xl font-bold text-center">{country.name}</h1>
      <img
        src={country.flag}
        alt="Country's flag"
        className=" w-40 h-40 m-auto"
      />
      <div className="flex justify-around font-semibold text-lg">
        <List
          name="left"
          items={[
            ["Capital", country.capital],
            ["Region", country.region],
            ["Sub Region", country.subregion],
            ["Population", country.population],
            ["Languages", languages],
          ]}
        />
        <List
          name="right"
          items={[
            ["Flag", ""],
            ["Timezone", country.timezones],
            ["Currencies", currencies],
            ["Domain", country.topLevelDomain],
          ]}
        />
      </div>
    </div>
  );
}
