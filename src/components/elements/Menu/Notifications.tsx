import formatDate from "helpers/formatDate";
import Cookies from "js-cookie";
import React, { ReactElement, useEffect, useState } from "react";
import { Travel, User } from "types";
import classes from "./style";

export default function Notifications(): ReactElement {
  const [notifications, setNotifications] = useState<Travel[]>();

  useEffect(() => {
    const user = Cookies.getJSON("user") as User;
    if (user?.notifications) {
      const travels = user.notifications.map((notification) =>
        user.travel.find((element) => element.id === notification.travelId)
      );
      if (travels && travels.length > 0) {
        setNotifications(() => travels);
      }
      console.log("notif", user);
    }
  }, []);

  return (
    <div className={`${classes.menu} right-1/4 top-full h-20 p-2`}>
      <ul>
        {notifications?.map((notification) => (
          <li key={notification.id}>
            {notification.destination}{" "}
            {formatDate(notification.departureDate as Date, "-")}
          </li>
        ))}
      </ul>
    </div>
  );
}
