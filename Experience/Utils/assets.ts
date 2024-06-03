const assets: Asset[] = [
  {
    name: "room",
    type: "glbModel",
    path: "/models/Finale Version 16.glb",
  },
  {
    name: "screen",
    type: "videoTexture",
    path: "/textures/kda.mp4",
  },
];

export type Asset = {
  name: string;
  type: string;
  path: string;
};

export default assets;
