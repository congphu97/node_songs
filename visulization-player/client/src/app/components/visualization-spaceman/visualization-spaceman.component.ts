import { EventEmitter, Component, AfterViewInit, OnDestroy, Input, Output } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
declare var SimplexNoise: any;
@Component({
  selector: 'app-visualization-spaceman',
  templateUrl: './visualization-spaceman.component.html',
  styleUrls: ['./visualization-spaceman.component.scss']
})
export class VisualizationSpacemanComponent implements AfterViewInit, OnDestroy {

  @Input() audioUrl!: string;
  @Output() timeUpdate: EventEmitter<any> = new EventEmitter();
  @Output() musicLoaded: EventEmitter<any> = new EventEmitter();

  private mixer: THREE.AnimationMixer | undefined;
  private clock: THREE.Clock = new THREE.Clock();

  private noise: any; // Declare `noise` to hold the SimplexNoise instance
  private context: AudioContext | undefined;
  private analyser: AnalyserNode | undefined;
  private renderer: THREE.WebGLRenderer | undefined;
  private scene: THREE.Scene | undefined;
  private camera: THREE.PerspectiveCamera | undefined;
  private group: THREE.Group | undefined;
  public audioElement: HTMLAudioElement | undefined;
  private loader: GLTFLoader = new GLTFLoader(); // GLTFLoader instance
  private spaceman: THREE.Object3D | undefined; // Store spaceman model

  constructor() { }

  ngAfterViewInit(): void {
    this.initializeVisualizer();
    this.animate();
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    if (this.mixer) {
      const delta = this.clock.getDelta();
      this.mixer.update(delta);
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }


  ngOnDestroy(): void {
    this.cleanup();
  }

  private initializeVisualizer(): void {
    // Ensure SimplexNoise is available globally
    if (typeof SimplexNoise === 'undefined') {
      console.error('SimplexNoise is not available.');
      return;
    }

    this.noise = new SimplexNoise();

    // Ensure THREE is available globally
    if (typeof THREE === 'undefined') {
      console.error('THREE is not available.');
      return;
    }

    this.context = new AudioContext();
    this.audioElement = document.getElementById('audio') as HTMLAudioElement;

    if (this.audioElement) {
      const src = this.context.createMediaElementSource(this.audioElement);
      this.analyser = this.context.createAnalyser();
      src.connect(this.analyser);
      this.analyser.connect(this.context.destination);
      this.analyser.fftSize = 512;
    }

    this.scene = new THREE.Scene();
    this.group = new THREE.Group();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(this.scene.position);

    if (this.camera && this.scene) {
      this.scene.add(this.camera);
    }

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(500, 300); // Adjusted size
    document.getElementById('out')?.appendChild(this.renderer.domElement);

    this.addObjectsToScene();
    this.loadSpacemanModel(); // Load spaceman model
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    this.render();
  }

  private addObjectsToScene(): void {
    if (!this.scene || !this.group) {
      console.error('Scene or group is not initialized.');
      return;
    }

    // Define geometry and materials
    const planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff, // line
      side: THREE.DoubleSide,
      wireframe: true,
    });

