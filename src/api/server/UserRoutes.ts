import { Inputs } from "components/SettingsComponent/FormUpdate";
import urlMaker from "../UrlMaker";

export async function getUser(email: string): Promise<any> {
  const url = urlMaker("user", "one");
  // const bearer = localStorage.getItem("@token")

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${bearer as string}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ email }),
  });
  return response.json();
};

export async function deleteUser(email: string): Promise<any> {
  const url = urlMaker("user", "delete");
  // const bearer = localStorage.getItem("@token")

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${bearer as string}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ email }),
  });

  return response.json();
};

export async function updateUserAddress(user: Inputs): Promise<any> {
  const url = urlMaker("user", "update-address");
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
    body: JSON.stringify({ user }),
  });

  return response.json();
};