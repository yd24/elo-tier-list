import { useDroppable } from "@dnd-kit/core";

import type { ItemType } from "../types/ItemType";
import Item from "./item";
import DraggableDroppable from './draggabledroppable';

interface ItemContainerProps {
  dndID: string;
  items: ItemType[];
}

export default function ItemContainer(props: ItemContainerProps) {
  const {setNodeRef} = useDroppable({
    id: props.dndID,
  });

  return (
    <div ref={setNodeRef} className={"flex w-full min-h-20 p-5 gap-5"}>
      {props.items.map((item, idx) => (
        <DraggableDroppable key={idx} id={item.id}>
          <Item item={item} />
        </DraggableDroppable>
      ))}
    </div>
  );
}
