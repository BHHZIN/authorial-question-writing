import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { REQUIRED_FIELDS, SCHEMA_VERSION, SOURCE_KINDS } from "./entrack-contract.mjs";

function parseArguments(argv) {
  const index = argv.indexOf("--entrack-root");
  if (index === -1 || !argv[index + 1]) {
    throw new Error("Use --entrack-root <caminho para entrack-app>.");
  }
  return path.resolve(argv[index + 1]);
}

function runNode(script, args, cwd) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
  if (result.status !== 0) {
    throw new Error([result.stdout, result.stderr].filter(Boolean).join("\n").trim());
  }
  return result;
}

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const entrackRoot = parseArguments(process.argv.slice(2));
const manifest = JSON.parse(readFileSync(path.join(skillRoot, "examples", "manifest.json"), "utf8"));
const workingDirectory = mkdtempSync(path.join(tmpdir(), "authorial-skill-entrack-"));

try {
  for (const entry of manifest.examples) {
    const packetPath = path.join(workingDirectory, `${entry.area}-${entry.difficulty}-packets.json`);
    runNode(path.join(entrackRoot, "scripts", "prepare-authorial-question-packets.mjs"), [
      "--difficulty", entry.difficulty,
      "--subject", entry.subject,
      "--topic", entry.topic,
      "--count", "1",
      "--visual", "none",
      "--generated-at", entry.generatedAt,
      "--output", packetPath,
    ], entrackRoot);
    const packetEnvelope = JSON.parse(readFileSync(packetPath, "utf8"));
    const packet = packetEnvelope.packets?.[0];
    if (packetEnvelope.schemaVersion !== SCHEMA_VERSION) {
      throw new Error(`Drift de schema detectado em ${entry.file}: ${packetEnvelope.schemaVersion}.`);
    }
    if (JSON.stringify(packet?.outputContract?.requiredFields) !== JSON.stringify(REQUIRED_FIELDS)) {
      throw new Error(`Drift de requiredFields detectado em ${entry.file}.`);
    }
    const fieldGuide = packet?.outputContract?.fieldGuide?.factualSupport ?? "";
    if (SOURCE_KINDS.some((sourceKind) => !fieldGuide.includes(sourceKind))) {
      throw new Error(`Drift de sourceKind detectado em ${entry.file}.`);
    }
    runNode(path.join(entrackRoot, "scripts", "validate-authorial-question-responses.mjs"), [
      "--packets", packetPath,
      "--responses", path.join(skillRoot, "examples", entry.file),
      "--asset-root", path.join(entrackRoot, "public"),
    ], entrackRoot);
    process.stdout.write(`VÁLIDO NO ENTRACK · ${entry.file}\n`);
  }
} finally {
  rmSync(workingDirectory, { recursive: true, force: true });
}

process.stdout.write(`${manifest.examples.length} exemplos aprovados pelo validador real do ENtrack.\n`);
