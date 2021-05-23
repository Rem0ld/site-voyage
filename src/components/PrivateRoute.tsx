/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { SessionContext } from "./SessionProvider";

export default function PrivateRoute({
  component: Component,
  path,
}: RouteProps): ReactElement {
  const user = useContext(SessionContext);
  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Route component={Component} path={path} />;
}
