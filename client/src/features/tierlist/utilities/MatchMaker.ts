import type { ItemType } from "../types/ItemType";
import ItemGraph from "../utilities/Graph";

export default class MatchMaker {
  private static instance: MatchMaker;
  private itemsToRank: ItemType[];
  private itemsBeingRanked: ItemType[];
  private pastMatches: Set<[ItemType, ItemType]>;
  private rankingGraph: ItemGraph;
  private itemWinCounts: Map<ItemType, number>;
  public rankingPending: boolean;
  private byeItem: ItemType | null;

  private constructor() {
    this.itemsToRank = [];
    this.itemsBeingRanked = [];
    this.rankingPending = false;
    this.pastMatches = new Set();
    this.rankingGraph = new ItemGraph();
    this.itemWinCounts = new Map();
    this.byeItem = null;
  }

  public static getInstance(): MatchMaker {
    if (!MatchMaker.instance) {
      MatchMaker.instance = new MatchMaker();
    }
    return MatchMaker.instance;
  }

  public setItems(items: ItemType[]) {
    this.itemsToRank = items;
  }

  public startRanking() {
    this.rankingPending = true;
    this.itemsBeingRanked = [...this.itemsToRank];
    console.log(this.itemsToRank);
    this.itemsToRank = this.shuffle(this.itemsBeingRanked);
    if (this.itemsBeingRanked.length % 2 > 0) {
      const idx = Math.floor(Math.random() * this.itemsBeingRanked.length);
      this.byeItem = this.itemsBeingRanked.splice(idx, 1)[0];
    }
  }

  public getMatchUp(): ItemType[] {
    if (this.itemsBeingRanked.length > 1) {
      const item1 = this.itemsBeingRanked.pop();
      const item2 = this.itemsBeingRanked.pop();
      if (item1 && item2) {
        return [item1, item2];
      }
    }
    return [];
  }

  public handleBye() {
    if (this.byeItem) {
      this.itemsBeingRanked = [...this.itemsToRank];
      this.itemsBeingRanked = this.shuffle(this.itemsBeingRanked);
      let item1 = this.itemsBeingRanked.pop();
      while (item1 === this.byeItem) {
        item1 = this.itemsBeingRanked.pop();
      }
      const item2 = this.byeItem;
      if (item1 && item2) {
        return [item1, item2];
      }
    }
    return [];
  }

  public transitiveRanking() {
    //dfs traversal in graph to count up wins for each item.
    const scores = [];
    const dfs = (node: ItemType) => {
      const wonAgainst = this.rankingGraph.getGraphEdges(node);
      if (!wonAgainst || wonAgainst.length === 0) return 0;
      const totalWins: number = wonAgainst.reduce((acc, curr) => {
        return acc + dfs(curr.item);
      }, 0);
      return totalWins + 1;
    };

    const nodes = this.rankingGraph.getAllNodes();
    for (const node of nodes) {
      const totalWins = dfs(node);
      scores.push({ node, totalWins });
    }
    return scores;
  }

  public organizeIntoRanks() {
    const scores = this.transitiveRanking();
    scores.sort((a, b) => b.totalWins - a.totalWins);
    console.log(scores);
    const rankings: ItemType[][] = [
      //S
      [],
      //A
      [],
      //B
      [],
      //C
      [],
      //D
      [],
      //F
      [],
    ];

    scores.forEach((item, idx) => {
      const node = item.node;
      const totalItems = scores.length;

      const thresholds = {
        S: Math.ceil(totalItems * 0.1), //1
        A: Math.ceil(totalItems * 0.2), //1
        B: Math.ceil(totalItems * 0.4), //2
        C: Math.ceil(totalItems * 0.4), //2
        D: Math.ceil(totalItems * 0.3), //
        F: totalItems,
      };

      if (idx < thresholds.S) {
        rankings[0].push(node);
      } else if (idx < thresholds.S + thresholds.A) {
        rankings[1].push(node);
      } else if (idx < thresholds.S + thresholds.A + thresholds.B) {
        rankings[2].push(node);
      } else if (
        idx <
        thresholds.S + thresholds.A + thresholds.B + thresholds.C
      ) {
        rankings[3].push(node);
      } else if (
        idx <
        thresholds.S + thresholds.A + thresholds.B + thresholds.C + thresholds.D
      ) {
        rankings[4].push(node);
      } else {
        rankings[5].push(node);
      }
    });
    return rankings;
  }

  public updateRanks(winner: ItemType, loser: ItemType, winType: number) {
    this.rankingGraph.updateWins(winner, loser, winType);
    this.pastMatches.add([winner, loser]);
    this.pastMatches.add([loser, winner]);
  }

  public finishRanking() {
    this.rankingPending = false;
  }

  //fisher-yates shuffling algorithm
  private shuffle(items: ItemType[]): ItemType[] {
    const shuffledArr = [...items];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr;
  }
}

/*
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
*/

//use a graph to keep track of winners/losers
//have a Set that keeps track of matchups to prevent duplicate matchups
//use transititive ranking with the graph to get our final ranks
