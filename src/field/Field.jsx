import React, { useEffect, useState } from "react";
import "./field.css";

function Field({ socket }) {
  const [player, setPlayer] = useState(-1);
  const [position, setPosition] = useState(0);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    socket.on("player", (resp) => {
      alert(`You are player ${resp}`);
      setPlayer(resp);
    });

    socket.on("position", (resp) => {
      console.log("resp", resp);
      setPosition(resp);
    });

    socket.on("start", (resp) => {
      setCanPlay(resp);
    });
  }, [socket]);

  const Player1Click = () => {
    if (player !== 1 && canPlay) return;
    socket.emit("click");
  };

  const Player2Click = () => {
    if (player !== 2 && canPlay) return;
    socket.emit("click");
  };

  useEffect(() => {
    if (position > 100) {
      alert("Player 1 wins!");
      Reset();
    } else if (position < -100) {
      alert("Player 2 wins!");
      Reset();
    }
  }, [position]);

  const Reset = () => {
    socket.emit("reset");
  };

  useEffect(() => {
    // if we click on space
    const handleKeyDown = (e) => {
      if (e.key === "d") {
        socket.emit("click");
      }
      if (e.key === "Spacebar") {
        socket.emit("click");
      }
      // else if (e.key === "m") {
      //   // alert("m");
      //   Player2Click();
      // }
      window.removeEventListener("keyup", handleKeyDown);
    };

    window.addEventListener("keyup", handleKeyDown);
  }, [position]);

  return (
    <div className="field">
      <div
        className="player1"
        style={{ width: `${100 + position}%` }}
        onClick={Player1Click}
      >
        <span>
          {player === 1 ? "ME" : "P1"} : {100 + position}
        </span>
      </div>
      <div
        className="player2"
        style={{ width: `${100 - position}%` }}
        onClick={Player2Click}
      >
        <span>
          {player === 2 ? "ME" : "P2"} : {100 - position}
        </span>
      </div>

      <div
        style={{
          right: `${50 - position / 2}%`,
        }}
        className="score"
        onClick={Reset}
      >
        <span className="reset">RESET</span>
      </div>
    </div>
  );
}

export default Field;
