/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import BackIcon from "./IconsComponents/BackIcon";

export default function BackButton(): ReactElement {
  const history = useHistory();
  return (
    <div
      data-cy="BackLink"
      className="flex items-center gap-2 text-secondary font-bold"
      onClick={() => history.goBack()}
      role="button"
      tabIndex={0}
    >
      <BackIcon />
      Back
    </div>
  );
}
