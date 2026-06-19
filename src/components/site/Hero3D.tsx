import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import heroImg from "@/assets/hero-section.jpg";

function FloatingPlane() {
  const tex = useTexture(heroImg);
  const ref = useRef<any>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.25) * 0.06;
    ref.current.rotation.x = Math.sin(t * 0.12) * 0.03;
    ref.current.position.y = Math.sin(t * 0.6) * 0.18 - 0.04;
  });

  return (
    <mesh ref={ref} position={[0, -0.04, 0]}>
      <planeGeometry args={[6.8, 9.2, 1, 1]} />
      <meshStandardMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

function StarField({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useRef(new Float32Array(count * 3));

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.current[i * 3 + 0] = Math.sin(phi) * Math.cos(theta) * r + (Math.random() - 0.5) * 2;
      positions.current[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 0.35 + (Math.random() - 0.5) * 1.5;
      positions.current[i * 3 + 2] = Math.cos(phi) * r - 6;
    }
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime * 0.04;
    pointsRef.current.rotation.y = t * 0.2;
    const geom = pointsRef.current.geometry as THREE.BufferGeometry;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1;
      pos.array[idx] = positions.current[idx] + Math.sin(t * (0.6 + (i % 7) * 0.02) + i) * 0.06;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={"attributes-position"}
          count={positions.current.length / 3}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={new THREE.Color("#f6e7c7")} depthWrite={false} />
    </points>
  );
}

function Halo() {
  const ref = useRef<any>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.25) * 0.06;
    ref.current.scale.x = 1 + Math.sin(s.clock.elapsedTime * 0.9) * 0.03;
    ref.current.scale.y = 1 + Math.cos(s.clock.elapsedTime * 0.85) * 0.03;
  });
  return (
    <mesh ref={ref} position={[0, 0.6, -1.8]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.6, 2.6, 64]} />
      <meshBasicMaterial
        color={new THREE.Color("#ffdca8")}
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function FloatingOrbs({ count = 6 }: { count?: number }) {
  const group = useRef<any>(null);
  useFrame((s) => {
    if (!group.current) return;
    const t = s.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const m = group.current.children[i];
      if (!m) continue;
      m.position.x = Math.sin(t * (0.5 + i * 0.12) + i) * (0.8 + i * 0.06);
      m.position.y = Math.cos(t * (0.6 + i * 0.08) + i) * (0.4 + (i % 3) * 0.12) + 0.6;
      m.position.z = -1.5 - (i * 0.12);
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[0, 0.6, -1.5 - i * 0.12]}>
          <sphereGeometry args={[0.06 + (i % 3) * 0.02, 16, 12]} />
          <meshStandardMaterial emissive={new THREE.Color("#ffdca8")} emissiveIntensity={0.9} color="#000000" />
        </mesh>
      ))}
    </group>
  );
}

function ParallaxController({ strength = 0.18 }: { strength?: number }) {
  const { camera } = useThree();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPos({ x: nx, y: ny });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (pos.x * strength - camera.position.x) * 0.06;
    camera.position.y += (-pos.y * strength * 0.6 - camera.position.y) * 0.06;
    camera.lookAt(0, 0.4, 0);
  });

  return null;
}

export default function Hero3D() {
  return (
    <div aria-hidden style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0.6, 6], fov: 38 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.9} />
        <directionalLight intensity={0.6} position={[2, 4, 5]} />
        <Suspense fallback={null}>
          <StarField count={140} />
          <Halo />
          <FloatingOrbs count={6} />
          <FloatingPlane />
        </Suspense>
        <ParallaxController strength={0.16} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