    // Create planes and add them to the group
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 30, 0);
    this.group.add(plane);

    const plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
    plane2.rotation.x = -0.5 * Math.PI;
    plane2.position.set(0, -30, 0);
    this.group.add(plane2);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 40, 20);
    spotLight.castShadow = true;

    this.scene.add(spotLight);
    this.scene.add(this.group);
  }

  private initScene(): void {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    if (this.camera) {
      this.camera.position.z = 5;
    }

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    if (this.renderer) {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);
    }

    // Add basic lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    this.scene.add(directionalLight);
  }

  private loadSpacemanModel(): void {
    this.loader.load(
      'assets/dancer.glb', // Path to your spaceman model
      (gltf) => {
        this.spaceman = gltf.scene;
        this.spaceman.scale.set(20, 20, 20); // Scale if needed
        this.spaceman.position.set(0, -20, 0);

        // Set up animation mixer
        if (gltf.animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(this.spaceman);
          gltf.animations.forEach(clip => {
            this.mixer?.clipAction(clip).play();
          });
        }
        if (this.group) {
          this.group.add(this.spaceman);
        }
        console.log('Spaceman model loaded successfully');
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the spaceman model:', error);
      }
    );
  }

  private render(): void {
    if (!this.analyser || !this.renderer || !this.scene || !this.camera || !this.group) return;

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);

    const lowerHalfArray = dataArray.slice(0, (dataArray.length / 2) - 1);
    const upperHalfArray = dataArray.slice((dataArray.length / 2) - 1, dataArray.length - 1);

    const overallAvg = this.avg(dataArray);
    const lowerMax = this.max(lowerHalfArray);
    const lowerAvg = this.avg(lowerHalfArray);
    const upperMax = this.max(upperHalfArray);
    const upperAvg = this.avg(upperHalfArray);

    const lowerMaxFr = lowerMax / lowerHalfArray.length;
    const lowerAvgFr = lowerAvg / lowerHalfArray.length;
    const upperMaxFr = upperMax / upperHalfArray.length;
    const upperAvgFr = upperAvg / upperHalfArray.length;

    this.makeRoughGround(this.group.children[0] as THREE.Mesh, this.modulate(upperAvgFr, 0, 1, 0.5, 4));
    this.makeRoughGround(this.group.children[1] as THREE.Mesh, this.modulate(lowerMaxFr, 0, 1, 0.5, 4));

    // Ensure spaceman is loaded before using it
    if (this.spaceman) {
      // Example of making rough ball with spaceman model
      const spacemanMesh = this.spaceman as THREE.Mesh<THREE.BufferGeometry, THREE.Material>;
      const bassFr = this.modulate(Math.pow(lowerMaxFr, 1), 0, 1, 0, 8); // effect bass
      const treFr = this.modulate(upperAvgFr, 0, 1, 0, 4); // effect tre

      // this.makeRoughBall(spacemanMesh, bassFr, treFr);
    }

    this.group.rotation.y += 0.005;
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => this.render());
  }

  // private makeRoughBall(mesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material>, bassFr: number, treFr: number): void {
  //   if (!mesh.geometry.isBufferGeometry) return;

  //   const geometry = mesh.geometry as THREE.BufferGeometry;
  //   const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
  //   const vertex = new THREE.Vector3();
  //   const time = window.performance.now();
  //   const offset = 10; // Adjust as needed
  //   const amp = 10;
  //   const rf = 0.00001;

  //   // Iterate through each vertex
  //   for (let i = 0; i < positionAttribute.count; i++) {
  //     vertex.fromBufferAttribute(positionAttribute, i);
  //     vertex.normalize();
  //     const distance = (offset + bassFr) + this.noise.noise3D(
  //       vertex.x + time * rf * 7,
  //       vertex.y + time * rf * 8,
  //       vertex.z + time * rf * 9
  //     ) * amp * treFr;
  //     vertex.multiplyScalar(distance);
  //     positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
  //   }

  //   positionAttribute.needsUpdate = true; // Notify THREE.js that the attribute has been updated
  //   geometry.computeVertexNormals(); // Recompute normals if needed
  // }

  private makeRoughGround(mesh: THREE.Mesh, distortionFr: number): void {
    if (mesh.geometry instanceof THREE.BufferGeometry) {
      const positionAttribute = mesh.geometry.getAttribute('position') as THREE.BufferAttribute;
      const vertex = new THREE.Vector3();
      const time = Date.now();
      const amp = 2;

      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        const distance = (this.noise.noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) * distortionFr * amp;
        vertex.z = distance;
        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }

      mesh.geometry.attributes.position.needsUpdate = true;
      mesh.geometry.computeVertexNormals();
    }
  }

  private avg(arr: Uint8Array): number {
    const total = arr.reduce((sum, b) => sum + b, 0);
    return total / arr.length;
  }

  private max(arr: Uint8Array): number {
    return arr.reduce((a, b) => Math.max(a, b), 0);
  }

  private modulate(val: number, minVal: number, maxVal: number, outMin: number, outMax: number): number {
    const fr = this.fractionate(val, minVal, maxVal);
    const delta = outMax - outMin;
    return outMin + (fr * delta);
  }

  private fractionate(val: number, minVal: number, maxVal: number): number {
    return (val - minVal) / (maxVal - minVal);
  }

  private onWindowResize(): void {
    if (this.camera) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
    if (this.renderer) {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  private cleanup(): void {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    if (this.renderer && this.renderer.domElement) {
      document.getElementById('out')?.removeChild(this.renderer.domElement);
    }
  }

}
