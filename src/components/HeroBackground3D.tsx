import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroBackground3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Setup
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    // Create a palette of blue to purple colors
    const colorPalette = [
      new THREE.Color('#3b82f6'), // blue-500
      new THREE.Color('#4f46e5'), // indigo-600
      new THREE.Color('#6366f1'), // indigo-500
      new THREE.Color('#8b5cf6'), // violet-500
      new THREE.Color('#a78bfa'), // violet-400
      new THREE.Color('#c4b5fd'), // violet-300
    ];

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 10;     // x
      posArray[i + 1] = (Math.random() - 0.5) * 10; // y
      posArray[i + 2] = (Math.random() - 0.5) * 10; // z

      // Color - randomly select from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colorsArray[i] = color.r;
      colorsArray[i + 1] = color.g;
      colorsArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse move event
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (particlesRef.current && mouseRef.current) {
        particlesRef.current.rotation.x += 0.0003;
        particlesRef.current.rotation.y += 0.0005;

        // React to mouse movement
        particlesRef.current.rotation.x += mouseRef.current.y * 0.0001;
        particlesRef.current.rotation.y += mouseRef.current.x * 0.0001;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current && rendererRef.current.domElement && container) {
        container.removeChild(rendererRef.current.domElement);
      }
      
      if (particlesRef.current) {
        scene.remove(particlesRef.current);
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none"
    />
  );
};

export default HeroBackground3D;
