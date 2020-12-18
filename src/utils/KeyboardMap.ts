export enum CarKeys {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

/*
const UP = 0;
const DOWN = 1;
const LEFT = 2;
*/

export interface KeyboardMap {
  [key: string]: CarKeys;
}

export let MAP_A = {
  ArrowUp: CarKeys.UP,
  ArrowDown: CarKeys.DOWN,
  ArrowLeft: CarKeys.LEFT,
  ArrowRight: CarKeys.RIGHT,
};

export let MAP_B = {
  w: CarKeys.UP,
  s: CarKeys.DOWN,
  a: CarKeys.LEFT,
  d: CarKeys.RIGHT,
};
