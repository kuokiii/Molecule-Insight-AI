'use client'

import { useState } from 'react'
import { MoleculeViewer } from './MoleculeViewer'

type ComparisonResult = {
  name: string
  formula: string
  functionalGroups: string[]
  molecularWeight: string
}

export function MoleculeComparison() {
  const [formula1, setFormula1] = useState('')
  const [formula2, setFormula2] = useState('')
  const [result1, setResult1] = useState<ComparisonResult | null>(null)
  const [result2, setResult2] = useState<ComparisonResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const classifyMolecule = async (formula: string) => {
    setError(null)
    const response = await fetch('/api/classify', {
      method: 'POST',
      body: JSON.stringify({ formula }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data.error)
    }
  }

  const handleCompare = async () => {
    try {
      const [data1, data2] = await Promise.all([
        classifyMolecule(formula1),
        classifyMolecule(formula2)
      ])
      setResult1(data1)
      setResult2(data2)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            value={formula1}
            onChange={(e) => setFormula1(e.target.value)}
            placeholder="Enter first formula"
            className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
          />
          {formula1 && <MoleculeViewer formula={formula1} />}
        </div>
        <div>
          <input
            type="text"
            value={formula2}
            onChange={(e) => setFormula2(e.target.value)}
            placeholder="Enter second formula"
            className="w-full p-2 rounded bg-white bg-opacity-20 text-white"
          />
          {formula2 && <MoleculeViewer formula={formula2} />}
        </div>
      </div>
      <button
        onClick={handleCompare}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Compare Molecules
      </button>
      {error && (
        <div className="p-4 bg-red-500 bg-opacity-20 rounded-md">
          <p className="text-white">{error}</p>
        </div>
      )}
      {result1 && result2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-500 bg-opacity-20 rounded-md">
            <h3 className="text-xl font-semibold text-white mb-2">{result1.name}</h3>
            <p className="text-white"><strong>Formula:</strong> {result1.formula}</p>
            <p className="text-white"><strong>Molecular Weight:</strong> {result1.molecularWeight} g/mol</p>
            <p className="text-white"><strong>Functional Groups:</strong> {result1.functionalGroups.join(', ')}</p>
          </div>
          <div className="p-4 bg-green-500 bg-opacity-20 rounded-md">
            <h3 className="text-xl font-semibold text-white mb-2">{result2.name}</h3>
            <p className="text-white"><strong>Formula:</strong> {result2.formula}</p>
            <p className="text-white"><strong>Molecular Weight:</strong> {result2.molecularWeight} g/mol</p>
            <p className="text-white"><strong>Functional Groups:</strong> {result2.functionalGroups.join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  )
}

