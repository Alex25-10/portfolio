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
    meshRef.current.position.x = mouseX * 0.004
    meshRef.current.position.y = -mouseY * 0.004
  })

  return (
    <Icosahedron ref={meshRef} args={[1.8, 1]}>
      <meshStandardMaterial
        color="#444"
        metalness={0.1}
        roughness={0.8}
        wireframe
        transparent
        opacity={0.35}
      />
    </Icosahedron>
  )
}

function Particles({ count = 60 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  const ref = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        size={0.03}
        color="#666"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
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
      <Particles />
    </Canvas>
  )
}
