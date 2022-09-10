// randomly select a potential pangram

// randomly select a letter from the pangram
// feature: find frequency of each letter, do some sort of weighted selection

// deserialze the trie

// generate puzzle solutions for pangram and letter

import wordList from "./wordlists/wordList.json";
import possiblePangrams from "./wordlists/possiblePangrams.json";
import dictionary from "./wordlists/dictionary.json";
import Trie from "./Trie";

const randomSample = <Type>(population: Array<Type>): Type => {
  const randNum = Math.floor(Math.random() * population.length);
  return population[randNum];
};
// const getSampleLetter:string = ()
// simple random sampling with replacement
const randomPangram = randomSample(possiblePangrams);

const dictionaryTrie = new Trie();
// dictionaryTrie.buildFromJson(dictionary);
// const wl = wordList as Array<string>;
// dictionaryTrie.insertTrieBulk(wl);
console.log(randomPangram);
// console.log(dictionaryTrie.findSolutions(randomPangram[Math.floor(Math.random() * randomPangram.length)],)
