import urlMaker from "apis/UrlMaker";
import Cookies from "js-cookie";
import { User } from "types";

export default async function savePicture(picture: File): Promise<any> {
  const url = urlMaker("picture", "save");
  const user: User = Cookies.getJSON("user") as User;
  const bearer = localStorage.getItem("@token")
  const imageObject = new FormData();

  imageObject.append("name", user.username)
  imageObject.append("data", picture);


  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${bearer as string}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: imageObject,
  })

  return response.json();
}