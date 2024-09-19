import { ReactElement, ElementType } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface DraggableDroppableProps {
  id: string;
  children: ReactElement;
  element?: ElementType;
}

export default function DraggableDroppable(props:DraggableDroppableProps) {
  const Element = props.element || 'div';
  
  //we make the item both draggable and droppable so we can 
  //track it when hovering over it
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id,
  });
  const {isOver, setNodeRef: droppableRef} = useDroppable({
    id: props.id,
  });

  const style={
    transform: CSS.Translate.toString(transform),
    border: isOver ? '1px solid red' : '',
  };

  return (
    <Element
      ref={(node:HTMLElement | null) => {
        setNodeRef(node);
        droppableRef(node);
      }}
      {...attributes}
      {...listeners}
      style={style}
      className={`cursor-grab ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {props.children}
    </Element>
  )
}