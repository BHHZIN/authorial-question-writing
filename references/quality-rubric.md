# Rubrica de qualidade para questões autorais

Usar esta referência depois de escrever o item e antes de devolvê-lo a um banco, trilha ou revisor. Aplicar os critérios como gates: uma falha crítica não é compensada por bons aspectos formais.

## Rubrica mínima

| Dimensão | Pergunta de aprovação | Falhas que bloqueiam |
| --- | --- | --- |
| Alinhamento | O comando mede o objetivo declarado e pede uma operação observável? | tópico amplo, comando opinativo, conhecimento de outro tópico ou resposta que não depende do suporte |
| Evidência | Cada parte da solução pode ser apontada em uma evidência do suporte? | dado ausente, detalhe decorativo, marcador privado exposto ou imagem sem descrição equivalente |
| Unicidade | Um revisor independente escolheria apenas uma alternativa? | duas respostas defensáveis, premissa implícita, cálculo não especificado ou opção parcialmente correta |
| Distratores | Cada erro é plausível, distinto e explicável? | absurdo, erro repetido, alternativa irrelevante, pista formal ou distrator que também responde ao comando |
| Resolução | O caminho foi refeito sem olhar o gabarito? | aritmética não conferida, unidade incompatível, causalidade invertida ou explicação que só afirma a letra |
| Dificuldade | O número de relações dependentes corresponde ao nível solicitado? | chamar texto longo de difícil ou exigir operações incompatíveis com o nível |
| Originalidade | Cenário, redação, dados, alternativas e solução são novos? | paráfrase, tradução, reprodução de item/trecho/imagem ou cópia de sequência numérica |
| Fatos e direitos | Afirmações reais têm fonte e o uso do conteúdo está autorizado? | “está na internet” como licença, URL sem licença, dado atual sem verificação ou origem inventada |
| Acessibilidade | O estudante consegue ler o suporte e compreender a mídia sem depender de cor ou visão? | alt text ausente, tabela ilegível, contraste/conteúdo essencial apenas na imagem |
| Contrato | O objeto segue schema, IDs, ordem e estado de revisão pedidos? | campo obrigatório ausente, ID alterado, JSON inválido ou `reviewed` marcado sem revisão humana |

## Teste rápido de unicidade

Responder, sem olhar a alternativa correta:

1. Qual evidência torna a resposta correta?
2. Qual erro específico torna cada distrator plausível?
3. O que aconteceria se cada evidência essencial fosse removida?
4. Que informação externa, se houver, ainda seria necessária?
5. Um estudante competente poderia defender outra alternativa com base apenas no texto?

Se a resposta à quinta pergunta for “sim”, alterar o suporte, o comando ou as alternativas antes de entregar.

## Modelo de auditoria privada

Usar IDs curtos e estáveis somente nos metadados quando o contrato aceitar esse recurso. Não exibir esses rótulos ao estudante.

```json
{
  "evidenceMap": [
    {"id": "E1", "role": "dado ou afirmação decisiva", "usedBy": ["correct", "A"]}
  ],
  "answerCheck": {
    "selectedOption": 0,
    "defensibleOptionIndexes": [0],
    "reasoning": "resolução independente e verificável",
    "checkedBy": "agent-self-check"
  },
  "stimulusCheck": {
    "necessaryEvidenceIds": ["E1"],
    "solvableWithoutStimulus": false,
    "removalEffect": "sem E1, o resultado não pode ser determinado"
  }
}
```

Adaptar `checkedBy` e os nomes ao contrato local. Este bloco registra uma checagem do agente; não substitui a resolução de um revisor humano.

## Quando o item falhar

- **Contexto decorativo:** remover a história e reescrever com dados/ideias que alterem a decisão.
- **Distrator absurdo:** modelar o erro que um estudante realmente cometeria e mantê-lo incompatível com o suporte.
- **Duas respostas possíveis:** acrescentar a condição que falta ou reformular o comando para uma relação única.
- **Fonte sem permissão:** substituir por autoria própria ou interromper o uso até comprovar a licença.
- **Questão parecida com referência:** manter a habilidade geral, mas trocar situação, representação, valores, entidades, comando e solução; nunca preservar a sequência verbal.
