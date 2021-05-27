/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { getUser } from "api/UserRoutes";
import Button from "components/elements/Button";
import { SessionContext } from "components/SessionProvider";
import ctl from "helpers/ctl";
import React, { ReactElement, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Redirect, useHistory } from "react-router-dom";
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

const signIn = async (email: string, password: string): Promise<void> => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.error(error);
  }
};

export default function Login(): ReactElement {
  const user = useContext(SessionContext);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  if (user) {
    return <Redirect to="/" />;
  }

  const onSubmit: SubmitHandler<Inputs> = (data): void => {
    Promise.all([signIn(data.email, data.password), getUser(data.email)])
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result[1]));
        history.push("/");
      })
      .catch((error) => console.error(error));
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
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs italic">
                This field is required
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
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs italic">
                This field is required
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
            <Link to="/forgot-password" className={link}>
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
