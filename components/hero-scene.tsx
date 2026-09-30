"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Icosahedron, Points, PointMaterial } from "@react-three/drei"
import type { Mesh } from "three"
import * as THREE from "three"

function WireframeShape({ mouseX = 0, mouseY = 0 }) {
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.2 + mouseY * 0.002
    meshRef.current.rotation.y = t * 0.15 + mouseX * 0.002
    meshRef.current.position.x = mouseX * 0.002
    meshRef.current.position.y = -mouseY * 0.002
  })

  return (
    <Icosahedron ref={meshRef} args={[3.4, 1]} position={[0, 0, -1.5]}>
      <meshStandardMaterial
        color="#5a524b"
        metalness={0.1}
        roughness={0.8}
        wireframe
        transparent
        opacity={0.55}
      />
    </Icosahedron>
  )
}

function GyroRing({ mouseX = 0, mouseY = 0 }) {
  const ringRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.y = -t * 0.12 + mouseX * 0.001
    ringRef.current.rotation.x = 1.1 + mouseY * 0.001
  })

  return (
    <mesh ref={ringRef} position={[0, 0, -0.5]}>
      <torusGeometry args={[4.4, 0.012, 8, 160]} />
      <meshBasicMaterial color="#c4b5a5" transparent opacity={0.5} />
    </mesh>
  )
}

function Particles({
  count = 60,
  size = 0.03,
  color = "#666",
  opacity = 0.5,
  speed = 0.02,
  radius = 3,
  spread = 4,
}: {
  count?: number
  size?: number
  color?: string
  opacity?: number
  speed?: number
  radius?: number
  spread?: number
}) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = radius + Math.random() * spread
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count, radius, spread])

  const ref = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * speed
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * speed * 0.5) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  )
}

function ShootingStar({ delay = 2, duration = 1.4, cycle = 9 }: { delay?: number; duration?: number; cycle?: number }) {
  const ref = useRef<Mesh>(null)
  const matRef = useRef<THREE.MeshBasicMaterial>(null)

  useFrame(({ clock }) => {
    if (!ref.current || !matRef.current) return
    const t = (clock.getElapsedTime() + delay) % cycle
    if (t > duration) {
      matRef.current.opacity = 0
      return
    }
    const p = t / duration
    ref.current.position.x = -6 + p * 12
    ref.current.position.y = 3.2 - p * 4.4
    matRef.current.opacity = Math.sin(p * Math.PI) * 0.9
  })

  return (
    <mesh ref={ref} rotation={[0, 0, -0.35]} position={[-6, 3.2, -1]}>
      <boxGeometry args={[1.4, 0.015, 0.015]} />
      <meshBasicMaterial
        ref={matRef}
        color="#e8ded2"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function HeroScene({ mouseX = 0, mouseY = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <fog attach="fog" args={["#0a0a0a", 4, 12]} />
      <WireframeShape mouseX={mouseX} mouseY={mouseY} />
      <GyroRing mouseX={mouseX} mouseY={mouseY} />
      <Particles count={170} size={0.025} color="#8a7f74" opacity={0.45} speed={0.015} radius={3.5} spread={5} />
      <Particles count={70} size={0.05} color="#c4b5a5" opacity={0.6} speed={0.03} radius={2.5} spread={3} />
      <ShootingStar delay={2} />
      <ShootingStar delay={6.5} duration={1.1} />
    </Canvas>
  )
}
