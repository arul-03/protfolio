import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-background',
  standalone: true,
  template: `<canvas #canvas class="three-canvas"></canvas>`,
  styles: [
    `
      :host {
        display: block;
        position: absolute;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        opacity: 0.5;
      }

      .three-canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
    `,
  ],
})
export class ThreeBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private meshes: THREE.Mesh[] = [];
  private frameId = 0;
  private mouseX = 0;
  private mouseY = 0;

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    this.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  }

  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frameId);
    this.renderer?.dispose();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 40;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x3fb950,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });

    const shapes = [
      new THREE.IcosahedronGeometry(14, 1),
      new THREE.OctahedronGeometry(10, 0),
      new THREE.TetrahedronGeometry(8, 0),
    ];

    shapes.forEach((geo, i) => {
      const mesh = new THREE.Mesh(geo, wireMaterial.clone());
      mesh.material.opacity = 0.08 + i * 0.03;
      mesh.position.set(i * 8 - 8, i * 3 - 3, -5);
      this.scene!.add(mesh);
      this.meshes.push(mesh);
    });

    const gridHelper = new THREE.GridHelper(80, 40, 0x238636, 0x21262d);
    gridHelper.position.y = -18;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    this.scene.add(gridHelper);

    const particleCount = 400;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: 0x58a6ff,
        size: 0.2,
        transparent: true,
        opacity: 0.4,
      })
    );
    this.scene.add(particles);
    this.meshes.push(particles as unknown as THREE.Mesh);
  }

  private animate = (): void => {
    this.frameId = requestAnimationFrame(this.animate);

    this.meshes.forEach((mesh, i) => {
      if (mesh instanceof THREE.Points) return;
      mesh.rotation.x += 0.002 + i * 0.001;
      mesh.rotation.y += 0.003 + i * 0.0005;
      mesh.rotation.y += this.mouseX * 0.002;
      mesh.rotation.x += this.mouseY * 0.002;
    });

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };
}
