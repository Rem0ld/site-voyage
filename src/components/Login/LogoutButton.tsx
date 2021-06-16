import LogoutIcon from "components/elements/IconsComponents/LogoutIcon";
import Cookies from "js-cookie";
import React, { ReactElement } from "react";
import { Redirect } from "react-router-dom";
import auth from "../../../firebase-auth";
import classes from "../elements/Menu/style";

export default function LogoutButton(): ReactElement {
  /**
   * Signs out from Firebase, removes JWT
   * removes user information in cookies
   * then send back to home
   */
  const signOut = async (): Promise<ReactElement> => {
    await auth.signOut();
    localStorage.removeItem("@token");
    Cookies.remove("user");
    return <Redirect to="/" />;
  };

  const cssLinks = window.innerWidth < 640 ? classes.link : classes.linkDesktop;
  return (
    <button
      onClick={signOut}
      className={`${cssLinks} w-full text-left`}
      type="button"
      tabIndex={0}
    >
      <LogoutIcon />
      Log out
    </button>
  );
}
