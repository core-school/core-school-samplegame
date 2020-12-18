import { angle2Rad } from "../utils/angle2rad";
import { Actor, IActor } from "../Actor";
import { Circuit } from "../state/Circuit";

export class Barrier extends Actor implements IActor {
  barrierWidth: number;
  angle: number;
  touched: boolean;
  car: Actor;
  barrierIndex: number;
  constructor(position, bw = 60, angle = 0, car: Actor, barrierIndex: number) {
    super(position);
    this.barrierWidth = bw;
    this.angle = angle;
    this.touched = false;
    this.car = car;
    this.barrierIndex = barrierIndex;
  }

  update() {
    let carPos = this.car.position;
    let myPos = this.position;
    let distance = Math.sqrt(
      Math.pow(myPos.x - carPos.x, 2) + Math.pow(myPos.y - carPos.y, 2)
    );
    if (distance < 30) {
      if (Circuit.touchingBarrier(this.barrierIndex)) {
        this.touched = true;
      }
    }
  }

  draw(delta, ctx: CanvasRenderingContext2D) {
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(angle2Rad(this.angle));
    if (this.touched) {
      ctx.strokeStyle = "green";
    } else {
      ctx.strokeStyle = "black";
    }
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-this.barrierWidth / 2, 0);
    ctx.lineTo(this.barrierWidth / 2, 0);
    ctx.arc(0, 0, 3, 0, angle2Rad(360));
    ctx.closePath();
    ctx.stroke();
  }
}
