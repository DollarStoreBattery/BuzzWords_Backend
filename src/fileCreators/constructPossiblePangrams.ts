import { readFileSync, writeFileSync } from "fs";
import { MINIMUM_WORD_LENGTH, PANGARM_LENGTH } from "../constants";

type Word = {
  word: string;
  numUniqueLetters: Number;
};

let wordList: Array<Word> = [];

const filename: string = "Collins Scrabble Words (2019).txt";

const wordsBulk: Array<string> = readFileSync(filename, "utf-8")
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

writeFileSync(
  "possiblePangrams.json",
  JSON.stringify(possiblePangrams),
  "utf8"
);
