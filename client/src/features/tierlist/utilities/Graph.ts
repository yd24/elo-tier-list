import { ItemType } from "../types/ItemType";

//weighted edge, showing how big the win was
type ItemEdge = {
  item: ItemType;
  weight: number;
};

export default class ItemGraph {
  //graph that keeps track of items and
  //the other items they defeated
  private nodes: Map<ItemType, ItemEdge[]> = new Map();

  public constructor(
    item: ItemType | null = null,
    rankingEdges: ItemEdge[] = []
  ) {
    this.nodes = new Map();
    if (item) {
      this.nodes.set(item, rankingEdges);
    }
  }

  public updateWins(winner: ItemType, loser: ItemType, winType: number) {
    const wonAgainst = this.nodes.get(winner);
    if (wonAgainst) {
      wonAgainst.push({ item: loser, weight: winType });
    } else {
      this.nodes.set(winner, [{ item: loser, weight: winType }]);
    }

    if (!this.nodes.has(loser)) {
      this.nodes.set(loser, []);
    }
  }

  public getWins(winner: ItemType) {
    return this.nodes.get(winner);
  }

  public getGraphEdges(item: ItemType) {
    return this.nodes.get(item);
  }

  public getAllNodes() {
    return [...this.nodes.keys()];
  }
}
