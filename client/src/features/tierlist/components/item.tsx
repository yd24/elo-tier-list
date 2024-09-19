import type { ItemType } from "../types/ItemType";

interface ItemProps {
  item: ItemType;
}

export default function Item(props: ItemProps) {

  return (
    <div
      className={`bg-white p-5`}
    >
      {props.item.title}
    </div>
  );
}
