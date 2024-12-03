'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const functionalGroups = [
  {
    name: 'Amine',
    description: 'Compounds containing a nitrogen atom with a lone pair of electrons, typically bonded to one or more alkyl groups.',
    example: 'Methylamine (CH3NH2)',
  },
  {
    name: 'Alcohol',
    description: 'Compounds containing a hydroxyl (-OH) group bonded to a carbon atom.',
    example: 'Ethanol (CH3CH2OH)',
  },
  {
    name: 'Carboxylic Acid',
    description: 'Compounds containing a carboxyl (-COOH) group.',
    example: 'Acetic acid (CH3COOH)',
  },
  {
    name: 'Ether',
    description: 'Compounds containing an oxygen atom bonded to two alkyl or aryl groups.',
    example: 'Diethyl ether (CH3CH2OCH2CH3)',
  },
  {
    name: 'Ketone',
    description: 'Compounds containing a carbonyl group (C=O) bonded to two carbon atoms.',
    example: 'Acetone (CH3COCH3)',
  },
]

export function HelpSection() {
  const [activeGroup, setActiveGroup] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {functionalGroups.map((group, index) => (
        <motion.div key={index} layout>
          <motion.button
            className={`w-full text-left p-2 rounded ${
              activeGroup === index ? 'bg-blue-600' : 'bg-blue-500'
            } text-white`}
            onClick={() => setActiveGroup(activeGroup === index ? null : index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {group.name}
          </motion.button>
          <AnimatePresence>
            {activeGroup === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-2 bg-white bg-opacity-10 rounded mt-1"
              >
                <p className="text-white">{group.description}</p>
                <p className="text-white mt-2"><strong>Example:</strong> {group.example}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

