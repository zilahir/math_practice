import { shuffle } from "lodash";

function createRandomExam(itemsTemp, capacity) {
  const items = shuffle(itemsTemp);
  let idxItem;
  let idxWeight;
  let newMax;
  let oldMax;

  const numItems = items.length;
  const weightMatrix = new Array(numItems + 1);
  const keepMatrix = new Array(numItems + 1);
  const solutionSet = [];

  // Setup matrices
  for (idxItem = 0; idxItem < numItems + 1; idxItem += 1) {
    weightMatrix[idxItem] = new Array(capacity + 1);
    keepMatrix[idxItem] = new Array(capacity + 1);
  }

  // Build weightMatrix from [0][0] -> [numItems-1][capacity-1]
  for (idxItem = 0; idxItem <= numItems; idxItem += 1) {
    for (idxWeight = 0; idxWeight <= capacity; idxWeight += 1) {
      // Fill top row and left column with zeros
      if (idxItem === 0 || idxWeight === 0) {
        weightMatrix[idxItem][idxWeight] = 0;
      }

      // If item will fit, decide if there's greater value in keeping it,
      // or leaving it
      else if (items[idxItem - 1].w <= idxWeight) {
        newMax =
          items[idxItem - 1].b +
          weightMatrix[idxItem - 1][idxWeight - items[idxItem - 1].w];
        oldMax = weightMatrix[idxItem - 1][idxWeight];

        // Update the matrices
        if (newMax > oldMax) {
          weightMatrix[idxItem][idxWeight] = newMax;
          keepMatrix[idxItem][idxWeight] = 1;
        } else {
          weightMatrix[idxItem][idxWeight] = oldMax;
          keepMatrix[idxItem][idxWeight] = 0;
        }
      }

      // Else, item can't fit; value and weight are the same as before
      else {
        weightMatrix[idxItem][idxWeight] = weightMatrix[idxItem - 1][idxWeight];
      }
    }
  }

  // Traverse through keepMatrix ([numItems][capacity] -> [1][?])
  // to create solutionSet
  idxWeight = capacity;
  idxItem = numItems;
  for (idxItem; idxItem > 0; idxItem -= 1) {
    if (keepMatrix[idxItem][idxWeight] === 1) {
      solutionSet.push(items[idxItem - 1]);
      idxWeight -= items[idxItem - 1].w;
    }
  }
  return { maxValue: weightMatrix[numItems][capacity], set: solutionSet };
}

export default createRandomExam;
