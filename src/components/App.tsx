import React, { lazy, ReactElement, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import LoadingOrError from "./LoadingOrError";

const Header = lazy(() => import("./Header"));
const Home = lazy(() => import("./Home"));
const EmailSubmitted = lazy(() => import("./Login/EmailSubmitted"));
const ForgotPassword = lazy(() => import("./Login/ForgotPassword"));
const Login = lazy(() => import("./Login/Login"));
const SignUp = lazy(() => import("./Login/SignUp"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const Results = lazy(() => import("./Results/Results"));
const Settings = lazy(() => import("./SettingsComponent/Settings"));
const Trips = lazy(() => import("./Trips/Trips"));

export default function App(): ReactElement {
  return (
    <Router>
      <Suspense fallback={<LoadingOrError />}>
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
        </Switch>
      </Suspense>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </Router>
  );
}
