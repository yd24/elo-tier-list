import CreateItemDialog from "./create-item-dialog";
import RankItemsDialog from "./rank-items-dialog";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { ItemType } from "../types/ItemType";
import { ItemContainerType } from "../types/ItemContainerType";

interface ItemsContainerControlsProps {
  addItem: (name: string) => void;
  resetItems: () => void;
  allItems: ItemType[];
  updateTrueRankHandler: (updatedRanks: ItemContainerType[]) => void;
  trueRankedItemContainers: ItemContainerType[];
  toggleTrueRanks: () => void;
}

function ItemsContainerControls(props: ItemsContainerControlsProps) {
  return (
    <div className="flex">
      <div className="p-5">
        <CreateItemDialog addItem={props.addItem} />
      </div>
      <div className="p-5">
        <Dialog>
          <DialogTrigger
            className="bg-white hover:bg-slate-200 px-5 py-2"
            onClick={props.resetItems}
          >
            Reset Items
          </DialogTrigger>
        </Dialog>
      </div>
      <div className="p-5">
        <RankItemsDialog
          allItems={props.allItems}
          updateTrueRankHandler={props.updateTrueRankHandler}
          trueRankedItemContainers={props.trueRankedItemContainers}
          toggleTrueRanks={props.toggleTrueRanks}
        />
      </div>
    </div>
  );
}

export default ItemsContainerControls;
