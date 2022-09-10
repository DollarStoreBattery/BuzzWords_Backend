import { AlphabetLetters, MINIMUM_WORD_LENGTH } from "./constants";

class TrieNode {
  isCompleteWord: boolean = false;
  letters: string = "";
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
    return this.insertTrieNodes(this.root, newWord, 0);
  }

  insertTrieBulk(newWords: Array<string>): void {
    newWords.forEach((newWord) => this.insertTrie(newWord));
  }

  findSolutions(
    centralLetter: string,
    targetLetters: Array<string>
  ): Array<string> {
    return this.privatefindSolutionNodes(
      this.root,
      0,
      [],
      centralLetter,
      false,
      targetLetters
    );
  }

  privatefindSolutionNodes(
    currentNode: TrieNode,
    indexLevel: number,
    solutions: Array<string>,
    centralLetter: string,
    seenCentralLetter: boolean,
    targetLetters: Array<string>
  ): Array<string> {
    if (
      indexLevel >= MINIMUM_WORD_LENGTH &&
      currentNode.isCompleteWord &&
      seenCentralLetter
    ) {
      solutions.push(currentNode.letters);
    }
    if (Object.keys(currentNode.children).length == 0) {
      return solutions;
    }
    targetLetters.forEach((letter) => {
      const currLetter = letter.toLocaleUpperCase() as AlphabetLetters;
      if (currentNode.children[currLetter]) {
        seenCentralLetter = seenCentralLetter || currLetter == centralLetter;
        this.privatefindSolutionNodes(
          currentNode.children[currLetter]!,
          indexLevel + 1,
          solutions,
          centralLetter,
          seenCentralLetter,
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
      currentNode.isCompleteWord = true;
      return;
    }

    const currLetter = newWord[indexLevel].toUpperCase() as AlphabetLetters;

    if (currentNode.children[currLetter]) {
      this.insertTrieNodes(
        currentNode.children[currLetter]!,
        newWord,
        indexLevel + 1
      );
    } else {
      currentNode.children[currLetter] = new TrieNode();
      const latestLetters = currentNode.letters.concat(currLetter);
      currentNode.children[currLetter]!.letters = latestLetters;

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
      if (currentNode.isCompleteWord) {
        return true;
      }
      return false;
    }
    const currLetter = targetWord[indexLevel].toUpperCase() as AlphabetLetters;
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
