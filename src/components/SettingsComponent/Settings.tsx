/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Cookies from "js-cookie";
import React, { ReactElement, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { User } from "types";
import Button from "../elements/Button";
import TopLine from "../elements/TopLine";
import FormPassword from "./FormPassword";
import FormUpdate from "./FormUpdate";
import PopupDanger from "./PopupDanger";

export default function Settings(): ReactElement {
  const [user, setUser] = useState<User>();
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isModifying, setIsModifying] = useState(false);

  useEffect(() => {
    const connectedUser = Cookies.getJSON("user") as User;
    console.log(connectedUser);
    if (!connectedUser) {
      <Redirect to="/login" />;
    }
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
        <h2 className="pl-10 text-4xl font-bold text-center">
          {user?.username ?? user?.email}
        </h2>

        <div className="my-8 shadow-inner border rounded-md p-2">
          <h2 className="inline pr-2 mb-2 text-xl font-bold">Email:</h2>
          <span className="italic text-gray-400">{user?.email}</span>
        </div>

        <FormUpdate
          isModifying={isModifying}
          modifyInformation={modifyInformation}
        />

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
