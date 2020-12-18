import { Actor, IActor } from "../Actor";
import { Point } from "../types/Point";

export class Mario extends Actor implements IActor {
  spritesheet: HTMLImageElement;
  framePos = 0;
  time = 0;
  sequences: Array<{ name: string; numFrames: number; ySeqPos: number }>;
  currentSequence: string;
  speed: number;
  constructor(origin: Point) {
    super(origin);
    this.spritesheet = new Image();
    this.spritesheet.src = require("../../assets/link.png");
    this.sequences = [
      { name: "still-down", numFrames: 1, ySeqPos: 0 },
      { name: "still-left", numFrames: 1, ySeqPos: 1 },
      { name: "still-up", numFrames: 1, ySeqPos: 2 },
      { name: "still-right", numFrames: 1, ySeqPos: 3 },
      { name: "moving-down", numFrames: 10, ySeqPos: 4 },
      { name: "moving-left", numFrames: 10, ySeqPos: 5 },
      { name: "moving-up", numFrames: 10, ySeqPos: 6 },
      { name: "moving-right", numFrames: 10, ySeqPos: 7 },
    ];
    this.currentSequence = "down";
    this.speed = 0;
  }
  update(delta) {}
  draw(delta, ctx: CanvasRenderingContext2D) {
    const frameSize = { x: 120, y: 130 };
    const seqName =
      this.speed == 0
        ? `still-${this.currentSequence}`
        : `moving-${this.currentSequence}`;
    const seq = this.sequences.find((s) => s.name == seqName);
    if (!seq) throw new Error("invalid seq");
    ctx.drawImage(
      this.spritesheet,
      frameSize.x * this.framePos,
      frameSize.y * seq.ySeqPos,
      frameSize.x,
      frameSize.y,
      this.position.x,
      this.position.y,
      frameSize.x,
      frameSize.y
    );
    this.time += delta;
    this.framePos = Math.floor(this.time * 10) % seq.numFrames;
    this.position.x += this.speed;
  }

  keyboard_event_down(key) {
    switch (key) {
      case "ArrowUp":
        this.currentSequence = "up";
        break;
      case "ArrowDown":
        this.currentSequence = "down";
        break;
      case "ArrowLeft":
        this.currentSequence = "left";
        this.speed = -5;
        break;
      case "ArrowRight":
        this.currentSequence = "right";
        this.speed = 5;
    }
  }
  keyboard_event_up(key) {
    this.speed = 0;
  }
}
