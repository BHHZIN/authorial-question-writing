# Rubrica de qualidade para questões autorais

Aplicar esta rubrica depois de escrever e antes de devolver o item. Tratar cada dimensão como gate: uma falha crítica não é compensada por boa forma textual.

## Gates obrigatórios

| Dimensão | Pergunta de aprovação | Falhas que bloqueiam |
| --- | --- | --- |
| Alinhamento | O comando mede o objetivo e a habilidade declarados? | tópico amplo, conhecimento de outra habilidade ou resposta independente do suporte |
| Evidência | Cada passo da solução aponta para evidência disponível? | dado ausente, contexto decorativo, premissa oculta ou marcador privado visível |
| Unicidade | Um revisor independente escolheria somente o gabarito? | duas respostas defensáveis, opção parcialmente correta ou condição não especificada |
| Distratores | Cada distrator representa erro plausível, distinto e diagnosticável? | absurdo, erro repetido, sobreposição, irrelevância ou pista formal |
| Resolução | A solução independente confere operações e conclusões? | cálculo, conversão, sinal, unidade, arredondamento, causalidade ou cronologia incorretos |
| Dificuldade | As relações dependentes correspondem ao nível editorial pedido? | usar extensão, raridade ou conta trabalhosa como substituto de complexidade cognitiva |
| Originalidade | Cenário, redação, dados, alternativas e rota de solução são novos? | reprodução, tradução, paráfrase superficial ou sequência numérica copiada |
| Fatos e direitos | Fatos têm procedência e todo material pode ser usado? | fato real rotulado como simulado, URL sem licença, origem inventada ou mídia protegida |
| Acessibilidade | Texto, tabela e mídia preservam a evidência sem depender de cor, visão ou interação específica? | alt ausente, tabela ilegível, contraste inadequado ou evidência somente visual |
| Equidade | O item evita conhecimento cultural e socioeconômico irrelevante à habilidade? | vantagem ou desvantagem introduzida por classe, região, raça, gênero, religião, deficiência ou acesso tecnológico |
| Sensibilidade | O conteúdo é necessário, proporcional e não estereotipa pessoas ou grupos? | violência gratuita, sexualização, humilhação, patologização, estigma ou generalização de grupo |
| Adequação etária | Linguagem e contexto são apropriados ao público e protegem menores? | conteúdo adulto desnecessário, instrução perigosa, exposição de dados ou situação emocional sem finalidade pedagógica |
| Mídia factual | Escala, rótulo, unidade, legenda e representação foram reconstruídos de dados verificados? | imagem gerada tratada como documento, mapa impreciso, gráfico incompatível ou anacronismo usado como evidência |
| Contrato | O objeto segue schema, IDs, ordem, enums e estado de revisão? | campo ausente, enum inválido, ID alterado, JSON inválido ou `reviewed` humano inventado |

## Testes privados

Responder sem olhar o gabarito:

1. Qual evidência torna a resposta correta?
2. Que erro específico torna cada distrator atraente?
3. O que muda se cada evidência essencial for removida?
4. Que informação externa ainda seria necessária?
5. Outra alternativa pode ser defendida apenas com o suporte?
6. O gabarito tem pista de posição, extensão, detalhe ou tom?
7. Um estudante de outro grupo social ou região encontra barreira irrelevante à habilidade?
8. Um professor da disciplina confirmaria fato, solução e nível editorial?

Reescrever se a resposta 4 ou 5 revelar lacuna material, se a resposta 6 ou 7 indicar viés, ou se a resposta 8 ainda não puder ser obtida antes da publicação.

## Auditoria privada mínima

```json
{
  "evidenceMap": [{"id": "E1", "role": "evidência decisiva", "usedBy": ["correct"]}],
  "answerCheck": {
    "selectedOption": 0,
    "defensibleOptionIndexes": [0],
    "reasoning": "resolução independente",
    "checkedBy": "agent-self-check"
  },
  "stimulusCheck": {
    "necessaryEvidenceIds": ["E1"],
    "solvableWithoutStimulus": false,
    "removalEffect": "sem E1, a resposta deixa de ser determinável"
  }
}
```

Essa auditoria não substitui revisão por especialista nem pré-teste com estudantes.

## Quando falhar

- **Contexto decorativo:** integrar evidência necessária ou remover a narrativa.
- **Distrator absurdo:** modelar erro observado ou conceitualmente plausível.
- **Duas respostas:** acrescentar condição ou reformular comando e opções.
- **Fonte sem permissão:** substituir por autoria própria ou suspender o item.
- **Fato real como simulação:** separar cenário fictício da base factual e registrar fonte adequada.
- **Pista de forma:** equilibrar construção e extensão sem tornar opções vagas.
- **Viés ou estereótipo:** trocar contexto, agentes ou informação irrelevante preservando a habilidade.
- **Mídia duvidosa:** reconstruir a representação de dados verificados ou usar texto/tabela.
- **Dificuldade não comprovada:** rotular apenas a rubrica editorial e encaminhar para pré-teste.
