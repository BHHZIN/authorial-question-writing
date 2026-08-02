export const SCHEMA_VERSION = "entrack-authorial-question/1.2.0";

export const REQUIRED_FIELDS = Object.freeze([
  "schemaVersion",
  "packetId",
  "questionId",
  "reviewed",
  "difficulty",
  "matrixReference",
  "prompt",
  "options",
  "correctIndex",
  "explanation",
  "optionRationales",
  "evidenceIds",
  "cognitiveOperations",
  "minimumDependentRelations",
  "solutionPathSignature",
  "expectedMisconceptions",
  "uniqueSolutionAssumptions",
  "factualSupport",
  "media",
  "densityException",
  "independentSolution",
  "stimulusDependency",
]);

export const SOURCE_KINDS = Object.freeze([
  "entrack-simulated",
  "primary-source",
  "public-domain-source",
]);

export const DIFFICULTY_RUBRIC = Object.freeze({
  easy: Object.freeze({ minimumRelations: 1, maximumRelations: 2, minimumOperations: 1, maximumOperations: 2 }),
  medium: Object.freeze({ minimumRelations: 2, maximumRelations: 3, minimumOperations: 2, maximumOperations: 3 }),
  hard: Object.freeze({ minimumRelations: 3, maximumRelations: Number.POSITIVE_INFINITY, minimumOperations: 3, maximumOperations: Number.POSITIVE_INFINITY }),
});

export const AREA_WORD_LIMITS = Object.freeze({
  languages: Object.freeze({ minimum: 60, maximum: 300 }),
  humanities: Object.freeze({ minimum: 40, maximum: 220 }),
  mathematics: Object.freeze({ minimum: 30, maximum: 190 }),
  nature: Object.freeze({ minimum: 30, maximum: 200 }),
});
