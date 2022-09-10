- define minimum number of answers = 15

- word
- is plural

- define object type structure for word

  - regex to get first word
  - before the comma, is the word

    - if there are two words sepearated by space, we know it is plural

  - get it without definitions
  - use dictionary api for hints when needed

- loop through every line

- of all the common english words

  - find those with 7 unique(non-repeating) letters [pangrams]
    ** convert every word to a set
    ** set.length = 7

- of all the pangrams

  - find all the words that can be made of those seven letters [permutations aka anagrams]

- for all the permutations
  - find out the frequency of every letter
  - for every letter that shows up at least to the minimum number of answers, store it as the centeral letter as part of a viable option

viable option format - list of letters - central letter

- for all viable options

  - filter permutations that don't contain central letter

- list of daily puzzles ready

- simple random sampling without replacement to get a puzzle

- todo: filter out naughty words, read in definition file and regex
