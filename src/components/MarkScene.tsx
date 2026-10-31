"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* Section 5 — logo animation. The yellow T-shield logomark as glossy
   translucent amber glass, centered at ~38% of viewport height, on a thin
   angular metal stand with a floor highlight and a white-hot core.
   Slow ±15° Y sway + slight cursor parallax. Amber/gold only. */

function GlassMark() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const shape = useMemo(() => {
    // T-shield chevron mark, same silhouette as the flat SVG logomark
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

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = Math.sin(t * 0.45) * 0.26 + mouse.current.x * 0.1; // ±15° + cursor
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -0.05 + mouse.current.y * 0.05, 0.06);
    g.position.y = 0.12 + Math.sin(t * 0.7) * 0.03;
  });

  return (
    <group ref={group} scale={0.62}>
      {/* amber glass shell */}
      <mesh position={[0, 0.1, 0]}>
        <extrudeGeometry args={[shape, { depth: 0.3, bevelEnabled: true, bevelSegments: 3, bevelThickness: 0.06, bevelSize: 0.05, steps: 1, curveSegments: 6 }]} />
        <meshPhysicalMaterial
          color="#f2b13d"
          transmission={0.68}
          thickness={1.2}
          roughness={0.14}
          ior={1.4}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.12}
          attenuationColor="#b45309"
          attenuationDistance={1.3}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* white-hot emissive core inside the glass */}
      <mesh position={[0, 0.08, 0.1]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial color="#fff8ea" toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0.1, 0.3]} intensity={16} color="#ffdf9e" />
    </group>
  );
}

function Stand() {
  return (
    <group position={[0, -1.06, 0]}>
      <mesh position={[0, 0.22, 0]} rotation={[0, 0, 0.06]}>
        <boxGeometry args={[0.15, 0.95, 0.13]} />
        <meshStandardMaterial color="#6f695d" metalness={1} roughness={0.3} envMapIntensity={1.1} />
      </mesh>
      <mesh position={[0.06, -0.24, 0.05]} rotation={[0.38, 0.18, -0.1]}>
        <boxGeometry args={[0.78, 0.055, 0.5]} />
        <meshStandardMaterial color="#8f8a80" metalness={1} roughness={0.24} envMapIntensity={1.25} />
      </mesh>
      {/* soft elliptical floor highlight */}
      <mesh position={[0, -0.29, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.85, 40]} />
        <meshBasicMaterial color="#f5a000" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

export default function MarkScene() {
  return (
    <div className="logo-canvas" aria-hidden="true">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0.1, 7.6], fov: 33 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.45} />
        <spotLight position={[-6, 7, 6]} intensity={70} color="#fff1c4" angle={0.5} penumbra={0.9} />
        <pointLight position={[4, -2, 4]} intensity={14} color="#f5a000" />
        <GlassMark />
        <Stand />
        <ContactShadows position={[0, -1.42, 0]} opacity={0.42} scale={7} blur={2.8} far={2.2} color="#000000" />
        <Environment resolution={128}>
          <Lightformer intensity={2.2} position={[0, 6, 1]} rotation-x={Math.PI / 2} scale={[7, 7, 1]} color="#fff6e0" />
          <Lightformer intensity={1.5} position={[0, 4, -9]} scale={[11, 8, 1]} color="#ffdf9e" />
          <Lightformer intensity={1} position={[-6, 1, -1]} rotation-y={Math.PI / 2} scale={[12, 3, 1]} color="#ffc46b" />
          <Lightformer intensity={1.2} position={[7, 1, 0]} rotation-y={-Math.PI / 2} scale={[12, 3, 1]} color="#f5a000" />
          <Lightformer intensity={0.6} position={[0, -5, 0]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} color="#4a3d24" />
        </Environment>
      </Canvas>
    </div>
  );
}
