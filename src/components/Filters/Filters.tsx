import FilterElement from "components/Filters/FilterElement/FilterElement";
import React, { ReactElement, useState } from "react";
import { Continents, Hobbies } from "types";

interface AppProperties {
  listFilters: [Continents, Hobbies];
  toggleFilter: (event: React.MouseEvent<HTMLDivElement>) => void;
}

type ListFilters = {
  name: string;
  isOpen: boolean;
};

export default function Filters({
  listFilters,
  toggleFilter,
}: AppProperties): ReactElement {
  const [isFilterOpenArray, setIsFilterOpenArray] = useState<ListFilters[]>([
    {
      name: "continents",
      isOpen: false,
    },
    {
      name: "hobbies",
      isOpen: false,
    },
  ]);
  // const [continents, hobbies] = listFilters;

  // useEffect(() => {
  //   const list = listFilters.map((_, index) =>
  //     index === 0
  //       ? {
  //           name: "continents",
  //           isOpen: false,
  //         }
  //       : {
  //           name: "hobbies",
  //           isOpen: false,
  //         }
  //   );
  //   setIsFilterOpenArray(list);
  // }, [listFilters]);

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
      <h3 className="text-md font-semibold text-secondary">Filters</h3>
      <div className="flex">
        {listFilters.map((element, index) => (
          <FilterElement
            filterName={isFilterOpenArray[index].name}
            list={element}
            onClickToggleMenu={toggleMenu}
            onClickToggleFilter={toggleFilter}
            isOpen={isFilterOpenArray[index].isOpen}
          />
        ))}
      </div>
    </div>
  );
}
