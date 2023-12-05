const fs = require("fs");

fs.readFile("data.txt", "utf-8", (err, data) => {
  let dataArray = data.split("\n");
  let firstAndLastNum = dataArray.map(findFirstAndLastNumber);
  let together = firstAndLastNum.map(addPairs);
  let final = together.reduce((acc, current) => acc + current, 0);
  console.log(firstAndLastNum);
});

function findFirstAndLastNumber(string) {
  let matches = string.match(/\d/g);

  if (!matches) {
    return [null, null];
  } else if (matches.length === 1) {
    return [parseInt(matches[0]), parseInt(matches[0])];
  } else {
    return [parseInt(matches[0]), parseInt(matches[matches.length - 1])];
  }
}

function addPairs(pair) {
  return (pair[0] || 0) + (pair[1] || 0);
}

let array = ["string1", "test24text3", "123sample456"];
let firstAndLastNumbers = array.map(findFirstAndLastNumber);
