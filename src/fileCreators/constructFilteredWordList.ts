import { readFileSync, writeFileSync } from "fs";
import { MINIMUM_WORD_LENGTH } from "../constants";
import { join, resolve } from "path";
import { WORD_LIST_FOLDER } from "./common";

const inputFilePath = resolve(
  WORD_LIST_FOLDER,
  "wordlists/Collins Scrabble Words (2019).txt"
);

const outputFilePath = resolve(WORD_LIST_FOLDER, "wordList.json");

const filteredWordList: Array<string> = readFileSync(inputFilePath, "utf8")
  .split("\r\n")
  .filter((word) => word.length >= MINIMUM_WORD_LENGTH);

writeFileSync(outputFilePath, JSON.stringify(filteredWordList));
