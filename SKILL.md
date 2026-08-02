---
name: authorial-question-writing
description: "Criar e revisar questões educacionais autorais inéditas, especialmente itens de múltipla escolha no estilo ENEM, com suporte contextualizado, comando verificável, gabarito único, distratores diagnósticos, justificativas, dificuldade, acessibilidade e controle de fontes. Usar para elaborar, adaptar sem copiar, auditar ou estruturar questões em texto ou JSON para bancos, simulados, trilhas e avaliações; no ENtrack, obedecer sempre ao pacote e ao validador locais."
---

# Autor de Questões Autorais

Tratar cada questão como artefato pedagógico auditável. Produzir rascunho original pronto para revisão humana; nunca prometer aprovação, validade psicométrica, autorização de publicação ou adequação automática ao público.

## Fixar o contrato

1. Ler integralmente pedido, anexos, schema, matriz, pacote e validador disponíveis.
2. Identificar público, idioma, área, disciplina, objetivo, dificuldade, quantidade de alternativas, formato, fontes, mídia e campos obrigatórios.
3. Obedecer ao contrato local. Não inventar IDs, campos, matriz, dificuldade ou estado de release.
4. Perguntar somente quando uma lacuna mudar materialmente objetivo, nível, público, formato ou permissão de uso. Registrar hipóteses seguras e mínimas.
5. Não reproduzir nem parafrasear superficialmente questão, texto, imagem, números ou alternativas de prova, livro ou site.

Para trabalho no ENtrack, ler [references/entrack-integration.md](references/entrack-integration.md) antes de gerar e executar o validador real indicado pelo pacote.

## Escolher o modo de idioma

- **ENEM em língua estrangeira:** manter o suporte no idioma-alvo e escrever comando e alternativas em português brasileiro, salvo contrato contrário.
- **Aprendizagem de idioma:** ajustar suporte, comando e alternativas ao nível e ao objetivo comunicativo declarados; não assumir formato ENEM.
- **Linguagens em português:** usar gênero, voz e contexto suficientes para sustentar a operação de leitura pedida.

Não misturar os modos sem declarar a exceção.

## Construir por evidências

Seguir a cadeia:

`objetivo → suporte → evidências → comando → solução → alternativas → auditoria`

- **Linguagens e idiomas:** avaliar sentido, uso, gênero, estratégia discursiva ou relação cultural a partir de texto ou situação comunicativa.
- **Ciências Humanas:** situar agente, tempo, espaço, fonte e limite documental; não ultrapassar as evidências.
- **Matemática:** definir grandezas, unidades, condições, precisão e regra de arredondamento; conferir análise dimensional.
- **Ciências da Natureza:** explicitar fenômeno, variáveis, condições, observações e limites; conferir unidades, causalidade, ordem de grandeza e algarismos significativos quando aplicável.

Fazer o suporte carregar todas as evidências necessárias. Se a questão continuar solucionável sem ele, reescrever o suporte ou o comando.

## Preservar fatos, autoria e direitos

1. Criar situação, voz, dados, valores, ordem das informações e caminho de resolução novos.
2. Separar conteúdo simulado de afirmações reais. Não usar uma fonte sintética para encobrir uma afirmação histórica, científica ou atual verificável.
3. Verificar fatos reais em fontes primárias ou institucionais adequadas e registrar procedência, data, URL, licença ou autorização e data de acesso.
4. Tratar página pública apenas como acesso, nunca como licença de reprodução.
5. Substituir material sem direitos comprovados por conteúdo autoral; deixar o item pendente quando a verificação factual for indispensável e inconclusiva.

## Usar mídia somente como evidência

