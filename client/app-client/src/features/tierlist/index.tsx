import ItemContainer from './components/item-container';
import ItemContainerControls from './components/item-container-controls';
import RankContainer from './components/rank-container';
import { useState } from 'react';
import type { Item } from './types/Item';
import { Skeleton } from "../../components/ui/skeleton";

function TierListPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [currentRanks, setRanks] = useState<string[]>(['S', 'A', 'B', 'C', 'D', 'F']);

    const addItem = () => {
        const colors = ['bg-amber-300', 'bg-rose-400', 'bg-stone-300', 'bg-cyan-400', 'bg-violet-700', 'bg-pink-800'];
        let randomColor = colors[Math.floor(Math.random() * 6)];
        let item = { color: randomColor};
        setItems([...items, item]);
    };

    return (
        <div className="p-2 bg-slate-700">
            {currentRanks.map((rank: string, idx: number) =>
              <RankContainer key={idx} ranks={currentRanks} idx={idx} setRanks={setRanks} />
            )}
            <div className="flex flex-col">
                <ItemContainerControls addItem={addItem}/>
                <ItemContainer items={items}/>
            </div>
        </div>
    );
}

export const LandingSkeleton = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="text-xl mb-5">
        Loading...
      </p>
      <div>
        <Skeleton className="w-[250px] h-[125px] rounded-xl mb-5" />
        <Skeleton className="w-[250px] h-4" />
      </div>
    </div>
  );
}

export default TierListPage;