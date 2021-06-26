import React, { ReactElement } from "react";
import Button from "../Button";

interface AppProperties {
  handleNext: () => void;
  closeModal: () => void;
}

export default function FirstStep({
  handleNext,
  closeModal,
}: AppProperties): ReactElement {
  return (
    <>
      <div className="grid place-items-center h-5/6 text-center font-bold">
        <div>
          <h2>Welcome to Audacious Venture</h2>
          <h2>Let me show you how to use the application</h2>
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          text="Cancel"
          type="standard"
          size="medium"
          isButton
          onclick={closeModal}
        />
        <Button
          text="Next"
          type="valid"
          size="medium"
          isButton
          onclick={handleNext}
        />
      </div>
    </>
  );
}
