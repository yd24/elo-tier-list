import ItemContainer from './item-container';

interface RankContainerProps {
    id: string,
    rank: string,
    rankID: number,
    updateRankHandler: (value: string, idx: number) => void,
}

export default function RankContainer(props: RankContainerProps) {
    const updateRank = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.updateRankHandler(e.target.value, props.rankID);
    };

    return (
        <div className="flex min-h-32 mb-2 even:bg-slate-100 odd:bg-slate-300">
            <input 
                className="bg-red-500 max-w-20 min-h-20 border-none text-center" 
                type="text" value={props.rank}
                onChange={updateRank}
            />
            <ItemContainer id={props.id} items={[]}/>
        </div>
    );
}