import type { Item } from '../types/Item';

interface ItemContainerProps {
    items: Item[];
}

function ItemContainer(props:ItemContainerProps) {
    return (
        <div className="flex w-full min-h-20 p-5 gap-5 bg-slate-200">
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