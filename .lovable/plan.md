

# Correcao: Priorizar profissoes do tipo dominante na aba Profissoes

## Problema

A normalizacao dos subtipos esta funcionando corretamente (d1/d2 pertencem ao tipo da carreira). Porem, o **algoritmo de ranking na CareersTab** nao considera o tipo RIASEC da carreira. Ele ordena puramente por:
1. matchCount (quantos dos 4 subtipos tem pontos > 0)
2. subtypeSum (soma total de pontos)

Resultado: carreiras de **qualquer tipo** podem aparecer no topo, mesmo quando o usuario tem perfil dominante Artistico. Por exemplo, um Eletricista (R) com subtipos SEGURANCA, CONSTANCIA, IMAGINACAO, ENSINO pode ter match 4/4 porque o usuario acumulou pontos nesses subtipos ao responder perguntas de pares que envolvem R e S.

## Solucao

Modificar o criterio de ordenacao em `CareersTab.tsx` para **priorizar carreiras do tipo dominante do usuario**. A nova ordem sera:

```text
1. matchCount (desc) — quantos subtipos matcharam
2. isDominantType (desc) — carreiras do tipo dominante primeiro  
3. subtypeSum (desc) — soma dos pontos nos subtipos
4. idx (asc) — desempate por ordem original
```

Isso garante que, dentro de cada nivel (4/4, 3/4, 2/4, 1/4), carreiras do tipo dominante aparecam antes de carreiras de outros tipos com a mesma quantidade de matches.

## Detalhes tecnicos

### Arquivo modificado
- `src/components/CareersTab.tsx` — alterar a funcao de sort dentro do `useMemo`

### Mudanca especifica

Dentro do `useMemo` que calcula `groupedCareers`, a ordenacao atual:

```text
scored.sort((a, b) => {
  if (b.subtypeSum !== a.subtypeSum) return b.subtypeSum - a.subtypeSum;
  return a.idx - b.idx;
});
```

Sera substituida por:

```text
scored.sort((a, b) => {
  if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
  const aIsDom = a.career.type === dominantType ? 1 : 0;
  const bIsDom = b.career.type === dominantType ? 1 : 0;
  if (bIsDom !== aIsDom) return bIsDom - aIsDom;
  if (b.subtypeSum !== a.subtypeSum) return b.subtypeSum - a.subtypeSum;
  return a.idx - b.idx;
});
```

### Impacto esperado
- Quando o resultado for Artistico, as 4 carreiras "Excelente" serao preferencialmente do tipo A (Designer Grafico, Diretor de Arte, etc.)
- Carreiras de outros tipos ainda podem aparecer se nao houver suficientes do tipo dominante naquele nivel
- A mesma logica beneficia todos os 6 tipos RIASEC
- Nenhum outro arquivo precisa ser modificado
