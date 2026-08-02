import {
  AREA_WORD_LIMITS,
  DIFFICULTY_RUBRIC,
  REQUIRED_FIELDS,
  SCHEMA_VERSION,
  SOURCE_KINDS,
} from "./entrack-contract.mjs";

function normalized(value) {
  return typeof value === "string"
    ? value.normalize("NFC").replace(/\s+/gu, " ").trim()
    : "";
}

function wordCount(value) {
  const text = normalized(value);
  return text ? text.split(" ").length : 0;
}

function issue(issues, code, detail) {
  issues.push({ code, detail });
}

function validateDifficulty(response, expectedDifficulty, issues) {
  if (response.difficulty !== expectedDifficulty) {
    issue(issues, "difficulty-mismatch", `Esperada ${expectedDifficulty}; recebida ${response.difficulty}.`);
  }
  const rubric = DIFFICULTY_RUBRIC[response.difficulty];
  if (!rubric) {
    issue(issues, "invalid-difficulty", "A dificuldade deve ser easy, medium ou hard.");
    return;
  }
  const operationCount = Array.isArray(response.cognitiveOperations)
    ? response.cognitiveOperations.length
    : 0;
  if (
    !Number.isInteger(response.minimumDependentRelations)
    || response.minimumDependentRelations < rubric.minimumRelations
    || response.minimumDependentRelations > rubric.maximumRelations
    || operationCount < rubric.minimumOperations
    || operationCount > rubric.maximumOperations
  ) {
    issue(issues, "difficulty-profile-mismatch", "Operações ou relações não correspondem à dificuldade.");
  }
}

function validateOptions(response, issues) {
  if (!Array.isArray(response.options) || response.options.length !== 5) {
    issue(issues, "invalid-options", "São obrigatórias cinco alternativas.");
    return;
  }
  const options = response.options.map(normalized);
  if (options.some((option) => !option) || new Set(options.map((option) => option.toLocaleLowerCase("pt-BR"))).size !== 5) {
    issue(issues, "duplicate-options", "Alternativas devem ser preenchidas e distintas.");
  }
  if (!Number.isInteger(response.correctIndex) || response.correctIndex < 0 || response.correctIndex > 4) {
    issue(issues, "invalid-answer", "correctIndex deve apontar para uma alternativa.");
    return;
  }
  const lengths = options.map((option) => option.length);
  const correctLength = lengths[response.correctIndex];
  const longestDistractor = Math.max(...lengths.filter((_, index) => index !== response.correctIndex));
  if (
    correctLength - longestDistractor >= 20
    && correctLength / Math.max(1, longestDistractor) >= 1.5
  ) {
    issue(issues, "correct-option-length-cue", "O gabarito está desproporcionalmente mais longo.");
  }
}

function validateEvidence(response, issues) {
  if (!Array.isArray(response.evidenceIds) || response.evidenceIds.length === 0) {
    issue(issues, "missing-evidence", "evidenceIds deve declarar evidências indispensáveis.");
    return;
  }
  for (const evidenceId of response.evidenceIds) {
    if (!normalized(response.explanation).includes(`[${evidenceId}]`)) {
      issue(issues, "uncited-evidence", `A explicação não cita [${evidenceId}].`);
    }
  }
  if (/\[E\d+\]/u.test(normalized(response.prompt))) {
    issue(issues, "visible-internal-evidence-id", "O prompt expõe marcador privado de evidência.");
  }
}

function validateSources(response, issues) {
  if (!Array.isArray(response.factualSupport) || response.factualSupport.length === 0) {
    issue(issues, "missing-factual-support", "factualSupport deve conter ao menos uma entrada.");
    return;
  }
  for (const support of response.factualSupport) {
    if (
      !normalized(support?.claim)
      || !normalized(support?.sourceLabel)
      || !SOURCE_KINDS.includes(support?.sourceKind)
    ) {
      issue(issues, "invalid-factual-support", "Fonte factual vazia ou sourceKind incompatível com ENtrack.");
    }
    if (
      support?.sourceKind !== "entrack-simulated"
      && !/^https:\/\//u.test(normalized(support?.sourceLabel))
      && !/https:\/\//u.test(normalized(support?.sourceLabel))
    ) {
      issue(issues, "missing-source-url", "Fonte real deve registrar URL HTTPS no sourceLabel.");
    }
  }
}

