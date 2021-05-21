/* eslint-disable jsx-a11y/click-events-have-key-events */
import ctl from "helpers/ctl";
import React, { ReactElement, useState } from "react";
import { Continent } from "types";
import listDangerousCountry from "../../api/listDangerousCountry";
import Continents from "./FilterElement/Continents";

interface AppProperties {
  continents: Continent;
  toggleCheckboxContinents: (element: string) => void;
  resetAll: (list: string[]) => void;
}

type ListFilters = {
  name: string;
  isOpen: boolean;
};

const DEFAULT_STATE = [
  {
    name: "continents",
    isOpen: false,
  },
  {
    name: "hobbies",
    isOpen: false,
  },
];

const link = ctl(`
inline-block 
align-baseline
pt-1
pl-2
text-xs 
text-primary 
hover:underline
`);

export default function Filters({
  continents,
  toggleCheckboxContinents,
  resetAll,
}: AppProperties): ReactElement {
  const [isFilterOpenArray, setIsFilterOpenArray] = useState<ListFilters[]>(
    DEFAULT_STATE
  );

  /**
   * It will toggle modals and will make sure only one is open at a time
   * @param event will be mouse click, here to stop propagation
   * @param aFilter name of filter we wanna have an action
   */
  const toggleMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    aFilter: string
  ): void => {
    event.stopPropagation();
    const filters = [...isFilterOpenArray];
    const targetFilter = filters.findIndex(
      (element) => element.name === aFilter
    );

    if (filters[targetFilter]?.isOpen) {
      filters[targetFilter].isOpen = false;
    } else {
      // eslint-disable-next-line unicorn/no-array-for-each
      filters.forEach((element) => {
        if (element.name === aFilter) {
          // eslint-disable-next-line no-param-reassign
          element.isOpen = true;
        } else if (element.isOpen) {
          // eslint-disable-next-line no-param-reassign
          element.isOpen = false;
        }
      });
    }
    setIsFilterOpenArray(filters);
  };

  return (
    <div className="py-4">
      <div className="flex items-center">
        <h3 className="text-md font-semibold text-secondary">Filters</h3>
        <span
          className={link}
          onClick={() => {
            resetAll(listDangerousCountry);
          }}
          role="button"
          tabIndex={0}
        >
          Reset all
        </span>
      </div>
      <div className="flex">
        <Continents
          continents={continents}
          isOpen={isFilterOpenArray[0].isOpen}
          filterName="continents"
          onClickToggleMenu={toggleMenu}
          toggleCheckboxContinents={toggleCheckboxContinents}
        />
      </div>
    </div>
  );
}
