/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import BackIcon from "./IconsComponents/BackIcon";

export default function BackButton(): ReactElement {
  const history = useHistory();
  return (
    <div
      data-cy="BackLink"
      className="flex items-center gap-1 px-1 m-1 mr-0 text-secondary font-bold bg-white rounded-md"
      onClick={() => history.goBack()}
      role="button"
      tabIndex={0}
    >
      <BackIcon />
      Back
    </div>
  );
}
