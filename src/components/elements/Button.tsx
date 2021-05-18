import ctl from "helpers/ctl";
import React, { ReactElement } from "react";

interface AppProperties {
  text: string;
  isButton: boolean;
  type: "standard" | "valid" | "danger";
  size: "big" | "medium" | "small";
  onClick: (event: React.MouseEvent<HTMLElement>) => void | undefined;
}

const main = ctl(`
px-2
shadow-sm 
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
hover:bg-secondary
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
  isButton,
  onClick,
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
      onClick={onClick}
      type={isButton ? "button" : "submit"}
      className={applyStyle()}
    >
      {text}
    </button>
  );
}
