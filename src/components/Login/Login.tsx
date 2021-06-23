/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { getUser } from "api/server/UserRoutes";
import Button from "components/Elements/Button";
import Spinner from "components/Elements/IconsComponents/Spinner";
import { SessionContext } from "components/SessionProvider";
import firebase from "firebase/app";
import ctl from "helpers/ctl";
import Cookies from "js-cookie";
import React, { ReactElement, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { User } from "types";
import auth from "../../../firebase-auth";
import classes from "./styles";

type Inputs = {
  email: string;
  password: string;
};

const link = ctl(`
inline-block 
align-baseline 
font-bold 
text-sm 
text-primary 
hover:underline
`);

type ErrorLogin = {
  a: any;
  code: string;
  message: string;
};

const signIn = async (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  auth.signInWithEmailAndPassword(email, password);

export default function Login(): ReactElement {
  const sessionContext = useContext(SessionContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);

  if (sessionContext) {
    return <Redirect to="/" />;
  }

  const onSubmit: SubmitHandler<Inputs> = (data): void => {
    setIsLoading(true);
    signIn(data.email, data.password)
      .then(async (result) => {
        setIsLoading(false);
        const { user } = result;
        // Getting JWT token and saving it
        const token = await user?.getIdToken(true);
        if (token) localStorage.setItem("@token", token);

        // Getting user info from DB
        const userDB = (await getUser(data.email)) as User;
        // Setting user information in cookie
        Cookies.set("user", userDB);
        return <Redirect to="/" />;
      })
      .catch((error: ErrorLogin) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          setError("password", {
            message: errorMessage,
          });
        }

        if (
          errorCode === "auth/user-not-found" ||
          errorCode === "auth/invalid-email"
        ) {
          setError("email", {
            message: errorMessage,
          });
        }
      });
  };

  return (
    <div className="content-container">
      <div className="w-11/12 max-w-xs mx-4 mt-16 bg-white rounded-md">
        <h2 className="font-bold text-xl text-center pt-6">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-4 pb-8"
        >
          <div className="mb-4">
            <label className={classes.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              className={classes.input}
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs italic">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-6">
            <label className={classes.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="******************"
              className={classes.input}
              {...register("password", { required: "This field is required" })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs italic">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button
              text="Connect"
              type="valid"
              size="medium"
              isButton={false}
            />
            {isLoading ? <Spinner /> : ""}
            <Link to="/forgot-password" className={link}>
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
