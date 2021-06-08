import Links from "components/Links/Links";
import React, { ReactElement } from "react";
import { Localisation } from "types";
import FormDate from "./Forms/FormDate";
import FormLocalisation from "./Forms/FormLocalisation";

interface AppProperties {
  setDates: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setLocalisation: (event: React.ChangeEvent<HTMLInputElement>) => void;
  localisation: Localisation;
}

export default function FlightLinks({
  setDates,
  setLocalisation,
  localisation,
}: AppProperties): ReactElement {
  return (
    <div className="mb-4 pt-2 border-t-2">
      <div className="flex flex-col md:flex-row lg:justify-between md:justify-around justify-evenly pb-10 space-y-2 md:space-y-0">
        <FormLocalisation
          setLocalisation={setLocalisation}
          localisation={localisation}
        />
        <FormDate setDates={setDates} />
      </div>
      <div className="grid md:grid-cols-2 md:grid-rows-2 md:gap-y-4 md:gap-x-0 gap-4 justify-items-center lg:w-full m-auto">
        <Links />
      </div>
    </div>
  );
}
