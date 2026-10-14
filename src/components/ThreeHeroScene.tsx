import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeHeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Check WebGL availability
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);
    setIsLoaded(true);

    // Group for mouse parallax
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Procedural Outer Chrome Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(1.25, 0.32, 180, 32, 2, 3);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x18181b,
      metalness: 0.95,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    rootGroup.add(knotMesh);

    // 2. Procedural Inner Refractive Core (Lime Glow)
    const coreGeometry = new THREE.IcosahedronGeometry(0.72, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xbef264,
      emissive: 0x84cc16,
      emissiveIntensity: 0.25,
      roughness: 0.2,
      metalness: 0.3,
      transmission: 0.65,
      opacity: 0.9,
      transparent: true,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    rootGroup.add(coreMesh);

    // Wireframe overlay on core for intricate technological look
    const wireframeGeometry = new THREE.IcosahedronGeometry(0.73, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xd9f99d,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    rootGroup.add(wireframeMesh);

    // 3. Orbital Gyroscopic Rings
    const ringGeometry = new THREE.TorusGeometry(2.1, 0.018, 16, 120);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xbef264,
      emissive: 0xbef264,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.8,
    });
    const ringMesh1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh1.rotation.x = Math.PI / 3;
    rootGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
    ringMesh2.rotation.y = Math.PI / 2.5;
    ringMesh2.scale.set(0.9, 0.9, 0.9);
    rootGroup.add(ringMesh2);

    // 4. Subtle Particle Constellation around Sculpture
    const particleCount = 60;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.4 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xbef264,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    rootGroup.add(particles);

    // Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key Light (Clean Studio White)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Rim Light (Electric Lime)
    const limeRimLight = new THREE.DirectionalLight(0xbef264, 4.0);
    limeRimLight.position.set(-4, -3, -2);
    scene.add(limeRimLight);

    // Accent Fill Light (Subtle Violet)
    const violetFillLight = new THREE.DirectionalLight(0x8b5cf6, 2.2);
    violetFillLight.position.set(3, -4, 2);
    scene.add(violetFillLight);

    // Pointer Parallax Handler
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.35;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer damping
      mouseX += (targetX - mouseX) * (prefersReducedMotion ? 0.02 : 0.05);
      mouseY += (targetY - mouseY) * (prefersReducedMotion ? 0.02 : 0.05);

      rootGroup.rotation.y = mouseX;
      rootGroup.rotation.x = -mouseY;

      if (!prefersReducedMotion) {
        // Idle motion
        knotMesh.rotation.x += 0.35 * delta;
        knotMesh.rotation.y += 0.5 * delta;
        knotMesh.position.y = Math.sin(elapsedTime * 1.2) * 0.08;

        coreMesh.rotation.y -= 0.6 * delta;
        coreMesh.rotation.z += 0.25 * delta;
        wireframeMesh.rotation.copy(coreMesh.rotation);

        ringMesh1.rotation.z += 0.4 * delta;
        ringMesh2.rotation.x -= 0.35 * delta;

        particles.rotation.y += 0.08 * delta;
      }

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0] || !renderer) return;
      const newWidth = entries[0].contentRect.width;
      const newHeight = entries[0].contentRect.height;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    });

    resizeObserver.observe(container);

    // Cleanup & Resource Disposal
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      knotGeometry.dispose();
      knotMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentElement === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center">
      {/* 3D Canvas Mount Point */}
      <div 
        ref={containerRef} 
        className={`w-full h-full absolute inset-0 transition-opacity duration-700 ${
          isLoaded && webglSupported ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Reliable Static & CSS Fallback when WebGL is unavailable or loading */}
      {(!webglSupported || !isLoaded) && (
        <div 
          className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-white/10 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 p-6 flex flex-col items-center justify-center text-center shadow-2xl"
          aria-label="Kinetic geometric sculpture representation"
        >
          <div className="absolute inset-0 rounded-full border border-[#bef264]/20 animate-spin" style={{ animationDuration: '24s' }} />
          <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
          <div className="w-32 h-32 rounded-2xl bg-zinc-900/90 border border-white/10 rotate-45 flex items-center justify-center p-3 shadow-inner">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#bef264]/30 to-purple-500/20 border border-[#bef264]/40" />
          </div>
          <div className="mt-6 text-xs font-mono text-zinc-400">
            <span className="text-[#bef264]">ANIKET KAMAT</span> / CORE SCULPTURE
          </div>
        </div>
      )}

      {/* Subtle bottom caption */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-zinc-950/70 border border-white/10 text-[11px] font-mono text-zinc-400 flex items-center gap-2 pointer-events-none backdrop-blur-sm whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-[#bef264]" />
        <span>INTERACTIVE 3D SCULPTURE · DRAG / HOVER</span>
      </div>
    </div>
  );
};
