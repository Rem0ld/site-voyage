import { saveCountry } from "api/server/countryRoutes";
import BackButton from "components/elements/BackButton";
import React, { ReactElement, useEffect, useState } from "react";
import { Country } from "types";
import Content from "./Content/Content";
import Map from "./MapLeaflet";

type Location = {
  hash?: string;
  key?: string;
  pathname?: string;
  search?: string;
  state: [Country | null, Country];
};

interface AppProperties {
  location: Location;
}

export default function Results({ location }: AppProperties): ReactElement {
  const [country, setCountry] = useState<Country>({} as Country);

  useEffect(() => {
    if (location) {
      if (location.state[0]) {
        setCountry(location.state[0]);
        saveCountry(location.state[0]).finally(() => {});
      } else {
        setCountry(location.state[1]);
        saveCountry(location.state[1]).finally(() => {});
      }
    }
  }, [location]);

  const mapLeaflet = country.latlng ? <Map latLng={country.latlng} /> : "";

  return (
    <div className="content-container relative md:w-10/12 m-auto pt-16">
      <div className="absolute top-16 right-2 z-back-button">
        <BackButton />
      </div>
      <div className="w-full h-96">{mapLeaflet}</div>
      <Content country={country} />
    </div>
  );
}
