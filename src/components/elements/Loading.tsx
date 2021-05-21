import getFakeData from "api/fakeData";
import LoadingOrError from "components/LoadingOrError";
import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";
import { Country } from "types";

interface AppProperties {
  winner: Country;
}

export default function Loading({ winner }: AppProperties): ReactElement {
  const { isLoading, isError, error, data } = useQuery("data", getFakeData);

  useEffect(() => {}, []);

  setTimeout(() => {}, 3000);

  if (isLoading || isError) {
    return <LoadingOrError error={error as Error} />;
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
