import formatCurrencies from "helpers/formatCurrencies";
import formatNumberWithDots from "helpers/formatNumberWithDots";
import React, { ReactElement } from "react";
import { Country, SubItem } from "types";
import List from "./List/List";

interface AppProperties {
  country: Country;
}
export default function Main({ country }: AppProperties): ReactElement {
  const languages = country.languages
    ? country.languages.map((element) => element.name, [])
    : [""];

  const currencies = country.currencies
    ? formatCurrencies(country.currencies)
    : [""];

  const population = country.population
    ? formatNumberWithDots(country.population)
    : "";

  const leftList: SubItem[] = [
    ["Flag", ""],
    ["Capital", country.capital],
    ["Region", country.region],
    ["Sub Region", country.subregion],
    ["Population", population],
  ];
  const rightList: SubItem[] = [
    ["Languages", languages],
    ["Timezone", country.timezones],
    ["Currencies", currencies],
    ["Domain", country.topLevelDomain],
  ];

  return (
    <div className="flex justify-between md:flex-row flex-col font-semibold text-lg">
      <List name="left" items={leftList} />
      <List name="right" items={rightList} />
    </div>
  );
}
