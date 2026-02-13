

# Correcao: Algoritmo de matching nao favorece carreiras do tipo dominante

## Problema identificado

Testei o quiz completo e confirmei: o resultado foi "Social", mas as 2 carreiras na aba "Excelente" sao **Cineasta** (tipo A) e **Tradutor Literario** (tipo A) — zero carreiras Sociais.

Ha dois problemas tecnicos:

### 1. Bug: `dominantType` ausente no dependency array do `useMemo`
A variavel `dominantType` e usada dentro do `useMemo` para ordenar, mas NAO esta no array de dependencias `[perTypeSubtypeCounts]`. Isso pode causar resultados inconsistentes.

### 2. Problema estrutural: o matching e "tipo-cego"
O algoritmo verifica se cada um dos 4 subtipos do card tem pontos > 0. Com apenas 18 respostas distribuidas entre ~10-12 subtipos unicos (de 60 possiveis), carreiras de QUALQUER tipo tem chance similar de match. O `isDominantType` no sort so ajuda quando ha empate de matchCount — mas se nenhuma carreira do tipo dominante atinge 4/4, o sort nao resolve nada.

## Solucao

Duas correcoes combinadas:

### Correcao 1: Adicionar `dominantType` ao dependency array
Garantir que o memo recalcula quando o tipo dominante muda.

### Correcao 2: Reservar vagas para o tipo dominante no `slice(0, 4)`
Em vez de simplesmente pegar as 4 primeiras carreiras de cada nivel, usar uma logica de "reserva de vagas":
- Primeiro, selecionar ate 4 carreiras DO TIPO DOMINANTE naquele nivel
- Se sobrar vagas (menos de 4 do tipo dominante), preencher com carreiras de outros tipos

Isso garante que, na aba Excelente, se existir pelo menos 1 carreira Social com 4/4, ela aparecera antes de qualquer carreira de outro tipo.

## Detalhes tecnicos

### Arquivo modificado
- `src/components/CareersTab.tsx`

### Mudanca 1: dependency array (linha 77)
```text
}, [perTypeSubtypeCounts]);
```
Sera alterado para:
```text
}, [perTypeSubtypeCounts, dominantType]);
```

### Mudanca 2: logica de selecao dos top 4 (linhas 71-74)
A logica atual:
```text
for (const level of subTabOrder) {
  grouped[level] = grouped[level].slice(0, 4);
}
```
Sera substituida por:
```text
for (const level of subTabOrder) {
  const all = grouped[level];
  const dominant = all.filter(item => item.career.type === dominantType);
  const others = all.filter(item => item.career.type !== dominantType);
  const selected = [...dominant.slice(0, 4)];
  const remaining = 4 - selected.length;
  if (remaining > 0) {
    selected.push(...others.slice(0, remaining));
  }
  grouped[level] = selected;
}
```

### Impacto esperado
- Se o usuario tem tipo dominante Social, as 4 carreiras "Excelente" serao preferencialmente do tipo S (Assistente Social, Pedagogo, Terapeuta, etc.)
- Carreiras de outros tipos so aparecem para preencher vagas restantes
- A mesma logica se aplica a todas as abas (Bom, Atencao, Refazer)
- O bug do dependency array sera corrigido, garantindo recalculo correto

