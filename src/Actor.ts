import { Point } from "./types/Point";

export interface IActor {
  position: Point;
  keyboard_event_down?: (key: string) => void;
  keyboard_event_up?: (key: string) => void;
  update?: (delta: number) => void;
  draw(delta: number, ctx: CanvasRenderingContext2D);
}

export class Actor {
  position: Point;
  constructor(posisiton: Point) {
    this.position = posisiton;
  }
}
