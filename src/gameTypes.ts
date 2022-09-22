import { ScoreRankings } from "./constants";

type Pangrams = Array<string>;
export type SolutionAndScore = { [key: string]: number };

export default interface PuzzleInput {
  puzzleLetters: Array<string> | string;
  centralLetter: string;
}

export interface PuzzleSolution {
  solutions: Array<string>;
  pangrams: Pangrams;
}

export interface BasePuzzle extends PuzzleInput {
  date: Date;
  rankingScheme: { [key in ScoreRankings]: number };
  pangrams: Pangrams;
  solutionsWithScores: SolutionAndScore;
}

export interface Puzzle extends BasePuzzle {
  gameId: string;
}
