import Cookies from "js-cookie";
import { Country, Localisation, User } from "types";
import urlMaker from "../UrlMaker";

interface Dates {
  depart: Date | undefined;
  return: Date | undefined;
}

export async function saveTravel(country: Country, dates: Dates, localisation: Localisation): Promise<any> {
  const url = urlMaker("travel", "new");
  const user: User = Cookies.getJSON("user") as User;
  const bearer = localStorage.getItem("@token")

  // We still need to add "to" which will be a city
  const travel = {
    userId: +user.id,
    destination: country.name,
    fromCountry: localisation.from,
    departureDate: dates.depart ?? undefined,
    returnDate: dates.return ?? undefined,
  };

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
    body: JSON.stringify(travel),
  });

  return response.json();
};

export async function getTravel(): Promise<any> {
  const url = urlMaker("travel", "all");
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
    body: JSON.stringify({ email: user.email }), // body data type must match "Content-Type" header
  });

  return response.json();
}

export async function updateTravel(id: number): Promise<any> {
  const url = urlMaker("travel", "update-done");
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
    body: JSON.stringify({ id }), // body data type must match "Content-Type" header
  });

  return response.json();
}

export async function deleteTravel(id: number): Promise<any> {
  const url = urlMaker("travel", "delete");
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
    body: JSON.stringify({ id }),
  });

  return response.json();
};