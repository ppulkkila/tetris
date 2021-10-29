export const Constants = {
  Height: 30,
  Width: 10,
  ScaleX: 20,
  ScaleY: 20,
  PartMaxSize: 4,
};

export enum GameStateEnum {
  Waiting,
  Playing,
  GameOver,
}

export interface IBlock {
  x: number;
  y: number;
  color?: string | undefined;
}

export interface IPart {
  x: number;
  y: number;
  blocks: number[][];
  color?: string | undefined;
}
