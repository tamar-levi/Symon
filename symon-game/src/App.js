import React, { useState } from "react";
import Game from "./Game";
import "./App.css";
// import SymonGame from "./Game";

function App() {
  const [name, setName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Game start
  const startGame = () => {
    if (name) {
      setIsPlaying(true);
      setScore(0);
      setGameOver(false);
    }
  };

  // Game over
  const handleGameEnd = (finalScore) => {
    setIsPlaying(false);
    setGameOver(true);
    setScore(finalScore);
  };

  return (
    <div className="app">
      {!isPlaying && !gameOver && (
        <div className="welcome">
          <h1>Welcome to Symon Game!!!</h1>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <button onClick={startGame} className="start-button">Start Game</button>
        </div>
      )}

      {isPlaying && (
        <Game onGameEnd={handleGameEnd} />
      )}

      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Excellent {name}!</p>
          <p>Your score: <strong>{score}</strong></p>
          {/* <button onClick={() => setIsPlaying(true)} className="restart-button">Try Again</button> */}
        </div>
      )}
    </div>
  );
}

export default App;
