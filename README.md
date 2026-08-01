# Authorial Question Writing

Skill global do Codex para criar e revisar questões educacionais autorais, inéditas e auditáveis — especialmente itens de múltipla escolha no estilo ENEM.

## O que a skill faz

- parte do objetivo de aprendizagem e constrói o suporte por evidências;
- cria comandos que exigem leitura, interpretação ou resolução;
- produz um gabarito único e distratores baseados em erros plausíveis;
- registra explicação, justificativas das alternativas e concepções equivocadas esperadas;
- verifica originalidade, fatos, fontes, licenças, acessibilidade e dependência do suporte;
- adapta a saída a contratos JSON locais, incluindo o fluxo autoral do ENtrack;
- mantém a aprovação humana separada da validação mecânica.

## Instalação

Para disponibilizar a skill ao Codex, clone este repositório para o diretório global de skills:

```powershell
git clone https://github.com/BHHZIN/authorial-question-writing.git `
  "$env:USERPROFILE\.codex\skills\authorial-question-writing"
```

Se a pasta já existir, atualize-a com `git pull` ou copie o conteúdo para o diretório de skills do Codex.

## Uso

Invoque a skill diretamente:

```text
Use $authorial-question-writing para criar uma questão inédita de inglês sobre leitura em contexto, com cinco alternativas, gabarito, justificativas e revisão de unicidade.
```

O agente deve ler primeiro qualquer contrato, pacote JSON, matriz, schema ou validador fornecido pelo projeto. Quando estiver no ENtrack, a documentação local do fluxo autoral continua sendo a fonte de verdade para IDs, campos, dificuldade e release.

## Estrutura

```text
SKILL.md                         # instruções principais da skill
agents/openai.yaml               # metadados para a interface do Codex
references/quality-rubric.md     # rubrica de auditoria e unicidade
```

## Limites

Esta skill cria rascunhos autorais e orienta sua auditoria. Ela não declara aprovação pedagógica, validade psicométrica, autorização de direitos autorais ou publicação em produção. Conteúdo que será usado por estudantes deve passar por revisão humana e pelos validadores do projeto.
