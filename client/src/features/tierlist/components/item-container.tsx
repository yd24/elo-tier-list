import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";

import type { ItemType } from "../types/ItemType";
import Item from "./item";
import Draggable from './draggable';

interface ItemContainerProps {
  id: string;
  items: ItemType[];
}

export default function ItemContainer(props: ItemContainerProps) {
  const [items, setItems] = useState(props.items);
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} className={"flex w-full min-h-20 p-5 gap-5"}>
      {props.items.map((item, idx) => (
        <Draggable id={`Item-${idx}`}>
          <Item key={idx} item={item} />
        </Draggable>
      ))}
    </div>
  );
}
