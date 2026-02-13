

# Correcao: Selecao de carreiras por relevancia total dentro do tipo dominante

## Problema

O filtro progressivo funciona corretamente (aba Excelente so mostra tipo A para perfil Artistico). Porem, as carreiras A que aparecem nao sao as mais "obvias" porque:

1. A normalizacao atribui subtipos A aleatorios (via hash) a d1/d2
2. Com 10 subtipos A possiveis e o usuario tendo pontos em apenas 3-5 deles, a maioria das carreiras A nao atinge 4/4
3. As poucas que atingem 4/4 sao as que "tiveram sorte" no hash, nao necessariamente as mais representativas

Exemplo: Designer Grafico pode receber MUDANCA e IDENTIDADE (pelo hash), enquanto o usuario tem pontos em CRIATIVIDADE e EXPRESSAO. Resultado: Designer Grafico fica em Bom ou Atencao, e uma carreira menos obvia aparece em Excelente.

## Solucao: Selecao por tipo primeiro, match depois

Mudar a logica das abas para que representem **nivel de afinidade com o tipo**, nao nivel de match bruto:

- **Excelente**: as 4 melhores carreiras DO TIPO DOMINANTE (ordenadas por matchCount desc, subtypeSum desc)
- **Bom**: as proximas 4 melhores do tipo dominante + backfill de outros tipos
- **Atencao**: qualquer tipo, ordenado por relevancia
- **Refazer**: restantes

Cada card continua exibindo seu badge real (4/4, 3/4, etc.), preservando os criterios. A diferenca e que as abas agora organizam por RELEVANCIA AO PERFIL em vez de match count puro.

## Detalhes tecnicos

### Arquivo modificado
- `src/components/CareersTab.tsx`

### Mudanca na logica do useMemo

Em vez de agrupar por `getMatchLevel(matchCount)` e depois filtrar por tipo, a nova logica:

1. Calcula matchCount e subtypeSum para TODAS as 600 carreiras (sem mudanca)
2. Separa em dois grupos: `dominantCareers` (type === dominantType) e `otherCareers`
3. Ordena cada grupo por matchCount desc, subtypeSum desc, idx asc
4. Distribui nas abas:
   - Excelente: top 4 de dominantCareers
   - Bom: proximas 4 de dominantCareers (posicoes 4-7). Se insuficientes, backfill com top de otherCareers
   - Atencao: top 4 de otherCareers (ou restantes de dominantCareers se sobraram)
   - Refazer: proximas 4 de otherCareers
5. Cada item mantem seu matchCount/level original para exibir no badge do card

### Codigo proposto

```text
const dominantCareers = scored
  .filter(item => item.career.type === dominantType)
  .sort((a, b) => {
    if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
    if (b.subtypeSum !== a.subtypeSum) return b.subtypeSum - a.subtypeSum;
    return a.idx - b.idx;
  });

const otherCareers = scored
  .filter(item => item.career.type !== dominantType)
  .sort((a, b) => {
    if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
    if (b.subtypeSum !== a.subtypeSum) return b.subtypeSum - a.subtypeSum;
    return a.idx - b.idx;
  });

// Excelente: top 4 dominant
grouped['Excelente'] = dominantCareers.slice(0, 4);

// Bom: next 4 dominant, backfill with others
const bomDominant = dominantCareers.slice(4, 8);
const bomBackfill = otherCareers.slice(0, 4 - bomDominant.length);
grouped['Bom'] = [...bomDominant, ...bomBackfill].slice(0, 4);

// Atencao: top others (or remaining dominant)
const usedOthers = 4 - bomDominant.length;
grouped['Atencao'] = otherCareers.slice(usedOthers, usedOthers + 4);

// Refazer: next batch
grouped['Refazer'] = otherCareers.slice(usedOthers + 4, usedOthers + 8);
```

### Impacto esperado
- Perfil Artistico: Excelente mostra Designer Grafico, Diretor de Arte, Ilustrador, Fotografo (os com maior match DENTRO do tipo A)
- Os badges nos cards ainda mostram 4/4, 3/4 etc. conforme o match real
- Bom mostra as proximas carreiras A mais relevantes
- Atencao/Refazer mostram carreiras de outros tipos, refletindo menor afinidade
- Os criterios 4/4, 3/4, 2/4, 1/4 sao preservados como indicadores visuais nos cards
