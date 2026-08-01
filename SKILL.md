---
name: authorial-question-writing
description: "Criar e revisar questões educacionais autorais inéditas, especialmente itens de múltipla escolha no estilo ENEM, com suporte contextualizado, comando verificável, gabarito único, distratores diagnósticos, justificativas, dificuldade e controle de fontes e licenças. Usar quando Codex precisar elaborar, adaptar sem copiar, auditar ou devolver questões em texto ou JSON para bancos, simulados, trilhas ou avaliações."
---

# Autor de Questões Autorais

Tratar cada questão como um artefato pedagógico completo: o estudante deve ler o suporte, selecionar evidências, executar a operação intelectual pedida e encontrar uma única resposta defensável. Produzir conteúdo original, auditável e pronto para revisão humana; não prometer aprovação, validade psicométrica ou autorização de publicação.

## Fixar o contrato antes de escrever

1. Ler o pedido, os anexos e o contrato local inteiro antes de redigir. Identificar:
   - público, idioma, área, disciplina, tópico e objetivo de aprendizagem;
   - exame ou padrão de referência, se houver;
   - dificuldade, quantidade de alternativas, formato de saída e campos obrigatórios;
   - necessidade de texto, tabela, gráfico, imagem ou outro recurso;
   - restrições de fonte, licença, uso de dados e revisão.
2. Priorizar o contrato fornecido pelo usuário, pelo pacote JSON ou pelo repositório. Não inventar nomes de campos, IDs, matriz, dificuldade ou regras de release quando houver uma especificação local.
3. Quando uma decisão ausente mudar materialmente o item — por exemplo, público, objetivo, formato, nível ou permissão de uso — fazer uma pergunta curta. Caso a lacuna seja segura, assumir explicitamente um valor mínimo e registrá-lo como hipótese.
4. Não reproduzir questão oficial, apostila, livro, site, imagem ou alternativa. Usar referências apenas para estudar arquitetura cognitiva e criar cenário, números, texto, personagens, dados e caminho de resolução novos.

Quando o trabalho estiver dentro do ENtrack, ler antes de gerar: `docs/product/Authorial-Question-Workflow.md`, o blueprint ou pacote de questões correspondente e os tipos/validadores próximos em `features/learning-trails/`. Em especial, obedecer `outputContract`, `fieldGuide`, `difficultyRubric` e `uniquenessRegistry` recebidos. A especificação local é a fonte de verdade; esta skill não a substitui.

## Construir a questão por evidências

Seguir esta cadeia, sem pular do tópico diretamente para as alternativas:

`objetivo → suporte → evidências → comando → caminho de resolução → alternativas → auditoria`

### Escolher a arquitetura do suporte

- **Linguagens e idiomas:** escrever texto, fala, anúncio, poema, narrativa ou situação comunicativa autoral com voz, contexto, gênero e informação suficientes para interpretação. Basear vocabulário, sintaxe ou sentido no uso concreto, não em uma frase isolada.
- **Ciências Humanas:** apresentar documento, processo, caso, conflito ou conjunto de fontes situado no tempo e no espaço, com agente, ponto de vista ou relação social identificável. Limitar a conclusão ao que as evidências sustentam.
- **Matemática:** descrever uma situação-problema plausível, definir grandezas, unidades, dados e condições. Fazer o contexto carregar a modelagem; não alongar a narrativa sem acrescentar informação necessária.
- **Ciências da Natureza:** apresentar fenômeno, experimento, aplicação ou decisão técnica com variáveis, condições, observações e limites claros. Exigir a relação científica que o objetivo pretende avaliar.

Fazer o suporte responder: “que evidência o estudante precisa localizar, relacionar ou transformar?”. Se a questão puder ser resolvida só pelo tópico, por memória solta ou pela alternativa mais longa, reescrever o suporte ou o comando.

### Preservar originalidade e integridade factual

1. Criar uma combinação nova de situação, voz, dados, valores, ordem das informações e caminho de resolução. Não fazer paráfrase superficial de um item existente.
2. Preferir autoria própria: `Fonte: autoria própria; conteúdo original e dados simulados.` No ENtrack, usar o rótulo institucional definido pelo contrato local.
3. Para fatos reais, separar o que é verificável do que é simulado. Verificar afirmações atuais ou específicas quando necessário; sem fonte confiável, substituir por dado sintético claramente marcado ou deixar o item pendente.
4. Usar fonte externa somente com domínio público, CC0, licença compatível ou autorização escrita verificável. Registrar autor, título, instituição, data, URL, licença/autorização e data de acesso. Página pública não significa permissão de reprodução.
5. Se houver mídia, criá-la ou usar somente ativo com origem e licença comprovadas. Fornecer texto alternativo que carregue a informação essencial; não usar imagem decorativa para simular complexidade.

## Escrever comando e alternativas

### Formular o comando

Escrever uma frase direta, autônoma e observável que obrigue a usar o suporte. Preferir verbos como analisar, relacionar, inferir, explicar, avaliar, comparar ou calcular. Delimitar a relação que deve ser construída e o que a resposta precisa concluir.

Evitar:

- “qual é a alternativa correta?” sem objeto intelectual;
- comando que apenas repete o suporte;
- pergunta respondível sem ler os dados;
- opinião aberta quando o suporte permite uma conclusão verificável;
- pegadinha baseada em negação, ambiguidade gramatical ou detalhe irrelevante.

### Escrever as alternativas

Para itens no estilo ENEM/ENtrack, escrever exatamente cinco alternativas: um gabarito e quatro distratores. Se um contrato local exigir outra quantidade, obedecer ao contrato e registrar a exceção.

