

# Correcao: Carreiras sem subtipos do proprio tipo RIASEC

## Problema real

A correcao anterior (subtipos fantasma) resolveu apenas 3 labels invalidos, mas o problema central permanece: **as carreiras nao possuem subtipos do seu proprio tipo RIASEC**.

Por exemplo, "Designer Grafico" (tipo A) tem subtipos:
- Ferramentas → tipo R
- Exposicao → tipo E
- Organizacao → tipo C
- Resolucoes → fantasma (corrigido para RACIOCINIO → tipo I)

**Zero subtipos Artisticos** (CRIATIVIDADE, EXPRESSAO, IMAGINACAO, etc.)

Quando o usuario pontua alto em Artistico, os pontos se acumulam em subtipos A (CRIATIVIDADE, EXPRESSAO, etc.). Mas as carreiras tipo A nao tem esses subtipos, entao nunca fazem match.

Isso acontece em **todos os 6 tipos RIASEC** — os subtipos foram atribuidos aleatoriamente na geracao dos dados.

## Solucao

Modificar a funcao `normalizeSubtypes` em `src/data/careerDetails.ts` para **garantir que os 2 primeiros subtipos (Dominante 1 e Dominante 2) pertencam ao tipo RIASEC da carreira**.

### Regra
Para cada carreira:
1. **d1 (Dominante 1)**: se o subtipo original nao pertence ao tipo da carreira, substituir por um subtipo valido desse tipo
2. **d2 (Dominante 2)**: mesma regra, garantindo que seja diferente de d1
3. **s1 e s2 (Secundarios)**: mantem os subtipos originais (ja corrigidos de fantasmas), pois representam habilidades transversais
4. Os 4 subtipos devem ser unicos (sem duplicatas)

### Logica de escolha do subtipo substituto
Selecionar o subtipo mais semanticamente proximo ao contexto da carreira usando um mapeamento de afinidade. Exemplo para tipo A:
- Carreiras visuais (Designer, Ilustrador) → CRIATIVIDADE, ESTILO, ESTETICA
- Carreiras performaticas (Ator, Musico) → EXPRESSAO, IDENTIDADE
- Carreiras de escrita (Roteirista, Escritor) → IMAGINACAO, INTUICAO
- Carreiras de inovacao (Game Designer, UX Designer) → INOVACAO, EXPERIENCIAS, MUDANCA

Como a base tem 600 carreiras e o mapeamento individual seria inviavel, sera usada uma abordagem deterministica baseada no hash do nome da carreira para distribuir uniformemente os 10 subtipos do tipo entre as 100 carreiras de cada tipo.

## Detalhes tecnicos

### Arquivo modificado
- `src/data/careerDetails.ts` — expandir a funcao `normalizeSubtypes` para receber o tipo da carreira e forcar os slots d1/d2

### Pseudocodigo da nova normalizacao

```text
function normalizeSubtypes(labels, careerType, careerName):
  1. Uppercase all labels
  2. Replace phantom subtypes (Resolucoes, Estabilidade, Coisas) — ja existente
  3. Get the 10 subtypes belonging to careerType from subtypeTypeMap
  4. For d1 (index 0):
     - If subtypeTypeMap[label] !== careerType:
       - Pick subtype from careerType's pool based on hash(careerName, 0)
       - Ensure no duplicate with other slots
  5. For d2 (index 1):
     - Same logic with hash(careerName, 1)
  6. Ensure all 4 are unique
  7. Return normalized array
```

### Impacto esperado
- Cada carreira tera pelo menos 2 subtipos do seu proprio tipo RIASEC
- Quando o usuario pontua alto em Artistico, as carreiras tipo A terao subtipos como CRIATIVIDADE/EXPRESSAO que serao matchados
- A aba "Excelente" (4/4) mostrara carreiras coerentes com o perfil dominante
- Os 2 subtipos secundarios (s1/s2) mantem a diversidade de habilidades transversais

### Validacao
- O teste existente (`phantom-subtypes.test.ts`) continuara validando que todos os subtipos sao oficiais e sem duplicatas
- Adicionar validacao extra: cada carreira deve ter pelo menos 2 subtipos do seu tipo RIASEC

