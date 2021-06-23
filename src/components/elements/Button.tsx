import ctl from "helpers/ctl";
import React, { ReactElement } from "react";
import { Country } from "types";

interface AppProperties {
  text: string;
  isButton: boolean;
  type: "standard" | "valid" | "danger";
  size: "big" | "medium" | "small";
  onclick?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | ((country: Country) => Promise<void>);
}

const main = ctl(`
px-2
shadow-md
rounded-md
hover:shadow-hover
transition
focus:outline-primary
focus:rounded-sm
`);

const big = ctl(`
md:w-48
md:h-16 
h-8
w-26
font-bold
`);

const medium = ctl(`
w-auto
h-9
`);

const small = ctl(`
w-16
h-6
`);

const standard = ctl(`
hover:bg-gray-300
bg-gray-200
md:text-base
text-xs
`);

const valid = ctl(`
hover:bg-green-600
bg-primary
text-white
`);

const danger = ctl(`
hover:bg-red-700
bg-red-600
text-white
`);

export default function Button({
  text,
  type,
  size,
  isButton,
  onclick,
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
    <button
      onClick={onclick}
      type={isButton ? "button" : "submit"}
      className={applyStyle()}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  onclick: undefined,
};
