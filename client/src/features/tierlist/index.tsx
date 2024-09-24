import ItemContainer from "./components/item-container";
import ItemContainerControls from "./components/item-container-controls";
import RankContainer from "./components/rank-container";

import { useState } from "react";

import type { ItemContainerType } from "./types/ItemContainerType";
import { createItemContainer } from "./types/ItemContainerType";
import { Skeleton } from "../../components/ui/skeleton";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const test_data = [
  {
    id: "Item-0",
    title: "Jollibee",
    elo: 1400,
  },
  {
    id: "Item-1",
    title: "KFC",
    elo: 1200,
  },
  {
    id: "Item-2",
    title: "Popeyes",
    elo: 400,
  },
  {
    id: "Item-3",
    title: "Church's",
    elo: 1600,
  },
  {
    id: "Item-4",
    title: "Applebee",
    elo: 200,
  },
];

function TierListPage() {
  const [ranks, setRanks] = useState<string[]>(["S", "A", "B", "C", "D", "F"]);

  //setup containers for each rank and the unranked items
  const [itemContainers, setItemContainers] = useState<ItemContainerType[]>(
    () => {
      const initialContainers = [];

      ranks.forEach((rank, idx) => {
        let rankContainer = createItemContainer(`rankList-${idx}`, []);
        initialContainers.push(rankContainer);
      });

      initialContainers.push(createItemContainer("itemList", test_data));

      return initialContainers;
    }
  );

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
  };

  const dragEndHandler = (event: DragEndEvent) => {
    //active = currently dragging item, over = item being hovered over
    const { active, over, delta } = event;
    const dragXThreshold = 4000;
    const dragYThreshold = 10000;
    const dragX = Math.pow(delta.x, 2);
    const dragY = Math.pow(delta.y, 2);
    console.log(dragX, dragY);
    setItemContainers((prevContainers) => {
      const updatedContainers = [...prevContainers];
      if (over && (dragY > dragYThreshold || dragX > dragXThreshold)) {
        //we find the idx so we can update the containers later
        const overContainerIndex = prevContainers.findIndex((container) => {
          //we might be hovering over a container or an item
          //so we check for both
          if (container.containerID === over.id) {
            return true;
          } else {
            return container.items.find((item) => item.id === over.id);
          }
        });
        const activeContainerIndex = prevContainers.findIndex((container) =>
          container.items.find((item) => item.id === active.id)
        );

        //select the relevant containers
        const overContainer = prevContainers[overContainerIndex];
        const activeContainer = prevContainers[activeContainerIndex];

        //if we have valid containers, move the item to its appropriate container and position
        if (overContainer && activeContainer) {
          const activeIndex = activeContainer.items.findIndex(
            (item) => item.id === active.id
          );
          const activeItem = activeContainer.items.splice(activeIndex, 1)[0];

          if (over.id === overContainer.containerID) {
            overContainer.items.push(activeItem);
          } else {
            const overIndex = overContainer.items.findIndex(
              (item) => item.id === over.id
            );
            //figure out if we want active item to be placed before or after
            //the over item.
            let destinationIndex = 0;
            //active item is rearranging within same container
            //we want it to go BEFORE if it's from the right side, AFTER if it's from the left side.
            if (activeContainer === overContainer) {
              destinationIndex = activeIndex > overIndex ? overIndex : overIndex + 1;
            } else {
              //active item is coming from another container
              //intuitively, we want it to drop BEFORE the over item
              destinationIndex = overIndex;
            }
            overContainer.items.splice(destinationIndex, 0, activeItem);
          }

          updatedContainers[overContainerIndex] = overContainer;
          updatedContainers[activeContainerIndex] = activeContainer;
        }
      }
      return updatedContainers;
    });
  };

  return (
    <div>
      <DndContext
        onDragEnd={dragEndHandler}
      >
        <div id="rankArea" className="p-2 bg-slate-700">
          {ranks.map((rank: string, idx: number) => (
            <RankContainer
              key={idx}
              dndID={itemContainers[idx].containerID}
              rankID={idx}
              rank={rank}
              updateRankHandler={updateRankHandler}
              items={itemContainers[idx].items}
            />
          ))}
        </div>
        <div id="itemArea" className="flex flex-col bg-slate-300">
          <ItemContainerControls addItem={addItem} />
          <ItemContainer
            items={itemContainers[itemContainers.length - 1].items}
            dndID={itemContainers[itemContainers.length - 1].containerID}
          />
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
