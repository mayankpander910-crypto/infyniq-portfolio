"use client";

import React, { Component, Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, PresentationControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import clsx from "clsx";
import { useCursor } from "@/components/providers/CursorContext";

export type StudioSculptureVariant = "headphones" | "prism" | "keycap" | "mug";

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function canUseWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function StudioHeadphonesMesh() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.55) * 0.28 - 0.3;
    groupRef.current.rotation.z = Math.cos(t * 0.45) * 0.08 + 0.18;
  });

  return (
    <group ref={groupRef} scale={0.98}>
      {/* Headband */}
      <mesh position={[0, 0.28, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.92, 0.11, 28, 64, Math.PI]} />
        <meshStandardMaterial color="#D6D9DF" roughness={0.35} metalness={0.25} />
      </mesh>
      {/* Inner headband cushion */}
      <mesh position={[0, 0.25, 0]}>
        <torusGeometry args={[0.84, 0.06, 20, 48, Math.PI * 0.82]} />
        <meshStandardMaterial color="#ECEEF2" roughness={0.65} metalness={0.05} />
      </mesh>

      {/* Left Earcup Assembly */}
      <group position={[-0.86, -0.18, 0]} rotation={[0, 0, -0.22]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.38, 0.34, 0.26, 36]} />
          <meshStandardMaterial color="#CFD4DC" roughness={0.32} metalness={0.3} />
        </mesh>
        {/* Cobalt accent ring */}
        <mesh position={[-0.135, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.24, 0.025, 16, 40]} />
          <meshStandardMaterial color="#0072CE" roughness={0.25} metalness={0.5} />
        </mesh>
        {/* Ear cushion */}
        <mesh position={[0.14, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.26, 0.1, 20, 40]} />
          <meshStandardMaterial color="#E5E7EB" roughness={0.75} metalness={0.05} />
        </mesh>
      </group>

      {/* Right Earcup Assembly */}
      <group position={[0.86, -0.18, 0]} rotation={[0, 0, 0.22]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.38, 0.34, 0.26, 36]} />
          <meshStandardMaterial color="#CFD4DC" roughness={0.32} metalness={0.3} />
        </mesh>
        <mesh position={[0.135, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.24, 0.025, 16, 40]} />
          <meshStandardMaterial color="#0072CE" roughness={0.25} metalness={0.5} />
        </mesh>
        <mesh position={[-0.14, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.26, 0.1, 20, 40]} />
          <meshStandardMaterial color="#E5E7EB" roughness={0.75} metalness={0.05} />
        </mesh>
      </group>
    </group>
  );
}

function InfyniqPrismMesh() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.25 + 0.45;
    groupRef.current.rotation.y = t * 0.35;
  });

  return (
    <group ref={groupRef} scale={0.95}>
      {/* Cobalt primary torus-frame */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.78, 0.19, 28, 64]} />
        <meshStandardMaterial color="#0072CE" roughness={0.22} metalness={0.38} />
      </mesh>
      {/* Interlocking warm-amber ring inspired by Infyniq logo */}
      <mesh position={[0.22, -0.12, 0.1]} rotation={[0, Math.PI / 2.4, Math.PI / 5]}>
        <torusGeometry args={[0.62, 0.15, 28, 64]} />
        <meshStandardMaterial color="#FFB433" roughness={0.28} metalness={0.3} />
      </mesh>
      {/* Floating porcelain core sphere */}
      <mesh position={[-0.08, 0.06, 0]}>
        <icosahedronGeometry args={[0.26, 2]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.2} metalness={0.15} />
      </mesh>
    </group>
  );
}

function StudioKeycapMesh() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = 0.52 + Math.sin(t * 0.6) * 0.08;
    groupRef.current.rotation.y = -0.45 + Math.cos(t * 0.5) * 0.18;
  });

  return (
    <group ref={groupRef} scale={1.05}>
      {/* Anodized base housing */}
      <RoundedBox args={[1.55, 0.38, 1.55]} radius={0.14} smoothness={6} position={[0, -0.26, 0]}>
        <meshStandardMaterial color="#1E293B" roughness={0.35} metalness={0.45} />
      </RoundedBox>
      {/* Switch stem */}
      <RoundedBox args={[0.5, 0.25, 0.5]} radius={0.05} smoothness={4} position={[0, -0.02, 0]}>
        <meshStandardMaterial color="#0072CE" roughness={0.25} metalness={0.3} />
      </RoundedBox>
      {/* Tactile Porcelain Keycap */}
      <RoundedBox args={[1.26, 0.42, 1.26]} radius={0.16} smoothness={6} position={[0, 0.22, 0]}>
        <meshStandardMaterial color="#F8FAFC" roughness={0.28} metalness={0.08} />
      </RoundedBox>
      {/* Cobalt keycap accent dot */}
      <mesh position={[0.32, 0.44, -0.32]}>
        <cylinderGeometry args={[0.11, 0.11, 0.04, 24]} />
        <meshStandardMaterial color="#1463FF" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Amber bar */}
      <RoundedBox args={[0.52, 0.04, 0.12]} radius={0.02} smoothness={4} position={[-0.18, 0.44, 0.28]}>
        <meshStandardMaterial color="#FFB433" roughness={0.3} metalness={0.2} />
      </RoundedBox>
    </group>
  );
}

