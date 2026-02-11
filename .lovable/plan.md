

# Clone Exato - Trampos Game (Teste Vocacional RIASEC)

## Visão Geral
Recriar fielmente o site "Trampos Game", um teste vocacional baseado no modelo RIASEC com 18 perguntas rápidas, sem necessidade de cadastro ou backend.

---

## 1. Configuração Visual e Design System
- Definir variáveis CSS customizadas: `--trampos-purple`, `--trampos-pink`, `--trampos-orange`
- Fundo cinza claro (`bg-background` levemente acinzentado, como no original)
- Tipografia bold com gradiente no título "Trampos"
- Cards com cantos arredondados (`rounded-2xl`), sombras suaves e borda sutil

## 2. Tela Inicial (Landing)
- Título **"Trampos"** com gradiente roxo → rosa → laranja (text gradient via `bg-clip-text`)
- Subtítulo **"Game"** em cinza (`text-muted-foreground`)
- Card central com ícone ✨ (Sparkles) + label **"TESTE VOCACIONAL"** em uppercase
- Texto descritivo: "Descubra qual perfil profissional combina mais com você! Responda 18 perguntas rápidas e veja seus resultados no modelo RIASEC."
- Botão **"Começar 🚀"** roxo, arredondado (`rounded-full`), com efeito `hover:scale-105`
- Rodapé: "Leva menos de 3 minutos • Sem cadastro"
- Animações de entrada suaves (fade-in + slide-up) usando framer-motion ou CSS transitions

## 3. Tela do Quiz (18 Perguntas)
- Exibição de **uma pergunta por vez**
- Barra de progresso no topo mostrando progresso (ex: "Pergunta 3 de 18")
- Cada pergunta apresenta uma afirmação relacionada a um dos 6 perfis RIASEC
- Opções de resposta em escala (ex: "Discordo totalmente" até "Concordo totalmente") ou escolha simples (Sim/Não/Talvez)
- Transição suave entre perguntas
- Botão "Voltar" para revisar respostas anteriores
- 3 perguntas por dimensão RIASEC (Realista, Investigativo, Artístico, Social, Empreendedor, Convencional)

## 4. Tela de Resultados
- Exibição visual dos 6 perfis RIASEC com pontuações
- Gráfico radar/hexagonal mostrando o perfil do usuário
- Destaque do perfil dominante com descrição detalhada
- Descrição breve de cada um dos 6 tipos RIASEC
- Botão para **refazer o teste**
- Botão para **compartilhar resultado** (copiar link ou redes sociais)

## 5. Navegação e UX
- Tudo em uma única página (SPA) — sem rotas separadas, transições via estado React
- Totalmente responsivo (mobile-first)
- Sem necessidade de backend ou cadastro — tudo roda no cliente
- Animações suaves de transição entre as 3 telas (landing → quiz → resultados)

## Tecnologias
- React + TypeScript + Tailwind CSS (já configurados)
- Recharts para o gráfico radar dos resultados (já instalado)
- Lucide React para ícones (já instalado)
- Estado gerenciado com React hooks (useState)

