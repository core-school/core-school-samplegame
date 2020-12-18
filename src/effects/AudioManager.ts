export enum GAMEAUDIO {
  CAR_FORWARD,
  CAR_REVERSE,
  CAR_DRIFTING,
}

let AUDIO_EFFECTS = [
  {
    name: GAMEAUDIO.CAR_FORWARD,
    url: require("../../assets/audioeffects/car-acceleration.wav"),
  },
  {
    name: GAMEAUDIO.CAR_REVERSE,
    url: require("../../assets/audioeffects/reverse.wav"),
  },
  {
    name: GAMEAUDIO.CAR_DRIFTING,
    url: require("../../assets/audioeffects/derrape_2.wav"),
  },
];

interface AudioEffect {
  name: GAMEAUDIO;
  el: HTMLAudioElement;
}

class AudioEffectsManager {
  effects: AudioEffect[];
  globalMute: boolean;
  constructor() {
    this.globalMute = false;
    // Cargamos todos los archivos como objetos Audio
    this.effects = AUDIO_EFFECTS.map((effect) => {
      let el = new Audio(effect.url);
      el.loop = true;
      el.volume = 0;
      return {
        name: effect.name,
        el,
      };
    });
  }

  toggleMute() {
    this.globalMute = !this.globalMute;
    if (this.globalMute) {
      this.effects.forEach((eff) => {
        eff.el.volume = 0;
      });
    }
  }

  play(audiotrack: GAMEAUDIO) {
    const effect = this.effects.find((eff) => eff.name == audiotrack);
    effect?.el
      .play()
      .then(() => console.log(`Playing audio ${audiotrack}`))
      .catch((e) =>
        console.log("Cannot start audio because browser protects it")
      );
  }

  playMuted(tracks: GAMEAUDIO[]) {
    for (let track of tracks) {
      this.play(track);
      this.volume(track, 0);
    }
  }

  volume(audiotrack: GAMEAUDIO, vol: number) {
    // If mute is active do nothing;
    if (this.globalMute) return;

    // Else, set the volume of track
    const effect = this.effects.find((eff) => eff.name == audiotrack);
    if (effect) {
      effect.el.volume = vol;
    }
  }
}

export const AudioManager = new AudioEffectsManager();
