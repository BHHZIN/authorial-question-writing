import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateExampleEnvelope } from "./validate-example-contract.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(path.join(root, "examples", "manifest.json"), "utf8"));
const decoder = new TextDecoder("utf-8", { fatal: true });
const results = [];

for (const entry of manifest.examples) {
  const filePath = path.join(root, "examples", entry.file);
  const bytes = readFileSync(filePath);
  let envelope;
  try {
    envelope = JSON.parse(decoder.decode(bytes));
  } catch (error) {
    results.push({
      file: entry.file,
      valid: false,
      issues: [{ code: "invalid-utf8-or-json", detail: error.message }],
    });
    continue;
  }
  results.push(validateExampleEnvelope(envelope, {
    area: entry.area,
    expectedDifficulty: entry.difficulty,
    file: entry.file,
  }));
}

const textExtensions = new Set([".json", ".md", ".mjs", ".yaml", ".yml"]);
const repositoryTextFiles = readdirSync(root, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => path.relative(root, path.join(entry.parentPath, entry.name)))
  .filter((relativeFile) => !relativeFile.startsWith(`.git${path.sep}`))
  .filter((relativeFile) => textExtensions.has(path.extname(relativeFile)));

for (const relativeFile of repositoryTextFiles) {
  try {
    const content = decoder.decode(readFileSync(path.join(root, relativeFile)));
    if (/\uFFFD|\u00C3[\u00A3\u00A1\u00A2\u00A9\u00AA\u00A7\u00B5\u00BA]|\u00C2[\u00BA\u00AA]|\u00E2[\u20AC\u201D\u2019]/u.test(content)) {
      results.push({
        file: relativeFile,
        valid: false,
        issues: [{ code: "mojibake", detail: "Sequência típica de texto UTF-8 decodificado incorretamente." }],
      });
    }
  } catch (error) {
    results.push({
      file: relativeFile,
      valid: false,
      issues: [{ code: "invalid-utf8", detail: error.message }],
    });
  }
}

const invalid = results.filter((result) => !result.valid);
for (const result of results) {
  if (result.valid) process.stdout.write(`VÁLIDO · ${result.file}\n`);
  else {
    process.stdout.write(`INVÁLIDO · ${result.file}\n`);
    for (const entry of result.issues) process.stdout.write(`  ${entry.code}: ${entry.detail}\n`);
  }
}

if (invalid.length > 0) process.exitCode = 1;
else process.stdout.write(`${manifest.examples.length} exemplos válidos no contrato portátil.\n`);
