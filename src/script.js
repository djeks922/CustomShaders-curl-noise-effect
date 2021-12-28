import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import * as dat from "dat.gui";
import vertexshader from "./shaders/vertexshader.glsl";
import fragmentshader from "./shaders/fragmentshader.glsl";
import gsap from 'gsap';

const gui = new dat.GUI();
const parameters = {};
parameters.freq = 0;
parameters.play = () => {

    
    gsap.to(mesh.material.uniforms.uFreq,{value:5,duration:5})
    gsap.to(mesh.material.uniforms.uFreq,{value:0,duration:5,delay:5.5})
    
   
}
gui.add(parameters,'freq').min(0).max(5).step(0.01)
gui.add(parameters,'play')


const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

// scene.background= '0xffffff'

//  Texture
const textureLoader = new THREE.TextureLoader();


// Texture mesh
const geometry = new THREE.PlaneBufferGeometry(1, 1, 216, 216);
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTexture: { value: textureLoader.load("/assets/spiral.png") },
    uTime: { value: 0 },
    uFreq: { value: 0.0 },
  },
  vertexShader: vertexshader,
  fragmentShader: fragmentshader, 
  transparent: true,
  depthWrite: false,

});
const mesh = new THREE.Points(geometry, material);
scene.add(mesh);

// GUI ADDS

// gui.add(parameters,'run').onChange(()=>{
//   gsap.to(mesh.material.uniforms.uFreq,{value: 2,duration:0.2})
//   console.log('added')
// })




// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  55,
  sizes.width / sizes.height,
  0.001,
  5000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1;

// Galaxy.add(camera);

/**
 *  Controls
 */

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true; // smooth performance
// controls.enableZoom = false;
// controls.autoRotate = true;
// controls.dampingFactor = 0.1
controls.update();

// generateGalaxy();

/**
 *  Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);
renderer.setClearColor("white", 1);

/**
 *  Animation function (loop)
 */
const clock = new THREE.Clock();
const refresh = () => {
  const elapsedTime = clock.getElapsedTime();
  /**
   *  Controls updates
   */

  controls.update();
  gui.updateDisplay();
  /**
   *  Parameters update (uniforms)
   */
  mesh.material.uniforms.uTime.value = elapsedTime;
  mesh.material.uniforms.uFreq.value = parameters.freq;

  /**
   *  update renderer
   */

  renderer.render(scene, camera);

  /**
   *  call refresh
   */
  window.requestAnimationFrame(refresh);
};

refresh();
