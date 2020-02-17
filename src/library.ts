import {
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  DirectionalLight,
  DoubleSide,
  SphereGeometry,
  Vector2,
  Raycaster
} from 'three';

const createCube = (w: number, h: number, d: number): Mesh => {
  const geometry = new BoxGeometry(w, h, d);
  const material = new MeshPhongMaterial({
    color: 0xff4500,
    shininess: 100, side: DoubleSide
  });
  return new Mesh(geometry, material);
}

const createSphere = (w: number, h: number, d: number): Mesh => {
  const geometry = new SphereGeometry(w, h, d);
  const material = new MeshPhongMaterial({
    color: 0X0450fb,
    shininess: 100, side: DoubleSide
  });
  return new Mesh(geometry, material);
}

const addToScene = (array: Array<Mesh>, scene: Scene) => {
  console.log(array);
  Object.entries(array).forEach((entry) => {
    const value = entry[1];
    scene.add(value);
  });
};

interface initialize {
  scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
  rayCast: Raycaster,
  mouse: Vector2
}

const init = (objs: Array<Mesh>): initialize => {
  const scene = new Scene();
  scene.background = new Color(0xffffff);


  const camera = new PerspectiveCamera(75,
    window.innerWidth / window.innerHeight,
    1, 1000);
  camera.position.set(0, 10, 40);

  const light1 = new DirectionalLight(0xffffff, 1);
  const light2 = new DirectionalLight(0xffffff, 1);
  light2.position.set(0, -5, 2);

  scene.add(light1);
  scene.add(light2);

  addToScene(objs, scene);

  const rayCast = new Raycaster();
  const mouse = new Vector2();
  mouse.x = mouse.y = -1;
  // create the renderer   
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  return {
    scene,
    camera,
    renderer,
    rayCast,
    mouse
  }
}

export { createCube, createSphere, init };