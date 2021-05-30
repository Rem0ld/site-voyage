import { saveTravel } from "api/server/TravelRoutes";
import Button from "components/elements/Button";
import Cookies from "js-cookie";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Country, Localisation, User } from "types";
import { SessionContext } from "../../SessionProvider";
import Comment from "./Comment";
import FlightLinks from "./FlightLinks/FlightLinks";
import Main from "./Main/Main";

interface AppProperties {
  country: Country;
}

interface Dates {
  depart: Date | undefined;
  return: Date | undefined;
}

const INITIAL_STATE_DATE: Dates = {
  depart: undefined,
  return: undefined,
};

const INITIAL_STATE_LOCALISATION: Localisation = {
  from: "",
  to: "",
};

export default function Content({ country }: AppProperties): ReactElement {
  const sessionContext = useContext(SessionContext);
  const [user, setUser] = useState<User>();
  const [disabled, setDisabled] = useState(false);
  const [dates, setDates] = useState(INITIAL_STATE_DATE);
  const [localisation, setLocalisation] = useState(INITIAL_STATE_LOCALISATION);

  // When component is mounted we check if user is connected
  // and we put it in a state
  useEffect(() => {
    const connectedUser = Cookies.getJSON("user") as User;
    if (connectedUser) setUser(connectedUser);
  }, []);

  // If user exist, we check if he filled his location
  // and fill inputs with it
  useEffect(() => {
    if (user && user.city) {
      setLocalisation((previousState) => ({
        ...previousState,
        from: user.city,
      }));
    }
  }, [user]);

  /**
   * Will update date state
   * @param event To know which input we're working with
   */
  const handleChangeDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.name === "depart") {
      setDates((previousState) => ({
        ...previousState,
        depart: new Date(event.target.value),
      }));
    } else {
      setDates((previousState) => ({
        ...previousState,
        return: new Date(event.target.value),
      }));
    }
  };

  /**
   * Will update localisation state
   * @param event To know which input we're working with
   */
  const handleChangeLocalisation = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.name === "from") {
      setLocalisation((previousState) => ({
        ...previousState,
        from: event.target.value,
      }));
    } else {
      setLocalisation((previousState) => ({
        ...previousState,
        to: event.target.value,
      }));
    }
  };

  return (
    <div className="w-full bg-gray-100 px-4">
      <div className="relative xl:w-4/5 lg:w-4/5 h-16 m-auto">
        {sessionContext && !disabled ? (
          <div className="absolute bottom-0 right-0">
            <Button
              text="Save"
              type="valid"
              size="medium"
              isButton
              onclick={() => {
                saveTravel(country, dates, localisation)
                  .then(() => {
                    setDisabled(true);
                  })
                  .finally(() => {});
              }}
            />
          </div>
        ) : (
          ""
        )}

        <h1 className="pt-4 text-3xl font-bold text-center">{country.name}</h1>
      </div>
      <img src={country.flag} alt="Country's flag" className=" w-40 m-auto" />
      <div className="xl:w-4/5 lg:w-4/5 m-auto">
        <Main country={country} />
        <FlightLinks
          setDates={handleChangeDate}
          setLocalisation={handleChangeLocalisation}
          localisation={localisation}
        />
      </div>
      <div className="flex justify-center items-center space-x-2 h-48 max-w-7xl mb-4 overflow-x-scroll bg-gray-300">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
      <div className="grid place-items-center h-40 bg-gray-300">
        No pictures yet...
      </div>
    </div>
  );
}
