import type { ItemType } from "../types/ItemType";
import { useDraggable } from "@dnd-kit/core";

interface ItemProps {
  id: number;
  item: ItemType;
}

export default function Item(props: ItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: props.id + 1,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`bg-white p-5 cursor-grab ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      onClick={() => console.log(props.id)}
    >
      {props.item.title}
    </div>
  );
}
