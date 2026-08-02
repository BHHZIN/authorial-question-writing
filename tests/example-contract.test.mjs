import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { validateExampleEnvelope } from "../scripts/validate-example-contract.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(path.join(root, "examples", "manifest.json"), "utf8"));

function load(entry) {
  return JSON.parse(readFileSync(path.join(root, "examples", entry.file), "utf8"));
}

function clone(value) {
  return structuredClone(value);
}

function codes(result) {
  return result.issues.map((issue) => issue.code);
}

for (const entry of manifest.examples) {
  test(`${entry.area}: exemplo ${entry.file} cumpre o contrato portátil`, () => {
    const result = validateExampleEnvelope(load(entry), {
      area: entry.area,
      expectedDifficulty: entry.difficulty,
      file: entry.file,
    });
    assert.deepEqual(result.issues, []);
    assert.equal(result.valid, true);
  });
}

for (const entry of manifest.examples) {
  for (const profile of [
    { difficulty: "easy", relations: 2, operations: 2 },
    { difficulty: "medium", relations: 3, operations: 3 },
    { difficulty: "hard", relations: 4, operations: 4 },
  ]) {
    test(`${entry.area}: aceita perfil estrutural ${profile.difficulty}`, () => {
      const envelope = clone(load(entry));
      const response = envelope.responses[0];
      response.difficulty = profile.difficulty;
      response.minimumDependentRelations = profile.relations;
      response.cognitiveOperations = Array.from(
        { length: profile.operations },
        (_, index) => `operação cognitiva ${index + 1}`,
      );
      const result = validateExampleEnvelope(envelope, {
        area: entry.area,
        expectedDifficulty: profile.difficulty,
      });
      assert.equal(result.valid, true, JSON.stringify(result.issues));
    });
  }
}

const baseEntry = manifest.examples[0];

test("rejeita campo de identidade ausente", () => {
  const envelope = clone(load(baseEntry));
  delete envelope.responses[0].packetId;
  const result = validateExampleEnvelope(envelope, {
    area: baseEntry.area,
    expectedDifficulty: baseEntry.difficulty,
  });
  assert.ok(codes(result).includes("missing-field"));
  assert.ok(codes(result).includes("identity-mismatch"));
});

test("rejeita sourceKind genérico no contrato ENtrack", () => {
  const envelope = clone(load(baseEntry));
  envelope.responses[0].factualSupport[0].sourceKind = "synthetic";
  const result = validateExampleEnvelope(envelope, {
    area: baseEntry.area,
    expectedDifficulty: baseEntry.difficulty,
  });
  assert.ok(codes(result).includes("invalid-factual-support"));
});

test("rejeita pista de comprimento no gabarito", () => {
  const envelope = clone(load(baseEntry));
  const response = envelope.responses[0];
  response.options = ["erro curto A", "Esta é uma resposta correta artificialmente longa, detalhada e desproporcional, criada para revelar a alternativa certa sem exigir leitura do suporte.", "erro curto B", "erro curto C", "erro curto D"];
  response.correctIndex = 1;
  response.independentSolution.selectedOption = 1;
  response.independentSolution.defensibleOptionIndexes = [1];
  const result = validateExampleEnvelope(envelope, {
    area: baseEntry.area,
    expectedDifficulty: baseEntry.difficulty,
  });
  assert.ok(codes(result).includes("correct-option-length-cue"));
});

test("rejeita aprovação humana atribuída ao agente", () => {
  const envelope = clone(load(baseEntry));
  envelope.responses[0].reviewed = true;
  const result = validateExampleEnvelope(envelope, {
    area: baseEntry.area,
    expectedDifficulty: baseEntry.difficulty,
  });
  assert.ok(codes(result).includes("invalid-review-state"));
});

test("rejeita duas alternativas defensáveis", () => {
  const envelope = clone(load(baseEntry));
  envelope.responses[0].independentSolution.defensibleOptionIndexes = [0, 1];
  const result = validateExampleEnvelope(envelope, {
    area: baseEntry.area,
    expectedDifficulty: baseEntry.difficulty,
  });
  assert.ok(codes(result).includes("independent-solution-mismatch"));
});

test("rejeita marcador privado no prompt", () => {
  const envelope = clone(load(baseEntry));
  envelope.responses[0].prompt += " [E1]";
  const result = validateExampleEnvelope(envelope, {
    area: baseEntry.area,
    expectedDifficulty: baseEntry.difficulty,
  });
  assert.ok(codes(result).includes("visible-internal-evidence-id"));
});

test("rejeita perfil incompatível com a dificuldade", () => {
  const envelope = clone(load(baseEntry));
  envelope.responses[0].difficulty = "easy";
  envelope.responses[0].minimumDependentRelations = 3;
  const result = validateExampleEnvelope(envelope, {
    area: baseEntry.area,
    expectedDifficulty: "easy",
  });
  assert.ok(codes(result).includes("difficulty-profile-mismatch"));
});

test("rejeita referência factual real sem URL", () => {
  const history = manifest.examples.find((entry) => entry.area === "humanities");
  const envelope = clone(load(history));
  envelope.responses[0].factualSupport[0].sourceLabel = "Fonte primária não identificada";
  const result = validateExampleEnvelope(envelope, {
    area: history.area,
    expectedDifficulty: history.difficulty,
  });
  assert.ok(codes(result).includes("missing-source-url"));
});
