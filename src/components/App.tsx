import React, { ReactElement, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Header from "./Header";
import Home from "./Home";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import Results from "./Results";
import Settings from "./Settings";
import Trips from "./Trips";
// import LoadingOrError from "./LoadingOrError";

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
    <Router>
      {/* <Suspense fallback={<LoadingOrError />}> */}
      <Header />
      <Dashboard />
      <Switch>
        <Route path="/settings">
          <Settings />
          <Redirect push to="/settings" />
        </Route>
        <Route path="/results">
          <Results />
        </Route>
        <Route path="/trips">
          <Trips />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/">
          <Home />
        </Route>
        {/* <Route path="/notifications" component={Notifications} /> */}
      </Switch>
      {/* </Suspense> */}
    </Router>
  );
}
