/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useEffect, useState } from "react";
import { User } from "types";
import Button from "../elements/Button";
import TopLine from "../elements/TopLine";
import FormPassword from "./FormPassword";
import FormUpdate from "./FormUpdate";
import PopupDanger from "./PopupDanger";
import classes from "./styles";

export default function Settings(): ReactElement {
  const [user, setUser] = useState<User>();
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isModifying, setIsModifying] = useState(false);

  useEffect(() => {
    const connectedUser = JSON.parse(
      localStorage.getItem("user") as string
    ) as User;
    setUser(connectedUser);
  }, []);

  const modifyInformation = () => {
    setIsModifying((previousState) => !previousState);
  };

  const handleIsDeletingAccount = () => {
    setIsDeletingAccount((state) => !state);
  };

  return (
    <div className="pt-16 md:w-10/12 m-auto pb-10 mt-1 bg-white">
      {isDeletingAccount ? (
        <PopupDanger
          cancelDeleteAccount={handleIsDeletingAccount}
          user={user}
        />
      ) : (
        ""
      )}
      <TopLine title="Settings" />
      <div className="h-auto px-4 xl:w-3/5 md:w-4/5 m-auto">
        <h2 className="pl-10 text-4xl font-bold">
          {user?.username ?? user?.email}
        </h2>

        <FormUpdate
          isModifying={isModifying}
          modifyInformation={modifyInformation}
        />
        <div className="my-8">
          <span className={classes.label}>Email:</span>
          <span>{user?.email}</span>
        </div>

        <FormPassword />

        <div className="flex justify-between md:w-2/6 mt-20">
          <Button
            text="Delete my account"
            type="danger"
            size="medium"
            isButton
            onclick={handleIsDeletingAccount}
          />
        </div>
      </div>
    </div>
  );
}
