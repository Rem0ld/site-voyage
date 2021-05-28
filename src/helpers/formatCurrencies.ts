import { Currency } from "types";

export default function formatCurrencies(list: Currency[]): string[] {
  return list.map((element: Currency) =>
    (element.code ? `${element.code} ${element.name} ${element.symbol}` : ""));
}