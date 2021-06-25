import { GeoJsonObject } from "geojson";
import "leaflet/dist/leaflet.css";
import React, { ReactElement } from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import map from "../../../public/world-geojson.json";

export default function Map(): ReactElement {
  return (
    <>
      <MapContainer
        center={[49, 15]}
        zoom={1.2}
        scrollWheelZoom
        className="h-96 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          url="https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=7Jw5PHD6sMMOOCqB05HeW6I8SvedYH9gGhDBt1Su2aeI6GSuXCy2nNjWdRj5ey5e"
          subdomains="abcd"
        />
        <GeoJSON data={map as GeoJsonObject} />
      </MapContainer>
    </>
  );
}
