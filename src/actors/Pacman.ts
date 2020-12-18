import { Actor, IActor } from "../Actor";
import { angle2Rad } from "../utils/angle2rad";
import { Point } from "../types/Point";
import { checkLimits } from "../utils/checkLimits";

interface IPacman {
  pacmanSize: number;
  mouthOpen: number;
  origin: Point;
  color: string;
  maxSpeed: number;
  speed: Point;
}

export class Pacman extends Actor implements IPacman, IActor {
  pacmanSize: number;
  mouthOpen: number;
  origin: Point;
  color: string;
  maxSpeed: number;
  speed: Point;
  constructor(initialPos, color = "yellow", maxSpeed = 100) {
    super(initialPos);
    this.pacmanSize = 25;
    this.mouthOpen = 2;
    this.color = color;
    this.maxSpeed = maxSpeed;
    this.speed = { x: 0, y: 0 };
  }

  update(deltaSeconds) {
    this.mouthOpen += 0.8;

    let newPos: Point = {
      x: this.position.x + this.speed.x * deltaSeconds,
      y: this.position.y + this.speed.y * deltaSeconds,
    };
    if (checkLimits(newPos)) {
      this.position = newPos;
    }
  }

  keyboard_event(key) {
    switch (key) {
      case "ArrowLeft":
        this.speed.x = -this.maxSpeed;
        this.speed.y = 0;
        break;
      case "ArrowRight":
        this.speed.x = this.maxSpeed;
        this.speed.y = 0;
        break;
      case "ArrowUp":
        this.speed.y = -this.maxSpeed;
        this.speed.x = 0;
        break;
      case "ArrowDown":
        this.speed.y = this.maxSpeed;
        this.speed.x = 0;
        break;
    }
  }

  draw(delta, ctx) {
    let origin = this.position;
    let open = 20 * Math.sin(10 * this.mouthOpen * delta) + 20;

    // Calculate direction based on speed
    let direction = 0;
    if (this.speed.x != 0 && this.speed.x < 0) {
      direction = 180;
    }
    if (this.speed.y != 0 && this.speed.y > 0) {
      direction = 90;
    }
    if (this.speed.y != 0 && this.speed.y < 0) {
      direction = -90;
    }

    ctx.strokeStyle = "black";
    ctx.fillStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.arc(
      origin.x,
      origin.y,
      this.pacmanSize,
      angle2Rad(-open + direction),
      angle2Rad(open + direction),
      true
    );
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
}
