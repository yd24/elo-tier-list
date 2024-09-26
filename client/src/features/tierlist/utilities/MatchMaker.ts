import type { ItemType } from "../types/ItemType";

class MatchMaker {
  private static instance: MatchMaker;
  private itemsToRank:Map<ItemType, number>;

  private constructor() {
    this.itemsToRank = new Map();
  }

  public static getInstance(): MatchMaker {
    if (!MatchMaker.instance) {
      MatchMaker.instance = new MatchMaker();
    }
    return MatchMaker.instance;
  }

  public setItems(items: Map<ItemType, number>) {
    this.itemsToRank = items;
  }

  //fisher-yates shuffling algorithm
  private shuffle(items: ItemType[]): ItemType[] {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  public setupMatch(): [ItemType | undefined, ItemType | undefined] {
    const shuffled = this.shuffle([...this.itemsToRank.keys()]);
    const item_1 = shuffled.pop();
    const item_2 = shuffled.pop();

    return [item_1, item_2];
  }

  public conductMatch(part_1: ItemType, part_2: ItemType, winner: ItemType): Map<ItemType, number> {
    const part_1_score = this.itemsToRank.get(part_1);
    const part_2_score = this.itemsToRank.get(part_2);

    //if (part_1 === winner)
    //if (part_2 === winner)
    //get new scores based off Bayesian Rankings.

    return new Map(this.itemsToRank);
  }
}