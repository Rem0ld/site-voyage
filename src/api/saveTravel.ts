import { Country } from "types";
import urlMaker from "./URL";


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

export default async function saveTravel(country: Country, dates: Dates): Promise<any> {
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
    body: JSON.stringify(travel), // body data type must match "Content-Type" header
  });

  return response.json();
};
