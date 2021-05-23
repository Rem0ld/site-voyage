import random from "./randomNumber";

/**
 * Receives a finite list and shuffles it
 * @param list Finite list, can be any type
 * @returns Shuffled list
 */
export default function fisherYatesShuffle<T>(list: T[]): T[] {
  const newList: T[] = [...list]

  for (let index = newList.length - 1; index > 0; index -= 1) {
    const randomNumber = random(index, 0) as number;

    [newList[randomNumber], newList[index]] = [newList[index], newList[randomNumber]]
  }
  return newList;
}
