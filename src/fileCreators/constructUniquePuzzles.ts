import { writeFileSync } from "fs";
import { resolve } from "path";
import { PANGARM_LENGTH } from "../constants";
import { WORD_LIST_FOLDER } from "./common";
import wordList from "../wordlists/wordList.json";

type Word = {
  word: string;
  numUniqueLetters: Number;
  wordUnique: string;
};

let wordsSet: Array<Word> = [];

const outputFilePath = resolve(WORD_LIST_FOLDER, "uniquePuzzles.json");

wordList.map((word) => {
  const wordAsSet = new Set<string>(word);
  wordsSet.push({
    word: word,
    numUniqueLetters: wordAsSet.size,
    wordUnique: Array.from(wordAsSet).sort().join(""),
  });
});

const possiblePangrams: Array<string> = wordsSet
  .filter((word) => word.numUniqueLetters == PANGARM_LENGTH)
  .map((word) => word.wordUnique);

const uniquePangrams = new Set(possiblePangrams);

writeFileSync(
  outputFilePath,
  JSON.stringify(Array.from(uniquePangrams)),
  "utf8"
);
