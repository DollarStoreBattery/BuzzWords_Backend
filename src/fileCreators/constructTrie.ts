import { writeFileSync } from "fs";
import wordList from "../wordlists/wordList.json";
import Trie from "../Trie";
import { WORD_LIST_FOLDER } from "./common";
import { resolve } from "path";

const dictionary = wordList as Array<string>;
const dictionaryTrie = new Trie();
dictionaryTrie.insertTrieBulk(dictionary);

const fileName = resolve(WORD_LIST_FOLDER, "dictionary2.json");

writeFileSync(fileName, JSON.stringify(dictionaryTrie));
