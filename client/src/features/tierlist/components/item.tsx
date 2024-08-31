import type { ItemType } from "../types/ItemType";
import { useDraggable } from "@dnd-kit/core";

interface ItemProps {
  id: number;
  item: ItemType;
}

export default function Item(props: ItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id + 1,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white p-5`}
      onClick={() => console.log(props.id)}
    >
      {props.item.title}
    </div>
  );
}
