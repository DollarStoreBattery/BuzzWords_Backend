// randomly select a potential pangram

// randomly select a letter from the pangram
// feature: find frequency of each letter, do some sort of weighted selection

// deserialze the trie

// generate puzzle solutions for pangram and letter

import wordList from "./wordlists/wordList.json";
import uniquePuzzles from "./wordlists/uniquePuzzles.json";
// import dictionary from "./wordlists/dictionary.json";
import Trie from "./Trie";
import { PANGARM_LENGTH } from "./constants";

const randomSample = <Type>(population: Array<Type>): Type => {
  const randNum = Math.floor(Math.random() * population.length);
  return population[randNum];
};

const getPangrams = (solutionsList: String[]) => {
  return solutionsList.flatMap((solution) => {
    const solutionUnique = new Set(solution);
    if (solutionUnique.size == PANGARM_LENGTH) {
      return solution;
    } else return [];
  });
};

const randomPuzzle = randomSample(uniquePuzzles);
const centralLetter: string = randomSample(randomPuzzle.split(""));

const dictionaryTrie = new Trie();
dictionaryTrie.insertTrieBulk(wordList);

const puzzleSolutions = dictionaryTrie.findSolutions(
  centralLetter,
  randomPuzzle
);

console.log(puzzleSolutions, getPangrams(puzzleSolutions));
