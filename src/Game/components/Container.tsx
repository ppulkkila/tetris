import React, { useCallback, useState } from "react";
import { GameStateEnum } from "../types";
import PlayArea from "./PlayArea";
import GameOver from "./GameOver";

export const Container = () => {
  const [gameState, setGameState] = useState<GameStateEnum>(
    GameStateEnum.Waiting
  );

  const onNextGameState = useCallback(() => {
    switch (gameState) {
      case GameStateEnum.Waiting:
        setGameState(GameStateEnum.Playing);
        break;
      case GameStateEnum.Playing:
        setGameState(GameStateEnum.GameOver);
        break;
      case GameStateEnum.GameOver:
        setGameState(GameStateEnum.Waiting);
        break;
    }
  }, [gameState]);

  return (
    <div className="flex-grow flex justify-center">
      {gameState === GameStateEnum.Waiting && (
        <div className="flex w-full h-full items-center justify-center">
          <button
            type="button"
            className="border p-4 rounded-lg bg-yellow-200 text-purple-700"
            onClick={onNextGameState}
          >
            Start
          </button>
        </div>
      )}
      {gameState === GameStateEnum.Playing && (
        <PlayArea onGameOver={onNextGameState} />
      )}
      {gameState === GameStateEnum.GameOver && (
        <GameOver onStartAgain={onNextGameState} />
      )}
    </div>
  );
};

export default Container;
