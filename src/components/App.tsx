import React, { ReactElement } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import Results from "./Results/Results";
import Settings from "./SettingsComponent/Settings";
import Trips from "./Trips";

export default function App(): ReactElement {
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
        <Route exact path="/" component={Home} />
        {/* <Route path="/notifications" component={Notifications} /> */}
      </Switch>
      {/* </Suspense> */}
      <div className="w-full text-center">
        &copy; Copyright 2021 - Pierre Lovergne
      </div>
    </Router>
  );
}
