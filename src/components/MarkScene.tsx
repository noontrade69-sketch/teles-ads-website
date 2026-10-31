"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* Amber-glass TELES "T" chevron mark with a white-hot core on a thin metal
   pedestal. Transmission glass + lightformer env (no network fetches). */

function GlassMark() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const shape = useMemo(() => {
    // Chevron "T": wide beveled top bar + tapered stem (matches the flat SVG)
    const s = new THREE.Shape();
    s.moveTo(-1.75, 1.3);
    s.lineTo(1.75, 1.3);
    s.lineTo(1.75, 0.5);
    s.lineTo(0.62, 0.5);
    s.lineTo(0.62, -1.3);
    s.lineTo(-0.62, -1.3);
    s.lineTo(-0.62, 0.5);
    s.lineTo(-1.75, 0.5);
    s.closePath();
    return s;
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = Math.sin(t * 0.3) * 0.5 + mouse.current.x * 0.4;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -0.08 + mouse.current.y * 0.12, 0.06);
    g.position.y = Math.sin(t * 0.9) * 0.07;
  });

  return (
    <group ref={group} scale={1.32}>
      {/* glass shell */}
      <mesh position={[0, 0.1, 0]}>
        <extrudeGeometry args={[shape, { depth: 0.34, bevelEnabled: true, bevelSegments: 4, bevelThickness: 0.07, bevelSize: 0.05, steps: 1, curveSegments: 8 }]} />
        <meshPhysicalMaterial
          color="#f5a623"
          transmission={0.88}
          thickness={1.5}
          roughness={0.16}
          ior={1.45}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.15}
          attenuationColor="#b45309"
          attenuationDistance={1.2}
          envMapIntensity={1.4}
        />
      </mesh>
      {/* white-hot core: glow sphere behind the glass */}
      <mesh position={[0, 0.08, -0.26]}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshBasicMaterial color="#fff6e2" toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0.1, -0.4]} intensity={30} color="#ffd28a" />
    </group>
  );
}

function Pedestal() {
  return (
    <group position={[0, -1.62, 0]}>
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[0.34, 1.1, 0.3]} />
        <meshStandardMaterial color="#8f8a80" metalness={1} roughness={0.28} envMapIntensity={1.1} />
      </mesh>
      <mesh position={[0, -0.26, 0.1]} rotation={[0.42, 0, 0]}>
        <boxGeometry args={[1.15, 0.09, 0.75]} />
        <meshStandardMaterial color="#c9c3b8" metalness={1} roughness={0.22} envMapIntensity={1.2} />
      </mesh>
    </group>
  );
}

export default function MarkScene() {
  return (
    <div className="logo-canvas" aria-hidden="true">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0.2, 7.6], fov: 33 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[-6, 7, 6]} intensity={80} color="#fff1c4" angle={0.5} penumbra={0.9} />
        <pointLight position={[4, -2, 4]} intensity={22} color="#ff8a1e" />
        <GlassMark />
        <Pedestal />
        <ContactShadows position={[0, -1.86, 0]} opacity={0.5} scale={9} blur={2.6} far={2.6} color="#000000" />
        <Environment resolution={128}>
          <Lightformer intensity={2.4} position={[0, 6, 1]} rotation-x={Math.PI / 2} scale={[7, 7, 1]} color="#fff6e0" />
          <Lightformer intensity={1.6} position={[0, 4, -9]} scale={[11, 8, 1]} color="#ffdf9e" />
          <Lightformer intensity={1.1} position={[-6, 1, -1]} rotation-y={Math.PI / 2} scale={[12, 3, 1]} color="#ffc46b" />
          <Lightformer intensity={1.4} position={[7, 1, 0]} rotation-y={-Math.PI / 2} scale={[12, 3, 1]} color="#ff9a3d" />
          <Lightformer intensity={0.7} position={[0, -5, 0]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} color="#5c4a2a" />
        </Environment>
      </Canvas>
    </div>
  );
}
