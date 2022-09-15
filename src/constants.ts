export const MINIMUM_WORD_LENGTH = 4;
export const PANGARM_LENGTH = 7;
export enum AlphabetLetters {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
  I = "I",
  J = "J",
  K = "K",
  L = "L",
  M = "M",
  N = "N",
  O = "O",
  P = "P",
  Q = "Q",
  R = "R",
  S = "S",
  T = "T",
  U = "U",
  V = "V",
  W = "W",
  X = "X",
  Y = "Y",
  Z = "Z",
}
export enum ScoreRankings {
  BEGINNER = "Beginner",
  GOOD_START = "Good Start",
  MOVING_UP = "Moving Up",
  GOOD = "Good",
  SOLID = "Solid",
  NICE = "Nice",
  GREAT = "Great",
  AMAZING = "Amazing",
  GENIUS = "Genius",
  QUEEN_BEE = "Queen Bee",
}

type Guide = {
  [key in ScoreRankings]: number;
};
export const ScoreRankingsGuide: Guide = {
  Beginner: 0,
  "Good Start": 0.02,
  "Moving Up": 0.05,
  Good: 0.08,
  Solid: 0.15,
  Nice: 0.25,
  Great: 0.4,
  Amazing: 0.5,
  Genius: 0.7,
  "Queen Bee": 1,
};
