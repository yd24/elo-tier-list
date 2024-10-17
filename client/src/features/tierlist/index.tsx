import ItemContainer from "./components/item-container";
import ItemContainerControls from "./components/item-container-controls";
import RankContainer from "./components/rank-container";
import RankToggle from "./components/rank-toggle";

import { useState, useEffect } from "react";

import type { ItemContainerType } from "./types/ItemContainerType";
import type { ItemType } from "./types/ItemType";
import { createItemContainer } from "./types/ItemContainerType";
import { createItem } from "./types/ItemType";
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
  const [originalItems, setOriginalItems] = useState<ItemType[]>([]);

  //setup initial rank and unranked containers
  //keep copy of original items for resetting positions
  const initializeContainers = () => {
    const initialContainers: ItemContainerType[] = [];
    ranks.forEach((rank, idx) => {
      let rankContainer = createItemContainer(`rankList-${idx}`, []);
      initialContainers.push(rankContainer);
    });
    initialContainers.push(createItemContainer("itemList", test_data));
    setOriginalItems([
      ...initialContainers[initialContainers.length - 1].items,
    ]);
    return initialContainers;
  };
  const [itemContainers, setItemContainers] = useState<ItemContainerType[]>(
    () => initializeContainers()
  );
  const [trueRankedItemContainers, setTrueRankContainers] = useState<
    ItemContainerType[]
  >(() => initializeContainers());
  const [isTrueRanksOn, toggleTrueRanks] = useState(false);

  const addItem = (name: string) => {
    //to-do
    const newItem: ItemType = createItem(name);
    setOriginalItems((prevItems) => [...prevItems, newItem]);
    setItemContainers((prevContainers) => {
      //spread operator only does shallow copy
      //so if the state is nested, the inner state elements will still reference the original state.
      //we can do a deep copy using spread operators within map.
      const updatedContainers = prevContainers.map((container) => ({
        ...container,
        items: [...container.items],
      }));
      updatedContainers[updatedContainers.length - 1].items.push(newItem);
      return updatedContainers;
    });
  };

  const resetItems = () => {
    setItemContainers((prevContainers) => {
      const resetContainers = [...prevContainers].map((container) =>
        createItemContainer(container.containerID, [])
      );
      resetContainers[resetContainers.length - 1].items = [...originalItems];
      return resetContainers;
    });
  };

  const handleTrueToggle = () => {
    toggleTrueRanks((currentStatus) => !currentStatus);
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

  const updateTrueRankHandler = (updatedRanks: ItemContainerType[]) => {
    setTrueRankContainers(updatedRanks);
  };

  const dragEndHandler = (event: DragEndEvent) => {
    //active = currently dragging item, over = item being hovered over
    const { active, over, delta } = event;

    const dragXThreshold = 4000;
    const dragYThreshold = 10000;
    const dragX = Math.pow(delta.x, 2);
    const dragY = Math.pow(delta.y, 2);
    setItemContainers((prevContainers) => {
      const updatedContainers = [...prevContainers];
      if (over && (dragY > dragYThreshold || dragX > dragXThreshold)) {
        //we find the idx so we can update the containers later
        const overContainerIndex = updatedContainers.findIndex((container) => {
          //we might be hovering over a container or an item
          //so we check for both
          if (container.containerID === over.id) {
            return true;
          } else {
            return container.items.find((item) => item.id === over.id);
          }
        });
        const activeContainerIndex = updatedContainers.findIndex((container) =>
          container.items.find((item) => item.id === active.id)
        );

        //select the relevant containers
        const overContainer = updatedContainers[overContainerIndex];
        const activeContainer = updatedContainers[activeContainerIndex];

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
              destinationIndex =
                activeIndex > overIndex ? overIndex : overIndex + 1;
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
    <div className="bg-slate-100 p-5">
      <DndContext onDragEnd={dragEndHandler}>
        <RankToggle
          isTrueRanksOn={isTrueRanksOn}
          handleTrueToggle={handleTrueToggle}
        />
        <div id="rankArea">
          {ranks.map((rank: string, idx: number) => (
            <RankContainer
              key={idx}
              dndID={itemContainers[idx].containerID}
              rankID={idx}
              rank={rank}
              updateRankHandler={updateRankHandler}
              items={
                isTrueRanksOn
                  ? trueRankedItemContainers[idx].items
                  : itemContainers[idx].items
              }
            />
          ))}
        </div>
        <div id="itemArea" className="flex flex-col">
          <ItemContainerControls
            addItem={addItem}
            resetItems={resetItems}
            allItems={originalItems}
            updateTrueRankHandler={updateTrueRankHandler}
            trueRankedItemContainers={trueRankedItemContainers}
            toggleTrueRanks={handleTrueToggle}
          />
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
