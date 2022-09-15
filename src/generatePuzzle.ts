import wordList from "./wordlists/wordList.json";
// import dictionary from "./wordlists/dictionary.json";
import Trie from "./Trie";
import PuzzleInput from "./gameTypes";
import { getUniquePuzzle, randomSample } from "./puzzleHelpers";

const randomPuzzle = getUniquePuzzle();

const puzzleInput: PuzzleInput = {
  puzzleLetters: randomPuzzle,
  centralLetter: randomSample(randomPuzzle),
};

const dictionaryTrie = new Trie();
dictionaryTrie.insertTrieBulk(wordList);

const puzzleSolutions = dictionaryTrie.solvePuzzle(puzzleInput);
console.log(puzzleSolutions);
