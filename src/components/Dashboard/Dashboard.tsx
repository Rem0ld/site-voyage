/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-syntax */
import magnifyIcon from "@iconify-icons/mdi-light/magnify";
import { InlineIcon } from "@iconify/react";
import Filters from "components/Filters/Filters";
import { motion, useCycle } from "framer-motion";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { Continents, Country, Hobbies } from "types";
import listDangerousCountry from "../../api/listDangerousCountry";
import { setSessionStorage } from "../../helpers/sessionStorage";
import ButtonToggle from "../elements/ButtonToggle";
import DashboardList from "./DashboardList/DashboardList";
import classes from "./styles";

// To move to external file
const hobbies: Hobbies = { beach: true, mountain: true };

interface AppProperties {
  countries: Country[];
}

const toggleFilter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  console.log(event);
};

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
  const [includedCountry, setIncludedCountry] = useState<Country[]>([]);
  const [excludedCountry, setExcludedCountry] = useState<Country[]>([]);
  const [continents, setContinents] = useState<Continents>();

  /**
   * Sorts countries by continents
   *
   * { continentName: Countries[] }
   */
  const makeContinents = useCallback(
    (): Continents =>
      // eslint-disable-next-line unicorn/no-array-reduce
      countries.reduce(
        (accumulator: Continents, element: Country): Continents => {
          const cle = element.region;
          if (!accumulator[cle]) {
            accumulator[cle] = [];
          }
          accumulator[cle].push(element);
          return accumulator;
        },
        {}
      ),
    [countries]
  );

  /**
   * Filters countries in 2 lists: included, excluded ( from the pool )
   * Will fire when we receive the list of countries
   * Subject to change
   */
  const firstFiltering = useCallback(
    (list: string[]) => {
      const included: Country[] = [];
      const excluded = countries.filter((element) => {
        for (const country of list) {
          if (element.name.includes(country)) {
            return 1;
          }
        }
        included.push(element);
        return 0;
      });
      setIncludedCountry(included);
      setExcludedCountry(excluded);
      setSessionStorage(included, excluded);
    },
    [countries]
  );

  useEffect(() => {
    setContinents(makeContinents());
    firstFiltering(listDangerousCountry);
  }, [countries, firstFiltering, makeContinents]);

  /**
   * Will remove the country from included and put it in excluded
   * @param numericCode Country number
   */
  const banACountry = (numericCode: number): void => {
    const country: Country | undefined = includedCountry?.find(
      (element) => +element.numericCode === numericCode
    );
    const filteredList: Country[] = includedCountry.filter(
      (element) => +element.numericCode !== numericCode
    );

    setIncludedCountry(() => filteredList);
    setExcludedCountry(
      (previousState): Country[] => [...previousState, country] as Country[]
    );

    setSessionStorage(filteredList, excludedCountry);
  };

  /**
   * Will remove the country from excluded and put it in included
   * @param numericCode Country number
   */
  const authoriseACountry = (numericCode: number): void => {
    const country: Country | undefined = excludedCountry?.find(
      (element) => +element.numericCode === numericCode
    );
    const filteredList: Country[] = excludedCountry.filter(
      (element) => +element.numericCode !== numericCode
    );

    setExcludedCountry(() => filteredList);
    setIncludedCountry(
      (previousState): Country[] => [...previousState, country] as Country[]
    );
    setSessionStorage(includedCountry, filteredList);
  };

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
      <Filters
        listFilters={[continents as Continents, hobbies]}
        toggleFilter={toggleFilter}
      />
      <div className="flex sm:flex-row flex-col justify-between">
        <DashboardList
          title="Excluded"
          list={excludedCountry}
          onclick={authoriseACountry}
        />
        <DashboardList
          title="Included"
          list={includedCountry}
          onclick={banACountry}
        />
      </div>
    </motion.div>
  );
}
