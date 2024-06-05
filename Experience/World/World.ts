import Experience from "../Experience.js";

import Room from "./Room.js";
import Floor from "./Floor.js";
import Environment from "./Environment.js";
import { EventEmitter } from "events";
import Sizes from "../Utils/Sizes.js";
import { Scene } from "three";
import Camera from "../Camera.js";
import Resources from "../Utils/Resources.js";
import Theme from "../Theme.js";

export default class World extends EventEmitter {
  experience: Experience;
  sizes: Sizes;
  scene: Scene;
  canvas: any;
  camera: Camera;
  resources: Resources;
  theme: Theme;
  environment: Environment;
  floor: Floor;
  room: Room;
  controls: any;
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.theme = this.experience.theme;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.floor = new Floor();
      this.room = new Room();
      this.emit("worldready");
    });

    this.theme.on("switch", (theme) => {
      this.switchTheme(theme);
    });
  }

  switchTheme(theme) {
    if (this.environment) {
      this.environment.switchTheme(theme);
    }
  }

  resize() {}

  update() {
    if (this.room) {
      this.room.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
