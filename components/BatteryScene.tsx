"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const COLS = 8, ROWS = 5, CELLS = COLS * ROWS;
const CELL_R = 0.18, GAP = 0.42;

/** A LiFePO4 pack: `level` (0..1) of the cells glow, filling front-to-back like a charge. */
function Pack({ level, spin }: { level: number; spin: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mats = useRef<THREE.MeshStandardMaterial[]>([]);
  const target = Math.round(level * CELLS);
  const cells = useMemo(
    () => Array.from({ length: CELLS }, (_, i) => [((i % COLS) - (COLS - 1) / 2) * GAP, 0, (Math.floor(i / COLS) - (ROWS - 1) / 2) * GAP] as const),
    [],
  );
  const lit = useMemo(() => new THREE.Color("#3ddc97"), []);
  const off = useMemo(() => new THREE.Color("#1b2c4f"), []);

  useFrame((_, dt) => {
    if (spin && group.current) group.current.rotation.y += dt * 0.25;
    mats.current.forEach((m, i) => {
      const want = i < target ? 1 : 0;
      m.emissiveIntensity = THREE.MathUtils.damp(m.emissiveIntensity, want * 1.6, 6, dt);
      m.color.lerp(want ? lit : off, Math.min(1, dt * 6));
    });
  });

  return (
    <group ref={group} rotation={[0.25, -0.5, 0]}>
      {/* tray */}
      <RoundedBox args={[COLS * GAP + 0.3, 0.25, ROWS * GAP + 0.3]} radius={0.08} position={[0, -0.55, 0]}>
        <meshStandardMaterial color="#0b1d3f" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      {/* cells */}
      {cells.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <cylinderGeometry args={[CELL_R, CELL_R, 0.9, 24]} />
            <meshStandardMaterial ref={(m) => { if (m) mats.current[i] = m; }} color="#1b2c4f" emissive="#3ddc97" emissiveIntensity={0} metalness={0.3} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.47, 0]}>
            <cylinderGeometry args={[CELL_R * 0.55, CELL_R * 0.55, 0.05, 16]} />
            <meshStandardMaterial color="#c9ced8" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}
      {/* busbars */}
      {Array.from({ length: ROWS }, (_, r) => (
        <mesh key={r} position={[0, 0.5, (r - (ROWS - 1) / 2) * GAP]}>
          <boxGeometry args={[COLS * GAP - 0.1, 0.03, 0.1]} />
          <meshStandardMaterial color="#e03b3b" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export default function BatteryScene({ level }: { level: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    // On phones, dragging the canvas would trap page scroll, so rotation is auto-only.
    setTouch(window.matchMedia("(pointer: coarse)").matches);
    // Stop rendering when the hero scrolls away, to save battery on phones.
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    // Give the GPU fully to scrolling: hold the 3D still while the page moves, resume when it stops.
    let t = 0;
    const onScroll = () => { setScrolling(true); clearTimeout(t); t = window.setTimeout(() => setScrolling(false), 150); };
    window.addEventListener("scroll", onScroll, { passive: true });
    if (box.current) io.observe(box.current);
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, []);

  return (
    <div ref={box} className="relative h-full w-full" role="img" aria-label={`3D battery pack, ${Math.round(level * 100)}% of cells lit for your daily ride`}>
      <Canvas frameloop={visible && !scrolling ? "always" : "never"} dpr={touch ? 1 : [1, 1.5]} camera={{ position: [0, 3.6, 7.8], fov: 38 }} onCreated={({ camera }) => camera.lookAt(0, -0.2, 0)} gl={{ antialias: !touch, powerPreference: "low-power" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 2]} intensity={1.6} />
        <pointLight position={[-3, 1, 3]} intensity={12} color="#ff6a6a" />
        <Pack level={level} spin={!reduced} />
        {/* frames={1}: bake the soft shadow once; re-rendering it every frame cost ~20 ms */}
        <ContactShadows frames={1} position={[0, -0.75, 0]} opacity={0.5} scale={8} blur={2.4} far={2} />
        {!touch && <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0.6} maxPolarAngle={1.4} />}
      </Canvas>
    </div>
  );
}
