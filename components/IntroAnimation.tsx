import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [finalTransition, setFinalTransition] = useState(false);
  const [blurEffect, setBlurEffect] = useState(0);
  const { theme } = useTheme();
  
  // Developer-themed messages
  const messages = [
    "Hello World",
    "Software Engineer",
    "Building the future",
    "Let's connect",
    "Ready to compile"
  ];
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Colors based on theme
    const primaryColor = theme === 'dark' ? 0x3b82f6 : 0x1d4ed8;
    const accentColor = theme === 'dark' ? 0x8b5cf6 : 0x6d28d9;
    const terminalGreen = 0x4ade80;
    
    // Create a sophisticated environment
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create code-like particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2500; // Increased for better tunnel effect
    const particlesPositions = new Float32Array(particlesCount * 3);
    const particlesSizes = new Float32Array(particlesCount);
    const particlesColors = new Float32Array(particlesCount * 3);
    
    // Create a tunnel formation
    for (let i = 0; i < particlesCount; i++) {
      const segment = Math.floor(i / 100); // Create segments for better distribution
      const angle = (i % 100) * (Math.PI * 2 / 100); // Evenly space particles in each ring
      const radius = 5 + Math.random() * 3; // Tighter radius range for more focused tunnel
      const z = -segment * 2 - Math.random() * 2; // More consistent z-spacing
      
      // Position particles in a clear tunnel formation
      particlesPositions[i * 3] = Math.cos(angle) * radius;
      particlesPositions[i * 3 + 1] = Math.sin(angle) * radius;
      particlesPositions[i * 3 + 2] = z * 10; // Multiply by 10 for longer tunnel
      
      // Vary sizes based on position for depth effect
      particlesSizes[i] = 0.2 + Math.random() * 0.3;
      
      // Create a more organized color pattern
      const colorChoice = Math.random();
      let color;
      
      if (Math.abs(radius - 5) < 1) { // Inner ring particles
        color = new THREE.Color(terminalGreen);
      } else if (colorChoice < 0.5) {
        color = new THREE.Color(primaryColor);
      } else {
        color = new THREE.Color(accentColor);
      }
      
      particlesColors[i * 3] = color.r;
      particlesColors[i * 3 + 1] = color.g;
      particlesColors[i * 3 + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particlesSizes, 1));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particlesColors, 3));
    
    // Enhanced particle shader for better depth effect
    const particlesMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (400.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float opacity = smoothstep(0.5, 0.0, dist);
          gl_FragColor = vec4(vColor, opacity);
        }
      `
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Create warp effect (simplified and more focused)
    const warpGeometry = new THREE.BufferGeometry();
    const warpCount = 5000; // Increased count for more stars
    const warpPositions = new Float32Array(warpCount * 3);
    const warpSizes = new Float32Array(warpCount);
    const warpColors = new Float32Array(warpCount * 3);
    
    for (let i = 0; i < warpCount; i++) {
      // Create a more evenly distributed starfield
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = Math.random() * 5 + 2;
      
      // Use spherical coordinates for better distribution
      warpPositions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      warpPositions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      warpPositions[i * 3 + 2] = -Math.random() * 1000; // Extend warp stars much further
      
      // Vary sizes for depth effect
      warpSizes[i] = 0.1 + Math.random() * 0.4;
      
      // Multiple colors for a more vibrant effect
      const colorIndex = Math.random();
      let color;
      
      if (colorIndex < 0.2) {
        color = new THREE.Color(0x4ade80); // Terminal green
      } else if (colorIndex < 0.5) {
        color = new THREE.Color(0x3b82f6); // Blue
      } else if (colorIndex < 0.8) {
        color = new THREE.Color(0x8b5cf6); // Purple
      } else {
        color = new THREE.Color(0xffffff); // White
      }
      
      warpColors[i * 3] = color.r;
      warpColors[i * 3 + 1] = color.g;
      warpColors[i * 3 + 2] = color.b;
    }
    
    warpGeometry.setAttribute('position', new THREE.BufferAttribute(warpPositions, 3));
    warpGeometry.setAttribute('size', new THREE.BufferAttribute(warpSizes, 1));
    warpGeometry.setAttribute('color', new THREE.BufferAttribute(warpColors, 3));
    
    // Enhanced shader for warp stars
    const warpMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (800.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float intensity = 1.0 - smoothstep(0.0, 0.5, dist);
          gl_FragColor = vec4(vColor, intensity);
        }
      `,
      uniforms: {
        time: { value: 0.0 }
      }
    });
    
    const warpStars = new THREE.Points(warpGeometry, warpMaterial);
    scene.add(warpStars);
    warpStars.visible = false; // Initially hidden
    
    // Remove all other 3D objects since they're causing issues
    // Only keep the particle tunnel and warp effect
    
    // Set initial camera position
    camera.position.z = 5;
    
    // Animation
    let animationId: number;
    let progress = 0;
    const animationDuration = 6000;
    const startTime = Date.now();
    let warpStarted = false;
    
    const animate = () => {
      const currentTime = Date.now();
      progress = Math.min((currentTime - startTime) / animationDuration, 1);
      
      if (progress < 0.8) {
        // Normal phase - straight movement through tunnel
        camera.position.z = -progress * 200;
        camera.position.x = 0;
        camera.position.y = 0;
        camera.rotation.set(0, 0, 0);
        
        // Rotate particles slightly for effect
        particles.rotation.z += 0.0005;
        
        // Update message
        const messageIndex = Math.min(
          Math.floor((progress / 0.8) * messages.length),
          messages.length - 1
        );
        
        if (messageIndex !== currentMessage) {
          setCurrentMessage(messageIndex);
        }
      } else {
        // Warp phase
        if (!warpStarted) {
          warpStarted = true;
          setFinalTransition(true);
          setCurrentMessage(-1);
          warpStars.visible = true; // Show warp stars only when needed
        }
        
        const warpProgress = (progress - 0.8) / 0.2;
        // Use easing for smoother acceleration
        const easedProgress = warpProgress * warpProgress * (3.0 - 2.0 * warpProgress);
        
        // Accelerate with better curve
        camera.position.z = -200 - (easedProgress * 800);
        
        // Add subtle camera movement for more dynamic feel
        camera.position.x = Math.sin(easedProgress * Math.PI * 2) * 5 * (1 - easedProgress);
        camera.position.y = Math.cos(easedProgress * Math.PI * 3) * 3 * (1 - easedProgress);
        
        // Slight rotation for more dynamic effect
        camera.rotation.z = Math.sin(easedProgress * Math.PI) * 0.05;
        
        // More natural FOV increase
        camera.fov = 75 + (easedProgress * 30);
        camera.updateProjectionMatrix();
        
        // Smoother fade between normal particles and warp effect
        if (particles.material instanceof THREE.ShaderMaterial) {
          particles.material.opacity = Math.max(0, 1 - easedProgress * 1.5);
        }
        
        // Update warp effect
        if (warpMaterial instanceof THREE.ShaderMaterial) {
          warpMaterial.uniforms.time.value = easedProgress;
          warpMaterial.opacity = Math.min(1.0, easedProgress * 1.2);
        }
        
        // Create dynamic warp streaks by stretching points based on z-position
        const positions = warpGeometry.attributes.position.array;
        for (let i = 0; i < warpCount; i++) {
          const z = positions[i * 3 + 2];
          // Make stars closer to camera move faster
          positions[i * 3 + 2] += easedProgress * (50 + Math.abs(z/20));
          
          // Reset stars that have moved past the camera
          if (positions[i * 3 + 2] > camera.position.z) {
            positions[i * 3 + 2] = camera.position.z - 1000 - Math.random() * 500;
          }
        }
        warpGeometry.attributes.position.needsUpdate = true;
      }
      
      if (progress >= 1) {
        // Create a more graceful ending instead of abrupt cut
        if (!warpStars.userData.fadeOutStarted) {
          warpStars.userData.fadeOutStarted = true;
          warpStars.userData.fadeOutStart = Date.now();
        }
        
        const fadeOutDuration = 1500; // 1.5 seconds fade out
        const fadeElapsed = Date.now() - warpStars.userData.fadeOutStart;
        const fadeProgress = Math.min(fadeElapsed / fadeOutDuration, 1);
        
        // Gradually fade out warp and blur in the welcome screen
        setBlurEffect(fadeProgress * 10); // Gradually increase blur up to 10px
        
        if (warpMaterial instanceof THREE.ShaderMaterial) {
          warpMaterial.opacity = Math.max(0, 1 - fadeProgress * 1.5);
        }
        
        // Gradually slow down and fade out stars
        const positions = warpGeometry.attributes.position.array;
        for (let i = 0; i < warpCount; i++) {
          const z = positions[i * 3 + 2];
          positions[i * 3 + 2] += (1 - fadeProgress) * 20;
        }
        warpGeometry.attributes.position.needsUpdate = true;
        
        // Only complete animation when fade is done
        if (fadeProgress >= 1) {
          particles.visible = false;
          warpStars.visible = false;
          setAnimationComplete(true);
          onComplete();
          cancelAnimationFrame(animationId);
          return;
        }
      }
      
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      
      // Clean up Three.js resources
      particlesGeometry.dispose();
      warpGeometry.dispose();
      if (warpMaterial instanceof THREE.ShaderMaterial) {
        warpMaterial.dispose();
      }
      if (particlesMaterial instanceof THREE.ShaderMaterial) {
        particlesMaterial.dispose();
      }
      renderer.dispose();
    };
  }, [theme, onComplete]);
  
  return (
    <AnimatePresence>
      {!animationComplete && (
        <motion.div
          className="fixed inset-0 z-50 bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          ref={containerRef}
          style={{ 
            backdropFilter: `blur(${blurEffect}px)`,
            WebkitBackdropFilter: `blur(${blurEffect}px)`,
            transition: 'backdrop-filter 1s, -webkit-backdrop-filter 1s'
          }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          
          {/* Developer-themed message display */}
          <AnimatePresence>
            {currentMessage >= 0 && !finalTransition && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                key={currentMessage}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h2 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-primary to-purple-600 drop-shadow-lg font-mono">
                  {messages[currentMessage]}
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Final transition message */}
          <AnimatePresence>
            {finalTransition && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 0, 0.5, 1], 
                  scale: [0.5, 0.7, 1, 1.1] 
                }}
                transition={{ 
                  duration: 2, 
                  times: [0, 0.4, 0.7, 1],
                  ease: "easeInOut" 
                }}
              >
                <h2 className="text-5xl md:text-8xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-primary to-purple-600 drop-shadow-lg font-mono">
                  Welcome
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation; 