

# Diagnostico e Correcao: Profissoes Desalinhadas com Tipo RIASEC

## Problema Identificado

O sistema possui **3 subtipos fantasma** que existem nos cards de profissoes mas **NAO existem** na base oficial de 60 subtipos usados pelas perguntas do quiz:

- **"Resolucoes"** — aparece em 149 profissoes
- **"Estabilidade"** — aparece em 139 profissoes
- **"Coisas"** — aparece em 142 profissoes

**Total: ~430 slots de subtipos em profissoes que NUNCA podem ser matchados.**

Cada profissao possui exatamente 4 subtipos. Com ~430 slots inalcancaveis distribuidos entre 600 profissoes, uma grande parcela dos cards fica com apenas 2 ou 3 subtipos efetivos — tornando impossivel atingir match 4/4 para muitas profissoes, incluindo as do tipo Artistico.

Por exemplo, a profissao "Designer Grafico" (tipo A) possui os subtipos:
- Ferramentas (R) — valido
- Exposicao (E) — valido
- Organizacao (C) — valido
- **Resolucoes — FANTASMA (nunca pontuado)**

Ela nunca podera atingir 4/4, e o match depende de subtipos de outros tipos (R, E, C), nao de subtipos Artisticos.

## Solucao

Substituir cada ocorrencia dos 3 subtipos fantasma por subtipos validos da base oficial de 60, escolhendo o subtipo mais coerente com o contexto da profissao:

| Fantasma | Substituicoes possiveis (exemplos) |
|---|---|
| Resolucoes | RACIOCINIO, PLANEJAMENTO, DECISAO, ANALISE |
| Estabilidade | CONSTANCIA, ROTINA, PADRAO, ESTRUTURA |
| Coisas | PRATICA, FERRAMENTAS, OPERACAO, PRODUCAO |

A escolha sera feita individualmente por profissao, respeitando:
1. Nao duplicar subtipos dentro da mesma profissao (os 4 devem ser unicos)
2. Selecionar o subtipo mais semanticamente proximo ao contexto da profissao
3. Manter a diversidade de tipos RIASEC nos 4 slots

## Detalhes Tecnicos

### Arquivo modificado
- `src/data/careerDetails.ts` — substituicao dos ~430 subtipos fantasma nas 600 profissoes

### Regras de substituicao por contexto
- **Resolucoes** → Para profissoes analiticas: RACIOCINIO ou ANALISE. Para profissoes de gestao: DECISAO ou PLANEJAMENTO
- **Estabilidade** → Para profissoes estruturadas: CONSTANCIA ou PADRAO. Para profissoes operacionais: ROTINA ou ESTRUTURA
- **Coisas** → Para profissoes manuais: PRATICA ou FERRAMENTAS. Para profissoes de producao: OPERACAO ou PRODUCAO

### Validacao pos-correcao
- Confirmar que todos os 2400 slots de subtipos (600 profissoes x 4) pertencem ao conjunto oficial de 60
- Confirmar que nenhuma profissao tem subtipos duplicados
- Confirmar que o `subtypeTypeMap` cobre 100% dos subtipos usados

### Impacto esperado
- Profissoes do tipo Artistico (e todos os outros tipos) poderao atingir match 4/4
- A distribuicao de profissoes nas abas Excelente/Bom/Atencao/Refazer ficara mais equilibrada e coerente com o perfil do usuario
- O sistema voltara a ser matematicamente fechado sem subtipos inalcancaveis

