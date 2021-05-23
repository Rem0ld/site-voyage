import "leaflet/dist/leaflet.css";
import React, { ReactElement } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface AppProperties {
  latLng: number[];
}

export default function MapLeaflet({ latLng }: AppProperties): ReactElement {
  const [lat, lng] = latLng;

  return (
    <>
      <MapContainer
        center={[lat, lng]}
        zoom={5}
        scrollWheelZoom
        className="h-96 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            {lat === 0 && lng === 0 ? "This is the center of the world!" : ""}
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