- Fazer todas as alternativas responderem ao mesmo comando, com paralelismo gramatical, unidade, escopo e extensão semelhantes.
- Garantir um único gabarito defensável pelo suporte. Não depender de interpretação benevolente, informação ausente ou conhecimento não anunciado.
- Construir cada distrator a partir de um erro plausível e diferente: omitir evidência, inverter causa e efeito, escolher uma relação verdadeira mas irrelevante, usar unidade/operação/denominador incorreto, parar em uma etapa intermediária, extrapolar a fonte ou confundir conceitos próximos.
- Explicar por que cada distrator parece atraente e exatamente onde falha. Nunca usar alternativa absurda, parcialmente correta, semanticamente sobreposta ou refutada por detalhe que o estudante não poderia conhecer.
- Remover pistas de forma: posição do gabarito, comprimento, precisão numérica, tom, concordância, vocabulário técnico ou padrão de pontuação.

## Resolver e auditar antes de entregar

1. Esconder o gabarito e resolver a questão do zero, usando apenas o suporte, as regras fornecidas e o conhecimento permitido pelo objetivo.
2. Anotar evidências decisivas, operações cognitivas, premissas, unidades e etapas intermediárias. Conferir cálculo, sinais, arredondamento, causalidade, cronologia e consistência dimensional quando aplicável.
3. Testar remoção do suporte: se ele sair, a resposta deve deixar de ser determinável. Se não deixar, acrescentar evidência útil ou mudar o comando.
4. Comparar o caminho de resolução e a assinatura de unicidade com o banco fornecido. Reescrever o item se o contexto, os números, as respostas ou o caminho forem duplicados ou quase duplicados.
5. Classificar dificuldade pelo raciocínio, não pelo tamanho do texto:
   - **fácil:** uma relação central, dados explícitos e até duas operações ou inferências diretas;
   - **média:** seleção de evidências e combinação de duas ou três relações/etapas dependentes;
   - **difícil:** integração de pelo menos três relações, representações ou restrições concorrentes.
6. Produzir explicação do gabarito, rationale individual das cinco alternativas e quatro `expectedMisconceptions` na ordem dos distratores. A explicação deve ensinar o caminho, não apenas declarar a letra.
7. Marcar `reviewed: false` ou o equivalente do contrato. Validação mecânica não é revisão pedagógica; não aprovar, publicar, promover ao catálogo ou alterar arquivos de release sem autorização explícita.

## Entregar no formato correto

Se o usuário não fornecer schema, entregar um objeto ou tabela com, no mínimo:

```json
{
  "subject": "...",
  "topic": "...",
  "objective": "...",
  "difficulty": "easy|medium|hard",
  "prompt": "texto-base, fonte e comando",
  "options": ["A", "B", "C", "D", "E"],
  "correctIndex": 0,
  "explanation": "caminho de resolução",
  "optionRationales": ["...", "...", "...", "...", "..."],
  "expectedMisconceptions": ["...", "...", "...", "..."],
  "evidenceIds": ["E1"],
  "factualSupport": [{"claim": "...", "sourceKind": "synthetic", "sourceLabel": "..."}],
  "media": [],
  "reviewed": false
}
```

Adaptar os nomes e campos ao schema real. Quando o usuário pedir JSON, devolver JSON válido; não misturar comentários, markdown ou texto fora do envelope. Em lotes, preservar IDs e metadados fornecidos, devolver todos os itens na ordem solicitada e não substituir uma resposta ausente por conteúdo inventado.

### Contrato específico do ENtrack

Para pacotes autorais do ENtrack, manter `schemaVersion`, `packetId`, `questionId`, `matrixReference` e `difficulty` exatamente como recebidos. Preencher os campos obrigatórios do pacote, incluindo `prompt`, cinco `options`, `correctIndex`, `explanation`, cinco `optionRationales`, `evidenceIds`, `cognitiveOperations`, `minimumDependentRelations`, `solutionPathSignature`, `expectedMisconceptions`, `uniqueSolutionAssumptions`, `factualSupport`, `media`, `densityException`, `independentSolution` e `stimulusDependency`. Manter `reviewed: false`.

Fazer `independentSolution.defensibleOptionIndexes` conter somente o índice do gabarito e `stimulusDependency.solvableWithoutStimulus` ser `false`, salvo regra explícita em contrário no pacote. Ocultar marcadores privados como `[E1]` do texto visível; usá-los apenas nos metadados e na explicação privada. Quando a mídia for necessária, incluir alt text, caption, origem, licença, URL quando aplicável, hash SHA-256 e evidências essenciais.

Depois de salvar as respostas, executar o validador local indicado pelo pacote ou pelo repositório, normalmente `npm run questions:validate`, ler o relatório e encaminhar para revisão humana. Não declarar a questão “aprovada” apenas porque o comando terminou sem erro.

## Gate final

Bloquear a entrega como pronta se qualquer item abaixo falhar:

- objetivo, comando e operação cognitiva estão alinhados;
- o suporte contém todas as evidências necessárias e não é decorativo;
- existe exatamente um gabarito e cada distrator representa um erro identificável;
- a questão é solucionável sem informação oculta e não possui ambiguidade material;
- dados, cálculos, unidades, fatos, fonte e licença foram conferidos;
- texto, imagem, tabela e alt text são acessíveis e legíveis;
- originalidade e não duplicação foram verificadas;
- dificuldade e extensão são compatíveis com o contrato;
- todos os campos obrigatórios estão preenchidos e o JSON é válido;
- o estado de revisão permanece explícito e a aprovação humana ainda está separada.

Para uma checagem mais detalhada de itens isolados ou lotes, consultar [references/quality-rubric.md](references/quality-rubric.md).
