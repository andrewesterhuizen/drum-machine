const fs = require("fs");

const kits = {};

const kitDirs = fs.readdirSync("public/samples").filter(f => f !== ".DS_Store");

kitDirs.forEach(kitDir => {
  kits[kitDir] = fs.readdirSync("public/samples/" + kitDir).filter(f => f !== ".DS_Store");
});

fs.writeFileSync("src/samples.json", JSON.stringify(kits));
