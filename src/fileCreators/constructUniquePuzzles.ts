import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { MINIMUM_WORD_LENGTH, PANGARM_LENGTH } from "../constants";
import { WORD_LIST_FOLDER } from "./common";

type Word = {
  word: string;
  numUniqueLetters: Number;
  wordUnique: string;
};

let wordList: Array<Word> = [];

const inputFilePath = resolve(WORD_LIST_FOLDER, "2of12inf.txt");

const outputFilePath = resolve(WORD_LIST_FOLDER, "uniquePuzzles.json");

const wordsBulk: Array<string> = readFileSync(inputFilePath, "utf-8")
  .split("\r\n")
  .filter((word) => word.length > MINIMUM_WORD_LENGTH);

wordsBulk.map((word) => {
  const wordAsSet = new Set<string>(word);
  wordList.push({
    word: word,
    numUniqueLetters: wordAsSet.size,
    wordUnique: Array.from(wordAsSet).sort().join(""),
  });
});

const possiblePangrams: Array<string> = wordList
  .filter((word) => word.numUniqueLetters == PANGARM_LENGTH)
  .map((word) => word.wordUnique);

const uniquePangrams = new Set(possiblePangrams);

writeFileSync(
  outputFilePath,
  JSON.stringify(Array.from(uniquePangrams)),
  "utf8"
);
