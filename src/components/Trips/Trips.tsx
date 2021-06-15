/* eslint-disable jsx-a11y/click-events-have-key-events */
import { deleteTravel, getTravel, updateTravel } from "api/server/TravelRoutes";
import React, { ReactElement, useEffect, useState } from "react";
import { Travel } from "types";
import TopLine from "../elements/TopLine";
import TripItem from "./TripItem";

export default function Trips(): ReactElement {
  const [travels, setTravels] = useState<Travel[]>([]);

  useEffect(() => {
    getTravel()
      .then((travel: Travel[]) => {
        if (travel.length > 0) {
          setTravels(travel);
        } else {
          console.log("no travel");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpdateTravel = (id: number): void => {
    updateTravel(id).finally(() => {});
    setTravels((previousState) =>
      previousState.map((travel) => {
        const newTravel = travel;
        if (newTravel.id === id) {
          newTravel.done = true;
        }
        return newTravel;
      })
    );
  };

  const handleDeleteTravel = (id: number): void => {
    deleteTravel(id).finally(() => {});
    setTravels((previousState) =>
      previousState.filter((travel) => travel.id !== id)
    );
  };

  return (
    <div className="min-height-screen pt-16 md:w-10/12 m-auto pb-10 bg-white">
      <TopLine title="My trips" />

      <div className="grid gap-y-28 mt-20">
        <div className="h-auto md:w-4/5 w-full md:px-4 px-1 m-auto border-gray-400 md:border-l-2">
          <h3 className="mb-2 text-xl font-semibold border-gray-400 border-b">
            Upcoming
          </h3>

          {travels &&
            travels
              ?.filter((travel) => !travel.done)
              .map((travel) => (
                <TripItem
                  travel={travel}
                  key={travel.id}
                  updateTravel={handleUpdateTravel}
                  deleteTravel={handleDeleteTravel}
                />
              ))}
        </div>

        <div className="h-auto md:w-4/5 w-full md:px-4 px-1 m-auto border-gray-400 md:border-l-2">
          <h3 className="text-xl font-semibold border-b">Done</h3>
          {travels &&
            travels
              ?.filter((travel) => travel.done)
              .map((travel) => (
                <TripItem
                  travel={travel}
                  key={travel.id}
                  updateTravel={handleUpdateTravel}
                  deleteTravel={handleDeleteTravel}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
