import { Barrier } from "../actors/Barrier";
import { angle2Rad } from "../utils/angle2rad";
import { Actor, IActor } from "../Actor";

class CircuitManager extends Actor implements IActor {
  barriers: IActor[];
  currentBarrier: number;
  currentLap: number;
  crono: number;

  constructor(actor: IActor) {
    super({ x: 5, y: 30 });

    // chronometer
    this.crono = 0;

    // the first barrier to touch
    this.currentBarrier = 0;
    this.currentLap = 0;

    // Create the barriers
    let barriers: Barrier[] = [];
    let num = 20;
    let center = { x: 250, y: 250 };
    let radius = 200;
    for (let i = 0; i < num; i++) {
      let angle = (360 / num) * i;
      barriers.push(
        new Barrier(
          {
            x: center.x + Math.sin(angle2Rad(angle)) * radius,
            y: center.y + Math.cos(angle2Rad(angle)) * radius,
          },
          80,
          -angle + 90,
          actor,
          i
        )
      );
    }
    console.log("CIRCUIT CREATED");
    this.barriers = barriers;
  }

  addLap() {
    // Add a lap, and reset touchable barrier
    console.log("LAP");
    this.currentLap++;
    this.currentBarrier = 0;

    // set all touched barriers to false
    this.barriers.forEach((b: Barrier) => (b.touched = false));

    if (this.currentLap > 3) {
      alert(`YOU WON, your score ${this.getChrono()}`);
    }
  }

  getChrono() {
    return `${this.crono.toFixed(1)}sec`;
  }

  touchingBarrier(idx: number) {
    if (this.currentBarrier == idx) {
      this.currentBarrier++;
      console.log(this.currentBarrier, this.barriers.length);
      if (this.currentBarrier == this.barriers.length) {
        this.addLap();
      }
      return true;
    }
    return false;
  }

  update(delta) {
    this.crono += delta;
  }

  draw(delta, ctx) {
    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(
      `LAPS: ${this.currentLap}/3 ${this.getChrono()}`,
      this.position.x,
      this.position.y
    );
  }
}

export let Circuit: CircuitManager;

export const createCircuit = (actor: IActor) => {
  Circuit = new CircuitManager(actor);
};
