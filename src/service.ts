/**
 * Data Model Interfaces
 */
import { ScoreRankings, ScoreRankingsGuide } from "./constants";
import PuzzleInput, { BasePuzzle, Puzzle, SolutionAndScore } from "./gameTypes";
import { getScore, getUniquePuzzle, randomSample } from "./puzzleHelpers";
import Trie from "./Trie";

/**
 * In-Memory Store
 */
import wordList from "./wordlists/wordList.json";

const dictionaryTrie = new Trie();
dictionaryTrie.insertTrieBulk(wordList);

/**
 * Service Methods
 */

//  const getRandomFullPuzzle = async ():Puzzle => {

const getRandomFullPuzzle = (): Puzzle => {
  const randomPuzzle = getUniquePuzzle();

  const randomInput: PuzzleInput = {
    puzzleLetters: randomPuzzle,
    centralLetter: randomSample(randomPuzzle),
  };

  const solvedPuzzle = dictionaryTrie.solvePuzzle(randomInput);

  const scores = solvedPuzzle.solutions.map((answer) => getScore(answer));
  const maxScore = scores.reduce((max, currScore) => max + currScore, 0);
  const thresholds = Object.values(ScoreRankingsGuide).map((num) =>
    Math.floor(num * maxScore)
  );
  const rankings = Object.keys(ScoreRankingsGuide) as Array<ScoreRankings>;

  return {
    gameId: 2,
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
};

console.log(getRandomFullPuzzle());
