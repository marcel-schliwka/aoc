const fs = require("fs");

function processLine(line) {
  const parts = line.split(": ");
  const gameId = parseInt(parts[0].split(" ")[1]);
  const rounds = parts[1].split("; ");

  const bagCapacity = { red: 12, green: 13, blue: 14 };

  for (const round of rounds) {
    const cubes = round.split(", ");
    for (const cube of cubes) {
      const [count, color] = cube.split(" ");
      if (parseInt(count) > bagCapacity[color]) {
        return 0;
      }
    }
  }
  return gameId;
}

function calculateMinimumCubes(rounds) {
  let minRed = 0,
    minGreen = 0,
    minBlue = 0;

  for (const round of rounds) {
    let red = 0,
      green = 0,
      blue = 0;
    const cubes = round.split(", ");

    for (const cube of cubes) {
      const [count, color] = cube.split(" ");
      switch (color) {
        case "red":
          red += parseInt(count);
          break;
        case "green":
          green += parseInt(count);
          break;
        case "blue":
          blue += parseInt(count);
          break;
      }
    }

    minRed = Math.max(minRed, red);
    minGreen = Math.max(minGreen, green);
    minBlue = Math.max(minBlue, blue);
  }

  return { minRed, minGreen, minBlue };
}

function calculatePower(red, green, blue) {
  return red * green * blue;
}

function processFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    const lines = data.trim().split("\n");
    let totalPower = 0;

    lines.forEach((line) => {
      const parts = line.split(": ");
      const rounds = parts[1].split("; ");

      // Berechnen der minimalen Anzahl von Würfeln für jedes Spiel
      const { minRed, minGreen, minBlue } = calculateMinimumCubes(rounds);

      // Berechnen der Power für dieses Spiel und zum Gesamtwert hinzufügen
      totalPower += calculatePower(minRed, minGreen, minBlue);
    });

    console.log("Total Power of all games:", totalPower);
  });
}

processFile("data.txt");
