import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function WeatherBackground({ weatherCondition = 'clear' }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set up the Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Configure the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Keep the canvas sized correctly when window resizes
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Main animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
        
        const positions = particlesRef.current.geometry.attributes.position.array;
        const velocities = particlesRef.current.userData.velocities;
        
        // Move each particle down and loop it back to the top
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += velocities[i / 3];
          
          if (positions[i + 1] < -10) {
            positions[i + 1] = 10;
          }
        }
        
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Clean up when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (particlesRef.current) {
        scene.remove(particlesRef.current);
        particlesRef.current.geometry.dispose();
        particlesRef.current.material.dispose();
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Clear out old particles when weather changes
    if (particlesRef.current) {
      sceneRef.current.remove(particlesRef.current);
      particlesRef.current.geometry.dispose();
      particlesRef.current.material.dispose();
    }

    // Add new particles for the current weather
    const particleSystem = createWeatherParticles(weatherCondition);
    particlesRef.current = particleSystem;
    sceneRef.current.add(particleSystem);

    // Update the background colors too
    updateSceneBackground(sceneRef.current, weatherCondition);
  }, [weatherCondition]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
}

function createWeatherParticles(condition) {
  const particleCount = getParticleCount(condition);
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount);

  const { color, size, speed, spread } = getWeatherProperties(condition);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = Math.random() * 20 - 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    
    velocities[i] = -Math.random() * speed - 0.01;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: color,
    size: size,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(geometry, material);
  particles.userData.velocities = velocities;

  return particles;
}

function getParticleCount(condition) {
  const counts = {
    rain: 3000,
    drizzle: 2000,
    snow: 1500,
    thunderstorm: 3500,
    clouds: 500,
    mist: 800,
    fog: 800,
    clear: 200,
    default: 300,
  };

  return counts[condition.toLowerCase()] || counts.default;
}

function getWeatherProperties(condition) {
  const properties = {
    rain: { color: 0x4a9eff, size: 0.15, speed: 0.15, spread: 40 },
    drizzle: { color: 0x6eb5ff, size: 0.1, speed: 0.08, spread: 40 },
    snow: { color: 0xffffff, size: 0.25, speed: 0.03, spread: 40 },
    thunderstorm: { color: 0x1e3a5f, size: 0.2, speed: 0.2, spread: 40 },
    clouds: { color: 0xcccccc, size: 0.3, speed: 0.01, spread: 50 },
    mist: { color: 0xaaaaaa, size: 0.4, speed: 0.02, spread: 35 },
    fog: { color: 0x999999, size: 0.5, speed: 0.015, spread: 35 },
    clear: { color: 0xffeb99, size: 0.2, speed: 0.005, spread: 60 },
    default: { color: 0xffffff, size: 0.2, speed: 0.02, spread: 40 },
  };

  return properties[condition.toLowerCase()] || properties.default;
}

function updateSceneBackground(scene, condition) {
  const gradients = {
    clear: { top: 0x87ceeb, bottom: 0xffd700 },
    rain: { top: 0x4a5f7f, bottom: 0x2c3e50 },
    drizzle: { top: 0x667c99, bottom: 0x455a75 },
    snow: { top: 0xb0c4de, bottom: 0xe6f2ff },
    thunderstorm: { top: 0x1a1a2e, bottom: 0x16213e },
    clouds: { top: 0x7f8c99, bottom: 0xb0bec5 },
    mist: { top: 0x9e9e9e, bottom: 0xbdbdbd },
    fog: { top: 0x9e9e9e, bottom: 0xbdbdbd },
    default: { top: 0x667eea, bottom: 0x764ba2 },
  };

  const gradient = gradients[condition.toLowerCase()] || gradients.default;
  
  scene.background = new THREE.Color(gradient.top);
  scene.fog = new THREE.Fog(gradient.bottom, 5, 15);
}

export default WeatherBackground;
