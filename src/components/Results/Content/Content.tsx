import Cookies from "js-cookie";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Country, Localisation, User } from "types";
import { SessionContext } from "../../SessionProvider";
import CarouselComments from "./CarouselComments/CarouselComments";
import CarouselPictures from "./CarouselPictures/CarouselPictures";
import FlightLinks from "./FlightLinks/FlightLinks";
import Main from "./Main/Main";
import classes from "./styles";

interface AppProperties {
  country: Country;
  isSaved: boolean;
  save: () => void;
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

export default function Content({
  country,
  isSaved,
  save,
}: AppProperties): ReactElement {
  const sessionContext = useContext(SessionContext);
  const [user, setUser] = useState<User>();
  const [dates, setDates] = useState(INITIAL_STATE_DATE);
  const [localisation, setLocalisation] = useState(INITIAL_STATE_LOCALISATION);

  // When component is mounted we check if user is connected
  // and we put it in a state
  useEffect(() => {
    const connectedUser = Cookies.getJSON("user") as User;
    if (connectedUser) setUser(connectedUser);
  }, []);

  // If user exist, we check if he filled his localisation
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
    <div className="w-full px-4 bg-gray-100">
      <div className="relative xl:w-4/5 lg:w-4/5 h-16 m-auto">
        {/* <div className="absolute bottom-0 right-0">
          {sessionContext && !isSaved ? (
            <Button
              text="Save"
              type="valid"
              size="medium"
              isButton
              onclick={() => {
                saveTravel(country, dates, localisation)
                  .then(() => {
                    save();
                  })
                  .finally(() => {});
              }}
            />
          ) : (
            <Link to="/trips">
              <Button
                text="See in trips"
                type="standard"
                size="medium"
                isButton
              />
            </Link>
          )}
        </div> */}

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
      <div className={classes.carousel}>
        <CarouselComments list={country.review} />
      </div>
      <div className={classes.carousel}>
        <CarouselPictures list={country.picture} />
      </div>
    </div>
  );
}
