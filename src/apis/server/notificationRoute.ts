import urlMaker from "apis/UrlMaker";
import Cookies from "js-cookie";
import { User } from "types";



export async function getNotificationsUser(): Promise<any> {
  const url = urlMaker("notification", "all");
  const user = Cookies.getJSON("user") as User;
  const bearer = localStorage.getItem("@token")

  const response: Response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${bearer as string}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ user }),
  });

  return response.json();
}

export async function UpdateNotifications(): Promise<any> {
  const url = urlMaker("notification", "update");
  const user = Cookies.getJSON("user") as User;
  const bearer = localStorage.getItem("@token")

  const response: Response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${bearer as string}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ user }),
  });

  return response.json();
}

export async function deleteNotification(travelId: number): Promise<any> {
  const url = urlMaker("notification", "delete");
  const bearer = localStorage.getItem("@token")

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${bearer as string}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ travelId }),
  });

  return response.json();
};