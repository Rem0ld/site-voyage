import Cookies from "js-cookie";
import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import auth from "../../../firebase-auth";
import classes from "../elements/MenuDropdown/style";

export default function LogoutButton(): ReactElement {
  const history = useHistory();

  /**
   * Signs out from Firebase, removes JWT
   * removes user information in cookies
   * then send back to home
   */
  const signOut = async (): Promise<void> => {
    await auth.signOut();
    localStorage.removeItem("@token");
    Cookies.remove("user");
    history.push("/");
  };
  return (
    <button
      onClick={signOut}
      className={`${classes.link} w-full text-left`}
      type="button"
      tabIndex={0}
    >
      Log out
    </button>
  );
}
