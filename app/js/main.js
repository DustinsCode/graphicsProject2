import * as THREE from 'three';
import Wheel from './models/Wheel';
import TrashCan from './models/TrashCan';
import Chair from './models/Chair';

// import orbit from 'three-orbit-controls';
// const OrbitControls = orbit(THREE);
import TrackballControls from 'three-trackballcontrols';

export default class App {
    constructor() {
        const c = document.getElementById('mycanvas');
        // Enable anti-alias for smoother lines
        this.renderer = new THREE.WebGLRenderer({canvas: c, antialias: true});
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 4/3, 0.5, 1500);
        this.camera.position.z = 100;

        // const orbiter = new OrbitControls(this.camera);
        // orbiter.enableZoom = false;
        // orbiter.update();

        this.tracker = new TrackballControls(this.camera);
        this.tracker.rotateSpeed = 2.0;
        this.tracker.noZoom = false;
        this.tracker.noPan = false;

        let chair = new Chair();
        this.scene.add( chair );

        const lightOne = new THREE.DirectionalLight (0xFFFFFF, 1.0);
        lightOne.position.set (10, 40, 100);
        this.scene.add (lightOne);

        window.addEventListener('resize', () => this.resizeHandler());
        this.resizeHandler();

        //chair.moveFootRest();
        //requestAnimationFrame(() => this.chair.moveFootRest());
        requestAnimationFrame(() => this.render());
  }

  render() {
      this.renderer.render(this.scene, this.camera);
      this.tracker.update();

      // Rotate the wheel
      //this.rotZ1 = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(1));
      //this.myWheel.matrix.multiply (this.rotZ1);



      requestAnimationFrame(() => this.render());
  }

  resizeHandler() {
    const canvas = document.getElementById("mycanvas");
    let w = window.innerWidth - 16;
    let h = 0.75 * w;  /* maintain 4:3 ratio */
    if (canvas.offsetTop + h > window.innerHeight) {
      h = window.innerHeight - canvas.offsetTop - 16;
      w = 4/3 * h;
    }
    canvas.width = w;
    canvas.height = h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.tracker.handleResize();
  }
}