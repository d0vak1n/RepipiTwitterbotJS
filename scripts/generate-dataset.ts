// Script helper para convertir el dataset completo a formato JSON
// Ejecuta esto localmente para generar el dataset completo

import fs from "fs";
import path from "path";

const datasetDir = path.join(__dirname, "../../../dataset");
const outputFile = path.join(__dirname, "words-dataset.ts");

function readDatasetFile(filename: string): string[] {
  const filePath = path.join(datasetDir, filename);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const content = fs.readFileSync(filePath, "utf-8");
  return content.split(/\r?\n/).filter((word) => word.trim() !== "");
}

const allCountries = [
  "ARG",
  "BOL",
  "CHL",
  "COL",
  "CRI",
  "CUB",
  "DOM",
  "ECU",
  "ESP",
  "GNQ",
  "GTM",
  "HND",
  "MEX",
  "NIC",
  "PAN",
  "PER",
  "PRI",
  "PRY",
  "SLV",
  "URY",
  "VEN",
];

let allWords: string[] = [];

allCountries.forEach((country) => {
  const words = readDatasetFile(`${country}.txt`);
  allWords = [...allWords, ...words];
});

// Remover duplicados
allWords = [...new Set(allWords)];

const output = `// Dataset generado automáticamente desde los archivos .txt
// Total de palabras: ${allWords.length}

export const WORDS_DATASET: string[] = ${JSON.stringify(allWords, null, 2)};
`;

fs.writeFileSync(outputFile, output, "utf-8");

console.log(`✅ Dataset generado con ${allWords.length} palabras únicas`);
console.log(`📁 Archivo: ${outputFile}`);
