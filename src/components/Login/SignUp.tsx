/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import urlMaker from "api/UrlMaker";
import Button from "components/elements/Button";
import { getSessionStorage } from "helpers/sessionStorage";
import Cookies from "js-cookie";
import React, { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Country, Payload, User } from "types";
import auth from "../../../firebase-auth";
import classes from "./styles";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  country?: string;
  city?: string;
  zip?: string;
};

export default function SignUp(): ReactElement {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<Inputs>();
  const history = useHistory();
  const listCountries: Country[] = getSessionStorage("countries");
  const options = listCountries.map((element) => (
    <option key={element.numericCode}>{element.name}</option>
  ));
  /**
   * Watching passwords to make sure they're the same
   * using onBlur method on both fields then on onSubmit method again
   */
  const watchConfirmPassword = watch("confirmPassword");
  const watchPassword = watch("password");

  const checkPassword = () => {
    let result = true;
    if (watchConfirmPassword !== watchPassword) {
      setError("confirmPassword", {
        type: "pattern",
        message: "Passwords do not match",
      });
      result = false;
    } else {
      clearErrors("confirmPassword");
    }
    return result;
  };

  /**
   * Makes an asynchronous call to server to create a user
   * @param data
   */
  const createAccountDatabase = async (data: Inputs) => {
    const url = urlMaker("user", "new");
    const newAccount = {
      username: data.username,
      email: data.email,
      country: data.country,
      city: data.city,
      zip: data.zip,
    };

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(newAccount), // body data type must match "Content-Type" header
    });
    return response.json();
  };

  /**
   * On form submit, it will first try to create the user in database
   * If ok, it will create credentials with firebase
   * @param data
   * Handling errors is not complete
   */
  const onSubmit: SubmitHandler<Inputs> = async (
    data: Inputs
  ): Promise<void> => {
    if (checkPassword()) {
      createAccountDatabase(data)
        .then(async (result: Payload) => {
          if (result.type === "error") throw result.error;

          auth
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(() => {
              const user = result.body as unknown;
              Cookies.set("user", user as User);
              history.push("/");
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch((error) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (error.code !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (error.code === "P2002") {
              setError("email", {
                message: "Email already in use",
              });
            }
          } else {
            console.error(error);
          }
        });
    }
  };

  return (
    <div className="content-container min-height-screen overscroll-auto py-3">
      <div className="w-11/12 max-w-lg mt-16 bg-white rounded-md">
        <h2 className="font-bold text-xl text-center pt-6">Sign Up</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg bg-white rounded-md sm:px-8 px-4 pt-4 pb-8"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className={classes.labelSignUp} htmlFor="grid-first-name">
                Username *
              </label>
              <input
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                className={classes.input}
                autoComplete="username"
                {...register("username", {
                  required: "This field is required",
                  maxLength: {
                    value: 20,
                    message: "Username should be less than 20 characters",
                  },
                  minLength: {
                    value: 2,
                    message: "Username should be more than 1 characters",
                  },
                })}
              />
              {errors.username && (
                <span className="text-red-500 text-xs italic">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className={classes.labelSignUp} htmlFor="grid-last-name">
                Email *
              </label>
              <input
                id="grid-last-name"
                type="email"
                placeholder="jane.doe@gmail.com"
                className={classes.input}
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[\w-.]+@[\w-][^\s_]{2,}\.[A-Za-z]{2,3}$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs italic">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className={classes.labelSignUp} htmlFor="grid-password">
                Password *
              </label>
              <input
                id="grid-password"
                type="password"
                placeholder="******************"
                autoComplete="new-password"
                className={classes.input}
                {...register("password", {
                  required: "This field is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\dA-Za-z]{8,}$/,
                    message:
                      "1 lowercase, 1 uppercase, 1 digit and 8 characters minimum!",
                  },
                })}
                onBlurCapture={async () => {
                  await trigger("password");
                }}
              />
              {errors.password && (
                <span className="text-red-500 text-xs italic">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className={classes.labelSignUp}
                htmlFor="grid-confirm-password"
              >
                Confirm Password *
              </label>
              <input
                id="grid-confirm-password"
                type="password"
                placeholder="******************"
                autoComplete="new-password"
                className={classes.input}
                {...register("confirmPassword", {
                  required: "This field is required",
                })}
                onBlur={checkPassword}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs italic">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className={classes.labelSignUp} htmlFor="grid-country">
                Country
              </label>
              <div className="relative">
                <select
                  id="grid-country"
                  className={classes.input}
                  {...register("country")}
                >
                  <option />
                  {options}
                </select>
              </div>
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className={classes.labelSignUp} htmlFor="grid-city">
                City
              </label>
              <input
                id="grid-city"
                type="text"
                placeholder="Paris"
                className={classes.input}
                {...register("city")}
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className={classes.labelSignUp} htmlFor="grid-zip">
                Zip
              </label>
              <input
                id="grid-zip"
                type="text"
                placeholder="90210"
                className={classes.input}
                {...register("zip")}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button
              text="Sign Up"
              type="valid"
              size="medium"
              isButton={false}
            />
            <p className="text-xs italic">* Mandatory fields</p>
          </div>
        </form>
      </div>
    </div>
  );
}
