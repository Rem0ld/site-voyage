/* eslint-disable react/jsx-props-no-spreading */
import Button from "components/elements/Button";
import React, { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./styles";

interface AppProperties {
  isModifying: boolean;
  modifyInformation: () => void;
}

type Inputs = {
  country: string;
  city: string;
  zip: string;
};

const onSubmit: SubmitHandler<Inputs> = (data) => {
  console.log("Valid", data);
};

export default function FormUpdate({
  isModifying,
  modifyInformation,
}: AppProperties): ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <div className="mt-8">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex md:flex-row flex-col md:items-center my-2">
          <div className="">
            <label htmlFor="zip" className={classes.label}>
              Zip:{" "}
            </label>
            <input
              id="zip"
              type="text"
              className={`${classes.input} mr-2 lg:pl-8`}
              disabled={!isModifying}
              {...register("zip", { required: "This field is required" })}
            />
            {errors.zip && (
              <span className="block text-red-500 text-xs italic">
                {errors.zip.message}
              </span>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="city" className={classes.label}>
              City:{" "}
            </label>
            <input
              id="city"
              type="text"
              className={classes.input}
              disabled={!isModifying}
              {...register("city", { required: "This field is required" })}
            />
            {errors.city && (
              <span className="block text-red-500 text-xs italic">
                {errors.city.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="country" className={classes.label}>
            Country:{" "}
          </label>
          <input
            id="country"
            type="text"
            className={classes.input}
            disabled={!isModifying}
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="block text-red-500 text-xs italic">
              {errors.country.message}
            </span>
          )}
        </div>
        <div className="flex justify-between lg:w-2/6 w-2/4 my-4">
          <Button
            text={isModifying ? "Cancel" : "Modify"}
            type="standard"
            size="medium"
            isButton
            onclick={modifyInformation}
          />

          {isModifying ? (
            <Button text="Submit" type="valid" size="medium" isButton={false} />
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}
