import React, { ReactElement } from "react";

interface AppProperties {
  username: string | undefined;
}

export default function DisplayUsername({
  username,
}: AppProperties): ReactElement {
  return (
    <span className="lg:grid place-items-center sm:hidden xs:block px-2">
      Hello {username}
    </span>
  );
}