- Preferir texto, tabela semântica ou diagrama nativo quando forem suficientes.
- Em lotes ENEM/ENtrack com pelo menos quatro itens e sem contrato local mais exigente, reservar exatamente uma questão com mídia essencial em cada bloco completo de quatro questões: cobertura visual de 25%. Em um lote de 160 itens, o gate é 40 questões visuais. Se o item inicialmente escolhido não comportar dependência visual real, trocar sua posição com outro item do mesmo bloco ou reescrevê-lo; nunca cumprir a cota com imagem decorativa.
- Distribuir funções visuais no lote entre mapas ou cartogramas, charges ou cartazes autorais, fotografias históricas em domínio público com procedência, gráficos ou tabelas reconstruídos, linhas do tempo, plantas ou esquemas territoriais, infográficos e reproduções documentais. Em lotes de 40 mídias, usar pelo menos cinco dessas famílias e impedir que uma única família represente mais da metade dos ativos.
- Gerar imagem somente quando forma, posição, sequência, distribuição ou comparação visual fizer parte do raciocínio.
- Antes de criar qualquer ativo, escrever um briefing visual específico para a questão: evidência que a mídia precisa carregar, gênero visual adequado, elementos obrigatórios, composição, estilo, recorte temporal, texto exato, acessibilidade e itens proibidos. Não começar pela ferramenta nem por um template genérico.
- Quando a evidência pedir ilustração raster, colagem, cena editorial ou linguagem visual autoral, usar Canva ou a geração de imagens do GPT disponível no ambiente. Quando precisão factual ou quantitativa for decisiva, reconstruir tabela, gráfico, mapa ou diagrama em formato nativo e verificável; não pedir que um gerador de imagens desenhe dados, escalas, fronteiras ou rótulos exatos.
- Em lotes, cada ativo deve ter função, direção visual, composição e identificador próprios. Não reutilizar a mesma imagem em questões diferentes nem trocar apenas título, cores ou três rótulos dentro do mesmo molde. Reuso só é permitido quando a comparação explícita entre as questões exige o mesmo documento e isso está registrado no briefing.
- Inspecionar cada ativo individualmente e o lote em conjunto, preferencialmente também como folha de contato. Rejeitar repetição de layout, iconografia genérica, aparência de banco de imagens, texto ilegível, anacronismo, elementos sem função e qualquer padrão de produção em massa que transforme mídias diferentes em variações do mesmo visual.
- Tratar imagem criada por GPT ou Canva como ilustração autoral contemporânea, nunca como fotografia, documento ou testemunho do período representado. Registrar ferramenta e intervenção editorial no histórico de produção; no objeto público, usar apenas origem e licença realmente compatíveis com o contrato local.
- Não usar imagem gerada como prova de fato histórico, geográfico ou científico. Reconstruir gráficos, mapas e diagramas a partir de dados verificados e conferir cada escala, rótulo, unidade, legenda e relação antes de usar.
- Para mapas históricos, fixar data ou intervalo, projeção, recorte e legenda; reconstruir fronteiras a partir de mapa contemporâneo ao período em domínio público ou acervo institucional. Em fronteiras disputadas ou mutáveis, confrontar pelo menos duas fontes históricas ou acadêmicas independentes e registrar a decisão editorial. Jogos e mapas proprietários, inclusive os da Paradox, podem servir apenas como orientação privada: nunca traçar, copiar, imitar, publicar, citar como fonte ou usar como prova factual.
- Não imitar artista vivo, personagem, logotipo, mapa, fotografia ou infográfico protegido.
- Salvar o ativo localmente, inspecioná-lo, calcular o hash real, registrar origem/licença e fornecer texto alternativo com evidência equivalente.
- Se Canva ou a geração de imagens do GPT não estiver disponível, ou se geração, inspeção ou verificação falhar, substituir a mídia por texto, tabela ou diagrama nativo adequado; nunca entregar placeholder, hotlink ou série de SVGs clonados como simulação de variedade visual.

## Escrever comando e alternativas

Formular comando direto e observável que obrigue a usar o suporte. Pedir para analisar, relacionar, inferir, explicar, avaliar, comparar ou calcular uma relação delimitada.

Para itens ENEM/ENtrack, produzir cinco alternativas, salvo contrato contrário:

- um único gabarito defensável;
- quatro distratores baseados em erros diferentes e plausíveis;
- paralelismo gramatical, unidade, precisão e extensão semelhantes;
- nenhuma alternativa absurda, parcialmente correta ou semanticamente sobreposta;
- nenhuma pista por posição, comprimento, tom, concordância, precisão ou pontuação.

Explicar o atrativo e a falha exata de cada distrator.

## Resolver e auditar

1. Esconder o gabarito e resolver do zero somente com as evidências e conhecimentos permitidos.
2. Conferir cálculo, sinal, conversão, unidade, arredondamento, consistência dimensional, causalidade e cronologia.
3. Testar a remoção de cada evidência essencial.
4. Comparar texto, contexto, resposta numérica e caminho cognitivo com o banco disponível.
5. Classificar dificuldade pelo número e dependência das relações, nunca pelo tamanho do texto.
6. Produzir explicação do caminho e justificativa individual de todas as alternativas.
7. Aplicar integralmente [references/quality-rubric.md](references/quality-rubric.md).

## Separar validação, revisão e pré-teste

- Manter `reviewed: false` ou equivalente em todo conteúdo produzido por agente.
- Tratar validação mecânica como verificação de contrato, não como aprovação pedagógica.
- Exigir revisão identificada por professor ou especialista da disciplina antes de uso com estudantes.
- Exigir pré-teste com estudantes e análise de desempenho quando a dificuldade real, discriminação, calibração ou validade do item importar. Não inferir dificuldade psicométrica da rubrica editorial.
- Não publicar, promover ao catálogo, preencher aprovação humana ou alterar release sem autorização explícita.

## Entregar

Adaptar a saída ao schema real e devolver JSON válido quando solicitado. Em lotes, preservar IDs, metadados e ordem. Não inventar resposta para pacote ausente.

Bloquear a entrega como pronta se falhar alinhamento, evidência, unicidade, resolução, originalidade, fatos, direitos, acessibilidade, equidade, adequação etária, contrato ou separação de revisão.
