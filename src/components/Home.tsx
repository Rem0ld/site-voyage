import React, { ReactElement } from "react";
import Header from "./Header";

export default function Home(): ReactElement {
  return (
    <div className="h-screen">
      <Header />
      <div className="h-full bg-gray-200 grid place-items-center">
        {/* home page is working */}
      </div>
    </div>
  );
}
