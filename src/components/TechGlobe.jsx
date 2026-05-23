import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { TECH_STACK } from '../data/index.jsx';
import * as THREE from 'three';
import '../styles/techglobe.scss';

function GlobeCore() {
  const meshRef = useRef();
  const pointsRef = useRef();

  useFrame((state, delta) => {
    // Constant slow rotation of the core
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group>
      {/* Central Digital Wireframe Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.0, 20, 20]} />
        <meshBasicMaterial color="#00ff88" wireframe={true} transparent={true} opacity={0.06} />
      </mesh>

      {/* Surface Particle Glow Dots */}
      <points ref={pointsRef}>
        <sphereGeometry args={[2.2, 36, 36]} />
        <pointsMaterial color="#00d4ff" size={0.03} sizeAttenuation={true} transparent={true} opacity={0.15} />
      </points>
    </group>
  );
}

function TechItems({ activeCategory }) {
  const groupRef = useRef();

  // Filter skills based on category selected in parent
  const filteredStack = useMemo(() => {
    return activeCategory === 'all'
      ? TECH_STACK
      : TECH_STACK.filter(tech => tech.category === activeCategory);
  }, [activeCategory]);

  const radius = 3.2; // Radius of icon sphere layout

  // Distribute tech items on sphere using Fibonacci Spiral
  const items = useMemo(() => {
    const list = [];
    const count = filteredStack.length;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      list.push({
        tech: filteredStack[i],
        pos: [x, y, z]
      });
    }
    return list;
  }, [filteredStack]);

  return (
    <group ref={groupRef}>
      <GlobeCore />
      {items.map((item, index) => {
        const IconComponent = item.tech.icon;
        return (
          <Html
            key={item.tech.name + index}
            position={item.pos}
            center={true}
            distanceFactor={8.5} // auto scaling of HTML elements based on Z depth
            zIndexRange={[100, 0]}
          >
            <a 
              href={item.tech.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="tech-globe-badge"
            >
              <IconComponent className="badge-icon" />
              <span>{item.tech.name}</span>
            </a>
          </Html>
        );
      })}
    </group>
  );
}

export default function TechGlobe({ activeCategory }) {
  return (
    <div className="tech-globe-container">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.8} />
        <TechItems activeCategory={activeCategory} />
        <OrbitControls
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.6}
          enablePan={false}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
      <div className="globe-instructions">
        <span>Drag to rotate globe | Click icons to open docs</span>
      </div>
    </div>
  );
}
