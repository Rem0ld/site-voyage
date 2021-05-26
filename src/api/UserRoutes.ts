import urlMaker from "./UrlMaker";

export default async function getUser(email: string): Promise<any> {
  const url = urlMaker("user", "one");

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
    body: JSON.stringify({ email }), // body data type must match "Content-Type" header
  });
  return response.json();
};