import { UniqueIdentifier } from "@dnd-kit/core"
import type { ItemType } from './ItemType';

export type DndType = {
  id: UniqueIdentifier,
  items: ItemType[],
}