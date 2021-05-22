import GetCountries from "api/GetCountries";
import { motion } from "framer-motion";
import ctl from "helpers/ctl";
import random from "helpers/randomNumber";
import { getSessionStorageIncluded } from "helpers/sessionStorage";
import Lottie from "lottie-react";
import React, { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Country } from "types";
import main from "../../public/main_version2.svg";
import train from "../../public/train.json";
import Dashboard from "./Dashboard/Dashboard";
import Button from "./elements/Button";
import Loading from "./elements/Loading";

const classesButton = ctl(`
absolute 
z-10 
top-2/4 
left-2/4 
transform-gpu 
-translate-x-2/4 
-translate-y-2/4
`);

export default function Home(): ReactElement {
  const [isLoading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [winner, setWinner] = useState<Country>({} as Country);
  const history = useHistory();

  const fetchData = async (): Promise<void> => {
    await GetCountries().then((data) => {
      setCountries(data);
    });
  };

  useEffect(() => {
    const storedCountries = sessionStorage.getItem("countries");
    if (storedCountries) {
      setCountries(JSON.parse(storedCountries));
    } else {
      fetchData().finally(() => {});
    }
  }, []);

  // Will be in use in the future
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const makeLoading = (event: React.MouseEvent<HTMLButtonElement>) => {
    const listCountry = getSessionStorageIncluded();
    if (listCountry) {
      const number: number = random(listCountry.length, 0) as number;
      setWinner(listCountry[number]);
    }
    setLoading(true);
    history.push("/");
  };

  return !isLoading ? (
    <div className="content-container height-screen">
      <Dashboard countries={countries} />
      <motion.div
        className="relative z-10"
        initial={{ y: 0, x: 0 }}
        animate={{
          y: [-10, 0, -10],
          x: [-10, 0, -10],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <div className={classesButton}>
          <Button
            onclick={(event) => makeLoading(event)}
            text="Next destination"
            type="standard"
            size="big"
            isButton
          />
        </div>
        <img src={main} alt="logo" />
      </motion.div>
      <motion.div
        className="absolute z-0 transform-gpu bottom-10 left-full -translate-y-full -translate-x-full"
        animate={{
          x: -2000,
        }}
        transition={{
          delay: random(4, 10),
          duration: random(4, 10),
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <Lottie animationData={train} className="md:w-30 md:h-30 w-20 h-20" />
      </motion.div>
    </div>
  ) : (
    <Loading winner={winner} />
  );
}
