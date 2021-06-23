import Cookies from "js-cookie";
import React, { ReactElement, useEffect, useState } from "react";
import Button from "./Button";

interface AppProperties {
  toggleMenu: () => void;
}

export default function ModalWelcome({
  toggleMenu,
}: AppProperties): ReactElement {
  const [steps, setsteps] = useState([false, false, false, false]);

  useEffect(() => {
    // Cookies.set("intro", "true");
    const intro = Cookies.get("intro");
    if (intro) {
      const newSteps = steps.map(() => true);
      setsteps(newSteps);
    }
  }, [steps]);

  const handleNext = () => {
    toggleMenu();
  };

  const closeModal = () => {
    const newSteps = steps.map(() => true);
    setsteps(newSteps);
  };

  return !steps[0] ? (
    <div className="bg-img absolute w-2/6 h-64 t-2/4 l-2/4 z-50 bg-white p-4 rounded-md">
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
          size="small"
          isButton
          onclick={closeModal}
        />
        <Button
          text="Next"
          type="valid"
          size="small"
          isButton
          onclick={handleNext}
        />
      </div>
    </div>
  ) : (
    <div />
  );
}
