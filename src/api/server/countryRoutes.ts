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
    body: JSON.stringify({ numericCode }), // body data type must match "Content-Type" header
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
    body: JSON.stringify({ name }), // body data type must match "Content-Type" header
  });

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json();
}