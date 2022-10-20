import { randomUUID } from "crypto";
import { ScoreRankings, ScoreRankingsGuide } from "./constants";
import PuzzleInput, { Puzzle } from "./gameTypes";
import { getScore, getUniquePuzzle, randomSample } from "./puzzleHelpers";
import Trie from "./Trie";
import wordList from "./wordlists/wordList.json";

const getLoadedTrie = () => {
  const dictionaryTrie = new Trie();
  dictionaryTrie.insertTrieBulk(wordList);
  return dictionaryTrie;
};

const getRandomFullPuzzle = (): Puzzle => {
  const trie = getLoadedTrie();
  const randomPuzzle = getUniquePuzzle();

  const randomInput: PuzzleInput = {
    puzzleLetters: randomPuzzle,
    centralLetter: randomSample(randomPuzzle),
  };

  const solvedPuzzle = trie.solvePuzzle(randomInput);

  const scores = solvedPuzzle.solutions.map((answer) =>
    getScore(answer, solvedPuzzle.pangrams)
  );
  const maxScore = scores.reduce((max, currScore) => max + currScore, 0);
  const thresholds = Object.values(ScoreRankingsGuide).map((num) =>
    Math.floor(num * maxScore)
  );
  const rankings = Object.keys(ScoreRankingsGuide) as Array<ScoreRankings>;

  const puzzle = {
    gameId: randomUUID(),
    date: new Date(),
    puzzleLetters: randomInput.puzzleLetters,
    centralLetter: randomInput.centralLetter,
    pangrams: solvedPuzzle.pangrams,
    solutionsWithScores: Object.fromEntries(
      solvedPuzzle.solutions.map((_, idx) => [
        solvedPuzzle.solutions[idx],
        scores[idx],
      ])
    ),
    rankingScheme: Object.fromEntries(
      rankings.map((ranking, idx) => [ranking, thresholds[idx]])
    ) as { [key in ScoreRankings]: number },
  };
  return puzzle;
};
export default getRandomFullPuzzle;

export const getViablePuzzle = () => {
  const minimumNumWords = 10;
  const maxNumWords = 100;
  let puzzle = getRandomFullPuzzle();
  while (
    Object.keys(puzzle.solutionsWithScores).length < minimumNumWords ||
    Object.keys(puzzle.solutionsWithScores).length > maxNumWords
  ) {
    puzzle = getRandomFullPuzzle();
  }
  return puzzle;
};
