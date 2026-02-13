
# Importar Planilha de Profissoes na aba Admin

## Resumo

Adicionar um botao "Importar Planilha" ao lado do botao "Resetar" na aba Profissoes do Admin. O botao abre um modal que aceita arquivos .xlsx, .xls e .csv, valida colunas e linhas, mostra preview e substitui 100% da base de profissoes ao confirmar.

## Mudancas

### 1. Instalar dependencia para leitura de Excel
- Adicionar `xlsx` (SheetJS) para parsear .xlsx, .xls e .csv em um unico pacote.

### 2. Novo componente: `src/components/ImportCareersModal.tsx`
Modal com toda a logica de importacao:

- **Input de arquivo**: aceita `.xlsx,.xls,.csv`
- **Parsing**: usa SheetJS para ler a primeira aba/tabela do arquivo
- **Deteccao de separador CSV**: testa `;` e `,` automaticamente
- **Validacao de colunas**: exige exatamente `Profissao`, `Descricao`, `Subtipo Dominante 1`, `Subtipo Dominante 2`, `Subtipo Secundario 1`, `Subtipo Secundario 2`. Se faltar, mostra erro listando as colunas faltantes.
- **Validacao por linha**:
  - Profissao e Descricao nao vazias
  - 4 subtipos preenchidos
  - Sem subtipo duplicado na mesma linha
  - Subtipo deve existir no `subtypeTypeMap`
  - Linhas invalidas sao listadas com mensagem de erro
- **Preview**: mostra tabela com as 5 primeiras linhas + total de registros
- **Botoes**: Confirmar (substitui base) / Cancelar (fecha modal)
- **Campos opcionais**: `Ponto Forte` e `Ponto Fraco` (strings livres, podem vir vazias)

### 3. Novo metodo no hook `useAdminData.ts`
Adicionar `replaceCareers(newCareers: CareerDetail[])`:
- Substitui 100% do array de carreiras
- Salva no localStorage
- Atualiza o state, forcando recalculo de toda UI dependente

### 4. Botao na aba Profissoes (`src/pages/Admin.tsx`)
- Adicionar botao "Importar Planilha" ao lado do "Resetar" (mesma altura, estilo outline, rounded-full, text-xs)
- Ao clicar, abre o `ImportCareersModal`
- Ao confirmar, chama `replaceCareers` e fecha o modal

## Detalhes tecnicos

### Mapeamento de colunas para CareerDetail

```text
Coluna da planilha          -> Campo CareerDetail
Profissao                   -> name
Descricao                   -> description
Ponto Forte (opcional)      -> strengths
Ponto Fraco (opcional)      -> weaknesses
Subtipo Dominante 1         -> relatedSubtypes[0] (label + type via subtypeTypeMap)
Subtipo Dominante 2         -> relatedSubtypes[1]
Subtipo Secundario 1        -> relatedSubtypes[2]
Subtipo Secundario 2        -> relatedSubtypes[3]
```

O campo `type` (RiasecType) e derivado automaticamente do `Subtipo Dominante 1` via `subtypeTypeMap`.

### Recalculo automatico
Como `careers` e state do React retornado por `useAdminData`, ao chamar `replaceCareers`:
- O componente CareersAdmin re-renderiza com a nova lista
- O quiz (ResultsScreen/CareersTab) usa o mesmo state via props, recalculando matches automaticamente
- Nenhum cache manual precisa ser invalidado

### Validacao de colunas (logica)
```text
const REQUIRED = ['Profissão', 'Descrição', 'Subtipo Dominante 1', 'Subtipo Dominante 2', 'Subtipo Secundário 1', 'Subtipo Secundário 2'];
const missing = REQUIRED.filter(col => !headers.includes(col));
if (missing.length > 0) -> erro com lista de faltantes
```

### Arquivos modificados
- `src/hooks/useAdminData.ts` — adicionar `replaceCareers`
- `src/pages/Admin.tsx` — importar modal + botao
- `src/components/ImportCareersModal.tsx` — novo arquivo (modal completo)
- `package.json` — adicionar dependencia `xlsx`
