import React from "react";

export const GameOver = ({ onStartAgain }: { onStartAgain: () => void }) => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-4">
      <h1 className="text-lg">Game over! Insert coins</h1>
      <button
        type="button"
        className="border p-4 rounded-lg bg-yellow-200 text-purple-700"
        onClick={onStartAgain}
      >
        One more game
      </button>
    </div>
  );
};

export default GameOver;
