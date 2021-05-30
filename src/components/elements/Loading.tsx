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
  const { isLoading, isError, data } = useQuery("country", async () => {
    await getCountry(winner.numericCode);
  });

  if (isLoading || isError) {
    return <LoadingAnimation />;
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
