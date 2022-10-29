# BuzzWords

This node app generates puzzles (and solutions) like the ones found in the [NYT Spelling Bee Game](https://www.nytimes.com/puzzles/spelling-bee).

It generates puzzles from the 2of12inf.txt wordlist [created by SCOWL](http://wordlist.aspell.net/12dicts/), with offensive words filtered out.

The goal of the game is to try to come up with as many words as you can with the provided 7 letters. What's the catch? The word must be a minimum of 4 letters, and must include the 'central' letter.

What is a pangram? A word that includes all seven of the letters. These are worth bonus points and you can always find one (or more) in every puzzle.

This repo makes a puzzle everyday at midnight and stores it in a serverless redis db hosted on [Upstash](https://upstash.com/). 



