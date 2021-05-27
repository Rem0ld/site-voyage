import { deleteUser } from "api/UserRoutes";
import Button from "components/elements/Button";
import { SessionContext } from "components/SessionProvider";
import ctl from "helpers/ctl";
import React, { ReactElement, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { User } from "types";

interface AppProperties {
  user: User | undefined;
  cancelDeleteAccount: () => void;
}

const popin = ctl(`
absolute 
top-2/4 
left-2/4 
grid 
place-items-center 
w-80 
h-40 
-translate-y-2/4 
-translate-x-2/4 
transform-gpu 
shadow-md 
border 
rounded-md 
bg-white
`);

export default function PopupDanger({
  user,
  cancelDeleteAccount,
}: AppProperties): ReactElement {
  const sessionContext = useContext(SessionContext);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const deleteDataServer = () => {
    if (user)
      deleteUser(user.email)
        .then((result) => {
          console.log(result);

          sessionContext?.delete();
          setIsDeleted(true);

          setTimeout(() => {
            <Redirect to="/" />;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  return (
    <div className={popin}>
      {!isDeleted ? (
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
              onclick={cancelDeleteAccount}
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
      ) : (
        <div className="p-4">
          <p className="text-lg font-semibold">
            Your account has been deleted.
          </p>
          <p className="text-lg font-semibold">
            We hope to see you soon again.
          </p>
        </div>
      )}
    </div>
  );
}
