import React, { useCallback, useEffect, useState } from "react";
import { cloneDeep } from "lodash";

import { Constants, IBlock, IPart } from "../types";
import TetrisParts from "../parts";
import useKeyboard from "../hooks/useKeyboard";
import Block from "./Block";
import Part from "./Part";

export const PlayArea = ({ onGameOver }: { onGameOver: () => void }) => {
  const [blocks, setBlocks] = useState<IBlock[]>([]);
  const [activePart, setActivePart] = useState<IPart | undefined>();

  const movePart = useCallback(
    (x: number, y: number) => {
      if (activePart) {
        const coordinates = activePart.blocks
          .flatMap((row, r) =>
            row.map(
              (col, c) => col && { x: activePart.x + c, y: activePart.y + r }
            )
          )
          .filter((p) => p);

        if (
          // Hit the floor
          coordinates.some((c) => c.y + y >= Constants.Height) ||
          // Hit another block
          coordinates.some((c) =>
            blocks.some((b) => b.y === c.y + y && b.x === c.x)
          )
        ) {
          if (activePart.y <= 0) {
            onGameOver();
          } else {
            setActivePart(undefined);
            setBlocks((blocks) => [
              ...blocks,
              ...coordinates.map((c) => ({ x: c.x, y: c.y })),
            ]);
          }
        } else {
          const canMoveZ =
            coordinates.every((p) => p.x + x >= 0) &&
            coordinates.every((p) => p.x + x < Constants.Width);

          // Otherwise move
          setActivePart({
            ...activePart,
            x: activePart.x + (canMoveZ ? x : 0),
            y: activePart.y + y,
          });
        }
      }
    },
    [activePart]
  );

  const onRotate = useCallback(() => {
    if (activePart) {
      const matrix = activePart.blocks;
      const result = matrix[0].map((_, index) =>
        matrix.map((row) => row[index]).reverse()
      );
      setActivePart({ ...activePart, blocks: result });
    }
  }, [activePart]);

  useKeyboard(movePart, onRotate);

  const createPart = useCallback(() => {
    const idx = Math.floor(Math.random() * TetrisParts.length);
    const part = TetrisParts[idx];

    setActivePart({
      x: Math.round(Constants.Width / 2),
      y: -Constants.PartMaxSize,
      blocks: cloneDeep(part),
    });
  }, []);

  const checkFullRows = useCallback(() => {
    for (let idx = Constants.Height; idx > 0; idx--) {
      const rowBlocks = blocks.filter((p) => p.y === idx);
      if (rowBlocks.length >= Constants.Width) {
        // Full row
        const newBlocks = blocks
          .filter((p) => p.y !== idx)
          .map((p) => ({ x: p.x, y: p.y < idx ? p.y + 1 : p.y }));

        setBlocks(newBlocks);
        break;
      }
    }
  }, [blocks]);

  const onGameTimer = useCallback(() => {
    if (activePart) {
      movePart(0, 1);
    } else {
      createPart();
    }

    checkFullRows();
  }, [movePart, createPart, checkFullRows]);

  useEffect(() => {
    const timer = setInterval(onGameTimer, 100);
    return () => clearInterval(timer);
  }, [onGameTimer]);

  return (
    <div className="flex flex-col w-full h-full items-center">
      <div
        className="relative border border-green-600 overflow-hidden"
        style={areaStyle}
      >
        {blocks.map((block, idx) => (
          <Block key={idx} block={block} />
        ))}
        {activePart && <Part part={activePart} />}
      </div>
    </div>
  );
};

export default PlayArea;

const areaStyle = {
  width: Constants.ScaleX * Constants.Width,
  height: Constants.ScaleY * Constants.Height,
};
