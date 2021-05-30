import getCountry from "api/server/countryRoutes";
import LoadingAnimation from "components/LoadingAnimation";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";
import { Country } from "types";

interface AppProperties {
  winner: Country;
}

export default function Loading({ winner }: AppProperties): ReactElement {
  const { isLoading, isError, data } = useQuery<Country>(
    ["country", winner],
    () => getCountry(winner.numericCode).finally(() => {})
  );

  if (isLoading) {
    return <LoadingAnimation />;
  }
  if (isError) {
    console.log("country doesn't exist in db");
  }

  return (
    <Redirect
      to={{
        pathname: "/results",
        state: [data, winner],
      }}
    />
  );
}
