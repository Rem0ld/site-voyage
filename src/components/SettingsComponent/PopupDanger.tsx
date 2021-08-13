/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { deleteUser } from "apis/server/UserRoutes";
import Button from "components/Elements/Button";
import { SessionContext } from "components/SessionProvider";
import ctl from "helpers/ctl";
import React, { ReactElement, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Payload, User } from "types";
// import auth from "../../../firebase-auth";
import classes from "../Login/styles";

interface AppProperties {
  user: User | undefined;
  cancelDeleteAccount: () => void;
}
type Input = {
  password: string;
};

const popin = ctl(`
absolute 
top-2/4 
left-2/4 
grid 
place-items-center 
w-80
p-4
-translate-y-2/4 
-translate-x-2/4 
transform-gpu 
shadow-md 
border 
rounded-md 
bg-white
`);

export default function PopupDanger({
  user,
  cancelDeleteAccount,
}: AppProperties): ReactElement {
  const sessionContext = useContext(SessionContext);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const deleteDataServer: SubmitHandler<Input> = (data) => {
    if (user) {
      const email = sessionContext?.email as string;
      console.log("data", data, "email", email);

      auth
        .signInWithEmailAndPassword(email, data.password)
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});

      setIsDeleted(true);
      setTimeout(() => {
        sessionContext
          ?.delete()
          .then(() => {
            deleteUser(user.email)
              .then((result: Payload) => {
                if (result.type === "error") throw result.error;
              })
              .finally(() => {});
          })
          .catch((error) => {
            console.log(error);
          });
      }, 2000);
    }
  };

  return (
    <div className={popin}>
      {!isDeleted ? (
        <div>
          <span className="w-full m-auto text-lg font-semibold">
            If you confirm all data will be lost
          </span>
          <div className="flex justify-evenly w-full mt-6">
            <form onSubmit={handleSubmit(deleteDataServer)} className="">
              <div className="mb-4">
                <label className="" htmlFor="password">
                  Please enter your password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="**********"
                  className={classes.input}
                  {...register("password", {
                    required: "This field is required",
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs italic">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Button
                  text="Cancel"
                  type="standard"
                  size="medium"
                  isButton
                  onclick={cancelDeleteAccount}
                />
                <Button
                  text="Confirm"
                  type="danger"
                  size="medium"
                  isButton={false}
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center h-40">
          <div>
            <p className="text-lg font-semibold">
              Your account has been deleted.
            </p>
            <p className="text-lg font-semibold">
              We hope to see you soon again.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
