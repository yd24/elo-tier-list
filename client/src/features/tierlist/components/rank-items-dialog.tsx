import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { ItemType } from "../types/ItemType";

interface RankItemsDialogProps {
  allItems: ItemType[];
}

export default function RankItemsDialog(props: RankItemsDialogProps) {
  const kFactor = 100;
  const [open, setOpen] = useState(false);
  const [dialogError, setDialogError] = useState(false);
  const [itemsToRank, setItemsToRank] = useState<Map<ItemType, number>>(() => {
    const map = new Map<ItemType, number>();
    const originalItems = [...props.allItems];
    const startingELO = 1000;
    originalItems.forEach((item) => map.set(item, startingELO));
    return map;
  });
  const [rankingSpeedSelected, selectRankingSpeed] = useState<number | null>(null);
  const [matchesLeft, setMatchesLeft] = useState(0);
  const [itemsInCombat, setItemsCombat] = useState<ItemType[]>([]);

  const handleSpeedSelection = (speed: number) => {
    setupMatch();
    selectRankingSpeed(speed);
  };

  const setupMatch = () => {
    setMatchesLeft(
      rankingSpeedSelected === 1 ? itemsToRank.size : itemsToRank.size * 2
    );
    //newMatch();
  };

  /*const newMatch = () => {
    const fightingItems = shuffleItems([...itemsToRank.keys()]);
    if (fightingItems.length >= 2) {
      const item1_ID = fightingItems.pop() as ItemType;
      const item2_ID = fightingItems.pop() as ItemType;
      setItemsCombat([item1_ID, item2_ID]);
    }
  };

  const decideMatch = (winner: number) => {
    const winItemNum = winner === 0 ? 0 : 1;
    const loseItemNum = winner === 0 ? 1 : 0;

    const winItem = itemsInCombat[winItemNum];
    const loseItem = itemsInCombat[loseItemNum];

    const winItemELO = itemsToRank.get(winItem) || 1000;
    const loseItemELO = itemsToRank.get(loseItem) || 1000;

    const updatedItems = new Map(itemsToRank);

    updatedItems.set(winItem, winItemELO + kFactor);
    updatedItems.set(loseItem, loseItemELO - kFactor);

    setMatchesLeft(matchesLeft - 1);
    setItemsToRank(updatedItems);
    newMatch();
  };*/
  
  useEffect(() => {
    if (!open) {
      //cleanup function that runs when open changes
      //aka it resets the dialog box before it opens again
      return () => selectRankingSpeed(null);
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-white hover:bg-slate-200 px-5 py-2">
        True Rank Items
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Rank Items</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center p-5">
          {!rankingSpeedSelected 
          &&
            <>
              <h3 className="text-lg mb-5">Select ranking duration</h3>
              <div className="flex gap-10">
                <Button onClick={() => handleSpeedSelection(1)}>Quick</Button>
                <Button onClick={() => handleSpeedSelection(2)}>
                  Comprehensive
                </Button>
              </div>
            </>
          }
          {(rankingSpeedSelected && itemsInCombat.length >= 2 && matchesLeft > 0)
          &&
            <>
              <h3 className="text-lg mb-5">Which do you prefer?</h3>
              <div className="flex gap-10">
                <Button onClick={() => console.log()}>
                  {itemsInCombat[0].title}
                </Button>
                <Button onClick={() => console.log()}>
                  {itemsInCombat[1].title}
                </Button>
              </div>
            </>
          }
          {(rankingSpeedSelected && itemsInCombat.length === 0) 
          &&
            <>
              <p className="text-lg mb-5">There are no items to rank.</p>
              <p className="text-lg mb-5">Please add some items.</p>
            </>
          }
          {(rankingSpeedSelected && matchesLeft === 0)
          &&
            <>
              <p className="text-lg mb-5">Ranking Completed!</p>
            </>
          }
        </div>
        <DialogFooter className="text-red-500">
          {dialogError && <p>Error: Name is invalid.</p>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
