import { ReactElement, ElementType } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface DraggableProps {
  id: string;
  children: ReactElement;
  element?: ElementType;
}

export default function Draggable(props:DraggableProps) {
  const Element = props.element || 'div';
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id,
  });

  const style={
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Element
      setRef={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`cursor-grab ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {props.children}
    </Element>
  )
}