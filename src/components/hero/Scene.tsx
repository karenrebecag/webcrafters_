'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BannerScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.physicallyCorrectLights = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x090318);

    const scene = new THREE.Scene();
    const world = new THREE.Group();
    scene.add(world);

    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(4.5, 4, 4.5);
    camera.lookAt(0, 0.8, 0);
    scene.add(camera);

    const tl = new THREE.TextureLoader();
    const piedraTex = tl.load('https://static.wixstatic.com/media/bc0394_93327c8e32c54750b442d3d293793351~mv2.jpg', t => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(6, 6);
      t.encoding = THREE.SRGBColorSpace;
    });
    const panelTex = tl.load('https://static.wixstatic.com/media/bc0394_54276c85c7914340a6af3ad69b746bfb~mv2.png', t => {
      t.encoding = THREE.SRGBColorSpace;
    });

    const suelo = new THREE.Mesh(
      new THREE.CircleGeometry(6, 128),
      new THREE.MeshPhysicalMaterial({
        map: piedraTex,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        roughness: 0.45,
        metalness: 0.9,
        envMapIntensity: 5,
        emissive: 0x122040,
        emissiveMap: piedraTex,
        emissiveIntensity: 1,
      })
    );
    suelo.rotation.x = -Math.PI / 2;
    world.add(suelo);

    const portal = new THREE.Group();
    world.add(portal);

    const W = 1, H = 1.3, DEPTH = 0.1, THICK = 0.06, shellT = THICK, coreT = THICK * 0.11;

    const neonMat = new THREE.ShaderMaterial({
      uniforms: {
        colorA: { value: new THREE.Color('#edb96a') },
        colorB: { value: new THREE.Color('#f6dcb2') },
        intensity: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform float intensity;
        varying vec2 vUv;
        void main() {
          float glow = smoothstep(0.0, 1.0, abs(vUv.x - 0.5) * 2.0);
          vec3 color = mix(colorB, colorA, glow);
          gl_FragColor = vec4(color * intensity, 1.0);
        }
      `,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -4,
    });

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xc65454,
      emissiveIntensity: 0,
    });

    const glowMat = new THREE.MeshBasicMaterial({
      color: '#b94d52',
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const glowScale = 1.02;
    const glowOffset = 0.003;
    const glowThickness = coreT * 0.5;

    function bar(geo: THREE.BufferGeometry, x: number, y: number, mat: THREE.Material) {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, 0);
      portal.add(m);
    }

    bar(new THREE.BoxGeometry(shellT, H, DEPTH), -(W - shellT) / 2, 0, darkMat);
    bar(new THREE.BoxGeometry(shellT, H, DEPTH), (W - shellT) / 2, 0, darkMat);
    bar(new THREE.BoxGeometry(W, shellT, DEPTH), 0, (H - shellT) / 2, darkMat);
    bar(new THREE.BoxGeometry(W, shellT, DEPTH), 0, -(H - shellT) / 2, darkMat);

    bar(new THREE.BoxGeometry(coreT, H * 0.97, DEPTH + 0.002), -(W - coreT) / 2, 0, neonMat);
    bar(new THREE.BoxGeometry(coreT, H * 0.97, DEPTH + 0.002), (W - coreT) / 2, 0, neonMat);
    bar(new THREE.BoxGeometry(W * 0.97, coreT, DEPTH + 0.002), 0, (H - coreT) / 2, neonMat);
    bar(new THREE.BoxGeometry(W * 0.97, coreT, DEPTH + 0.002), 0, -(H - coreT) / 2, neonMat);

    function glowFrame(geo: THREE.BufferGeometry, x: number, y: number) {
      const m = new THREE.Mesh(geo, glowMat);
      m.position.set(x, y, DEPTH / 2 + glowOffset);
      m.scale.set(glowScale, glowScale, 1);
      portal.add(m);
    }

    glowFrame(new THREE.BoxGeometry(glowThickness, H * 0.96, 0.001), -(W - glowThickness) / 2, 0);
    glowFrame(new THREE.BoxGeometry(glowThickness, H * 0.96, 0.001), (W - glowThickness) / 2, 0);
    glowFrame(new THREE.BoxGeometry(W * 0.96, glowThickness, 0.001), 0, (H - glowThickness) / 2);
    glowFrame(new THREE.BoxGeometry(W * 0.96, glowThickness, 0.001), 0, -(H - glowThickness) / 2);

    const panelMat = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: panelTex },
        uTime: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        varying vec2 vUv;
        void main(){
          vec4 tex = texture2D(uTexture, vUv);
          float blur = smoothstep(0.4, 1.0, length(vUv - 0.9));
          vec3 blurred = mix(tex.rgb, vec3(0.1,0.05,0.1), blur*0.7);
          float vignette = smoothstep(0.9, 0.5, length(vUv - 0.5));
          blurred *= mix(1.0, 0.73, vignette);
          gl_FragColor = vec4(blurred, tex.a);
        }
      `,
      transparent: true,
      depthWrite: false
    });

    const panel = new THREE.Mesh(new THREE.PlaneGeometry(W - THICK * 2, H - THICK * 2), panelMat);
    panel.position.z = DEPTH / 2 + 0.001;
    panel.renderOrder = 1;
    portal.add(panel);

    portal.position.y = H / 3 + 0.05;
    portal.scale.y = 0;

    const portalLight = new THREE.PointLight(0xb7484c, 0, 0, 1);
    portalLight.position.set(0, 0, 0);
    portal.add(portalLight);

    const particleCount = 40;
    const radiusBase = 0.6;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = radiusBase + Math.random() * 0.5;
      const height = Math.random() * H;
      positions[i * 3 + 0] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf0c66c,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.35,
      depthWrite: false
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    world.add(particles);

    const targetEuler = new THREE.Euler(0, 0, 0, 'YXZ');
    const targetQuat = new THREE.Quaternion();
    const maxRotY = 0.05, maxRotX = 0.01;

    canvas.addEventListener('pointermove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      targetEuler.set(-y * maxRotX, x * maxRotY, 0);
      targetQuat.setFromEuler(targetEuler);
    });

    canvas.addEventListener('pointerleave', () => {
      targetEuler.set(0, 0, 0);
      targetQuat.setFromEuler(targetEuler);
    });

    const t0 = performance.now(), intro = 2000;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    function animate() {
      requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      const k = Math.min((performance.now() - t0) / intro, 1);
      const e = ease(k);

      portal.scale.y = e;
      portalLight.intensity = 5 * e;
      darkMat.emissiveIntensity = 2 * e;

      portal.position.y = H / 2 + 0.05 + Math.sin(time * 1.5) * 0.05;
      const pulse = 2.5 + Math.sin(time * 2) * 0.25;
      neonMat.uniforms.intensity.value = e * pulse;

      world.quaternion.slerp(targetQuat, 0.1);
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
      <canvas
        ref={canvasRef}
        id="bannerCanvas"
        style={{ display: 'block', width: '100vw', height: '50vh', cursor: 'pointer' }}
      />
  );
}
