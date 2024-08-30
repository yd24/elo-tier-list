import type { Item } from '../types/Item';
import { useState } from 'react';

interface ItemContainerProps {
    items: Item[];
}

export default function ItemContainer(props:ItemContainerProps) {
    const [items, setItems] = useState(props.items);

    return (
        <div className="flex w-full min-h-20 p-5 gap-5">
            {props.items.map((item, idx) => {
              return (
               <div key={idx} className={`bg-white p-5`}>
                    {item.title}
                </div> 
              )  
            })}
        </div>
    );
}