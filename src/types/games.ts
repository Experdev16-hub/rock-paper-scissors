export type GameChoice = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';
export type GameResult = 'win' | 'lose' | 'draw';

export interface GameState {
  userChoice: GameChoice | null;
  houseChoice: GameChoice | null;
  result: GameResult | null;
  score: number;
}