import * as THREE from "three";
import Experience from "./Experience";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";

export default class Renderer {
  experience: Experience;
  sizes: Sizes | undefined;
  scene: THREE.Scene | undefined;
  canvas: any;
  camera: Camera | undefined;
  renderer: THREE.WebGLRenderer;
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;

    this.setRenderer();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    // NEED TO FIX

    // this.renderer.physicallyCorrectLights = true;
    // this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.sizes?.width!, this.sizes?.height!);
    this.renderer.setPixelRatio(this.sizes?.pixelRatio!);
  }

  resize() {
    this.renderer.setSize(this.sizes?.width!, this.sizes?.height!);
    this.renderer.setPixelRatio(this.sizes?.pixelRatio!);
  }

  update() {
    this.renderer.render(this.scene!, this.camera?.orthographicCamera!);
  }
}
