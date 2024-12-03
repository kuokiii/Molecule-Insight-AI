import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'csv-parse/sync'
import { calculateMolecularWeight } from '@/lib/ml-utils'

let compounds: any[] = []

async function loadCompounds() {
  if (compounds.length === 0) {
    const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chemical%20compounds%20main-BTClC2KKDKB81a412me2g1d0eP406H.csv')
    const csvData = await response.text()
    compounds = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    })

    // Correct molecular weights
    compounds = compounds.map(compound => {
      const calculatedWeight = calculateMolecularWeight(compound['Molecular Formula'])
      const providedWeight = parseFloat(compound['Molecular Weight (g/mol)'])
      
      if (Math.abs(calculatedWeight - providedWeight) / calculatedWeight > 0.1) {
        compound['Molecular Weight (g/mol)'] = calculatedWeight.toFixed(2)
      }

      return compound
    })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { formula } = body

  if (!formula) {
    return NextResponse.json({ error: 'Formula is required' }, { status: 400 })
  }

  await loadCompounds()

  const compound = compounds.find(c => c['Molecular Formula'].toLowerCase() === formula.toLowerCase())

  if (compound) {
    const calculatedWeight = calculateMolecularWeight(compound['Molecular Formula'])
    const providedWeight = parseFloat(compound['Molecular Weight (g/mol)'])
    const weightDiscrepancy = Math.abs(calculatedWeight - providedWeight) / calculatedWeight > 0.1

    return NextResponse.json({
      name: compound['IUPAC Name'],
      formula: compound['Molecular Formula'],
      functionalGroups: compound['Functional Groups'].split(', '),
      molecularWeight: compound['Molecular Weight (g/mol)'],
      calculatedWeight: calculatedWeight.toFixed(2),
      weightDiscrepancy
    })
  } else {
    return NextResponse.json({ error: 'Compound not found' }, { status: 404 })
  }
}

