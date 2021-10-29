import React from "react";

import Game from "./Game";

export const App = () => {
  return (
    <div className="flex flex-grow flex-col bg-black text-white">
      <div className="flex-shrink  bg-gradient-to-b from-yellow-300 to-transparent">
        <h1 className="text-2xl m-5 text-white">Tetris</h1>
      </div>
      <div className="flex flex-grow p-4 border border-yellow-300 rounded m-5">
        <Game />
      </div>
    </div>
  );
};
