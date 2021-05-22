/* eslint-disable jsx-a11y/click-events-have-key-events */
import BackIcon from "example-components/BackIcon";
import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";

export default function BackButton(): ReactElement {
  const history = useHistory();
  return (
    <div
      data-cy="BackLink"
      className="flex items-center gap-2 text-secondary hover:text-primary font-bold"
      onClick={() => history.goBack()}
      role="button"
      tabIndex={0}
    >
      <BackIcon />
      Back
    </div>
  );
}
