import React, { lazy, ReactElement, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoadingOrError from "./LoadingOrError";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import Results from "./Results";
import Trips from "./Trips";

const Home = lazy(() => import("./Home"));
const Settings = lazy(() => import("./Settings"));

/**
 * If menu dropdown is open and click happens on body, closes menu dropdown
 */
const closeMenu = (): void => {
  const isOpen: Element | null = document.querySelector(".menu");
  if (!isOpen?.classList.contains("opacity-0")) {
    isOpen?.classList.toggle("opacity-0");
  }
};

export default function App(): ReactElement {
  // Add event listener when component is mounted and remove it when unmounted
  useEffect(() => {
    document.querySelector("body")?.addEventListener("click", closeMenu);

    return function cleanup() {
      document.removeEventListener("click", closeMenu);
    };
  }, []);
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOrError />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/results" component={Results} />
          <Route path="/trips" component={Trips} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          {/* <Route path="/notifications" component={Notifications} /> */}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
