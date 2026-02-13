

# Importar Planilha de Perguntas na aba Admin

## Resumo

Adicionar botao "Importar Planilha" ao lado do "Resetar" na aba Perguntas do Admin, seguindo o mesmo padrao visual do botao existente na aba Profissoes. O botao abre um modal que aceita .xlsx/.xls/.csv, valida colunas e linhas, mostra preview, e substitui 100% da base de perguntas ao confirmar.

## Mudancas

### 1. Novo componente: `src/components/ImportQuestionsModal.tsx`

Modal seguindo o mesmo padrao do `ImportCareersModal` existente:

- **Input de arquivo**: aceita `.xlsx,.xls,.csv`
- **Parsing**: usa SheetJS (ja instalado) para ler a primeira aba
- **Validacao de colunas obrigatorias**: `ID`, `Pergunta`, `Tipo`, `Subtipo (SIM)`, `Subtipo Antagônico (NÃO)`
- **Validacao por linha**:
  - ID e Pergunta nao vazios
  - Tipo deve ser um dos: R, I, A, S, E, C (aceita nome por extenso tambem: "Realista" -> R)
  - Subtipo (SIM) deve existir no `subtypeTypeMap`
  - Subtipo (NÃO) deve existir no `subtypeTypeMap`
  - SIM e NAO nao podem ser iguais
  - Subtipo fantasma (nao existe na base oficial) bloqueia importacao
- **Preview**: tabela com 5 primeiras linhas + total
- **Botoes**: Confirmar / Cancelar

**Mapeamento de colunas para Question**:

```text
Coluna da planilha             -> Campo Question
ID                             -> id (number)
Pergunta                       -> text
Tipo                           -> yesType (convertido: "Realista" -> "R", ou "R" direto)
Subtipo (SIM)                  -> yesSub (uppercase)
Subtipo Antagonico (NAO)       -> noSub (uppercase)
(derivado do subtypeTypeMap)   -> noType (tipo RIASEC do noSub)
```

O `yesType` e derivado da coluna "Tipo" (mapeando nomes extensos para siglas). O `noType` e derivado automaticamente do subtipo antagonico via `subtypeTypeMap`.

### 2. Novo metodo no hook `useAdminData.ts`

Adicionar `replaceQuestions(newQuestions: Question[])`:
- Substitui 100% do array de perguntas no localStorage
- Atualiza o state React
- Limpa qualquer estado derivado (proxima sessao de quiz usara as novas perguntas via `getRandomQuestions` que le de `allQuestions`)

**Problema**: `getRandomQuestions()` atualmente le de `allQuestions` (constante hardcoded), nao do state do admin. Para que a importacao tenha efeito no quiz, sera necessario que `QuizScreen` receba as perguntas do admin ou que `getRandomQuestions` aceite um parametro.

**Solucao**: Modificar `getRandomQuestions` para aceitar um array opcional de perguntas. O `QuizScreen` recebera as perguntas do admin via props ou as carregara do localStorage.

### 3. Modificar `src/data/quizQuestions.ts`

- Alterar `getRandomQuestions(questions?: Question[])` para usar o array passado (ou `allQuestions` como fallback)

### 4. Modificar `src/components/QuizScreen.tsx`

- Aceitar prop opcional `questions?: Question[]`
- Usar essas perguntas no `getRandomQuestions` se fornecidas

### 5. Modificar `src/pages/Index.tsx`

- Carregar perguntas do localStorage (via `load` helper) e passa-las ao QuizScreen

### 6. Botao na aba Perguntas (`src/pages/Admin.tsx`)

- Adicionar botao "Importar Planilha" ao lado do "Resetar" (mesmo estilo: outline, sm, rounded-full, text-xs, icone IconFileSpreadsheet)
- Ao clicar, abre o `ImportQuestionsModal`
- Ao confirmar, chama `replaceQuestions` e fecha o modal

## Detalhes tecnicos

### Validacao de tipo (mapeamento nome extenso -> sigla)

```text
const TYPE_MAP: Record<string, RiasecType> = {
  'REALISTA': 'R', 'R': 'R',
  'INVESTIGATIVO': 'I', 'I': 'I',
  'ARTÍSTICO': 'A', 'ARTISTICO': 'A', 'A': 'A',
  'SOCIAL': 'S', 'S': 'S',
  'EMPREENDEDOR': 'E', 'E': 'E',
  'CONVENCIONAL': 'C', 'C': 'C',
};
```

### Fluxo de dados apos importacao

1. `replaceQuestions` salva no localStorage + atualiza state
2. Proxima sessao de quiz carrega perguntas do localStorage
3. `getRandomQuestions(questions)` seleciona 18 aleatorias (6 por par antagonico)
4. Se o quiz estava em andamento, o usuario precisa reiniciar

### Arquivos modificados
- `src/hooks/useAdminData.ts` — adicionar `replaceQuestions`
- `src/data/quizQuestions.ts` — `getRandomQuestions` aceita parametro
- `src/components/QuizScreen.tsx` — receber perguntas customizadas
- `src/pages/Index.tsx` — carregar perguntas do localStorage
- `src/pages/Admin.tsx` — importar modal + botao
- `src/components/ImportQuestionsModal.tsx` — novo arquivo

### Arquivo de teste fornecido
O arquivo `Perguntas-2.xlsx` contem 600 perguntas (100 por par antagonico), com as colunas exatas esperadas. A coluna extra "Par Tipo SIASEC (SIM-NAO)" sera ignorada (nao e obrigatoria).
