import { angle2Rad } from "../utils/angle2rad";
import { Actor, IActor } from "../Actor";
import { checkLimits } from "../utils/checkLimits";
import { Point } from "../types/Point";
import { AudioManager, GAMEAUDIO } from "../effects/AudioManager";
import { CarKeys, KeyboardMap } from "../utils/KeyboardMap";
const ferrariImg = require("../../assets/ferrari.png");
type Size = { w: number; h: number };

export class Car extends Actor implements IActor {
  carSize: Size;
  carColor: string;
  angle: number;
  angleSpeed: number;
  carSpeed: number;
  carAcceleration: number;
  image: HTMLImageElement;
  keybardMap: KeyboardMap;

  constructor(
    position = { x: 0, y: 0 },
    keyboardMap: KeyboardMap,
    size: Size = { w: 10, h: 15 }
  ) {
    super(position);
    this.carSize = size;
    this.carColor = "red";
    this.angle = 0;
    this.angleSpeed = 0;
    this.carSpeed = 0;
    this.carAcceleration = 0;
    this.keybardMap = keyboardMap;

    // Car image
    this.image = new Image();
    this.image.src = ferrariImg;
    console.log(ferrariImg);
    this.image.onload = () => {
      console.log("image loaded");
    };

    // Audio effects
    AudioManager.playMuted([
      GAMEAUDIO.CAR_FORWARD,
      GAMEAUDIO.CAR_REVERSE,
      GAMEAUDIO.CAR_DRIFTING,
    ]);
  }

  update(delta: number) {
    this.angle += this.angleSpeed;
    this.angleSpeed *= 0.9;
    this.carSpeed = this.carSpeed * 0.9 + this.carAcceleration;
    let newPos: Point = {
      x: this.position.x + Math.cos(angle2Rad(this.angle)) * this.carSpeed,
      y: this.position.y + Math.sin(angle2Rad(this.angle)) * this.carSpeed,
    };

    // Volumen del audio del coche
    let threshold = 0.01;
    if (this.carSpeed <= threshold && this.carSpeed >= -threshold) {
      AudioManager.volume(GAMEAUDIO.CAR_FORWARD, 0);
      AudioManager.volume(GAMEAUDIO.CAR_REVERSE, 0);
    } else if (this.carSpeed > threshold) {
      let ratio = this.carSpeed / 5;
      AudioManager.volume(GAMEAUDIO.CAR_FORWARD, 0.1 + 0.9 * ratio);
      AudioManager.volume(GAMEAUDIO.CAR_REVERSE, 0);
    } else if (this.carSpeed < -threshold) {
      let ratio = Math.abs(this.carSpeed / 5);
      AudioManager.volume(GAMEAUDIO.CAR_REVERSE, 0.1 + 0.9 * ratio);
      AudioManager.volume(GAMEAUDIO.CAR_FORWARD, 0);
    }

    if (this.angleSpeed <= threshold && this.angleSpeed >= -threshold) {
      AudioManager.volume(GAMEAUDIO.CAR_DRIFTING, 0);
    } else {
      AudioManager.volume(GAMEAUDIO.CAR_DRIFTING, 0.6);
    }

    // Colision con los bordes de la pantalla
    if (checkLimits(newPos)) {
      this.position = newPos;
    }
  }

  draw(delta, ctx: CanvasRenderingContext2D) {
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(angle2Rad(this.angle));
    ctx.fillStyle = this.carColor;
    ctx.rotate(angle2Rad(180));

    ctx.drawImage(this.image, -50, -25, 100, 50);
    ctx.fillRect(
      -this.carSize.h / 2,
      -this.carSize.w / 2,
      this.carSize.h,
      this.carSize.w
    );
  }
  keyboard_event_down(key: string) {
    let tecla = this.keybardMap[key];
    if (tecla == CarKeys.LEFT) {
      this.angleSpeed = -4;
    } else if (tecla == CarKeys.RIGHT) {
      this.angleSpeed = 4;
    } else if (tecla == CarKeys.UP) {
      this.carAcceleration = 0.5;
    } else if (tecla == CarKeys.DOWN) {
      this.carAcceleration = -0.5;
    }
  }
  keyboard_event_up(key: string) {
    let tecla = this.keybardMap[key];
    if (tecla == CarKeys.UP) {
      this.carAcceleration = 0;
    } else if (tecla == CarKeys.DOWN) {
      this.carAcceleration = 0;
    }
  }
}
