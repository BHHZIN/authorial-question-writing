# Authorial Question Writing

Skill do Codex para criar e revisar questões educacionais autorais, inéditas e auditáveis, com integração validada ao workflow do ENtrack.

## Capacidades

- constrói itens a partir de objetivo, suporte e evidências;
- produz gabarito único e distratores diagnósticos;
- separa modo ENEM em língua estrangeira de aprendizagem de idioma;
- verifica fatos, direitos, acessibilidade, equidade e adequação a menores;
- confere cálculos, unidades, arredondamento e consistência dimensional;
- mantém validação, revisão humana e pré-teste como gates separados;
- valida exemplos contra um contrato portátil e, quando disponível, contra o validador real do ENtrack.

## Instalação

```powershell
git clone https://github.com/BHHZIN/authorial-question-writing.git `
  "$env:USERPROFILE\.codex\skills\authorial-question-writing"
```

Uso direto:

```text
Use $authorial-question-writing para criar uma questão autoral inédita de Matemática, com cinco alternativas, resolução independente e auditoria de unidades.
```

## Validação

Requer Node.js 20 ou superior.

```powershell
npm test
npm run validate:examples
```

Para executar todos os exemplos contra o validador real de uma cópia local do ENtrack:

```powershell
npm run validate:entrack -- --entrack-root "C:\caminho\para\entrack-app"
```

## Exemplos

- `examples/english-reading-question.json`: língua estrangeira no modo ENEM;
- `examples/brazil-empire-question.json`: História com suporte factual primário;
- `examples/mathematics-units-rounding-question.json`: cálculo, conversão, unidades e arredondamento;
- `examples/nature-dimensional-analysis-question.json`: Cinemática, unidades e precisão.

Todos permanecem com `reviewed: false`. Eles demonstram contrato e auditoria, não aprovação pedagógica nem validade psicométrica.

## Desenvolvimento

- `SKILL.md`: fluxo essencial carregado pelo agente;
- `references/`: integração ENtrack e rubrica editorial;
- `scripts/`: validação portátil e integração real;
- `tests/`: casos positivos e negativos, incluindo as quatro áreas e três dificuldades.

Consulte `VERSION` e `CHANGELOG.md` para o estado da versão. O projeto é distribuído sob a licença MIT.
