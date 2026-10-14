import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Persistent3DEnvironment: React.FC = () => {
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

    // Check reduced motion & mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 1024;

    // Dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    // Set pixel ratio capped at 1.5 on desktop, 1 on mobile for maximum battery and FPS efficiency
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.appendChild(renderer.domElement);
    setIsLoaded(true);

    // Root Group for Parallax + Scroll Transformations
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Sculpture Subgroup
    const sculptureGroup = new THREE.Group();
    worldGroup.add(sculptureGroup);

    // 1. Procedural Outer Dark Chrome Torus Knot
    // Segment count adjusted for mobile vs desktop
    const knotRadialSegments = isMobile ? 100 : 160;
    const knotTubularSegments = isMobile ? 24 : 32;
    const knotGeometry = new THREE.TorusKnotGeometry(1.25, 0.32, knotRadialSegments, knotTubularSegments, 2, 3);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x141418,
      metalness: 0.95,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    sculptureGroup.add(knotMesh);

    // 2. Inner Refractive Lime Crystal Core
    const coreGeometry = new THREE.IcosahedronGeometry(0.72, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xbef264,
      emissive: 0x84cc16,
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.25,
      transmission: 0.7,
      opacity: 0.92,
      transparent: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    sculptureGroup.add(coreMesh);

    // Wireframe overlay on core
    const wireframeGeometry = new THREE.IcosahedronGeometry(0.73, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xd9f99d,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    sculptureGroup.add(wireframeMesh);

    // 3. Orbital Gyroscopic Rings
    const ringGeometry = new THREE.TorusGeometry(2.1, 0.018, 16, isMobile ? 64 : 120);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xbef264,
      emissive: 0xbef264,
      emissiveIntensity: 0.55,
      roughness: 0.3,
      metalness: 0.85,
    });
    const ringMesh1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh1.rotation.x = Math.PI / 3;
    sculptureGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
    ringMesh2.rotation.y = Math.PI / 2.5;
    ringMesh2.scale.set(0.9, 0.9, 0.9);
    sculptureGroup.add(ringMesh2);

    // 4. Subtle Particle Constellation drifting across space
    const particleCount = isMobile ? 45 : 90;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 3.2 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xbef264,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    worldGroup.add(particles);

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Electric Lime Rim Light
    const limeRimLight = new THREE.DirectionalLight(0xbef264, 4.2);
    limeRimLight.position.set(-4, -3, -2);
    scene.add(limeRimLight);

    // Violet Ambient Fill Light for chromatic depth
    const violetFillLight = new THREE.DirectionalLight(0x8b5cf6, 2.5);
    violetFillLight.position.set(3, -4, 2);
    scene.add(violetFillLight);

    // Mouse Pointer Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouseX = x * 0.35;
      targetMouseY = y * 0.28;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Scroll Progress Tracking
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        targetScrollProgress = Math.min(Math.max(window.scrollY / docHeight, 0), 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Resize Handler
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      if (renderer) {
        renderer.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer damping
      mouseX += (targetMouseX - mouseX) * (prefersReducedMotion ? 0.02 : 0.05);
      mouseY += (targetMouseY - mouseY) * (prefersReducedMotion ? 0.02 : 0.05);

      // Smooth scroll progress interpolation
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * (prefersReducedMotion ? 0.02 : 0.06);

      // Section-aware spatial evolution:
      // Sections: Hero (0.0 - 0.15) -> About (0.15 - 0.40) -> Skills (0.40 - 0.65) -> Projects (0.65 - 0.85) -> Contact (0.85 - 1.0)
      const p = currentScrollProgress;
      const isDesktop = window.innerWidth >= 1024;

      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let targetScale = 1.0;
      let targetRotX = 0;
      let targetRotY = 0;

      if (isDesktop) {
        if (p < 0.2) {
          // Hero Section: Centered in right column
          const t = p / 0.2;
          targetX = THREE.MathUtils.lerp(1.65, 0.2, t);
          targetY = THREE.MathUtils.lerp(0.1, -0.2, t);
          targetZ = THREE.MathUtils.lerp(0, -0.3, t);
          targetScale = THREE.MathUtils.lerp(1.05, 1.15, t);
          targetRotY = THREE.MathUtils.lerp(0, 0.4, t);
        } else if (p < 0.45) {
          // About Section: Glides smoothly to left backdrop
          const t = (p - 0.2) / 0.25;
          targetX = THREE.MathUtils.lerp(0.2, -2.1, t);
          targetY = THREE.MathUtils.lerp(-0.2, -0.3, t);
          targetZ = THREE.MathUtils.lerp(-0.3, -0.6, t);
          targetScale = THREE.MathUtils.lerp(1.15, 1.25, t);
          targetRotX = THREE.MathUtils.lerp(0, 0.35, t);
          targetRotY = THREE.MathUtils.lerp(0.4, 1.2, t);
        } else if (p < 0.7) {
          // Skills Section: Glides across center-right
          const t = (p - 0.45) / 0.25;
          targetX = THREE.MathUtils.lerp(-2.1, 1.9, t);
          targetY = THREE.MathUtils.lerp(-0.3, -0.8, t);
          targetZ = THREE.MathUtils.lerp(-0.6, -0.4, t);
          targetScale = THREE.MathUtils.lerp(1.25, 1.15, t);
          targetRotX = THREE.MathUtils.lerp(0.35, -0.2, t);
          targetRotY = THREE.MathUtils.lerp(1.2, 2.1, t);
        } else if (p < 0.88) {
          // Projects Section: Positioned deep in background left
          const t = (p - 0.7) / 0.18;
          targetX = THREE.MathUtils.lerp(1.9, -2.3, t);
          targetY = THREE.MathUtils.lerp(-0.8, 0.4, t);
          targetZ = THREE.MathUtils.lerp(-0.4, -1.2, t);
          targetScale = THREE.MathUtils.lerp(1.15, 0.95, t);
          targetRotY = THREE.MathUtils.lerp(2.1, 3.0, t);
        } else {
          // Contact Section: Centered luminous finale
          const t = (p - 0.88) / 0.12;
          targetX = THREE.MathUtils.lerp(-2.3, 0.0, t);
          targetY = THREE.MathUtils.lerp(0.4, 0.7, t);
          targetZ = THREE.MathUtils.lerp(-1.2, -0.5, t);
          targetScale = THREE.MathUtils.lerp(0.95, 1.2, t);
          targetRotY = THREE.MathUtils.lerp(3.0, 3.8, t);
        }
      } else {
        // Mobile layout: centered subtle scaling in background so text is always 100% readable
        targetX = 0;
        targetY = THREE.MathUtils.lerp(0.5, -0.4, p);
        targetZ = THREE.MathUtils.lerp(-0.8, -1.8, p);
        targetScale = THREE.MathUtils.lerp(0.75, 0.85, p);
        targetRotY = p * Math.PI * 2;
      }

      // Smoothly interpolate group coordinates
      sculptureGroup.position.x += (targetX - sculptureGroup.position.x) * 0.08;
      sculptureGroup.position.y += (targetY - sculptureGroup.position.y) * 0.08;
      sculptureGroup.position.z += (targetZ - sculptureGroup.position.z) * 0.08;

      const currentScale = sculptureGroup.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.08;
      sculptureGroup.scale.set(newScale, newScale, newScale);

      // Apply pointer parallax to worldGroup
      worldGroup.rotation.y = mouseX;
      worldGroup.rotation.x = -mouseY;

      // Continuous kinetic idle rotation
      if (!prefersReducedMotion) {
        knotMesh.rotation.x += 0.3 * delta;
        knotMesh.rotation.y += 0.45 * delta;
        knotMesh.position.y = Math.sin(elapsedTime * 1.1) * 0.06;

        coreMesh.rotation.y -= 0.55 * delta;
        coreMesh.rotation.z += 0.22 * delta;
        wireframeMesh.rotation.copy(coreMesh.rotation);

        ringMesh1.rotation.z += 0.35 * delta;
        ringMesh2.rotation.x -= 0.3 * delta;

        particles.rotation.y += 0.06 * delta;
      }

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // Resource Cleanup & Disposal
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

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
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className={`w-full h-full absolute inset-0 transition-opacity duration-1000 ${
          isLoaded && webglSupported ? 'opacity-85' : 'opacity-0'
        }`}
      />

      {/* Atmospheric Vignette overlay so foreground content has pristine contrast */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-60" />

      {/* Subtle Static CSS Fallback if WebGL fails */}
      {!webglSupported && (
        <div className="absolute right-10 top-32 w-80 h-80 rounded-full border border-[#bef264]/15 bg-gradient-to-tr from-[#bef264]/5 to-purple-500/5 blur-2xl pointer-events-none" />
      )}
    </div>
  );
};
