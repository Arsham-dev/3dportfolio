import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Environment {
  experience: Experience;
  scene: THREE.Scene;
  obj: { colorObj: THREE.Color; intensity: number };
  gui: GUI;
  sunLight: THREE.DirectionalLight;
  ambientLight: THREE.AmbientLight;
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    const color = new THREE.Color();
    color.r = 0;
    color.b = 0;
    color.g = 0;
    this.obj = {
      colorObj: color,
      intensity: 3,
    };

    this.setSunlight();
  }

  setGUI() {
    this.gui.addColor(this.obj, "colorObj").onChange(() => {
      this.sunLight.color.copy(this.obj.colorObj);
      this.ambientLight.color.copy(this.obj.colorObj);
    });
    this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
      this.sunLight.intensity = this.obj.intensity;
      this.ambientLight.intensity = this.obj.intensity;
    });
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;

    this.sunLight.position.set(-1.5, 7, 3);
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientLight);
  }

  switchTheme(theme: string) {
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.ambientLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      GSAP.to(this.sunLight, {
        intensity: 0.78,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.78,
      });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.sunLight, {
        intensity: 3,
      });
      GSAP.to(this.ambientLight, {
        intensity: 1,
      });
    }
  }

  resize() {}

  update() {}
}
