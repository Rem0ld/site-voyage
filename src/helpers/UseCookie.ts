import Cookies from "js-cookie";
import { useEffect } from "react";
import { User } from "types";
// import auth from "../../firebase-auth";

export default function useCookie() {
  // const [isCookie, setIsCookie] = useState(false);

  useEffect(() => {
    const user = Cookies.getJSON("user") as User;
    console.log("in useCookie", user)
    if (!user || user === null || user === undefined) {
      console.log("condition is true")
      auth.signOut().finally(() => { })
      localStorage.removeItem("@token")
      Cookies.remove("user")
    }
  }, [])
}