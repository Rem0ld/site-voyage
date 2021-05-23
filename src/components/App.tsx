/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import EmailSubmitted from "./Login/EmailSubmitted";
import ForgotPassword from "./Login/ForgotPassword";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import PrivateRoute from "./PrivateRoute";
import Results from "./Results/Results";
import { SessionProvider } from "./SessionProvider";
import Settings from "./SettingsComponent/Settings";
import Trips from "./Trips";

export default function App(): ReactElement {
  return (
    <SessionProvider>
      <Router>
        {/* <Suspense fallback={<LoadingOrError />}> */}
        <Header />
        <Switch>
          <PrivateRoute component={Settings} path="/settings" />
          <PrivateRoute component={Trips} path="/trips" />
          <Route path="/results" component={Results} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/email-submitted" component={EmailSubmitted} />
          <Route exact path="/" component={Home} />
          <Redirect to="/login" />
          {/* <Route path="/notifications" component={Notifications} /> */}
        </Switch>
        {/* </Suspense> */}
        <div className="w-full text-center">
          &copy; Copyright 2021 - Pierre Lovergne
        </div>
      </Router>
    </SessionProvider>
  );
}
