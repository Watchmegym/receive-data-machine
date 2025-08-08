'use strict';

const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

async function main() {
  const pdfPath = process.argv[2];
  if (!pdfPath) {
    console.error('Uso: node extract-protocol.js <arquivo.pdf>');
    process.exit(1);
  }
  const resolved = path.resolve(pdfPath);
  const dataBuffer = fs.readFileSync(resolved);
  const data = await pdf(dataBuffer);
  // imprime texto extraído
  console.log(data.text);
}

main().catch((err) => {
  console.error('Falha ao ler PDF:', err && err.message ? err.message : err);
  process.exit(1);
});