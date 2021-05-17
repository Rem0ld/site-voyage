/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import Button from "components/elements/Button";
import ctl from "helpers/ctl";
import React, { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

const input = ctl(`
appearance-none 
block 
w-full
bg-gray-100 
border 
border-gray-100 
rounded 
py-3 
px-4 
leading-tight 
outline-none
focus:outline-none
focus:bg-white
focus:ring-primary
focus:border-primary
`);

const label = ctl(`
block 
mb-2
text-sm 
font-bold 
`);

const link = ctl(`
inline-block 
align-baseline 
font-bold 
text-sm 
text-primary 
hover:underline
`);

const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

export default function Login(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <div className="content-container">
      <div className="w-full max-w-xs bg-white rounded-md">
        <h2 className="font-bold text-xl text-center pt-6">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-4 pb-8"
        >
          <div className="mb-4">
            <label className={label} htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className={input}
              {...register("username", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs italic">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-6">
            <label className={label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="******************"
              className={input}
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
            <a href="#" className={link}>
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
