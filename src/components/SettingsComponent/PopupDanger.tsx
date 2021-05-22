import Button from "components/elements/Button";
import React, { ReactElement } from "react";

interface AppProperties {
  deleteAccount: () => void;
}

const deleteDataServer = () => {
  console.log("Deleting...");
};

export default function PopupDanger({
  deleteAccount,
}: AppProperties): ReactElement {
  return (
    <div className="absolute top-2/4 left-2/4 grid place-items-center w-80 h-40 -translate-y-2/4 -translate-x-2/4 transform-gpu shadow-md border rounded-md bg-white">
      <div>
        <span className="text-lg font-semibold">
          If you confirm all data will be lost
        </span>
        <div className="flex justify-evenly w-full mt-6">
          <Button
            text="Cancel"
            type="standard"
            size="medium"
            isButton
            onclick={deleteAccount}
          />
          <Button
            text="Confirm"
            type="danger"
            size="medium"
            isButton
            onclick={deleteDataServer}
          />
        </div>
      </div>
    </div>
  );
}
