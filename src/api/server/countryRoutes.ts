import { Country } from "types";
import urlMaker from "../UrlMaker";

export async function getCountry(numericCode: string): Promise<any> {
  const url = urlMaker("country", "one");
  // const user = Cookies.getJSON("user") as User;
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
    body: JSON.stringify({ numericCode }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json();
}

export async function getCountryPerName(name: string): Promise<any> {
  const url = urlMaker("country", "one-name");
  // const user = Cookies.getJSON("user") as User;
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
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json();
}

export async function saveCountry(country: Country): Promise<any> {
  const url = urlMaker("country", "new");
  // const user: User = Cookies.getJSON("user") as User;
  const bearer = localStorage.getItem("@token")

  // Because country is a bit different between front and back
  // To avoid getting errors from back we remove the properties that
  // are not in the back
  // should be fixed when we check if country already exist
  if (country.review) {
    // eslint-disable-next-line no-param-reassign
    delete country.review;
  }
  if (country.picture) {
    // eslint-disable-next-line no-param-reassign
    delete country.picture;
  }

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
    body: JSON.stringify(country),
  });



  return response.json();

};