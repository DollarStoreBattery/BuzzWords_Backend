import { writeFileSync } from "fs";
import wordList from "../wordlists/wordList.json";
import Trie from "../Trie";

const dictionary = wordList as Array<string>;
const dictionaryTrie = new Trie();
dictionaryTrie.insertTrieBulk(dictionary);

const fileName = "dictionaryTrie.json";

writeFileSync(fileName, JSON.stringify(dictionaryTrie));
