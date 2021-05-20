import GetCountries from "api/GetCountries";
import { motion } from "framer-motion";
import ctl from "helpers/ctl";
import { getSessionStorageIncluded } from "helpers/sessionStorage";
import React, { ReactElement, useEffect, useState } from "react";
import { Country } from "types";
import main from "../../public/main_version2.svg";
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

const random = (max: number | undefined, min: number): number | undefined =>
  max ? Math.floor(Math.random() * (max - min)) + min : undefined;

export default function Home(): ReactElement {
  const [isLoading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);

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
      console.log(listCountry[number]);
    }

    setLoading(true);
  };

  return !isLoading ? (
    <div className="content-container">
      <Dashboard countries={countries} />
      <motion.div
        className="relative"
        // initial={{ y: 0, x: 0 }}
        // animate={{
        //   y: [-10, 0, -10],
        //   x: [-10, 0, -10],
        // }}
        // transition={{
        //   duration: 2,
        //   ease: "easeInOut",
        //   repeat: Number.POSITIVE_INFINITY,
        // }}
      >
        <div className={classesButton}>
          <Button
            onClick={(event) => makeLoading(event)}
            text="Next destination"
            type="standard"
            size="big"
            isButton
          />
        </div>
        <img src={main} alt="logo" />
      </motion.div>
    </div>
  ) : (
    <Loading />
  );
}
