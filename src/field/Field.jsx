import React, { useEffect, useState } from "react";
import "./field.css";
import useIsMobile from "../hooks/useIsMobile";

function Field({ socket }) {
  const [player, setPlayer] = useState(-1);
  const [position, setPosition] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const isMobile = useIsMobile();

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
      if (e.key === "Spacebar" || e.key === " ") {
        socket.emit("click");
      }
    };

    window.addEventListener("keyup", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyDown);
    };
  }, []);

  return isMobile ? (
    <VerticalField
      player={player}
      position={position}
      Player1Click={Player1Click}
      Player2Click={Player2Click}
      Reset={Reset}
    />
  ) : (
    <HorizentalField
      player={player}
      position={position}
      Player1Click={Player1Click}
      Player2Click={Player2Click}
      Reset={Reset}
    />
  );
}

const HorizentalField = ({
  player,
  position,
  Player1Click,
  Player2Click,
  Reset,
}) => {
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
};

const VerticalField = ({
  player,
  position,
  Player1Click,
  Player2Click,
  Reset,
}) => {
  return (
    <div className="field-vert">
      <div
        className="player1-vert"
        style={{ height: `${100 + position}%` }}
        onClick={Player1Click}
      >
        <span>
          {player === 1 ? "ME" : "P1"} {100 + position}
        </span>
      </div>
      <div
        className="player2-vert"
        style={{ height: `${100 - position}%` }}
        onClick={Player2Click}
      >
        <span>
          {player === 2 ? "ME" : "P2"} {100 - position}
        </span>
      </div>

      <div
        style={{
          bottom: `${50 - position / 2}%`,
        }}
        className="score-vert"
        onClick={Reset}
      >
        <span className="reset-vert">RESET</span>
      </div>
    </div>
  );
};

export default Field;
