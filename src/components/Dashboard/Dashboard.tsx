/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-syntax */
import FilterInput from "components/Dashboard/FilterInput/FilterInput";
import Filters from "components/Dashboard/Filters/Filters";
import { motion, useCycle } from "framer-motion";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { Continent, Country, Filter, Hobby } from "types";
import listDangerousCountry from "../../api/listDangerousCountry";
import {
  getSessionStorage,
  getSessionStorageExcluded,
  getSessionStorageFilter,
  getSessionStorageIncluded,
  setSessionStorageFilter,
  setSessionStorageIncludedExcluded,
} from "../../helpers/sessionStorage";
import ButtonToggle from "../elements/ButtonToggle";
import DashboardList from "./DashboardList/DashboardList";
import classes from "./styles";

// To move to external file
const hobbies: string[] = ["beach", "mountain"];

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
  const [includedCountry, setIncludedCountry] = useState<Country[]>([]);
  const [excludedCountry, setExcludedCountry] = useState<Country[]>([]);
  const [continents, setContinents] = useState<Continent>({});

  /**
   * Will create filters with specific object pattern
   * subject to change in future
   */
  const makeFilters = useCallback((): Filter => {
    const continentsFiltered = countries.reduce(
      (accumulator: Continent, country: Country): Continent => {
        const key = country.region;
        if (!accumulator[key]) {
          accumulator[key] = {
            list: [],
            isChecked: false,
          };
        }
        accumulator[key].list.push(country);
        return accumulator;
      },
      {}
    );

    const hobbiesFiltered = hobbies.reduce(
      (accumulator: Hobby, hobby: string): Hobby => {
        const key = hobby;
        if (!accumulator[key]) {
          accumulator[key] = {
            list: undefined,
            isChecked: false,
          };
        }
        return accumulator;
      },
      {}
    );
    setSessionStorageFilter("continents", continentsFiltered);
    setSessionStorageFilter("hobbies", hobbiesFiltered);

    setContinents(continentsFiltered);
    return { continents: continentsFiltered, hobbies: hobbiesFiltered };
  }, [countries]);

  /**
   * Will update lists when user is (un)checking box from filters
   */
  const updateListsPerContinents = () => {
    interface List {
      list: Country[];
      isChecked: boolean;
    }

    const list: Continent | Hobby = getSessionStorageFilter("continents");
    let included: Country[] = [];
    let excluded: Country[] = [];

    for (const [_, object] of Object.entries(list)) {
      const element: List = object as List;

      if (element.isChecked) {
        included = [...included, ...element.list];
      } else {
        excluded = [...excluded, ...element.list];
      }
    }
    setSessionStorageIncludedExcluded(included, excluded);
    setIncludedCountry(included);
    setExcludedCountry(excluded);
  };

  /**
   * Will modify isChecked continent state
   * @param element Name of continent that needs to update
   */
  const toggleCheckboxContinents = (element: string) => {
    const newState: Continent = {
      ...continents,
      [element]: {
        ...continents[element],
        isChecked: !continents[element].isChecked,
      },
    };
    setContinents(newState);
    setSessionStorageFilter("continents", newState);
    updateListsPerContinents();
  };

  /**
   * Filters countries in 2 lists: included, excluded ( from the pool )
   * Will fire when we receive the list of countries
   * Function subject to change in the future
   */
  const firstFiltering = useCallback(
    (list: string[]) => {
      let included: Country[] = [];
      let excluded: Country[] = [];

      // If already in sessionStorage we use those values
      if (
        getSessionStorageIncluded() &&
        getSessionStorageIncluded().length > 0
      ) {
        included = getSessionStorageIncluded();
        excluded = getSessionStorageExcluded();
      } else {
        excluded = countries.filter((element) => {
          for (const country of list) {
            if (element.name.includes(country)) {
              return 1;
            }
          }
          included.push(element);
          return 0;
        });
        setSessionStorageIncludedExcluded(included, excluded);
      }
      setIncludedCountry(included);
      setExcludedCountry(excluded);
    },
    [countries]
  );

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

    setSessionStorageIncludedExcluded(filteredList, excludedCountry);
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
    setSessionStorageIncludedExcluded(includedCountry, filteredList);
  };

  /**
   * Removes all country from a list and add it to the other one
   * @param argument included / excluded
   */
  const removeAll = (argument: string): void => {
    let included: Country[] = [];
    let excluded: Country[] = [];

    if (argument === "included") {
      excluded = getSessionStorage("countries");
    } else {
      included = getSessionStorage("countries");
    }

    setIncludedCountry(included);
    setExcludedCountry(excluded);
    setSessionStorageIncludedExcluded(included, excluded);
  };

  /**
   * Will reset all kind of filters
   * @param list list of dangerous country to remove in any case
   */
  const reset = (list: string[]): void => {
    const included: Country[] = [];
    let excluded: Country[] = [];

    excluded = countries.filter((element) => {
      for (const country of list) {
        if (element.name.includes(country)) {
          return 1;
        }
      }
      included.push(element);
      return 0;
    });
    setSessionStorageIncludedExcluded(included, excluded);
    setIncludedCountry(included);
    setExcludedCountry(excluded);
    makeFilters();
  };

  useEffect(() => {
    firstFiltering(listDangerousCountry);
    makeFilters();
  }, [countries, firstFiltering, makeFilters]);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      transition={transition}
      initial={{ x: "-100%" }}
      className={classes.component}
    >
      {/* Button to open Dashboard */}
      <ButtonToggle
        toggle={() => {
          toggleOpen();
        }}
      />
      <h2 className="text-lg font-bold text-secondary">Options:</h2>

      {/* Input component */}
      <FilterInput
        includedCountry={includedCountry}
        banACountry={banACountry}
      />

      {/* Filters */}
      <Filters
        continents={continents}
        toggleCheckboxContinents={toggleCheckboxContinents}
        resetAll={reset}
      />

      {/* List included, excluded */}
      <div className="flex sm:flex-row flex-col-reverse justify-between">
        <DashboardList
          title="Excluded"
          list={excludedCountry}
          onclick={authoriseACountry}
          removeAll={removeAll}
        />
        <DashboardList
          title="Included"
          list={includedCountry}
          onclick={banACountry}
          removeAll={removeAll}
        />
      </div>
    </motion.div>
  );
}
