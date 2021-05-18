/* eslint-disable no-restricted-syntax */
import chevronRight from "@iconify-icons/akar-icons/chevron-right";
import magnifyIcon from "@iconify-icons/mdi-light/magnify";
import Icon, { InlineIcon } from "@iconify/react";
import { motion, useCycle } from "framer-motion";
import React, { ReactElement, useEffect, useState } from "react";
import { Country } from "types";
import listDangerousCountry from "../../api/listDangerousCountry";
import { setSessionStorage } from "../../helpers/sessionStorage";
import ButtonToggle from "../elements/ButtonToggle";
import DashboardList from "../elements/DasboardList/DashboardList";
import classes from "./styles";

interface AppProperties {
  countries: Country[];
}
// Objects used by framer-motion for animations
const variants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

const transition = {
  duration: 0.8,
};

export default function Dashboard({ countries }: AppProperties): ReactElement {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [authorisedCountry, setAuthorisedCountry] = useState<Country[]>([]);
  const [bannedCountry, setBannedCountry] = useState<Country[]>([]);

  /**
   * Will remove the country from authorised and put it in banned
   * @param numericCode Country number
   */
  const banACountry = (numericCode: number): void => {
    const country: Country | undefined = authorisedCountry?.find(
      (element) => +element.numericCode === numericCode
    );
    const filteredList: Country[] = authorisedCountry.filter(
      (element) => +element.numericCode !== numericCode
    );

    setAuthorisedCountry(() => filteredList);
    setBannedCountry(
      (previousState): Country[] => [...previousState, country] as Country[]
    );

    setSessionStorage(filteredList, bannedCountry);
  };

  /**
   * Will remove the country from banned and put it in authorised
   * @param numericCode Country number
   */
  const authoriseACountry = (numericCode: number): void => {
    const country: Country | undefined = bannedCountry?.find(
      (element) => +element.numericCode === numericCode
    );
    const filteredList: Country[] = bannedCountry.filter(
      (element) => +element.numericCode !== numericCode
    );

    setBannedCountry(() => filteredList);
    setAuthorisedCountry(
      (previousState): Country[] => [...previousState, country] as Country[]
    );

    setSessionStorage(authorisedCountry, filteredList);
  };

  useEffect(() => {
    const firstFiltering = (list: string[]) => {
      const authorised: Country[] = [];
      const banned = countries.filter((element) => {
        for (const country of list) {
          if (element.name.includes(country)) {
            return 1;
          }
        }
        authorised.push(element);
        return 0;
      });
      setAuthorisedCountry(authorised);
      setBannedCountry(banned);
      setSessionStorage(authorised, banned);
    };
    firstFiltering(listDangerousCountry);
  }, [countries]);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      transition={transition}
      initial={{ x: "-100%" }}
      className={classes.component}
    >
      <ButtonToggle
        toggle={() => {
          toggleOpen();
        }}
      />
      <h2 className="text-lg font-bold text-secondary">Options:</h2>
      <div className="py-4">
        <p className="text-sm pl-2">Country to remove</p>
        <div className="flex items-center -pt-2">
          <InlineIcon icon={magnifyIcon} />
          <input
            type="text"
            aria-label="Full name"
            tabIndex={-1}
            className={classes.input}
          />
        </div>
      </div>
      <div className="py-4">
        <h3 className="text-md font-semibold text-secondary">Filters</h3>
        <div className="flex items-center pt-2.5 pb-4">
          <span className="text-sm">Regions</span>
          <Icon icon={chevronRight} />
        </div>
        <div className="flex items-center">
          <span className="text-sm">Hobbies</span>
          <Icon icon={chevronRight} />
        </div>
      </div>
      <div className="py-4">
        <h3 className="text-md font-semibold text-secondary">List</h3>
        <DashboardList
          height="h-56"
          list={authorisedCountry}
          onclick={banACountry}
        />
      </div>
      <div className="py-4">
        <h3 className="text-md font-semibold text-secondary">Banned</h3>
        <DashboardList
          height="h-32"
          list={bannedCountry}
          onclick={authoriseACountry}
        />
      </div>
    </motion.div>
  );
}
