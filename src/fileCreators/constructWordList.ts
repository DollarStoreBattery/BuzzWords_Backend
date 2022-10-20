import { readFileSync, writeFileSync } from "fs";
import { MINIMUM_WORD_LENGTH } from "../constants";
import { resolve } from "path";
import { WORD_LIST_FOLDER } from "./common";

const inputFilePath = resolve(WORD_LIST_FOLDER, "2of12inf.txt");

const outputFilePath = resolve(WORD_LIST_FOLDER, "wordList.json");

const filteredWordList: Array<string> = readFileSync(inputFilePath, "utf8")
  .split("\r\n")
  .filter(
    (word: string) => !word.includes("s") && word.length >= MINIMUM_WORD_LENGTH
  );

writeFileSync(outputFilePath, JSON.stringify(filteredWordList));
