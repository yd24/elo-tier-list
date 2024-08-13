import { useState } from 'react';

interface RankContainerProps {
    ranks:string[]
    idx: number;
    setRanks: (prevRanks:string[]) => void;
}

function RankContainer(props: RankContainerProps) {

    return (
        <div className="flex min-h-32 even:bg-slate-100 odd:bg-slate-300 mb-2">
            <input 
                className="bg-red-500 max-w-20 min-h-20 border-none text-center" 
                type="text" value={props.ranks[props.idx]}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newRanks = [...props.ranks];
                    newRanks[props.idx] = e.target.value;
                    props.setRanks(newRanks);
                }}
            />
        </div>
    );
}

export default RankContainer;