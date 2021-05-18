import { Country } from "../types";

const url = "https://restcountries.eu/rest/v2/all"

export default async function getCountry(): Promise<Country[]> {
  const result: Response = await fetch(url);
  const data = await result.json() as Country[];
  sessionStorage.setItem("countries", JSON.stringify(data));

  return data;
}
