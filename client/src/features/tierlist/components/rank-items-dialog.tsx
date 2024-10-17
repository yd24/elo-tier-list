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
import { ItemContainerType } from "../types/ItemContainerType";
import MatchMaker from "../utilities/MatchMaker";

interface RankItemsDialogProps {
  allItems: ItemType[];
  updateTrueRankHandler: (updatedRanks: ItemContainerType[]) => void;
  trueRankedItemContainers: ItemContainerType[];
  toggleTrueRanks: () => void;
}

export default function RankItemsDialog(props: RankItemsDialogProps) {
  const [open, setOpen] = useState(false);
  const [dialogError, setDialogError] = useState(false);
  const [itemsToRank, setItemsToRank] = useState<ItemType[]>(props.allItems);
  const [itemsInCombat, setItemsCombat] = useState<ItemType[]>([]);
  const [matchmaker, setMatchMaker] = useState<MatchMaker>(
    MatchMaker.getInstance()
  );
  const [hasRankingFinished, setHasRankingFinished] = useState(true);

  const startRankHandler = () => {
    props.toggleTrueRanks();
    matchmaker.setItems(itemsToRank);
    setHasRankingFinished(!hasRankingFinished);
    matchmaker.startRanking();
    conductMatches();
  };

  const conductMatches = () => {
    let currentMatchup = matchmaker.getMatchUp();
    if (currentMatchup.length > 0) {
      setItemsCombat(currentMatchup);
    } else {
      postMatches();
    }
  };

  const postMatches = () => {
    //post-matches stuff
    setItemsCombat(matchmaker.handleBye());
    //do transitive ranking update
    const finalScores = matchmaker.organizeIntoRanks();
    handleFinalRankings(finalScores);
    matchmaker.finishRanking();
  };

  const handleWinner = (winner: ItemType, loser: ItemType, winType: number) => {
    matchmaker.updateRanks(winner, loser, winType);
    conductMatches();
  };

  const handleFinalRankings = (scores: ItemType[][]) => {
    const updatedRanks = props.trueRankedItemContainers.map(
      (container, idx) => {
        container.items = scores[idx];
        return container;
      }
    );
    props.updateTrueRankHandler(updatedRanks);
  };

  /*const setupMatch = () => {
    setMatchesLeft(
      rankingSpeedSelected === 1 ? itemsToRank.size : itemsToRank.size * 2
    );
    //newMatch();
  };*/

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
      return () => setHasRankingFinished(true);
    }
  }, [open]);

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
          {hasRankingFinished && !matchmaker.rankingPending && (
            <>
              <h3>True Ranking System</h3>
              <Button onClick={startRankHandler}>Start Now</Button>
            </>
          )}
          {itemsInCombat.length >= 2 && matchmaker.rankingPending && (
            <>
              <h3 className="text-lg mb-5">Which do you prefer?</h3>
              <div className="flex gap-10">
                <Button
                  onClick={() =>
                    handleWinner(itemsInCombat[0], itemsInCombat[1], 1)
                  }
                >
                  {itemsInCombat[0].title}
                </Button>
                <Button
                  onClick={() =>
                    handleWinner(itemsInCombat[1], itemsInCombat[0], 1)
                  }
                >
                  {itemsInCombat[1].title}
                </Button>
              </div>
            </>
          )}
          {itemsInCombat.length === 0 && matchmaker.rankingPending && (
            <>
              <p className="text-lg mb-5">There are no items to rank.</p>
              <p className="text-lg mb-5">Please add some items.</p>
            </>
          )}
          {!hasRankingFinished && !matchmaker.rankingPending && (
            <>
              <p className="text-lg mb-5">Ranking Completed!</p>
            </>
          )}
        </div>
        <DialogFooter className="text-red-500">
          {dialogError && <p>Error: Name is invalid.</p>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
