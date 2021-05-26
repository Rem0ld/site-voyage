import { Country } from "types";
import urlMaker from "./UrlMaker";


enum Role {
  ADMIN,
  USER,
}

interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  username: string;
  country?: string;
  zip?: string;
  city?: string;
  role: Role;
}

interface Dates {
  depart: Date | undefined;
  return: Date | undefined;
}

export async function saveTravel(country: Country, dates: Dates): Promise<any> {
  const url = urlMaker("travel", "new");
  const user: User = (await JSON.parse(
    localStorage.getItem("user") as string
  )) as User;

  const travel = {
    userId: user.id,
    destination: country.name,
    fromCountry: user.country,
    departureDate: dates.depart ?? undefined,
    returnDate: dates.return ?? undefined,
  };

  console.log(travel);
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(travel),
  });

  return response.json();
};

export async function getTravel(): Promise<any> {
  const url = urlMaker("travel", "all");
  const user: User = (await JSON.parse(
    localStorage.getItem("user") as string
  )) as User;

  const response: Response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ email: user.email }), // body data type must match "Content-Type" header
  });

  return response.json();
}

export async function updateTravel(id: number): Promise<any> {
  const url = urlMaker("travel", "update-done");
  // const user: User = (await JSON.parse(
  //   localStorage.getItem("user") as string
  // )) as User;

  const response: Response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ id }), // body data type must match "Content-Type" header
  });

  return response.json();
}