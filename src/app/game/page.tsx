'use client';

import { useState } from 'react';
import { GameChoice, GameResult } from '@/types/games';
import { getHouseChoice, determineWinner } from './actions';

export default function GamePage() {
  const [gameState, setGameState] = useState({
    userChoice: null as GameChoice | null,
    houseChoice: null as GameChoice | null,
    result: null as GameResult | null,
    score: 12,
    showRules: false,
  });

  const choiceStyles = {
    rock: 'from-red-500 to-red-600',
    paper: 'from-blue-500 to-blue-600',
    scissors: 'from-yellow-500 to-yellow-600',
    lizard: 'from-purple-500 to-purple-600',
    spock: 'from-cyan-500 to-cyan-600',
  };

  const handleChoice = async (choice: GameChoice) => {
    try {
      const houseChoice = await getHouseChoice();
      const result = await determineWinner(choice, houseChoice);
      
      setGameState(prev => ({
        ...prev,
        userChoice: choice,
        houseChoice,
        result,
        score: result === 'win' ? prev.score + 1 : 
              result === 'lose' ? prev.score - 1 : prev.score
      }));
    } catch (error) {
      console.error('Game error:', error);
    }
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      userChoice: null,
      houseChoice: null,
      result: null
    }));
  };

  const toggleRules = () => {
    setGameState(prev => ({ ...prev, showRules: !prev.showRules }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      {/* Score Board */}
      <div className="max-w-3xl mx-auto border-2 border-gray-400 rounded-lg p-4 flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold uppercase tracking-wider">
          Rock Paper Scissors Lizard Spock
        </h1>
        <div className="bg-white text-gray-800 rounded-md px-6 py-2 text-center">
          <p className="text-sm tracking-widest text-blue-800">SCORE</p>
          <p className="text-4xl font-bold">{gameState.score}</p>
        </div>
      </div>

      {/* Game Board */}
      {!gameState.userChoice ? (
        <div className="relative w-64 h-64 mx-auto mb-20">
          {/* Pentagon Layout */}
          <button
            onClick={() => handleChoice('paper')}
            className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-b ${choiceStyles.paper} w-24 h-24 rounded-full shadow-lg shadow-gray-900/50 flex items-center justify-center`}
          >
            <div className="bg-white w-20 h-20 rounded-full shadow-inner flex items-center justify-center">
              📄
            </div>
          </button>

          <button
            onClick={() => handleChoice('scissors')}
            className={`absolute top-16 -right-10 bg-gradient-to-b ${choiceStyles.scissors} w-24 h-24 rounded-full shadow-lg shadow-gray-900/50 flex items-center justify-center`}
          >
            <div className="bg-white w-20 h-20 rounded-full shadow-inner flex items-center justify-center">
              ✂️
            </div>
          </button>

          <button
            onClick={() => handleChoice('lizard')}
            className={`absolute bottom-0 right-4 bg-gradient-to-b ${choiceStyles.lizard} w-24 h-24 rounded-full shadow-lg shadow-gray-900/50 flex items-center justify-center`}
          >
            <div className="bg-white w-20 h-20 rounded-full shadow-inner flex items-center justify-center">
              🦎
            </div>
          </button>

          <button
            onClick={() => handleChoice('spock')}
            className={`absolute bottom-0 left-4 bg-gradient-to-b ${choiceStyles.spock} w-24 h-24 rounded-full shadow-lg shadow-gray-900/50 flex items-center justify-center`}
          >
            <div className="bg-white w-20 h-20 rounded-full shadow-inner flex items-center justify-center">
              🖖
            </div>
          </button>

          <button
            onClick={() => handleChoice('rock')}
            className={`absolute top-16 -left-10 bg-gradient-to-b ${choiceStyles.rock} w-24 h-24 rounded-full shadow-lg shadow-gray-900/50 flex items-center justify-center`}
          >
            <div className="bg-white w-20 h-20 rounded-full shadow-inner flex items-center justify-center">
              🪨
            </div>
          </button>
        </div>
      ) : (
        /* Game Result */
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-center order-1 md:order-1">
              <p className="text-xl mb-8">YOU PICKED</p>
              <div className={`bg-gradient-to-b ${choiceStyles[gameState.userChoice]} w-32 h-32 rounded-full flex items-center justify-center shadow-lg shadow-gray-900/50 relative mx-auto`}>
                <div className="absolute bg-white w-28 h-28 rounded-full shadow-inner flex items-center justify-center">
                  {gameState.userChoice === 'rock' ? '🪨' : 
                   gameState.userChoice === 'paper' ? '📄' : 
                   gameState.userChoice === 'scissors' ? '✂️' : 
                   gameState.userChoice === 'lizard' ? '🦎' : '🖖'}
                </div>
              </div>
            </div>
            
            <div className="text-center order-3 md:order-2">
              <p className="text-3xl font-bold mb-4">
                {gameState.result === 'win' ? 'YOU WIN' : 
                 gameState.result === 'lose' ? 'YOU LOSE' : 'DRAW'}
              </p>
              <button
                onClick={resetGame}
                className="bg-white text-gray-800 px-8 py-2 rounded-md font-bold tracking-wider hover:bg-gray-200 transition"
              >
                PLAY AGAIN
              </button>
            </div>
            
            <div className="text-center order-2 md:order-3">
              <p className="text-xl mb-8">THE HOUSE PICKED</p>
              <div className={`bg-gradient-to-b ${choiceStyles[gameState.houseChoice!]} w-32 h-32 rounded-full flex items-center justify-center shadow-lg shadow-gray-900/50 relative mx-auto`}>
                <div className="absolute bg-white w-28 h-28 rounded-full shadow-inner flex items-center justify-center">
                  {gameState.houseChoice === 'rock' ? '🪨' : 
                   gameState.houseChoice === 'paper' ? '📄' : 
                   gameState.houseChoice === 'scissors' ? '✂️' : 
                   gameState.houseChoice === 'lizard' ? '🦎' : '🖖'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rules Button */}
      <button
        onClick={toggleRules}
        className="fixed bottom-8 right-8 border-2 border-white rounded-md px-8 py-2 uppercase tracking-widest hover:bg-white hover:text-gray-900 transition"
      >
        Rules
      </button>

      {/* Rules Modal */}
      {gameState.showRules && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">RULES</h2>
              <button onClick={toggleRules} className="text-gray-500 hover:text-gray-700 text-3xl">
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-xl mr-4">🪨</span>
                <p className="text-gray-800">Rock crushes Scissors and Lizard</p>
              </div>
              <div className="flex items-center">
                <span className="text-xl mr-4">📄</span>
                <p className="text-gray-800">Paper covers Rock and Spock</p>
              </div>
              <div className="flex items-center">
                <span className="text-xl mr-4">✂️</span>
                <p className="text-gray-800">Scissors cuts Paper and Lizard</p>
              </div>
              <div className="flex items-center">
                <span className="text-xl mr-4">🦎</span>
                <p className="text-gray-800">Lizard eats Paper and Spock</p>
              </div>
              <div className="flex items-center">
                <span className="text-xl mr-4">🖖</span>
                <p className="text-gray-800">Spock smashes Scissors and Rock</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}