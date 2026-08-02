# Integração com o ENtrack

Usar esta referência somente quando o trabalho ocorrer dentro do ENtrack ou quando a saída declarar o schema `entrack-authorial-question/*`.

## Fonte de verdade

Ler nesta ordem:

1. `docs/product/Authorial-Question-Workflow.md`;
2. pacote completo produzido por `npm run questions:prepare`;
3. `outputContract`, `fieldGuide`, `difficultyRubric`, `matrixReference` e `uniquenessRegistry` do pacote;
4. tipos e validadores próximos em `features/learning-trails/`;
5. relatório produzido por `npm run questions:validate`.

Não copiar o contrato desta referência para substituir o pacote. Se houver divergência, o pacote e o validador locais vencem.

## Identidade e envelope

- Devolver cada resposta no array `responses`.
- Copiar sem alterações `schemaVersion`, `packetId`, `questionId`, `matrixReference` e dificuldade solicitada.
- Preencher todos os campos listados por `outputContract.requiredFields`.
- Usar exatamente cinco alternativas e um único `correctIndex`, salvo mudança explícita no contrato.
- Manter `reviewed: false`.
- Ocultar `[E1]`, `[E2]` e outros marcadores do texto visível; citá-los somente na explicação e nos metadados privados.

## Fontes

Usar os enums recebidos no `fieldGuide`. No contrato `1.2.0` usado pelos exemplos desta versão:

- `entrack-simulated`: cenário ou dados produzidos para o item;
- `primary-source`: fonte primária identificada;
- `public-domain-source`: material em domínio público identificado.

Não usar `synthetic` em respostas ENtrack. Não rotular como simulado um fato histórico ou científico real necessário à solução.

## Língua estrangeira

- Para modo ENEM, manter o suporte no idioma-alvo e formular comando e alternativas em português brasileiro.
- Para trilha de aprendizagem de idioma, seguir nível e objetivo comunicativo do pacote; o contrato pode autorizar comando e alternativas no idioma-alvo.
- Registrar o modo no briefing ou nos metadados editoriais; não inferi-lo apenas pelo `subjectId`.

## Mídia

Seguir integralmente o objeto de mídia recebido no contrato. Usar caminho local em `/question-media/`, origem e licença aceitas, URL quando exigida, hash SHA-256 real e `essentialEvidenceIds` existentes.

Para imagem gerada, conferir manualmente cada elemento factual e quantitativo. Não usar cena histórica gerada como fonte documental nem mapa ou diagrama gerado sem reconstrução a partir de dados verificados.

## Validação e revisão

Executar o validador indicado pelo repositório e ler o relatório. `VÁLIDO` significa apenas conformidade mecânica.

Antes do uso por estudantes:

1. obter revisão identificada de professor ou especialista da disciplina;
2. revisar acessibilidade, equidade, sensibilidade, adequação a menores e direitos;
3. realizar pré-teste quando dificuldade real, discriminação ou validade do item forem relevantes;
4. manter aprovação e release fora da autoridade do agente.

Os exemplos em `examples/` são respostas completas ligadas a pacotes reproduzíveis do ENtrack. Executar `npm run validate:entrack -- --entrack-root <caminho>` para regenerar os pacotes e testá-las contra o validador real.
