import { Country } from "types";


export function setSessionStorage(
  authorised: Country[],
  banned: Country[]
): void {
  sessionStorage.setItem("authorised", JSON.stringify(authorised));
  sessionStorage.setItem("banned", JSON.stringify(banned));
};

export function getSessionStorage(): Country[] | undefined {
  const list: string | null = sessionStorage.getItem("authorised")
  return list ? JSON.parse(list) as Country[] : undefined;
}