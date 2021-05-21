import "leaflet/dist/leaflet.css";
import React, { ReactElement } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface AppProperties {
  latLng: number[];
}

export default function MapLeaflet({ latLng }: AppProperties): ReactElement {
  return (
    <div className="w-full">
      <MapContainer
        center={[latLng[0], latLng[1]]}
        zoom={5}
        scrollWheelZoom={false}
        className="h-96 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latLng[0], latLng[1]]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
