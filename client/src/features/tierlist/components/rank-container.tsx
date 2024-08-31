import ItemContainer from './item-container';

interface RankContainerProps {
    id: number,
    rank: string,
    changeRankHandler: (value: string, idx: number) => void,
}

export default function RankContainer(props: RankContainerProps) {
    return (
        <div className="flex min-h-32 mb-2 even:bg-slate-100 odd:bg-slate-300">
            <input 
                className="bg-red-500 max-w-20 min-h-20 border-none text-center" 
                type="text" value={props.rank}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props.changeRankHandler(e.target.value, props.id);
                }}
            />
            <ItemContainer id={props.id} items={[]}/>
        </div>
    );
}