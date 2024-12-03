'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Line, OrbitControls, Text } from '@react-three/drei'

type Atom = {
  element: string
  position: [number, number, number]
}

type Bond = {
  start: number
  end: number
  order: number
}

type MoleculeData = {
  atoms: Atom[]
  bonds: Bond[]
}

const elementColors: { [key: string]: string } = {
  H: '#FFFFFF',
  C: '#909090',
  N: '#3050F8',
  O: '#FF0D0D',
  F: '#90E050',
  Cl: '#1FF01F',
  Br: '#A62929',
  I: '#940094',
  S: '#FFFF30',
  P: '#FF8000',
}

const elementSizes: { [key: string]: number } = {
  H: 0.1,
  C: 0.15,
  N: 0.15,
  O: 0.15,
  F: 0.15,
  Cl: 0.175,
  Br: 0.185,
  I: 0.198,
  S: 0.18,
  P: 0.18,
}

function Molecule({ data }: { data: MoleculeData }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(t / 4) * Math.PI / 6
  })

  return (
    <group ref={groupRef}>
      {data.atoms.map((atom, index) => (
        <group key={index} position={atom.position}>
          <Sphere args={[elementSizes[atom.element] || 0.15, 32, 32]}>
            <meshStandardMaterial color={elementColors[atom.element] || '#FFFFFF'} />
          </Sphere>
          <Text
            position={[0, elementSizes[atom.element] + 0.05 || 0.2, 0]}
            fontSize={0.1}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
          >
            {atom.element}
          </Text>
        </group>
      ))}
      {data.bonds.map((bond, index) => {
        const start = data.atoms[bond.start].position
        const end = data.atoms[bond.end].position
        return (
          <Line key={index} points={[start, end]} color="#FFFFFF" lineWidth={bond.order * 2} />
        )
      })}
    </group>
  )
}

export function MoleculeViewer({ formula, weightDiscrepancy }: { formula: string; weightDiscrepancy?: boolean }) {
  const [moleculeData, setMoleculeData] = useState<MoleculeData | null>(null)

  useEffect(() => {
    const parsedData = parseMoleculeFormula(formula)
    setMoleculeData(parsedData)
  }, [formula])

  if (!moleculeData) return null

  return (
    <div className="w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
      {weightDiscrepancy && (
        <div className="mb-2 p-2 bg-yellow-500 bg-opacity-20 rounded-md text-yellow-200">
          <p>Warning: The calculated molecular weight differs significantly from the provided weight.</p>
        </div>
      )}
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Molecule data={moleculeData} />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  )
}

function parseMoleculeFormula(formula: string): MoleculeData {
  const atoms: Atom[] = []
  const bonds: Bond[] = []
  let x = 0
  let y = 0
  let z = 0

  const elements = formula.match(/[A-Z][a-z]?\d*/g) || []
  elements.forEach((element, index) => {
    const [, symbol, count] = element.match(/([A-Z][a-z]?)(\d*)/) || []
    const quantity = count ? parseInt(count) : 1

    for (let i = 0; i < quantity; i++) {
      atoms.push({ element: symbol, position: [x, y, z] })
      if (atoms.length > 1) {
        bonds.push({ start: atoms.length - 2, end: atoms.length - 1, order: 1 })
      }
      x += 0.5
      y += 0.3 * Math.sin(index)
      z += 0.3 * Math.cos(index)
    }
  })

  return { atoms, bonds }
}

