import { MINIMUM_WORD_LENGTH, PANGARM_LENGTH } from "./constants";
import uniquePuzzles from "./wordlists/uniquePuzzles.json";

export const randomSample = <Type>(population: Array<Type>): Type => {
  const randNum = Math.floor(Math.random() * population.length);
  return population[randNum];
};

export const getUniquePuzzle = () => {
  return randomSample(uniquePuzzles).split("");
};

export const getPangrams = (solutionsList: string[]): string[] => {
  return solutionsList.flatMap((solution) => {
    const solutionUnique = new Set(solution);
    if (solutionUnique.size == PANGARM_LENGTH) {
      return solution;
    } else return [];
  });
};

export const getScore = (word: string): number => {
  if (word.length < MINIMUM_WORD_LENGTH) {
    return 0;
  }
  if (word.length == MINIMUM_WORD_LENGTH) {
    return 1;
  }
  return word.length;
};
