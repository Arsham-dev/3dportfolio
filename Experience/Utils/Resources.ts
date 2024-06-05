import * as THREE from "three";

import { EventEmitter } from "events";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import Experience from "../Experience";
import { Asset } from "./assets";
import Renderer from "../Renderer";

type Loader = {
  gltfLoader: GLTFLoader;
  dracoLoader: DRACOLoader;
};
type Item = {
  name: string;
  type: string;
  path: string;
};

type Video = {
  [key: string]: HTMLVideoElement;
};

type VideoTexture = {
  [key: string]: THREE.VideoTexture;
};
export default class Resources extends EventEmitter {
  experience: Experience;
  renderer: Renderer | undefined;
  assets: Asset[];
  items: Item;
  queue: number;
  loaded: number;
  loaders: Loader;
  video: Video;
  videoTexture: VideoTexture;
  constructor(assets: Asset[]) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.assets = assets;

    this.items = {
      name: "",
      type: "",
      path: "",
    };
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      dracoLoader: new DRACOLoader(),
    };
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }
  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === "glbModel") {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === "videoTexture") {
        this.video = {};
        this.videoTexture = {};

        this.video[asset.name] = document.createElement("video");
        this.video[asset.name].src = asset.path;
        this.video[asset.name].muted = true;
        this.video[asset.name].playsInline = true;
        this.video[asset.name].autoplay = true;
        this.video[asset.name].loop = true;
        this.video[asset.name].play();

        this.videoTexture[asset.name] = new THREE.VideoTexture(
          this.video[asset.name]
        );
        // this.videoTexture[asset.name].flipY = false;
        this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
        this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
        this.videoTexture[asset.name].generateMipmaps = false;
        (this.videoTexture[asset.name] as any).encoding = (
          THREE as any
        ).sRGBEncoding;

        this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
      }
    }
  }

  singleAssetLoaded(asset: Asset, file: GLTF | THREE.VideoTexture) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit("ready");
    }
  }
}
