// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimanNum, dna) => {
  return {
    specimanNum,
    dna,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA(otherOrg) {
      const similarities = this.dna.reduce((acc, curr, idx, arr) => {
        if (arr[idx] === otherOrg.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
      const percentOfDNAshared = (similarities / this.dna.length) * 100;
      const percentageTo2Deci = percentOfDNAshared.toFixed(2);
      console.log(
        `${this.specimanNum} and ${otherOrg.specimanNum} have ${percentageTo2Deci}% DNA in common`
      );
    },
    //  return true if the objects DNA contains at least 60% 'C' or 'G' bases. else return false.
    willLikelySurvive() {
      const cOrG = this.dna.filter((el) => el === "C" || el === "G");
      //  return if their value is greater than or equal to 60%
      return cOrG.length / this.dna.length >= 0.6;
    },
  };
};

const survivingSpecies = [];
let idCounter = 1;
while (survivingSpecies.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecies.push(newOrg);
  }
  idCounter++;
}
console.log(survivingSpecies);

// console.log(pAequorFactory(1, mockUpStrand()).willLikelySurvive())
