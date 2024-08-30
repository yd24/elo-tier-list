import ItemContainer from './components/item-container';
import ItemContainerControls from './components/item-container-controls';
import RankContainer from './components/rank-container';

import { useState } from 'react';

import type { Item } from './types/Item';
import { Skeleton } from "../../components/ui/skeleton";

const test_data = [
  {
    id: 1,
    title: "Jollibee",
    elo: 1400,
  },
  {
    id: 2,
    title: "KFC",
    elo: 1200,
  },
  {
    id: 3,
    title: "Popeyes",
    elo: 400,
  },
  {
    id: 4,
    title: "Church's",
    elo: 1600,
  },
  {
    id: 5,
    title: 'Applebee',
    elo: 200,
  }
];

function TierListPage() {
    const [items, setItems] = useState<Item[]>(test_data);
    const [currentRanks, setRanks] = useState<string[]>(['S', 'A', 'B', 'C', 'D', 'F']);

    const addItem = (name: string) => {
      //to-do
    };

    return (
        <div className="p-2 bg-slate-700">
            {currentRanks.map((rank: string, idx: number) =>
              <RankContainer key={idx} ranks={currentRanks} idx={idx} setRanks={setRanks} />
            )}
            <div className="flex flex-col bg-slate-300">
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