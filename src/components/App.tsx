import React, { lazy, ReactElement, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoadingOrError from "./LoadingOrError";
import Results from "./Results";
import Trips from "./Trips";

const Home = lazy(() => import("./Home"));
const Settings = lazy(() => import("./Settings"));

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOrError />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/results" component={Results} />
          <Route path="/trips" component={Trips} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
