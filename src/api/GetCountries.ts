import { Country } from "../types";

const url = "https://restcountries.eu/rest/v2/all"

export default async function getFruits(): Promise<Country[]> {
  return (await fetch(url)).json() as Promise<Country[]>;
}
