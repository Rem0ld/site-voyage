/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import BackIcon from "./IconsComponents/BackIcon";

export default function BackButton(): ReactElement {
  const history = useHistory();
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ): void => {
    if (event.key === "Enter") history.goBack();
  };
  return (
    <button
      data-cy="BackLink"
      className="flex items-center gap-1 px-1 m-1 mr-0 text-secondary font-bold bg-white rounded-md focus:outline-primary"
      onClick={() => history.goBack()}
      onKeyDown={handleKeyDown}
      type="button"
    >
      <BackIcon />
      Back
    </button>
  );
}
