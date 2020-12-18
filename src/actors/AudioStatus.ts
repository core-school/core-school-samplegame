import { AudioManager } from "../effects/AudioManager";
import { Actor, IActor } from "../Actor";
export class AudioStatus extends Actor implements IActor {
  constructor() {
    super({ x: 100, y: 15 });
  }
  draw(delta, ctx) {
    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(
      `Mute: ${AudioManager.globalMute}`,
      this.position.x,
      this.position.y
    );
  }
}
