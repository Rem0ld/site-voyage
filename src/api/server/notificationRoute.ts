import urlMaker from "../UrlMaker";


export default async function deleteNotification(travelId: number): Promise<any> {
  const url = urlMaker("notification", "delete");
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
    body: JSON.stringify({ travelId }),
  });

  return response.json();
};