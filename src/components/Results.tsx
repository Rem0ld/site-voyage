import "leaflet/dist/leaflet.css";
import React, { ReactElement, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Country } from "types";

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
  console.log(location.state);
  const [country, setCountry] = useState<Country>({} as Country);

  useEffect(() => {
    const result: Country = location.state[1];
    setCountry(result);
  }, [location]);

  console.log(country.latlng);

  return country.latlng ? (
    <div className="content-container">
      <MapContainer
        center={[country.latlng[0], country.latlng[1]]}
        zoom={5}
        scrollWheelZoom={false}
        className="h-96 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[country.latlng[0], country.latlng[1]]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      Result is working
    </div>
  ) : (
    <div />
  );
}
