

# Correcao: Filtro progressivo por tipo RIASEC nas abas de profissoes

## Problema

O algoritmo atual analisa todas as 600 carreiras igualmente e apenas "prioriza" o tipo dominante no desempate. Com 18 respostas espalhadas por ~12 subtipos, carreiras de qualquer tipo podem atingir 4/4 acidentalmente. Resultado: a aba "Excelente" mostra profissoes que nao tem relacao direta com o perfil do usuario.

## Solucao: Filtro progressivo por tipo

A selecao de carreiras vai ficando mais restritiva conforme o nivel de match aumenta:

- **Excelente (4/4)**: somente carreiras do tipo dominante do usuario
- **Bom (3/4)**: carreiras do tipo dominante primeiro; se sobrar vaga, completa com outros tipos
- **Atencao (2/4)**: qualquer tipo, ordenado por relevancia
- **Refazer (1/4)**: qualquer tipo restante

Isso garante que na aba mais importante (Excelente), o usuario ve apenas profissoes diretamente ligadas ao seu perfil. A medida que desce nos niveis, a selecao vai "suavizando" e permitindo outros tipos.

## Detalhes tecnicos

### Arquivo modificado
- `src/components/CareersTab.tsx` - logica de selecao dos top 4 por nivel

### Mudanca na logica de selecao (linhas 71-82)

A logica atual aplica a mesma regra para todos os niveis (dominant first, backfill). Sera substituida por regras progressivas:

```text
for (const level of subTabOrder) {
  const all = grouped[level];
  const dominant = all.filter(item => item.career.type === dominantType);
  const others = all.filter(item => item.career.type !== dominantType);

  if (level === 'Excelente') {
    // Somente tipo dominante
    grouped[level] = dominant.slice(0, 4);
  } else if (level === 'Bom') {
    // Dominante primeiro, completa com outros
    const selected = [...dominant.slice(0, 4)];
    const remaining = 4 - selected.length;
    if (remaining > 0) selected.push(...others.slice(0, remaining));
    grouped[level] = selected;
  } else {
    // Atencao e Refazer: qualquer tipo, ja ordenado por relevancia
    grouped[level] = all.slice(0, 4);
  }
}
```

### Impacto esperado
- Aba Excelente: se o perfil e Artistico, mostra apenas Designer Grafico, Diretor de Arte, Ilustrador, etc.
- Aba Bom: ainda prioriza Artistico, mas pode mostrar 1-2 de outros tipos se nao houver suficientes
- Abas Atencao/Refazer: mostram profissoes variadas, refletindo que o match ja e fraco
- Os criterios 4/4, 3/4, 2/4, 1/4 permanecem inalterados

