/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-syntax */
import GetCountries from "apis/GetCountries";
import FilterInput from "components/SideMenu/FilterInput/FilterInput";
import Filters from "components/SideMenu/Filters/Filters";
import { motion } from "framer-motion";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Continent, Country, Filter, Hobby } from "types";
import listDangerousCountry from "../../apis/listDangerousCountry";
import {
  getSessionStorage,
  getSessionStorageExcluded,
  getSessionStorageFilter,
  getSessionStorageIncluded,
  setSessionStorageFilter,
  setSessionStorageIncludedExcluded,
} from "../../helpers/sessionStorage";
import ButtonToggle from "../Elements/ButtonToggle";
import DashboardList from "./SideMenuList/SideMenuList";
import classes from "./styles";

// To move to external file
const hobbies: string[] = ["beach", "mountain"];

// Objects used by framer-motion for animations
const variants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};
const transition = {
  duration: 0.8,
};

interface AppProperties {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function SideMenu({
  isOpen,
  toggleMenu,
}: AppProperties): ReactElement {
  const [includedCountry, setIncludedCountry] = useState<Country[]>([]);
  const [excludedCountry, setExcludedCountry] = useState<Country[]>([]);
  const [continents, setContinents] = useState<Continent>({});
  const { data } = useQuery<Country[]>("countries", GetCountries);

  /**
   * Will create filters with specific object pattern
   * subject to change in future
   */
  const makeFilters = useCallback((): Filter | undefined => {
    const continentsFiltered = data?.reduce(
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
    if (continentsFiltered) {
      setSessionStorageFilter("continents", continentsFiltered);
      setContinents(continentsFiltered);
    }
    setSessionStorageFilter("hobbies", hobbiesFiltered);
    if (continentsFiltered)
      return { continents: continentsFiltered, hobbies: hobbiesFiltered };

    return undefined;
  }, [data]);

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

    // eslint-disable-next-line @typescript-eslint/naming-convention
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
      let included: Country[] | undefined = [];
      let excluded: Country[] | undefined = [];

      // If already in sessionStorage we use those values
      if (
        getSessionStorageIncluded() &&
        getSessionStorageIncluded().length > 0
      ) {
        included = getSessionStorageIncluded();
        excluded = getSessionStorageExcluded();
      } else {
        excluded = data?.filter((element) => {
          for (const country of list) {
            if (element.name.includes(country)) {
              return 1;
            }
          }
          included?.push(element);
          return 0;
        });
        if (excluded) setSessionStorageIncludedExcluded(included, excluded);
      }
      setIncludedCountry(included);
      if (excluded) setExcludedCountry(excluded);
    },
    [data]
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
    if (country) {
      const excludedCountryUpdated = [...excludedCountry, country];
      setExcludedCountry(excludedCountryUpdated);
      setSessionStorageIncludedExcluded(filteredList, excludedCountryUpdated);
    }
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
    // Here we know country will always be defined
    // but somehow this variable could be undefined for the program
    if (country) {
      const includedCountryUpdated = [...includedCountry, country];
      setIncludedCountry(includedCountryUpdated);
      setSessionStorageIncludedExcluded(includedCountryUpdated, filteredList);
    }
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
    let excluded: Country[] | undefined = [];

    excluded = data?.filter((element) => {
      for (const country of list) {
        if (element.name.includes(country)) {
          return 1;
        }
      }
      included.push(element);
      return 0;
    });
    if (excluded) {
      setSessionStorageIncludedExcluded(included, excluded);
      setExcludedCountry(excluded);
    }
    setIncludedCountry(included);
    makeFilters();
  };

  useEffect(() => {
    firstFiltering(listDangerousCountry);
    makeFilters();
  }, [data, firstFiltering, makeFilters]);

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
          toggleMenu();
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

      {/* Lists included, excluded */}
      <div className="flex sm:flex-row flex-col-reverse justify-between">
        <DashboardList
          title="Included"
          list={includedCountry}
          onclick={banACountry}
          removeAll={removeAll}
        />
        <DashboardList
          title="Excluded"
          list={excludedCountry}
          onclick={authoriseACountry}
          removeAll={removeAll}
        />
      </div>
      {/* Copyright */}
      <div className="w-full my-2 text-center">
        &copy; Copyright 2021 - Pierre Lovergne
      </div>
    </motion.div>
  );
}
