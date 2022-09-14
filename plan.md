todo: keep track of puzzle history and randomly select good n fresh puzzles

UNIQUE PUZZLE STRING | LETR 1 | LETR2 | LETR3| LETR4| ... | LETR7

LETR columns could have values of usedBefore:

- 0: never used before (default)
- 1: used already
- nonviable: because it doesn't meet the criteria for a good puzzle (too many/few solutions)

'abilnst' | 0 | 0 | 1 | 0 | 0

- generate appropriate puzzle (future feature)

  - for a randomly selected puzzle set
    - randomly select an unused (0) central letter
      - find its game viability
        - if unviable, update viability, reselect random letter
          - if all random letters unviable, reselect random puzzle set
        - if viable, choose it and set usedbefore to true (1)

- implementing scoring functions and rank thresholds given a solution set

- implement function that given an input string, determines whether to reject attempt and give appropriate error

  - check if input string meets the minimum string length
  - check if input string contains any letters that aren't part of the puzzleset
  - check if input string contains centre letter

- implement function that handles a valid guess

  - check if input string is contained within solution set
  - if not, "not in word list"
  - if it is, check to see if it's been found
    - if it hasn't been found, then add it to the words found
    - if it has been found: been found

- keep track of play session

  - instance of game
  - words found
  - current score
  - current ranking
  - add found word: updates words found list, updates score
  - clearAll
  - get game

  - Game class

    - puzzle set
    - solutions
    - pangrams
    - scoring function

  - figure out how to get this running as a server?

    - where and make a new game every midnight
    - does playsession exist in the FE or BACKEND ( i think FE)
    - FE makes request at midnight to get game class from BE
    - BACKEND pushes game data, websockets or seerver side event
    - if websockets, every check against wordlist could be sent to BE and validity could be returned to FE. overkill for a simply array of strings?

    : look up websocket backend tutorial
    : how to make a application running on a backend

    -next js

    - static generatoin
    - getStaticProps will fetch the puzzle from our api https://nextjs.org/docs/basic-features/data-fetching/get-static-props

      - for a new puzzle a day, use incremetal static generation with one demand revalidation https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation

      - so the revalidate api endpoint lives in your nextjs app
      - when it is called, it goes on to fetch the new data

      - so on the backend we regernate the game every 24 hors
      - then send a request to the revaliadate endpoint
      - which will refetch our data from our backend

  - backend needs a secret token

    -graphql subscripbtoin is like a websocket https://www.apollographql.com/docs/react/data/subscriptions

    - use appollo

  - NEXT + express + REACT QUERY

  - what would FE need from BE?
    - game solution list, letters list, central letter,

- todo: filter out naughty words, read in definition file and regex
- store game state in cookie/local storage/session storage for persistence
- nice to have: scrape letters from NYT's puzzle lol
- hints using dictionary api
  - store game state in cookie/local storage/session storage for persistence
