import { Actor, IActor } from "../Actor";

export class FPSViewer extends Actor implements IActor {
  fps: string;
  update(delta) {
    this.fps = (1 / delta).toFixed(2);
  }
  draw(delta, ctx) {
    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`FPS: ${this.fps}`, this.position.x, this.position.y);
  }
}
