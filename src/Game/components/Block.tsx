import React from "react";
import clsx from "clsx";
import { Constants, IBlock } from "../types";

export const Block = ({ block }: { block: IBlock }) => {
  return (
    <div
      className={clsx(
        "absolute border overflow-hidden h-8 flex items-center justify-center border-red-800",
        block.color || "bg-green-300"
      )}
      style={{
        top: block.y * Constants.ScaleY,
        left: block.x * Constants.ScaleX,
        width: Constants.ScaleX,
        height: Constants.ScaleY,
      }}
    />
  );
};

export default Block;
