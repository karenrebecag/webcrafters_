'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Image from 'next/image';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const bloomParams = {
  strength: 0.2,
  radius: 0.4,
  threshold: 0.2,
};

const Scene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const portalModelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 0.9;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = null; // Set to transparent to avoid black flash
    scene.fog = new THREE.Fog('#000000', 8, 16);

    const camera = new THREE.PerspectiveCamera(18, width / height, 0.1, 20);
    camera.position.set(6.5, 4, 5.5);
    camera.lookAt(0, 0.8, 0);
    scene.add(camera);

    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(20, 32, 32),
      new THREE.MeshBasicMaterial({ color: '#2f0030', side: THREE.BackSide, depthWrite: false })
    );
    scene.add(sky);

    const world = new THREE.Group();
    world.scale.set(0.7, 0.7, 0.7);
    world.position.y = 0.3;
    scene.add(world);

    const tl = new THREE.TextureLoader();
    const stoneTex = tl.load('/assets/backgrounds/stoneTexture.jpg', (t: THREE.Texture) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(6, 6);
      t.colorSpace = THREE.SRGBColorSpace;
    });

    const mirrorGeo = new THREE.CircleGeometry(6, 12);
    const reflector = new Reflector(mirrorGeo, {
      textureWidth: width * window.devicePixelRatio,
      textureHeight: height * window.devicePixelRatio,
      color: 0x111111,
      clipBias: 0.001,
    });
    reflector.rotation.x = -Math.PI / 2;
    world.add(reflector);

    const stoneMat = new THREE.MeshPhysicalMaterial({
      map: stoneTex,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      roughness: 0.25,
      metalness: 0.8,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      emissive: new THREE.Color('#2f0030'),
      emissiveIntensity: 0.4,
    });
    const stoneFloor = new THREE.Mesh(mirrorGeo, stoneMat);
    stoneFloor.rotation.x = -Math.PI / 2;
    stoneFloor.position.y = 0.001;
    stoneFloor.renderOrder = 1;
    world.add(stoneFloor);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      '/assets/3DAssets/PortalDraco.glb',
      (gltf: { scene: THREE.Object3D }) => {
        console.log('GLTF Model Loaded');
        const portalModel = gltf.scene;
        portalModelRef.current = portalModel;
        portalModel.scale.set(1.1, 0.7, 0.7);
        portalModel.position.y = 0.4;
        portalModel.rotation.set(THREE.MathUtils.degToRad(0.9), Math.PI, 0);
        world.add(portalModel);

        const pointLight = new THREE.PointLight(0x96303f, 4, 10, 2);
        portalModel.add(pointLight);

        // Set background color after model loads to match original behavior
        scene.background = new THREE.Color('#000000');
      },
      (progress) => {
        console.log(`Loading GLTF: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
      },
      (error: unknown) => {
        console.error('Error loading GLTF model:', error);
        // Set background color even on error
        scene.background = new THREE.Color('#000000');
      }
    );

    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const angles: number[] = [];
    const radii: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 1.5;
      const y = Math.random() * 1.2;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      angles.push(angle);
      radii.push(radius);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffc0cb,
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.3,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    world.add(particles);

    scene.add(new THREE.AmbientLight(0x404040, 0.5));

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      bloomParams.strength,
      bloomParams.radius,
      bloomParams.threshold
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    const t0 = performance.now();
    let frameId = 0;
    const animate = () => {
      const t = (performance.now() - t0) * 0.001;

      if (portalModelRef.current) {
        portalModelRef.current.position.y = 0.4 + Math.sin(t * 2.5) * 0.08;
      }

      const pos = particleGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        angles[i] += 0.0005;
        pos.setX(i, Math.cos(angles[i]) * radii[i]);
        pos.setZ(i, Math.sin(angles[i]) * radii[i]);
      }
      pos.needsUpdate = true;

      composer.render();
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const newMount = mountRef.current;
      if (!newMount) return;
      const w = newMount.clientWidth;
      const h = newMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '80vh', overflow: 'hidden' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/assets/backgrounds/NoiseOverlay.png"
          alt="Noise Overlay"
          fill
          style={{ objectFit: 'cover', opacity: 0.02 }}
        />
      </div>
    </div>
  );
};

export default Scene;