import BackButton from "components/elements/BackButton";
import React, { ReactElement, useEffect, useState } from "react";
import { Country } from "types";
import Content from "./Content/Content";
import Map from "./MapLeaflet";

type Data = {
  data: string;
};
type Location = {
  hash?: string;
  key?: string;
  pathname?: string;
  search?: string;
  state: [Data, Country];
};
interface AppProperties {
  location: Location;
}

export default function Results({ location }: AppProperties): ReactElement {
  const [country, setCountry] = useState<Country>({} as Country);

  useEffect(() => {
    const result: Country = location.state[1];
    setCountry(result);
  }, [location]);

  const mapLeaflet = country.latlng ? <Map latLng={country.latlng} /> : "";

  return (
    <div className="content-container relative md:w-10/12 m-auto pt-16">
      <div className="absolute top-16 right-2 z-back-button">
        <BackButton />
      </div>
      {mapLeaflet}
      <Content country={country} />
    </div>
  );
}
