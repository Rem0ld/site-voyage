import React, { ReactElement } from "react";
import { SubItem } from "types";

interface AppProperties {
  items: SubItem[];
  name: string;
}
export default function List({ items, name }: AppProperties): ReactElement {
  const list = items ? (
    items.map((element) => {
      const value = Array.isArray(element[1])
        ? element[1].join(", ")
        : element[1];

      return (
        <li key={element[0]}>
          {element[0]}: <span className="font-bold text-primary">{value}</span>
        </li>
      );
    })
  ) : (
    <li />
  );
  return <ul className={name}>{list}</ul>;
}
