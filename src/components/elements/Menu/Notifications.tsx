import formatDate from "helpers/formatDate";
import React, { ReactElement } from "react";
import { Travel } from "types";
import classes from "./style";

interface AppProperties {
  notifications: Travel[] | undefined;
}

export default function Notifications({
  notifications,
}: AppProperties): ReactElement {
  return (
    <div className={`${classes.menu} right-1/4 top-full h-20 p-2`}>
      <ul>
        {notifications &&
          notifications?.map((notification) => (
            <li key={notification.id}>
              {notification.destination}{" "}
              {formatDate(notification.departureDate as Date, "-")}
            </li>
          ))}
      </ul>
    </div>
  );
}
