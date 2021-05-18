import React, { ReactElement } from "react";

type Data = {
  data: string;
};
type Location = {
  hash?: string;
  key?: string;
  pathname?: string;
  search?: string;
  state?: Data;
};
interface AppProperties {
  location: Location;
}

export default function Results({ location }: AppProperties): ReactElement {
  console.log(location.state?.data);

  return (
    <div className="content-container">
      Result is working {location.state?.data}
    </div>
  );
}
