import React from "react";
import { IPart } from "../types";
import Block from "./Block";

export const Part = ({ part }: { part: IPart }) => {
  let i = 0;

  return (
    <>
      {part.blocks.map((row, y) =>
        row.map((col, x) =>
          col ? (
            <Block
              key={i++}
              block={{ x: part.x + x, y: part.y + y, color: part.color }}
            />
          ) : null
        )
      )}
    </>
  );
};

export default Part;
