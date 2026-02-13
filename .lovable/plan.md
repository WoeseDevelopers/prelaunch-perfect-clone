
# Edição Inline na Area Administrativa

## O que sera feito

Adicionar funcionalidade de edição direta em todas as 3 abas do painel admin (Perguntas, Profissoes e Tipos), permitindo alterar os dados sem sair da interface.

**Importante:** Como o sistema nao usa banco de dados, as edicoes serao salvas em `localStorage`. Isso significa que as alteracoes persistem no navegador do administrador, mas nao alteram o codigo-fonte. Ao limpar o cache do navegador, os dados voltam ao original.

---

## Funcionalidades por aba

### 1. Perguntas
- Botao "Editar" em cada card expandido
- Campos editaveis:
  - Texto da pergunta
  - Subtipo SIM (dropdown com os 60 subtipos oficiais)
  - Subtipo NAO (dropdown com os 60 subtipos oficiais)
- Os tipos RIASEC (yesType/noType) sao derivados automaticamente do subtipo selecionado via `subtypeTypeMap`
- Botoes Salvar / Cancelar

### 2. Profissoes
- Botao "Editar" em cada card expandido
- Campos editaveis:
  - Nome da profissao
  - Descricao
  - Ponto forte (strengths)
  - Ponto fraco (weaknesses)
  - Tipo RIASEC principal (dropdown R/I/A/S/E/C)
  - 4 subtipos (dropdowns: Dominante 1, Dominante 2, Secundario 1, Secundario 2)
- Botoes Salvar / Cancelar

### 3. Tipos
- Botao "Editar" em cada tipo RIASEC
- Campos editaveis:
  - Nome do tipo (ex: "Realista")
  - Descricao do tipo
  - Cor (color picker ou input hex)
  - Nomes dos 10 subtipos (inputs de texto)
- Botoes Salvar / Cancelar

---

## Detalhes tecnicos

### Persistencia via localStorage
- Chave `trampos_admin_questions` para perguntas editadas
- Chave `trampos_admin_careers` para profissoes editadas
- Chave `trampos_admin_profiles` para tipos/subtipos editados
- Na inicializacao, o admin carrega dados do localStorage; se nao houver, usa os dados originais do codigo
- Botao "Resetar dados originais" por secao para reverter alteracoes

### Arquitetura
- Criar um hook `useAdminData` em `src/hooks/useAdminData.ts` que:
  - Carrega dados do localStorage com fallback para os originais
  - Expoe funcoes de update por item
  - Expoe funcao de reset por secao
- Refatorar `Admin.tsx` para usar esse hook em vez de importar diretamente `allQuestions`, `careerDetails` e `riasecProfiles`
- Os componentes de edicao serao inline (dentro do card expandido), sem modais

### Validacoes
- Subtipo editado deve existir na lista oficial de 60 subtipos
- Profissao deve ter exatamente 4 subtipos sem duplicatas
- Tipo RIASEC deve ser uma das 6 letras validas
- Campos obrigatorios nao podem ficar vazios

### Arquivos modificados
1. **`src/hooks/useAdminData.ts`** (novo) - Hook de gerenciamento de estado com localStorage
2. **`src/pages/Admin.tsx`** - Adicionar modo de edicao inline nos 3 componentes de aba (QuestionsAdmin, CareersAdmin, TypesAdmin)
