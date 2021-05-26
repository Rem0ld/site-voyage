/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getTravel, updateTravel } from "api/TravelRoutes";
import React, { ReactElement, useEffect, useState } from "react";
import { Travel } from "types";
import TopLine from "../elements/TopLine";
import TripItem from "./TripItem";

export default function Trips(): ReactElement {
  const [travels, setTravels] = useState<Travel[]>([]);
  // const [travelUpcoming, setTravelUpcoming] = useState<Travel[]>();
  // const [travelDone, setTravelDone] = useState<Travel[]>();

  useEffect(() => {
    getTravel()
      .then((travel: Travel[]) => {
        setTravels(travel);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {}, [travels]);

  const handleUpdateTravel = (id: number): void => {
    updateTravel(id)
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});

    setTravels((previousState) => {
      const newState = previousState.map((element) => {
        const object = element;
        if (object.id === id) {
          object.done = true;
        }
        return object;
      });
      console.log(previousState);
      return newState;
    });
  };

  return (
    <div className="min-height-screen pt-16 md:w-10/12 m-auto pb-10 mt-1 bg-white">
      <TopLine title="My trips" />

      <div className="grid gap-y-28 mt-20">
        <div className="h-auto md:w-4/5 w-full md:px-4 px-1 m-auto border-gray-400 md:border-l-2">
          <h3 className="mb-2 text-xl font-semibold border-gray-400 border-b">
            Upcoming
          </h3>

          {travels
            ?.filter((element) => element.done)
            .map((element) => (
              <TripItem
                travel={element}
                key={element.id}
                updateTravel={handleUpdateTravel}
              />
            ))}
        </div>

        <div className="h-auto md:w-4/5 w-full md:px-4 px-1 m-auto border-gray-400 md:border-l-2">
          <h3 className="text-xl font-semibold border-b">Done</h3>
          {travels
            ?.filter((element) => !element.done)
            .map((element) => (
              <TripItem
                travel={element}
                key={element.id}
                updateTravel={handleUpdateTravel}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