function validatePrivateChecks(response, issues) {
  const independent = response.independentSolution;
  if (
    !independent
    || independent.selectedOption !== response.correctIndex
    || !normalized(independent.reasoning)
    || !normalized(independent.checkedBy)
    || !Array.isArray(independent.defensibleOptionIndexes)
    || independent.defensibleOptionIndexes.length !== 1
    || independent.defensibleOptionIndexes[0] !== response.correctIndex
  ) {
    issue(issues, "independent-solution-mismatch", "A resolução independente não confirma um único gabarito.");
  }
  const dependency = response.stimulusDependency;
  if (
    !dependency
    || dependency.solvableWithoutStimulus !== false
    || !normalized(dependency.removalEffect)
    || !Array.isArray(dependency.necessaryEvidenceIds)
    || dependency.necessaryEvidenceIds.length === 0
    || dependency.necessaryEvidenceIds.some((id) => !response.evidenceIds?.includes(id))
  ) {
    issue(issues, "stimulus-independent-command", "A dependência do suporte não foi demonstrada.");
  }
}

export function validateExampleEnvelope(envelope, {
  area,
  expectedDifficulty,
  file = "example",
} = {}) {
  const issues = [];
  if (envelope?.schemaVersion !== SCHEMA_VERSION || !Array.isArray(envelope?.responses)) {
    issue(issues, "invalid-envelope", "Envelope ou schemaVersion inválido.");
    return { file, valid: false, issues };
  }
  if (envelope.responses.length !== 1) {
    issue(issues, "invalid-response-count", "Cada exemplo deve conter exatamente uma resposta.");
    return { file, valid: false, issues };
  }
  const response = envelope.responses[0];
  for (const field of REQUIRED_FIELDS) {
    if (!Object.hasOwn(response, field)) issue(issues, "missing-field", `Campo obrigatório ausente: ${field}.`);
  }
  if (response.schemaVersion !== SCHEMA_VERSION) issue(issues, "identity-mismatch", "Schema da resposta diverge do envelope.");
  if (!normalized(response.packetId) || !normalized(response.questionId)) issue(issues, "identity-mismatch", "packetId e questionId são obrigatórios.");
  if (response.reviewed !== false) issue(issues, "invalid-review-state", "Resposta de agente deve manter reviewed=false.");
  if (!normalized(response.prompt)) issue(issues, "empty-prompt", "O prompt está vazio.");
  if (!normalized(response.explanation)) issue(issues, "empty-explanation", "A explicação está vazia.");
  if (response.matrixReference?.area !== area) issue(issues, "matrix-area-mismatch", "Área da matriz diverge do manifesto.");
  if (!/^https:\/\//u.test(normalized(response.matrixReference?.sourceUrl)) || !/^[a-f0-9]{64}$/u.test(response.matrixReference?.sourceSha256 ?? "")) {
    issue(issues, "invalid-matrix-reference", "Referência da matriz exige URL e SHA-256.");
  }
  validateDifficulty(response, expectedDifficulty, issues);
  validateOptions(response, issues);
  if (
    !Array.isArray(response.optionRationales)
    || response.optionRationales.length !== 5
    || response.optionRationales.some((rationale) => !normalized(rationale))
    || new Set(response.optionRationales.map(normalized)).size !== 5
  ) {
    issue(issues, "invalid-rationales", "São necessárias cinco justificativas distintas.");
  }
  validateEvidence(response, issues);
  if (!Array.isArray(response.expectedMisconceptions) || response.expectedMisconceptions.length !== 4) {
    issue(issues, "invalid-misconceptions", "São necessários quatro erros esperados.");
  }
  if (!Array.isArray(response.uniqueSolutionAssumptions) || response.uniqueSolutionAssumptions.length < 2) {
    issue(issues, "invalid-solution-assumptions", "São necessárias ao menos duas premissas de unicidade.");
  }
  validateSources(response, issues);
  if (!Array.isArray(response.media)) issue(issues, "invalid-media", "media deve ser array.");
  const limits = AREA_WORD_LIMITS[area];
  const accessibleWords = wordCount([
    response.prompt,
    ...(Array.isArray(response.media) ? response.media.flatMap((media) => [media?.alt, media?.caption]) : []),
  ].join(" "));
  if (limits && (accessibleWords < limits.minimum || accessibleWords > limits.maximum) && !normalized(response.densityException)) {
    issue(issues, "density-exception-required", `Prompt acessível tem ${accessibleWords} palavras.`);
  }
  validatePrivateChecks(response, issues);
  return { file, valid: issues.length === 0, issues };
}
