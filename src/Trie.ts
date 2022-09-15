import { error } from "console";
import { AlphabetLetters, MINIMUM_WORD_LENGTH } from "./constants";
import PuzzleInput, { PuzzleSolution } from "./gameTypes";
import { getPangrams } from "./puzzleHelpers";

class TrieNode {
  isWord: boolean = false;
  children: { [key in AlphabetLetters]?: TrieNode | undefined } = {};
}

export default class Trie {
  root: TrieNode = new TrieNode();

  buildFromJson(serializedData: {}): void {
    Object.assign(this, serializedData);
  }
  searchTrie(targetWord: string): boolean {
    return this.searchTrieNodes(this.root, targetWord, 0);
  }

  insertTrie(newWord: string): void {
    return this.insertTrieNodes(this.root, newWord.toUpperCase(), 0);
  }

  insertTrieBulk(newWords: Array<string>): void {
    newWords.forEach((newWord) => this.insertTrie(newWord));
  }

  solvePuzzle(input: PuzzleInput): PuzzleSolution {
    const { centralLetter, puzzleLetters } = input;
    let targetLetters: Array<string>;

    if (typeof puzzleLetters === "string") {
      targetLetters = puzzleLetters.split("");
    } else targetLetters = puzzleLetters;

    const targetLettersUnique = Array.from(new Set(targetLetters));
    const solutionList = this.findSolutionNodes(
      "",
      this.root,
      0,
      [],
      centralLetter.toUpperCase(),
      false,
      targetLettersUnique.map((letr) => letr.toUpperCase())
    ).sort();

    return { solutions: solutionList, pangrams: getPangrams(solutionList) };
  }

  private findSolutionNodes(
    currentWord: string,
    currentNode: TrieNode,
    indexLevel: number,
    solutions: Array<string>,
    centralLetter: string,
    seenCentralLetter: boolean,
    targetLetters: Array<string>
  ): Array<string> {
    if (
      indexLevel >= MINIMUM_WORD_LENGTH &&
      currentNode.isWord &&
      seenCentralLetter
    ) {
      solutions.push(currentWord);
    }
    if (Object.keys(currentNode.children).length == 0) {
      return solutions;
    }
    targetLetters.forEach((letter) => {
      const currLetter = letter as AlphabetLetters;
      if (currentNode.children[currLetter]) {
        this.findSolutionNodes(
          currentWord.concat(currLetter),
          currentNode.children[currLetter]!,
          indexLevel + 1,
          solutions,
          centralLetter,
          seenCentralLetter || currLetter === centralLetter,
          targetLetters
        );
      }
    });
    return solutions;
  }

  private insertTrieNodes(
    currentNode: TrieNode,
    newWord: string,
    indexLevel: number
  ): void {
    if (indexLevel == newWord.length) {
      currentNode.isWord = true;
      return;
    }

    const currLetter = newWord[indexLevel] as AlphabetLetters;

    if (currentNode.children[currLetter]) {
      this.insertTrieNodes(
        currentNode.children[currLetter]!,
        newWord,
        indexLevel + 1
      );
    } else {
      currentNode.children[currLetter] = new TrieNode();
      this.insertTrieNodes(
        currentNode.children[currLetter]!,
        newWord,
        indexLevel + 1
      );
    }
  }

  private searchTrieNodes(
    currentNode: TrieNode,
    targetWord: string,
    indexLevel: number
  ): boolean {
    if (indexLevel == targetWord.length) {
      if (currentNode.isWord) {
        return true;
      }
      return false;
    }
    const currLetter = targetWord[indexLevel] as AlphabetLetters;
    if (currentNode.children[currLetter]) {
      return this.searchTrieNodes(
        currentNode.children[currLetter]!,
        targetWord,
        indexLevel + 1
      );
    }
    return false;
  }
}
