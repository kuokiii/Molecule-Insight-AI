'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'

function Atom({ position, color }: { position: [number, number, number], color: string }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.position.x = position[0] + Math.sin(t + position[1]) * 0.2
    ref.current.position.y = position[1] + Math.cos(t + position[0]) * 0.2
    ref.current.position.z = position[2] + Math.sin(t + position[2]) * 0.2
  })
  return (
    <Sphere ref={ref} args={[0.2, 32, 32]} position={position}>
      <meshStandardMaterial color={color} />
    </Sphere>
  )
}

function Bond({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  return <Line points={[start, end]} color="white" lineWidth={3} />
}

function Molecule() {
  const atoms = useMemo(() => [
    { position: [0, 0, 0], color: '#FF4136' },
    { position: [1, 1, 1], color: '#0074D9' },
    { position: [-1, -1, -1], color: '#2ECC40' },
    { position: [1, -1, 1], color: '#FFDC00' },
    { position: [-1, 1, -1], color: '#B10DC9' },
  ], [])

  const bonds = useMemo(() => [
    { start: [0, 0, 0], end: [1, 1, 1] },
    { start: [0, 0, 0], end: [-1, -1, -1] },
    { start: [0, 0, 0], end: [1, -1, 1] },
    { start: [0, 0, 0], end: [-1, 1, -1] },
  ], [])

  return (
    <>
      {atoms.map((atom, index) => (
        <Atom key={index} position={atom.position} color={atom.color} />
      ))}
      {bonds.map((bond, index) => (
        <Bond key={index} start={bond.start} end={bond.end} />
      ))}
    </>
  )
}

export function MoleculeAnimation() {
  return (
    <div className="w-96 h-96">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Molecule />
      </Canvas>
    </div>
  )
}

