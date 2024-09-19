import { useDroppable } from '@dnd-kit/core';

import ItemContainer from './item-container';
import type { ItemType } from '../types/ItemType';

interface RankContainerProps {
    id: string,
    rank: string,
    rankID: number,
    updateRankHandler: (value: string, idx: number) => void,
    items: ItemType[],
}

export default function RankContainer(props: RankContainerProps) {
    const updateRank = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.updateRankHandler(event.target.value, props.rankID);
    };

    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });

    return (
        <div className="flex min-h-32 mb-2 even:bg-slate-100 odd:bg-slate-300"
            ref={setNodeRef}
        >
            <input 
                className="bg-red-500 max-w-20 min-h-20 border-none text-center" 
                type="text" value={props.rank}
                onChange={updateRank}
            />
            <ItemContainer id={props.id} items={props.items}/>
        </div>
    );
}