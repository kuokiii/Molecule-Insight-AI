export function calculateMolecularWeight(formula: string): number {
  const atomicWeights: { [key: string]: number } = {
    H: 1.008, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Cl: 35.45, Br: 79.904, I: 126.90, S: 32.06, P: 30.97
  };

  let weight = 0;
  const atoms = formula.match(/([A-Z][a-z]?)(\d*)/g) || [];
  
  atoms.forEach(atom => {
    const [, element, count] = atom.match(/([A-Z][a-z]?)(\d*)/) || [];
    weight += (atomicWeights[element] || 0) * (count ? parseInt(count) : 1);
  });

  return weight;
}


  