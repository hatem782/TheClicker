import React, { useEffect, useState } from "react";
import "./field.css";

function Field() {
  const [position, setPosition] = useState(0);

  const Player1Click = () => {
    setPosition(position + 5);
  };

  const Player2Click = () => {
    setPosition(position - 5);
  };

  useEffect(() => {
    if (position > 100) {
      alert("Player 1 wins!");
      setPosition(0);
    } else if (position < -100) {
      alert("Player 2 wins!");
      setPosition(0);
    }
  }, [position]);

  useEffect(() => {
    // if we click on "a" key, Player 1 will move
    // if we click on "m" key, Player 2 will move
    const handleKeyDown = (e) => {
      console.log(e.key);
      if (e.key === "a") {
        // alert("a");
        Player1Click();
      } else if (e.key === "m") {
        // alert("m");
        Player2Click();
      }
      window.removeEventListener("keypress", handleKeyDown);
    };

    window.addEventListener("keypress", handleKeyDown);
  }, [position]);

  return (
    <div className="field">
      <div
        className="player1"
        style={{ width: `${100 + position}%` }}
        onClick={Player1Click}
      >
        <span>CLICK</span>
      </div>
      <div
        className="player2"
        style={{ width: `${100 - position}%` }}
        onClick={Player2Click}
      >
        <span>CLICK</span>
      </div>

      <div className="score">
        <span>Player 1: {100 + position} </span>
        <span>Player 2: {100 - position} </span>
      </div>
    </div>
  );
}

export default Field;
