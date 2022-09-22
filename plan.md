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
  - get Game

  - Game Type

    - puzzle set
    - solutions
    - pangrams
    - ranks

  - how to get this running on a server?

    - where and make a new game every midnight

      - cron job to make game json every midnight https://www.npmjs.com/package/node-cron
        - easier to use https://www.npmjs.com/package/node-schedule
      - give game.json an expiration attribute with the DateTime it expires
        -~~ store game.json as a FILE~~
      - every time we return the endpoint, check if current time does not exceed expiration time
        - retry while we wait a little for cron job to kick in

      -also use https://www.npmjs.com/package/node-cache

      - every time we make a new puzzle we update the cache https://openbase.com/js/node-cache
      - don't have to write the game object to a file, can insted write to a file

      - run get puzzle game
      - store it in cache with ttl 24 hours
      - no...this wouldn't work with next js on demand regeneration

    - does playsession exist in the FE or BACKEND ( i think FE)
    - ~~FE makes request at midnight to get game class from BE~~
    - ~~BACKEND pushes game data, websockets or seerver side event~~

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

  - NEXT + express + REACT QUERY

  - what would FE need from BE?

    - game solution list (Array<string>)
    - letters list (Array<string>)
    - game ID (number),
    - game date (Date),
    - central letter (string),
    - ranking scheme

  - hosting
  - different ports
  - use rewrites on next for the api route? https://stackoverflow.com/questions/68321381/how-to-host-nextjs-app-with-an-express-server-backend-on-same-localhost-port
  - next api routes eliminates need for express

  - docker compose
  - communication between services: https://stackoverflow.com/questions/55922397/docker-compose-make-2-microservices-frontendbackend-communicate-to-each-other?noredirect=1&lq=1
  - docker file for nextjs: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
  - next js rewrites

- nah docker compose is lowkey not supported in a lot of hosting platforms

- deploy a separate BE and FE

  - cyclic.sh for the BE that runs a cron job of writing to upstash redis
  - vervel for the FE that consumes the redis with a GET
  - anyway to share types with TRPC?

  - create function called getDailyPuzzle
    - gets the puzzle from upstash redis
  - call that function from getStaticProps() https://nextjs.org/docs/basic-features/data-fetching/get-static-props#write-server-side-code-directly
  - temp set revalidate to every 10s but future try to hit the revalidate endpoint once the cronjob hits at midnight

- todo: big picture

  - setup next js + typescript FE
  - get the daily game from upstash
  - build UI of hexagonal interface
  - component that loads in letters, central letter
  - state for inputted word
  - handle submit word
    - check if input string meets the minimum string length
    - check if input string contains any letters that aren't part of the puzzleset
    - check if input string contains centre letter
  - create a play session state

- todo: small picture
  - filter out naughty words
  - store game state in cookie/local storage/session storage for persistence
  - hints system using dictionary api
    - starts with (two letters)
    - definition from dictionary api
  - todo: keep track of puzzle history and randomly select good n fresh puzzles

UNIQUE PUZZLE STRING | LETR 1 | LETR2 | LETR3| LETR4| ... | LETR7

LETR columns could have values of usedBefore:

- 0: never used before (default)
- 1: used already
- nonviable: because it doesn't meet the criteria for a good puzzle (too many/few solutions)

'abilnst' | 0 | 0 | 1 | 0 | 0

- generate appropriate puzzle (future feature)

  - for a randomly selected puzzle set
    - randomly select an unused (0) central letter
      - find its game viability (min points = 50)
        - if unviable, update viability, reselect random letter
          - if all random letters unviable, reselect random puzzle set
        - if viable, choose it and set usedbefore to true (1)
