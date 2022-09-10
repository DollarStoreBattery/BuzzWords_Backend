import { readFileSync, writeFileSync } from "fs";
import { MINIMUM_WORD_LENGTH } from "../constants";
import path, { join } from "path";

const inputFileName = "wordlists//Collins Scrabble Words (2019).txt";
const outputFileName = "wordList.json";

const filteredWordList: Array<string> = readFileSync(inputFileName, "utf8")
  .split("\r\n")
  .filter((word) => word.length >= MINIMUM_WORD_LENGTH);

writeFileSync(
  join(__dirname, "wordlists", outputFileName),
  JSON.stringify(filteredWordList)
);
