import * as React from 'react';
import { WebGLRenderer, Scene, PerspectiveCamera } from 'three';
import { init, createCube, createSphere } from './library';
import './App.css';

interface Props { };

interface State {
  renderer: WebGLRenderer | null | undefined,
  scene: Scene | null | undefined,
  camera: PerspectiveCamera | null | undefined,
  sphere: any,
  cube: any,
  rayCast: any,
  mouse: any
}

export default class App extends React.Component<Props, State> {
  state: State = {
    renderer: null,
    scene: null,
    camera: null,
    mouse: null,
    sphere: null,
    cube: null,
    rayCast: null
  }

  componentDidMount = () => {
    const sphere = createSphere(5, 30, 30);
    const cube = createCube(5, 5, 5);
    sphere.position.set(1, 4, -10);
    const start = init([sphere, cube]);
    const {
      scene,
      camera,
      renderer,
      rayCast,
      mouse
    } = start;
    this.setState({
      scene,
      camera,
      renderer,
      rayCast,
      mouse,
      sphere,
      cube
    });
    this.mainLoop();
    document.body.appendChild(renderer.domElement);
    document.addEventListener('click', this.onMouseClick, false);
  };

  onMouseClick = (e: any) => {
    const { mouse, rayCast, camera } = this.state;
    if (mouse && rayCast && camera) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
      mouse.z = 1;
      rayCast.setFromCamera(mouse, camera);
    }
  }

  mainLoop = () => {
    const { scene, camera, renderer, sphere, cube, rayCast } = this.state;
    if (camera && renderer && scene && sphere && cube && rayCast) {
      sphere.material.color.set(0X0450fb);
      cube.material.color.set(0xff4500);

      let intersects = rayCast.intersectObjects(scene.children);
      intersects.forEach((obj: any) => obj.object.material.color.set(0x00ff00));
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  render() {
    return (
      <div className="App" />
    );
  }
}
