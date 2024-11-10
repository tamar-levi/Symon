import React, { useState, useEffect } from "react";
import ColorCircle from "./CircleColor";
// import App from "./App.js";

const colors = ["red", "green", "blue", "yellow", "purple", "orange"];

function Game({ onGameEnd }) {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [highlightedColor, setHighlightedColor] = useState(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [hasFailed, setHasFailed] = useState(false); // if fail

  const startGame = () => {
    setSequence([]);
    setUserSequence([]);
    setScore(0);
    setMessage("");
    setIsUserTurn(false);
    setHasFailed(false); 
    addColorToSequence();
  };

  const addColorToSequence = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence((prevSequence) => [...prevSequence, randomColor]);
    setUserSequence([]);
    setIsPlaying(true);
    setIsUserTurn(false);
    playSequence();
  };

  const playSequence = () => {
    let index = 0;
    const interval = setInterval(() => {
      setHighlightedColor(sequence[index]);
      index++;

      if (index === sequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          setHighlightedColor(null);
          setIsUserTurn(true);
          setMessage("");
        }, 500);
      }
    }, 1000);
  };

  const handleUserClick = (color) => {
    if (!isUserTurn || hasFailed) return; // אם השחקן נכשל, לא יוכל ללחוץ

    const updatedUserSequence = [...userSequence, color];
    setUserSequence(updatedUserSequence);

    // בדיקה אם המשתמש טעה
    if (sequence[updatedUserSequence.length - 1] !== color) {
      setMessage("Ooops-- mistake!");
      setHasFailed(true); // סימון שהשחקן נכשל
      // setScore(0)
    //   onGameEnd(score); // סיום המשחק
      return;
    }

    // אם השחקן חזר נכון על הרצף
    if (updatedUserSequence.length === sequence.length) {
      setScore((prevScore) => prevScore + 10);

      // בדוק אם השחקן הצליח ברצף של 10
      if (updatedUserSequence.length >= 10) {
        onGameEnd(score); // סיום המשחק
        return;
      }

      setMessage();
      setIsUserTurn(false);
      setTimeout(() => addColorToSequence(), 1000);
    }
  };

  const handleTryAgain = () => {
    setHasFailed(false); // איפוס מצב כישלון
    setUserSequence([]); // איפוס רצף המשתמש
    setMessage(""); // איפוס ההודעה
    // לא להתחיל את המשחק מחדש עד שלוחצים על "התחל משחק"
  };

  useEffect(() => {
    if (isPlaying) {
      playSequence();
    }
  }, [sequence, isPlaying]); // מוסיף את isPlaying כתלות

  return (
    <div className="game">
      <p className="game-message">{message}</p>
      
      <div className="game-circles">
        {colors.map((color) => (
          <ColorCircle
            key={color}
            color={color}
            onClick={() => handleUserClick(color)}
            highlighted={highlightedColor === color}
          />
        ))}
      </div>

      <p>score: {score}</p>
      {hasFailed ? (
        <>
          <button onClick={handleTryAgain} className="restart-button">Try again</button>
          
        </>
      ) : (
        <button onClick={startGame} className="start-button">Start game</button>
      )}
    </div>
  );
}

export default Game;
