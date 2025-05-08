import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './ShapeContainer.css';

const AiDrivenSystemsShape: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(400, 400);
    mountRef.current.appendChild(renderer.domElement);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      '/assets/3DAssets/AI Solutions.glb',
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        scene.add(model);

        // Adjust model scale/position if needed
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
      },
      undefined,
      (error) => {
        console.error('Error loading AI Solutions.glb:', error);
      }
    );

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 3;

    // Animation: Smooth vertical rotation (Y-axis)
    const animate = () => {
      requestAnimationFrame(animate);
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01; // Smooth rotation
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="shape-container" />;
};

export default AiDrivenSystemsShape;