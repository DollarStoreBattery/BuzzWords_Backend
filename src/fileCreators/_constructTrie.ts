// this file is not used.
// it was originally an experiment to serialize the word list as a Trie into JSON
// but the deserialization into n Trie Object takes longer than just constructing the Trie from scratch

import { writeFileSync } from "fs";
import wordList from "../wordlists/wordList.json";
import Trie from "../Trie";
import { WORD_LIST_FOLDER } from "./common";
import { resolve } from "path";

const dictionary = wordList as Array<string>;
const dictionaryTrie = new Trie();
dictionaryTrie.insertTrieBulk(dictionary);

const fileName = resolve(WORD_LIST_FOLDER, "dictionary.json");

writeFileSync(fileName, JSON.stringify(dictionaryTrie));
