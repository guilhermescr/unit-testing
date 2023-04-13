type WinningCombinationsResult = [number, number[]][];
type SequencesIndexList = {
  s1: number[];
  s2: number[];
};

interface Sequence {
  symbol: number;
  indexes: number[];
}

function call(symbolLine: number[]): WinningCombinationsResult {
  const payingSymbols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const nonPayingSymbols = [10, 11, 12, 13, 14, 15];
  const wildSymbol = 0;
  const payline: WinningCombinationsResult = [];
  const sequencesIndexes: SequencesIndexList = {
    s1: [],
    s2: []
  };
  let isCombinedWithWildSymbol: Boolean = false;

  function getSequences() {
    let sequenceSymbol = symbolLine[0];
    let sequenceLength = 0;
    let sequences: Sequence[] = [];

    for (let symbolIndex = 0; symbolIndex < symbolLine.length; symbolIndex++) {
      if (nonPayingSymbols.includes(symbolLine[symbolIndex])) {
        sequencesIndexes.s1 = [];
        sequenceSymbol = symbolLine[symbolIndex + 1];
        continue;
      }

      isCombinedWithWildSymbol = symbolLine[symbolIndex] === wildSymbol;

      if (
        symbolLine[symbolIndex] === sequenceSymbol ||
        isCombinedWithWildSymbol ||
        symbolLine[symbolIndex - 1] === wildSymbol
      ) {
        if (symbolLine[symbolIndex] !== wildSymbol) {
          sequenceSymbol = symbolLine[symbolIndex];
        }
        sequenceLength++;

        if (!sequences.length) {
          sequencesIndexes.s1.push(symbolIndex);
        }
      } else {
        // when currentSymbol is not equal to symbolLine[symbolIndex], this code will save the sequence, if sequenceLength is, at least, 3.
        if (sequenceLength >= 3) {
          sequences.push({
            symbol: sequenceSymbol,
            indexes: sequencesIndexes.s1
          });
        }

        if (!sequences.length) {
          sequencesIndexes.s1 = [symbolIndex];
        } else {
          sequencesIndexes.s2 = [symbolIndex];
        }

        sequenceLength = 1;
        sequenceSymbol = symbolLine[symbolIndex];
      }
    }

    /* 
    - If symbolLine is a complete sequence, for example: [5, 5, 5, 5, 5], the code below will save the sequence.
    - The other sequenceLength >= 3 is used when a sequence ends in the middle, while the if below is for a sequence that ends at the end.
    */
    if (sequenceLength >= 3) {
      sequences.push({
        symbol: sequenceSymbol,
        indexes: sequencesIndexes.s1
      });
      // symbolLine.length - 1 is the index of the last symbol in symbolLine array.
    }

    console.log(sequences);
    return sequences;
  }

  const sequences = getSequences();

  if (sequences.length) {
    sequences.forEach(({ symbol, indexes }) => {
      payline.push([symbol, indexes]);
    });
  }

  console.log(`Payline: ${payline}`);
  return payline;
}
export const WinningCombinations = { call };
