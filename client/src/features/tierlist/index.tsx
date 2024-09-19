import ItemContainer from "./components/item-container";
import ItemContainerControls from "./components/item-container-controls";
import RankContainer from "./components/rank-container";

import { useState } from "react";

import type { ItemType } from "./types/ItemType";
import type { ItemContainerType } from "./types/ItemContainerType";
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
  const [ranks, setRanks] = useState<string[]>([
    "S",
    "A",
    "B",
    "C",
    "D",
    "F",
  ]);

  //setup containers for each rank and item
  const [items, setItems] = useState<ItemContainerType>(() => {
    const initialContainers = [test_data];
    ranks.forEach(() => initialContainers.push([]));
    return initialContainers;
  });

  const addItem = (name: string) => {
    //to-do
  };

  const updateRankHandler = (value: string, idx: number) => {
    //use anonymous function within hook to ensure that most recent state
    //provided by the hook is accessed.
    setRanks((prevRanks) => {
      const updatedRanks = [...prevRanks];
      updatedRanks[idx] = value;
      return updatedRanks;
    });
  }

  const dragEndHandler = (event) => {
    const {over} = event;
  };

  return (
    <div>
      <DndContext onDragEnd={dragEndHandler}>
        <div id="rankArea" className="p-2 bg-slate-700">
          {ranks.map((rank: string, idx: number) => (
            <RankContainer
              key={idx}
              id={`rankList-${idx}`}
              rankID={idx}
              rank={rank}
              updateRankHandler={updateRankHandler}
              items={items[idx + 1]}
            />
          ))}
        </div>
        <div id="itemArea" className="flex flex-col bg-slate-300">
          <ItemContainerControls addItem={addItem} />
          <ItemContainer items={items[0]} id="itemList" />
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
