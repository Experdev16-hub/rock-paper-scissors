'use server';

import { GameChoice, GameResult } from '@/types/games';

const choices: GameChoice[] = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

const winConditions: Record<GameChoice, GameChoice[]> = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['paper', 'spock'],
  spock: ['rock', 'scissors'],
};

export const getHouseChoice = async (): Promise<GameChoice> => {
  return choices[Math.floor(Math.random() * choices.length)];
};

export const determineWinner = async (
  userChoice: GameChoice,
  houseChoice: GameChoice
): Promise<GameResult> => {
  if (userChoice === houseChoice) return 'draw';
  return winConditions[userChoice].includes(houseChoice) ? 'win' : 'lose';
};