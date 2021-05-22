import React, { ReactElement } from "react";
import BackButton from "./BackButton";

interface AppProperties {
  title: string;
}

export default function TopLine({ title }: AppProperties): ReactElement {
  return (
    <div className="flex justify-between items-start xl:w-3/5 md:w-4/5 m-auto h-20 p-4">
      <h2 className="text-2xl underline font-bold">{title}</h2>
      <BackButton />
    </div>
  );
}
