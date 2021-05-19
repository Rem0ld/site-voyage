import React, { ReactElement, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./elements/Loading";
import Header from "./Header";
import Home from "./Home";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import Results from "./Results";
import Settings from "./Settings";
import Trips from "./Trips";

/**
 * If menu dropdown is open and click happens on body, closes dropdown menu
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
    <Router>
      {/* <Suspense fallback={<LoadingOrError />}> */}
      <Header />
      <Switch>
        <Route path="/settings" component={Settings} />
        <Route path="/results" component={Results} />
        <Route path="/trips" component={Trips} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Suspense fallback={<Loading />}>
          <Route exact path="/" component={Home} />
        </Suspense>
        {/* <Route path="/notifications" component={Notifications} /> */}
      </Switch>
      {/* </Suspense> */}
      <div className="w-full text-center">
        &copy; Copyright 2021 - Pierre Lovergne
      </div>
    </Router>
  );
}
