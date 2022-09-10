import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { MINIMUM_WORD_LENGTH, PANGARM_LENGTH } from "../constants";
import { WORD_LIST_FOLDER } from "./common";

type Word = {
  word: string;
  numUniqueLetters: Number;
};

let wordList: Array<Word> = [];

const inputFilePath = resolve(
  WORD_LIST_FOLDER,
  "Collins Scrabble Words (2019).txt"
);

const outputFilePath = resolve(WORD_LIST_FOLDER, "possiblePangrams.json");

const wordsBulk: Array<string> = readFileSync(inputFilePath, "utf-8")
  .split("\r\n")
  .filter((word) => word.length > MINIMUM_WORD_LENGTH);

wordsBulk.map((word) => {
  const wordAsSet = new Set<string>(word);
  wordList.push({
    word: word,
    numUniqueLetters: wordAsSet.size,
  });
});

const possiblePangrams: Array<string> = wordList
  .filter((word) => word.numUniqueLetters == PANGARM_LENGTH)
  .map((word) => word.word);

writeFileSync(outputFilePath, JSON.stringify(possiblePangrams), "utf8");
