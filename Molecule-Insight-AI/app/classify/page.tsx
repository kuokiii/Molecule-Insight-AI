'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import { MoleculeViewer } from '../components/MoleculeViewer'
import { HelpSection } from '../components/HelpSection'
import { MoleculeComparison } from '../components/MoleculeComparison'
import { PeriodicTable } from '../components/PeriodicTable'

type ClassificationResult = {
  name: string
  formula: string
  functionalGroups: string[]
  molecularWeight: string
  calculatedWeight: string
  weightDiscrepancy: boolean
}

export default function Classify() {
  const [result, setResult] = useState<ClassificationResult | null>(null)
  const [formula, setFormula] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/classify', {
      method: 'POST',
      body: JSON.stringify({ formula: formData.get('formula') }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (response.ok) {
      setResult(data)
      setFormula(data.formula)
    } else {
      setError(data.error)
      setResult(null)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-4"
    >
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-xl w-full max-w-4xl">
        <motion.h2 
          className="text-4xl font-bold mb-6 text-white text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Molecule Insight AI
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="formula" className="block text-sm font-medium text-white">
                  Molecular Formula
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="inline-block ml-1 w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter the molecular formula (e.g., C2H6O for ethanol)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </label>
                <input type="text" id="formula" name="formula" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white bg-opacity-20 text-white" />
              </div>
              <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Classify
              </button>
            </form>
            {error && (
              <motion.div 
                className="mt-4 p-4 bg-red-500 bg-opacity-20 rounded-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-white">{error}</p>
              </motion.div>
            )}
            {result && (
              <motion.div 
                className="mt-4 p-4 bg-green-500 bg-opacity-20 rounded-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">{result.name}</h3>
                <p className="text-white"><strong>Formula:</strong> {result.formula}</p>
                <p className="text-white"><strong>Provided Molecular Weight:</strong> {result.molecularWeight} g/mol</p>
                <p className="text-white"><strong>Calculated Molecular Weight:</strong> {result.calculatedWeight} g/mol</p>
                {result.weightDiscrepancy && (
                  <p className="text-yellow-200 mt-2">Warning: There is a significant discrepancy between the provided and calculated molecular weights.</p>
                )}
                <p className="text-white"><strong>Functional Groups:</strong> {result.functionalGroups.join(', ')}</p>
              </motion.div>
            )}
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-2 text-white">Periodic Table</h3>
            <PeriodicTable />
          </motion.div>
        </div>
        <motion.div 
          className="mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-2 text-white">3D Molecule Viewer</h3>
          {formula && <MoleculeViewer formula={formula} weightDiscrepancy={result?.weightDiscrepancy} />}
        </motion.div>
        <motion.div 
          className="mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-2 text-white">Molecule Comparison</h3>
          <MoleculeComparison />
        </motion.div>
        <motion.div 
          className="mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold mb-2 text-white">Molecular Categories Help</h3>
          <HelpSection />
        </motion.div>
      </div>
    </motion.div>
  )
}

