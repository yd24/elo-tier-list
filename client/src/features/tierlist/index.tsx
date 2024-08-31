import ItemContainer from "./components/item-container";
import ItemContainerControls from "./components/item-container-controls";
import RankContainer from "./components/rank-container";

import { useState } from "react";

import type { ItemType } from "./types/ItemType";
import { Skeleton } from "../../components/ui/skeleton";
import { DndContext } from "@dnd-kit/core";

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
    title: "Applebee",
    elo: 200,
  },
];

function TierListPage() {
  const [items, setItems] = useState<ItemType[]>(test_data);
  const [currentRanks, setRanks] = useState<string[]>([
    "S",
    "A",
    "B",
    "C",
    "D",
    "F",
  ]);

  const addItem = (name: string) => {
    //to-do
  };

  const changeRankHandler = (value: string, idx: number) => {
    const newRanks = [...currentRanks];
    newRanks[idx] = value;
    setRanks(newRanks);
  };

  return (
    <div className="p-2 bg-slate-700">
      <DndContext>
        {currentRanks.map((rank: string, idx: number) => (
          <RankContainer
            key={idx}
            id={idx}
            rank={rank}
            changeRankHandler={changeRankHandler}
          />
        ))}
        <div className="flex flex-col bg-slate-300">
          <ItemContainerControls addItem={addItem} />
          <ItemContainer items={items} id={currentRanks.length + 2} />
        </div>
      </DndContext>
    </div>
  );
}

export const LandingSkeleton = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="text-xl mb-5">Loading...</p>
      <div>
        <Skeleton className="w-[250px] h-[125px] rounded-xl mb-5" />
        <Skeleton className="w-[250px] h-4" />
      </div>
    </div>
  );
};

export default TierListPage;
