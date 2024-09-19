import type { ItemType } from "./ItemType";

export type ItemContainerType = {
  containerID: string,
  items: ItemType[],
};

//factory function so that we don't have to define the object manually everytime.
export function createItemContainer(id: string, items: ItemType[]):ItemContainerType {
  return {containerID: id, items: items};
}