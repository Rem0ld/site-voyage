import React, { ReactElement } from "react";

type SubItem = [string, string | number | string[]];
interface AppProperties {
  items: SubItem[];
  name: string;
}
export default function List({ items, name }: AppProperties): ReactElement {
  const list = items ? (
    items.map((element) => (
      <li key={element[0]}>
        {element[0]}:{" "}
        <span className="font-bold text-primary">{element[1]}</span>
      </li>
    ))
  ) : (
    <li />
  );
  return <ul className={name}>{list}</ul>;
}
