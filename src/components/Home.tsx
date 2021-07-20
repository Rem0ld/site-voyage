import { motion, useCycle } from "framer-motion";
import ctl from "helpers/ctl";
import fisherYatesShuffle from "helpers/fisherYatesShuffle";
import random from "helpers/randomNumber";
import { getSessionStorageIncluded } from "helpers/sessionStorage";
import main from "public/main_version2.svg";
import React, { ReactElement, useState } from "react";
import Button from "src/components/Elements/Button";
import Loading from "src/components/Elements/Loading";
import ModalWelcome from "src/components/Elements/ModalWelcome";
import SideMenu from "src/components/SideMenu/SideMenu";
import { Country } from "types";

const classesButton = ctl(`
absolute 
z-10 
top-2/4 
left-2/4 
transform-gpu 
-translate-x-2/4 
-translate-y-2/4
`);

// const classDivTrain = ctl(`
// absolute
// z-0
// transform-gpu
// bottom-24
// left-full
// -translate-y-full
// -translate-x-full
// `);

export default function Home(): ReactElement {
  const [isSideMenuOpen, toggleSideMenu] = useCycle(false, true);
  const [isLoading, setLoading] = useState(false);
  const [winner, setWinner] = useState<Country>({} as Country);
  // const { data } = useQuery("countries", GetCountries);

  // Will be in use in the future
  // Gets the country's list, shuffles it, then pick a random number to pick a random country
  // it will set the state winner with the country
  // and set loading to true which will render differently this page if true
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const makeLoading = (event: React.MouseEvent<HTMLButtonElement>) => {
    const listCountry = getSessionStorageIncluded();
    if (listCountry) {
      const shuffledList = fisherYatesShuffle(listCountry);
      const randomNumber: number = random(shuffledList.length, 0) as number;
      setWinner(shuffledList[randomNumber]);
      setLoading(true);
    }
  };

  return !isLoading ? (
    <div className="content-container relative height-screen min-height-screen">
      <SideMenu isOpen={isSideMenuOpen} toggleMenu={toggleSideMenu} />
      <ModalWelcome toggleMenu={toggleSideMenu} />
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
        <img src={main} alt="logo" className="" />
      </motion.div>
      {/* <motion.div
        className={classDivTrain}
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
        <Lottie
          animationData={train}
          className="absolute md:w-30 md:h-30 w-20 h-20"
        />
      </motion.div> */}
    </div>
  ) : (
    <Loading winner={winner} />
  );
}
