import urlMaker from "apis/UrlMaker";
import Cookies from "js-cookie";
import { User } from "types";


export default async function createReview(review: any): Promise<any> {
  const url = urlMaker("review", "new");
  const user: User = Cookies.getJSON("user") as User;
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
    body: JSON.stringify({ ...review, userId: user.id }),
  });

  return response.json();
};