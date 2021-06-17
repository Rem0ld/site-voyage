import React, { ReactElement } from "react";

export default function IndicatorNotification(): ReactElement {
  return (
    <span className="absolute flex h-3 w-3 -top-1 right-5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
    </span>
  );
}
