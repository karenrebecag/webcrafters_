'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { ObjectLoader } from 'three';

const bloomParams = {
  strength: 0.3,
  radius: 0.55,
  threshold: 0.15
};

const Scene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(width, height);
    renderer.physicallyCorrectLights = true;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 0.9;
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#22082e');
    scene.fog = new THREE.Fog('#2a0d3a', 8, 16);

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
    const stoneTex = tl.load('/assets/backgrounds/stoneTexture.jpg', t => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(6, 6);
      t.encoding = THREE.SRGBColorSpace;
    });

    const mirrorGeo = new THREE.CircleGeometry(6, 20);
    const reflector = new Reflector(mirrorGeo, {
      textureWidth: width * devicePixelRatio,
      textureHeight: height * devicePixelRatio,
      color: 0x111111,
      clipBias: 0.001
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
      emissiveIntensity: 0.4
    });
    const stoneFloor = new THREE.Mesh(mirrorGeo, stoneMat);
    stoneFloor.rotation.x = -Math.PI / 2;
    stoneFloor.position.y = 0.001;
    stoneFloor.renderOrder = 1;
    world.add(stoneFloor);

    let portalModel: THREE.Object3D | null = null;
    const loader = new ObjectLoader();
    loader.load('/assets/3DAssets/Portal.json', (loadedObject) => {
      portalModel = loadedObject;
      loadedObject.scale.set(1.4 * 0.7, 1 * 0.7, 1 * 0.7);
      loadedObject.position.y = 0.4;

      loadedObject.rotation.set(
        Math.PI * -0.5, // X → Inclina el modelo hacia adelante o atrás (por ejemplo, 45°)
        Math.PI,        // Y → Gira el modelo horizontalmente (180° para mirar hacia atrás)
        0               // Z → Rota en espiral como una moneda girando (0 = sin rotación)
      );
    
      world.add(loadedObject);

      const pointLight = new THREE.PointLight(0x96303F, 4, 10, 2);
      loadedObject.add(pointLight);
    });

    // Particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const angles: number[] = [];
    const radii: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 1.5;
      const y = Math.random() * 1.2;

      positions[i * 3 + 0] = Math.cos(angle) * radius;
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
      opacity: 0.3
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

    const tgtEuler = new THREE.Euler();
    const tgtQuat = new THREE.Quaternion();
    renderer.domElement.addEventListener('pointermove', e => {
      const x = (e.clientX / width - 0.5) * 2;
      const y = (e.clientY / height - 0.5) * 2;
      tgtEuler.set(-y * 0.01, x * 0.05, 0);
      tgtQuat.setFromEuler(tgtEuler);
    });
    renderer.domElement.addEventListener('pointerleave', () => {
      tgtEuler.set(0, 0, 0);
      tgtQuat.setFromEuler(tgtEuler);
    });

    const t0 = performance.now();
    let frameId = 0;
    const animate = () => {
      const time = performance.now() * 0.001;
      const t = (performance.now() - t0) * 0.001;

      if (portalModel) {
        portalModel.position.y = 0.4 + Math.sin(t * 2.5) * 0.08;
      }

      const pos = particleGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        angles[i] += 0.0005;
        pos.setX(i, Math.cos(angles[i]) * radii[i]);
        pos.setZ(i, Math.sin(angles[i]) * radii[i]);
      }
      pos.needsUpdate = true;

      world.quaternion.slerp(tgtQuat, 0.1);
      composer.render();
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mountRef.current?.clientWidth ?? 0;
      const h = mountRef.current?.clientHeight ?? 0;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100vw', height: '70vh', overflow: 'hidden', cursor: 'pointer' }}
    />
  );
};

export default Scene;