import ctl from "helpers/ctl";
import React, { ReactElement } from "react";

interface AppProperties {
  text: string;
  type: "standard" | "valid" | "danger";
  size: "big" | "medium" | "small";
}

const main = ctl(`
absolute 
z-10 
top-2/4 
left-2/4
px-2
shadow-sm 
transform 
-translate-x-2/4 
-translate-y-2/4 
rounded-md
`);

const big = ctl(`
w-48 
h-16 
`);

const medium = ctl(`
w-auto
h-9
`);

const small = ctl(`
w-auto
h-6
`);

const standard = ctl(`
bg-gray-200
font-bold
`);

const valid = ctl(`
bg-primary
text-white
`);

const danger = ctl(`
bg-red-600
text-white
`);

export default function Button({
  text,
  type,
  size,
}: AppProperties): ReactElement {
  /**
   * Will conditionally build a string from props received
   * @returns string of CSS classes
   */
  const applyStyle = (): string =>
    `${main} 
    ${type === "standard" ? standard : type === "danger" ? danger : valid} 
    ${size === "big" ? big : size === "medium" ? medium : small}`;

  return (
    <button type="button" className={applyStyle()}>
      {text}
    </button>
  );
}
