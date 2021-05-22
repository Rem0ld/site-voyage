/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../elements/Button";
import classes from "./styles";

type Password = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function FormPassword(): ReactElement {
  const {
    handleSubmit,
    watch,
    setError,
    clearErrors,
    register,
    trigger,
    formState: { errors },
  } = useForm<Password>();
  /**
   * Watching passwords to make sure they're the same
   * using onBlur method on both fields then on onSubmit method again
   */
  const watchConfirmPassword = watch("confirmPassword");
  const watchPassword = watch("newPassword");

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

  const onSubmit: SubmitHandler<Password> = (data) => {
    if (checkPassword()) {
      console.log("Valid", data);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Change password:</h3>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-y-4">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="currentPassword" className={classes.label}>
              Current Password:{" "}
            </label>
            <input
              id="currentPassword"
              type="password"
              className={classes.inputPassword}
              {...register("currentPassword", {
                required: "This field is required",
              })}
            />
            {errors.currentPassword && (
              <span className="text-red-500 text-xs italic">
                {errors.currentPassword.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="newPassword" className={classes.label}>
              New Password:{" "}
            </label>
            <input
              id="newPassword"
              type="password"
              className={classes.inputPassword}
              {...register("newPassword", {
                required: "This field is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\dA-Za-z]{8,}$/,
                  message:
                    "1 lowercase, 1 uppercase, 1 digit and 8 characters minimum!",
                },
              })}
              onBlurCapture={async () => {
                await trigger("newPassword");
              }}
            />
            {errors.newPassword && (
              <span className="text-red-500 text-xs italic">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="confirmPassword" className={classes.label}>
              Confirm Password:{" "}
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={classes.inputPassword}
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

        <div className="flex justify-between w-2/6 my-4">
          <Button text="Change" type="valid" size="medium" isButton={false} />
        </div>
      </form>
    </div>
  );
}
