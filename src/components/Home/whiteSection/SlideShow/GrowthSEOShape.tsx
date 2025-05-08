import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ShapeContainer.css';

const GrowthSEOShape: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(400, 400);
    const canvas = renderer.domElement;
    mountRef.current.appendChild(canvas);

    // Store references for cleanup
    rendererRef.current = renderer;
    canvasRef.current = canvas;

    // Load JSON model
    const loader = new THREE.ObjectLoader();
    fetch('/assets/3DAssets/Growth SEO.glb.json')
      .then((response) => response.json())
      .then((json) => {
        const model = loader.parse(json);
        modelRef.current = model;
        scene.add(model);

        // Adjust model scale/position if needed
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
      })
      .catch((error) => {
        console.error('Error loading Growth SEO.glb.json:', error);
      });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 3;

    // Animation: Smooth vertical rotation (Y-axis)
    const animate = () => {
      if (!rendererRef.current) return;
      requestAnimationFrame(animate);
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01; // Smooth rotation
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current && canvasRef.current && mountRef.current.contains(canvasRef.current)) {
        mountRef.current.removeChild(canvasRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      modelRef.current = null;
      canvasRef.current = null;
    };
  }, []);

  return <div ref={mountRef} className="shape-container" />;
};

export default GrowthSEOShape;