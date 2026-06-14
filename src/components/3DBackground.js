import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Floating sports balls/objects
function FloatingObject({ position, color, speed, shape }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y += Math.sin(t * speed) * 0.003;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {shape === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
      {shape === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 32]} />}
      {shape === 'ring' && <ringGeometry args={[0.3, 0.5, 32]} />}
      <meshStandardMaterial
        color={color}
        metalness={0.6}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Animated cricket ball
function CricketBall() {
  const ballRef = useRef();
  
  useFrame((state) => {
    ballRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
    ballRef.current.rotation.z = state.clock.getElapsedTime() * 0.3;
    ballRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.5;
  });

  return (
    <mesh ref={ballRef} position={[-3, 1, -2]}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="#cc0000" roughness={0.4} />
    </mesh>
  );
}

// Football
function Football() {
  const ballRef = useRef();
  
  useFrame((state) => {
    ballRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
    ballRef.current.position.x = Math.cos(state.clock.getElapsedTime()) * 0.5;
  });

  return (
    <mesh ref={ballRef} position={[3, -0.5, -1]}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial color="#ffffff" roughness={0.3} />
    </mesh>
  );
}

// Floating cards for Teen Patti
function FloatingCards() {
  const cardRef = useRef();
  
  useFrame((state) => {
    cardRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    cardRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.3;
  });

  return (
    <group ref={cardRef} position={[2, 1.5, -3]}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.3, 0.45, 0.02]} />
        <meshStandardMaterial color="#4A148C" />
      </mesh>
      <mesh position={[0.1, -0.1, -0.02]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.3, 0.45, 0.02]} />
        <meshStandardMaterial color="#6A1B9A" />
      </mesh>
      <mesh position={[0.2, -0.2, -0.04]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.3, 0.45, 0.02]} />
        <meshStandardMaterial color="#9C27B0" />
      </mesh>
    </group>
  );
}

// Trophy
function Trophy() {
  const trophyRef = useRef();
  
  useFrame((state) => {
    trophyRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <group ref={trophyRef} position={[0, -1, -4]}>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.3, 0.15, 0.8, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.1, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Particles
function Particles({ count = 50 }) {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5 - 2,
        ],
        speed: Math.random() * 0.02 + 0.01,
      });
    }
    return temp;
  }, [count]);

  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.03, 4, 4]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#4CAF50' : i % 3 === 1 ? '#FFD700' : '#2196F3'}
            emissive={i % 3 === 0 ? '#4CAF50' : i % 3 === 1 ? '#FFD700' : '#2196F3'}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeDBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#4CAF50" />
        
        <Particles />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <CricketBall />
        </Float>
        <Float speed={3} rotationIntensity={0.8} floatIntensity={1.5}>
          <Football />
        </Float>
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
          <FloatingCards />
        </Float>
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Trophy />
        </Float>
        
        {[
          { pos: [-2, 2, -2], color: '#4CAF50', shape: 'sphere' },
          { pos: [2, -1.5, -3], color: '#2196F3', shape: 'torus' },
          { pos: [-3, -1, -3], color: '#FF9800', shape: 'ring' },
          { pos: [1, 2.5, -1], color: '#FFD700', shape: 'sphere' },
          { pos: [-1, -2, -2], color: '#9C27B0', shape: 'torus' },
        ].map((obj, i) => (
          <Float key={i} speed={1 + i * 0.3} rotationIntensity={0.5} floatIntensity={1}>
            <FloatingObject {...obj} speed={1 + i * 0.2} />
          </Float>
        ))}
      </Canvas>
    </div>
  );
}