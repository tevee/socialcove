import { DB, User, Post, Comment } from "../db/DBTypes.js";
import CustomError from "./CustomError.js";

export function getItemById<T extends User | Post | Comment>(
  array: T[],
  id: string
): T {
  const item = array.find((t) => t.id === id);

  if (!item) throw new CustomError(404, `Item with id ${id} not found`);

  return item;
}

export function getItemsById<T extends User | Post | Comment>(
  array: T[],
  ids: (string | number)[]
): T[] {
  const items = array.filter((i) => ids.includes(i.id));
  return items;
}

export function removeItemFromArray<T>(array: T[], item: T) {
  const index = array.indexOf(item);

  if (index !== -1) {
    array.splice(index, 1);
  }

  return array;
}

export function addItemToArray<T>(array: T[], item: T) {
  return array.push(item);
}