import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  activeSection: number; // 0 to 8 matching Sections 1 to 9
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ activeSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // References to keep track of animateable assets
  const particlesRef = useRef<THREE.Points | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const chakraRef = useRef<THREE.Group | null>(null);
  const spotlightRef = useRef<THREE.SpotLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);

  // Target values to lerp (smoothly interpolate) toward based on active section
  const targets = useRef({
    cameraZ: 10,
    cameraY: 0,
    cameraX: 0,
    fogColor: new THREE.Color('#050505'),
    fogDensity: 0.02,
    spotColor: new THREE.Color('#D4AF37'),
    spotIntensity: 2.0,
    particleSpeed: 1.0,
    chakraScale: 0.0,
    chakraY: 0,
  });

  // Track mouse coordinates for mouse-directed volumetric lighting
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, and Renderer
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050505');
    sceneRef.current = scene;

    // Atmospheric Fog
    const fog = new THREE.FogExp2('#050505', 0.02);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Add Lighting (Ambient + Dynamic Spotlight)
    const ambientLight = new THREE.AmbientLight('#111111', 1.0);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const spotLight = new THREE.SpotLight('#D4AF37', 5, 30, Math.PI / 4, 0.5, 1);
    spotLight.position.set(0, 8, 5);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);
    spotlightRef.current = spotLight;

    // Dynamic target point for spot light
    const spotTarget = new THREE.Object3D();
    spotTarget.position.set(0, 0, 0);
    scene.add(spotTarget);
    spotLight.target = spotTarget;

    // 3. Create Fiery Amber Embers (Section 1 / General Particle Layer)
    const pCount = 800;
    const pGeometry = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);
    const pSpeeds = new Float32Array(pCount);
    const pSizes = new Float32Array(pCount);

    for (let i = 0; i < pCount; i++) {
      // Position particles in a cylindrical space
      const radius = Math.random() * 8 + 1;
      const angle = Math.random() * Math.PI * 2;
      pPositions[i * 3] = Math.cos(angle) * radius; // x
      pPositions[i * 3 + 1] = Math.random() * 16 - 8; // y
      pPositions[i * 3 + 2] = Math.random() * 10 - 5; // z

      pSpeeds[i] = Math.random() * 0.05 + 0.01; // Vertical drift speed
      pSizes[i] = Math.random() * 3 + 1; // Random sizes
    }

    pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeometry.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));

    // Custom Canvas Round Glow Texture for particles (zero dependency, programmatically drawn)
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    pGrad.addColorStop(0, 'rgba(255, 230, 160, 1)');
    pGrad.addColorStop(0.3, 'rgba(212, 175, 55, 0.8)');
    pGrad.addColorStop(0.6, 'rgba(212, 175, 55, 0.2)');
    pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 16, 16);

    const pTexture = new THREE.CanvasTexture(pCanvas);
    const pMaterial = new THREE.PointsMaterial({
      size: 0.15,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(pGeometry, pMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // 4. Create Cosmic Stars Grid (For sections like Gita, Family Tree, Timeline)
    const starCount = 1500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 40; // x
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10; // z
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 8;
    starCanvas.height = 8;
    const starCtx = starCanvas.getContext('2d')!;
    const starGrad = starCtx.createRadialGradient(4, 4, 0, 4, 4, 4);
    starGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    starGrad.addColorStop(0.5, 'rgba(74, 144, 226, 0.6)');
    starGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    starCtx.fillStyle = starGrad;
    starCtx.fillRect(0, 0, 8, 8);

    const starTexture = new THREE.CanvasTexture(starCanvas);
    const starMaterial = new THREE.PointsMaterial({
      size: 0.08,
      map: starTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    starsRef.current = stars;

    // 5. Create a 3D Sudarshan Chakra (Rotating concentric particle rings)
    const chakraGroup = new THREE.Group();
    const outerRingCount = 300;
    const innerRingCount = 150;
    const spikesCount = 108; // Sacred number!

    const chakraMat = new THREE.PointsMaterial({
      size: 0.12,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Outer spinning serrated Ring
    const outerGeom = new THREE.BufferGeometry();
    const outerPos = new Float32Array(outerRingCount * 3);
    for (let i = 0; i < outerRingCount; i++) {
      const u = i / outerRingCount;
      const angle = u * Math.PI * 2;
      // Introduce micro saw-teeth peaks (representing serrated edge)
      const rMod = 2.0 + Math.sin(angle * spikesCount) * 0.15;
      outerPos[i * 3] = Math.cos(angle) * rMod;
      outerPos[i * 3 + 1] = Math.sin(angle) * rMod;
      outerPos[i * 3 + 2] = 0;
    }
    outerGeom.setAttribute('position', new THREE.BufferAttribute(outerPos, 3));
    const outerPoints = new THREE.Points(outerGeom, chakraMat);
    chakraGroup.add(outerPoints);

    // Inner glowing core ring
    const innerGeom = new THREE.BufferGeometry();
    const innerPos = new Float32Array(innerRingCount * 3);
    for (let i = 0; i < innerRingCount; i++) {
      const angle = (i / innerRingCount) * Math.PI * 2;
      const rMod = 1.2 + Math.cos(angle * 12) * 0.05;
      innerPos[i * 3] = Math.cos(angle) * rMod;
      innerPos[i * 3 + 1] = Math.sin(angle) * rMod;
      innerPos[i * 3 + 2] = 0;
    }
    innerGeom.setAttribute('position', new THREE.BufferAttribute(innerPos, 3));
    const innerPoints = new THREE.Points(innerGeom, chakraMat);
    chakraGroup.add(innerPoints);

    // Connecting rays/spokes
    const raysGeom = new THREE.BufferGeometry();
    const raysPos = new Float32Array(120 * 3);
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      for (let step = 0; step < 3; step++) {
        const r = 1.2 + (step / 3) * 0.8;
        const idx = (i * 3 + step) * 3;
        raysPos[idx] = Math.cos(angle) * r;
        raysPos[idx + 1] = Math.sin(angle) * r;
        raysPos[idx + 2] = 0;
      }
    }
    raysGeom.setAttribute('position', new THREE.BufferAttribute(raysPos, 3));
    const raysPoints = new THREE.Points(raysGeom, chakraMat);
    chakraGroup.add(raysPoints);

    chakraGroup.position.set(0, 0, 0);
    chakraGroup.scale.set(0, 0, 0); // Fades in when needed
    scene.add(chakraGroup);
    chakraRef.current = chakraGroup;

    // 6. Handle Mouse Movement
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 7. Render Loop with smooth lerps
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Mouse smoothing
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

      // Rotate Chakra Rings (outer and inner spinning in opposite directions!)
      outerPoints.rotation.z += delta * 1.5;
      innerPoints.rotation.z -= delta * 0.8;
      raysPoints.rotation.z += delta * 0.3;
      chakraGroup.rotation.y = mouse.current.x * 0.4;
      chakraGroup.rotation.x = -mouse.current.y * 0.4;

      // Animate General Particle drift (rising ash)
      const positions = pGeometry.attributes.position.array as Float32Array;
      const count = positions.length / 3;
      for (let i = 0; i < count; i++) {
        // Rise up
        positions[i * 3 + 1] += pSpeeds[i] * targets.current.particleSpeed;
        // Sway sideways gently
        positions[i * 3] += Math.sin(time + i) * 0.003;

        // Reset if out of bounds
        if (positions[i * 3 + 1] > 8) {
          positions[i * 3 + 1] = -8;
          positions[i * 3] = (Math.random() - 0.5) * 12;
        }
      }
      pGeometry.attributes.position.needsUpdate = true;

      // Animate Cosmic Stars subtle sway
      if (stars) {
        stars.rotation.y += delta * 0.01;
        stars.rotation.x = Math.sin(time * 0.05) * 0.05;
      }

      // Smoothly Lerp Camera Values
      camera.position.z += (targets.current.cameraZ - camera.position.z) * 0.05;
      camera.position.y += (targets.current.cameraY - camera.position.y) * 0.05;
      camera.position.x += (targets.current.cameraX - camera.position.x) * 0.05;

      // Smoothly Lerp Fog
      if (scene.fog && scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.lerp(targets.current.fogColor, 0.04);
        scene.fog.density += (targets.current.fogDensity - scene.fog.density) * 0.04;
        renderer.setClearColor(scene.fog.color);
      }

      // Smoothly Lerp Lights and follow mouse
      if (spotLight) {
        spotLight.color.lerp(targets.current.spotColor, 0.05);
        spotLight.intensity = THREE.MathUtils.lerp(spotLight.intensity, targets.current.spotIntensity, 0.05);
        // Spotlight follows mouse for interactive volume feel
        spotLight.position.x = THREE.MathUtils.lerp(spotLight.position.x, mouse.current.x * 5, 0.05);
        spotLight.position.y = THREE.MathUtils.lerp(spotLight.position.y, 8 + mouse.current.y * 2, 0.05);
      }

      // Smoothly Lerp Chakra visibility and scale
      const currentChakraScale = chakraGroup.scale.x;
      const nextChakraScale = THREE.MathUtils.lerp(currentChakraScale, targets.current.chakraScale, 0.06);
      chakraGroup.scale.set(nextChakraScale, nextChakraScale, nextChakraScale);
      chakraGroup.position.y = THREE.MathUtils.lerp(chakraGroup.position.y, targets.current.chakraY, 0.06);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Window Resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        try {
          containerRef.current.removeChild(renderer.domElement);
        } catch (e) {}
      }
      pGeometry.dispose();
      pMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      outerGeom.dispose();
      innerGeom.dispose();
      raysGeom.dispose();
      chakraMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Update target values based on active section
  useEffect(() => {
    // Colors matching the requested palette
    const colorBackground = new THREE.Color('#050505');
    const colorIndigo = new THREE.Color('#030514');
    const colorGold = new THREE.Color('#0f0b01');
    const colorWarCrimson = new THREE.Color('#140404');
    const colorDivineAmber = new THREE.Color('#141005');
    const colorDeepSpace = new THREE.Color('#02040c');
    const colorTempleSanctuary = new THREE.Color('#0d0b04');
    const colorParchmentSepia = new THREE.Color('#0a0805');
    const colorEndingSun = new THREE.Color('#1c1205');

    const primaryGoldColor = new THREE.Color('#D4AF37');
    const secondaryGoldColor = new THREE.Color('#FFD369');
    const accentBlueColor = new THREE.Color('#4A90E2');

    switch (activeSection) {
      case 0: // Section 1: Hero - Dark ancient battlefield with Sudarshan Chakra
        targets.current.cameraZ = 8.5;
        targets.current.cameraY = 0.5;
        targets.current.cameraX = 0;
        targets.current.fogColor = colorBackground;
        targets.current.fogDensity = 0.035; // Thicker volumetric fog
        targets.current.spotColor = primaryGoldColor;
        targets.current.spotIntensity = 4.0;
        targets.current.particleSpeed = 1.2;
        targets.current.chakraScale = 1.3; // Glow the chakra right in center
        targets.current.chakraY = 0.8;
        break;

      case 1: // Section 2: Timeline - Floating timeline in deep indigo space
        targets.current.cameraZ = 12.0;
        targets.current.cameraY = -1.0;
        targets.current.cameraX = -1.5;
        targets.current.fogColor = colorIndigo;
        targets.current.fogDensity = 0.015;
        targets.current.spotColor = accentBlueColor;
        targets.current.spotIntensity = 2.5;
        targets.current.particleSpeed = 0.4;
        targets.current.chakraScale = 0.0; // Hide
        break;

      case 2: // Section 3: Characters - Cosmic temple gallery
        targets.current.cameraZ = 10.0;
        targets.current.cameraY = 1.0;
        targets.current.cameraX = 2.0;
        targets.current.fogColor = colorGold;
        targets.current.fogDensity = 0.025;
        targets.current.spotColor = secondaryGoldColor;
        targets.current.spotIntensity = 3.5;
        targets.current.particleSpeed = 0.8;
        targets.current.chakraScale = 0.4; // Small chakra hovering in side background
        targets.current.chakraY = 2.5;
        break;

      case 3: // Section 4: Kurukshetra War - Crimson blood ash battlefield
        targets.current.cameraZ = 7.0;
        targets.current.cameraY = -0.5;
        targets.current.cameraX = -1.0;
        targets.current.fogColor = colorWarCrimson;
        targets.current.fogDensity = 0.045; // Extremely dense battlefield dust/smoke
        targets.current.spotColor = new THREE.Color('#cc3300'); // Fire red spot
        targets.current.spotIntensity = 5.0;
        targets.current.particleSpeed = 3.0; // High speed flying embers
        targets.current.chakraScale = 0.0;
        break;

      case 4: // Section 5: Bhagavad Gita - Divine gold pillars
        targets.current.cameraZ = 9.0;
        targets.current.cameraY = 2.0;
        targets.current.cameraX = 0;
        targets.current.fogColor = colorDivineAmber;
        targets.current.fogDensity = 0.02;
        targets.current.spotColor = primaryGoldColor;
        targets.current.spotIntensity = 6.0; // Pure cosmic radiance
        targets.current.particleSpeed = 0.5; // Stardust drifting slowly
        targets.current.chakraScale = 1.0; // Divine chakra hovering behind Arjuna/Krishna
        targets.current.chakraY = 3.5;
        break;

      case 5: // Section 6: Family Tree - Cosmic connections
        targets.current.cameraZ = 14.0;
        targets.current.cameraY = 0;
        targets.current.cameraX = 0;
        targets.current.fogColor = colorDeepSpace;
        targets.current.fogDensity = 0.01; // Wide clear space
        targets.current.spotColor = accentBlueColor;
        targets.current.spotIntensity = 2.0;
        targets.current.particleSpeed = 0.2;
        targets.current.chakraScale = 0.0;
        break;

      case 6: // Section 7: Weapons Showcase
        targets.current.cameraZ = 8.0;
        targets.current.cameraY = 0.5;
        targets.current.cameraX = -2.0;
        targets.current.fogColor = colorTempleSanctuary;
        targets.current.fogDensity = 0.025;
        targets.current.spotColor = secondaryGoldColor;
        targets.current.spotIntensity = 4.5;
        targets.current.particleSpeed = 0.9;
        targets.current.chakraScale = 0.0; // Render custom weapon shapes in separate overlays
        break;

      case 7: // Section 8: Kingdom Map - Ancient sepia tones
        targets.current.cameraZ = 11.0;
        targets.current.cameraY = -2.0;
        targets.current.cameraX = 0;
        targets.current.fogColor = colorParchmentSepia;
        targets.current.fogDensity = 0.018;
        targets.current.spotColor = primaryGoldColor;
        targets.current.spotIntensity = 2.0;
        targets.current.particleSpeed = 0.4;
        targets.current.chakraScale = 0.0;
        break;

      case 8: // Section 9: Ending - Golden sunrise
        targets.current.cameraZ = 8.0;
        targets.current.cameraY = 0.8;
        targets.current.cameraX = 0;
        targets.current.fogColor = colorEndingSun;
        targets.current.fogDensity = 0.03; // Light filled fog
        targets.current.spotColor = secondaryGoldColor;
        targets.current.spotIntensity = 6.0; // Brilliant sunset explosion
        targets.current.particleSpeed = 1.5; // Golden sparks rising to heaven
        targets.current.chakraScale = 1.8; // Transformed into absolute divine portal
        targets.current.chakraY = 0.5;
        break;

      default:
        break;
    }
  }, [activeSection]);

  return (
    <div
      ref={containerRef}
      id="three-canvas-container"
      className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000 select-none z-0 overflow-hidden"
    />
  );
};
export default ThreeCanvas;
