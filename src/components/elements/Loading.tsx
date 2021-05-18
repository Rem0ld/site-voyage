import getFakeData from "api/fakeData";
import LoadingOrError from "components/LoadingOrError";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";

export default function Loading(): ReactElement {
  const { isLoading, isError, error, data } = useQuery("data", getFakeData);
  if (isLoading || isError) {
    return <LoadingOrError error={error as Error} />;
  }

  return (
    <Redirect
      to={{
        pathname: "/results",
        state: data,
      }}
    />
  );
}