function StudioMugMesh() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z = -0.34 + Math.sin(t * 0.5) * 0.08;
    groupRef.current.rotation.y = -0.4 + Math.cos(t * 0.4) * 0.22;
    groupRef.current.rotation.x = 0.25;
  });

  return (
    <group ref={groupRef} scale={0.98}>
      {/* Ceramic mug body */}
      <mesh>
        <cylinderGeometry args={[0.62, 0.56, 1.32, 48]} />
        <meshStandardMaterial color="#F4F5F7" roughness={0.24} metalness={0.08} />
      </mesh>
      {/* Cobalt interior glaze */}
      <mesh position={[0, 0.63, 0]}>
        <cylinderGeometry args={[0.55, 0.52, 0.08, 40]} />
        <meshStandardMaterial color="#0072CE" roughness={0.2} metalness={0.25} />
      </mesh>
      {/* Electric-blue studio stripe */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.605, 0.59, 0.12, 48]} />
        <meshStandardMaterial color="#1463FF" roughness={0.28} metalness={0.2} />
      </mesh>
      {/* Ceramic handle */}
      <mesh position={[-0.62, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.36, 0.095, 24, 48, Math.PI]} />
        <meshStandardMaterial color="#F4F5F7" roughness={0.24} metalness={0.08} />
      </mesh>
    </group>
  );
}

function StaticSculptureFallback({ variant }: { variant: StudioSculptureVariant }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-28 w-28 animate-float items-center justify-center rounded-3xl border border-border-figma bg-surface-elevated shadow-editorial">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#0072CE] to-[#FFB433] opacity-90 shadow-inner" />
        <span className="sr-only">{variant} studio object</span>
      </div>
    </div>
  );
}

interface StudioObjectCanvasProps {
  variant: StudioSculptureVariant;
  className?: string;
  label?: string;
}

export function StudioObjectCanvas({
  variant,
  className,
  label,
}: StudioObjectCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [webglOk, setWebglOk] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    setMounted(true);
    setWebglOk(canUseWebGL());
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "220px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setCursor("3d", label || "DRAG 3D")}
      onMouseLeave={resetCursor}
      className={clsx("relative select-none", className)}
      aria-hidden="true"
    >
      {!mounted || !webglOk ? (
        <StaticSculptureFallback variant={variant} />
      ) : inView ? (
        <WebGLErrorBoundary
          fallback={<StaticSculptureFallback variant={variant} />}
        >
          <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 0.35, 3.6], fov: 38 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <ambientLight intensity={1.15} />
            <directionalLight position={[4, 6, 5]} intensity={1.6} />
            <directionalLight position={[-4, -2, 3]} intensity={0.55} color="#93C5FD" />
            <pointLight position={[2, 2, 3]} intensity={0.45} color="#FFFFFF" />
            <Suspense fallback={null}>
              <PresentationControls
                global={false}
                cursor={false}
                snap={true}
                speed={1.4}
                zoom={1}
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 3, Math.PI / 3]}
              >
                <Float speed={2.1} rotationIntensity={0.28} floatIntensity={0.45}>
                  {variant === "headphones" && <StudioHeadphonesMesh />}
                  {variant === "prism" && <InfyniqPrismMesh />}
                  {variant === "keycap" && <StudioKeycapMesh />}
                  {variant === "mug" && <StudioMugMesh />}
                </Float>
              </PresentationControls>
              <ContactShadows
                position={[0, -1.2, 0]}
                opacity={0.24}
                scale={4.2}
                blur={2.4}
                far={2.8}
              />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        <div className="h-full w-full" />
      )}
    </div>
  );
}
