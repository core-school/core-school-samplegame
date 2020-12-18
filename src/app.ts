import { FPSViewer } from "./actors/FPSViewer";
import { Car } from "./actors/Car";
import { Pacman } from "./actors/Pacman";
import { IActor } from "./Actor";
import { Circuit, createCircuit } from "./state/Circuit";
import { AudioStatus } from "./actors/AudioStatus";
import { AudioManager } from "./effects/AudioManager";
import { MAP_A, MAP_B } from "./utils/KeyboardMap";
import { Mario } from "./actors/Mario";

window.onload = () => {
  console.log("ready");

  const canvas: HTMLCanvasElement = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement;

  canvas.onclick = () => {
    AudioManager.toggleMute();
  };

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Personajes del juego
  let fps = new FPSViewer({ x: 5, y: 15 });

  // Mapa del juego
  let carA = new Car({ x: 200, y: 450 }, MAP_A);
  //let carB = new Car({ x: 300, y: 300 }, MAP_B);
  let cars = [
    carA,
    //  carB
  ];

  // Barreras del circuito
  createCircuit(carA);

  // Estado del audio
  let audio = new AudioStatus();
  let mario = new Mario({ x: 100, y: 100 });
  let actors: Array<IActor> = [
    fps,
    audio,
    // ...cars,
    // ...Circuit.barriers,
    // Circuit,
    mario,
  ];
  console.log(actors);

  // GAME LOOP -> BUCLE DE RENDERIZADO Y ACTUALIZACIÓN
  let lastFrame = 0;
  const render = (time) => {
    let delta = (time - lastFrame) / 1000;
    lastFrame = time;
    actors.forEach((actor) => actor.update && actor.update(delta));
    ctx.clearRect(0, 0, 500, 500);
    actors.forEach((actor) => {
      ctx.save();
      actor.draw(delta, ctx);
      ctx.restore();
    });
    window.requestAnimationFrame(render);
  };

  //setInterval(render, frameTime);
  window.requestAnimationFrame(render);

  // Eventos de teclado
  document.body.addEventListener("keydown", (e) => {
    actors.forEach((actor) => {
      if (actor.keyboard_event_down) {
        actor.keyboard_event_down(e.key);
      }
    });
  });
  document.body.addEventListener("keyup", (e) => {
    actors.forEach((actor) => {
      if (actor.keyboard_event_up) {
        actor.keyboard_event_up(e.key);
      }
    });
  });
};
