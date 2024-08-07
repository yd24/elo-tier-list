import type { Item } from '../types/Item';

interface ItemContainerProps {
    items: Item[];
}

function ItemContainer(props:ItemContainerProps) {
    return (
        <div className="flex gap-5 bg-slate-100">
            {props.items.map((item, idx) => {
              return (
               <div key={idx} className={`w-[80px] h-[80px] ${item.color}`}>
                </div> 
              )  
            })}
        </div>
    );
}

export default ItemContainer;