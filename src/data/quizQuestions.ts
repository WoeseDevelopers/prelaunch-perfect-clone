export type RiasecType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface Question {
  id: number;
  text: string;
  type: RiasecType;
  yesLabel: string;
  noLabel: string;
}

export const questions: Question[] = [
  // Realista (R) × Investigativo (I) — 4 perguntas
  { id: 1, text: "Gosto de trabalhar com ferramentas, máquinas ou atividades manuais.", type: 'R', yesLabel: 'REALISTA', noLabel: 'INVESTIGATIVO' },
  { id: 2, text: "Prefiro resolver problemas de forma prática, colocando a mão na massa.", type: 'R', yesLabel: 'EXECUÇÃO', noLabel: 'ANÁLISE' },
  { id: 3, text: "Me sinto bem realizando atividades ao ar livre ou que envolvam esforço físico.", type: 'R', yesLabel: 'ROTINA', noLabel: 'PESQUISA' },
  { id: 4, text: "Prefiro consertar e construir coisas do que estudar teorias sobre elas.", type: 'R', yesLabel: 'MANUTENÇÃO', noLabel: 'TEORIA' },

  // Investigativo (I) × Realista (R) — 4 perguntas
  { id: 5, text: "Gosto de investigar, pesquisar e entender como as coisas funcionam.", type: 'I', yesLabel: 'INVESTIGATIVO', noLabel: 'REALISTA' },
  { id: 6, text: "Prefiro analisar dados e informações antes de tomar decisões.", type: 'I', yesLabel: 'DIAGNÓSTICO', noLabel: 'PRODUÇÃO' },
  { id: 7, text: "Me interesso por ciência, tecnologia ou resolver problemas complexos.", type: 'I', yesLabel: 'CURIOSIDADE', noLabel: 'CONSTÂNCIA' },
  { id: 8, text: "Gosto de observar padrões e formular hipóteses sobre fenômenos.", type: 'I', yesLabel: 'RACIOCÍNIO', noLabel: 'OPERAÇÃO' },

  // Artístico (A) × Convencional (C) — 4 perguntas
  { id: 9, text: "Gosto de me expressar através da arte, música, escrita ou design.", type: 'A', yesLabel: 'ARTÍSTICO', noLabel: 'CONVENCIONAL' },
  { id: 10, text: "Valorizo a criatividade e a originalidade no meu trabalho.", type: 'A', yesLabel: 'CRIATIVIDADE', noLabel: 'PADRÃO' },
  { id: 11, text: "Prefiro ambientes de trabalho flexíveis e sem muitas regras rígidas.", type: 'A', yesLabel: 'IMAGINAÇÃO', noLabel: 'REGRAS' },
  { id: 12, text: "Me sinto atraído por inovação e por criar coisas novas.", type: 'A', yesLabel: 'INOVAÇÃO', noLabel: 'PRECISÃO' },

  // Social (S) × Empreendedor (E) — 4 perguntas
  { id: 13, text: "Gosto de ajudar pessoas e contribuir para o bem-estar dos outros.", type: 'S', yesLabel: 'SOCIAL', noLabel: 'EMPREENDEDOR' },
  { id: 14, text: "Me sinto bem ensinando, orientando ou cuidando de outras pessoas.", type: 'S', yesLabel: 'ENSINO', noLabel: 'LIDERANÇA' },
  { id: 15, text: "Prefiro trabalhar em equipe e valorizo a cooperação.", type: 'S', yesLabel: 'COOPERAÇÃO', noLabel: 'COMPETIÇÃO' },
  { id: 16, text: "Me importo com a escuta ativa e o acolhimento das pessoas.", type: 'S', yesLabel: 'EMPATIA', noLabel: 'PERSUASÃO' },

  // Empreendedor (E) × Social (S) — 4 perguntas
  { id: 17, text: "Gosto de liderar projetos e influenciar decisões.", type: 'E', yesLabel: 'EMPREENDEDOR', noLabel: 'SOCIAL' },
  { id: 18, text: "Me motivo com desafios competitivos e metas ambiciosas.", type: 'E', yesLabel: 'AMBIÇÃO', noLabel: 'CUIDADO' },
  { id: 19, text: "Tenho facilidade para convencer e negociar com outras pessoas.", type: 'E', yesLabel: 'INFLUÊNCIA', noLabel: 'AJUDA' },
  { id: 20, text: "Gosto de assumir riscos e tomar decisões sob pressão.", type: 'E', yesLabel: 'DECISÃO', noLabel: 'APOIO' },

  // Convencional (C) × Artístico (A) — 4 perguntas
  { id: 21, text: "Gosto de organizar informações, documentos e processos.", type: 'C', yesLabel: 'CONVENCIONAL', noLabel: 'ARTÍSTICO' },
  { id: 22, text: "Prefiro seguir procedimentos claros e bem definidos.", type: 'C', yesLabel: 'ESTRUTURA', noLabel: 'EXPRESSÃO' },
  { id: 23, text: "Me sinto confortável trabalhando com números, planilhas e dados.", type: 'C', yesLabel: 'DADOS', noLabel: 'ESTILO' },
  { id: 24, text: "Valorizo a conformidade e a atenção aos detalhes no trabalho.", type: 'C', yesLabel: 'PLANEJAMENTO', noLabel: 'MUDANÇA' },
];

// Antagonismos RIASEC: R×I, A×C, S×E
export const antagonisms: Record<RiasecType, RiasecType> = {
  R: 'I',
  I: 'R',
  A: 'C',
  C: 'A',
  S: 'E',
  E: 'S',
};

export interface RiasecProfile {
  type: RiasecType;
  name: string;
  emoji: string;
  description: string;
  careers: string[];
  color: string;
}

export const riasecProfiles: Record<RiasecType, RiasecProfile> = {
  R: {
    type: 'R',
    name: 'Realista',
    emoji: '🔧',
    description: 'Você é prático, objetivo e gosta de trabalhar com as mãos. Prefere atividades concretas e tangíveis, resolver problemas reais e ver resultados imediatos do seu trabalho.',
    careers: ['Engenharia', 'Mecânica', 'Agricultura', 'Construção Civil', 'Eletricista'],
    color: 'hsl(142, 71%, 45%)',
  },
  I: {
    type: 'I',
    name: 'Investigativo',
    emoji: '🔬',
    description: 'Você é curioso, analítico e adora entender como as coisas funcionam. Gosta de pesquisar, estudar e resolver problemas complexos usando lógica e raciocínio.',
    careers: ['Ciência', 'Pesquisa', 'Medicina', 'Tecnologia', 'Análise de Dados'],
    color: 'hsl(217, 91%, 60%)',
  },
  A: {
    type: 'A',
    name: 'Artístico',
    emoji: '🎨',
    description: 'Você é criativo, expressivo e valoriza a originalidade. Gosta de ambientes livres onde pode usar sua imaginação e criar coisas novas.',
    careers: ['Design', 'Música', 'Escrita', 'Artes Visuais', 'Publicidade'],
    color: 'hsl(262, 83%, 58%)',
  },
  S: {
    type: 'S',
    name: 'Social',
    emoji: '🤝',
    description: 'Você é empático, cooperativo e gosta de ajudar os outros. Se realiza em atividades que envolvem ensinar, orientar e cuidar das pessoas.',
    careers: ['Educação', 'Psicologia', 'Serviço Social', 'Saúde', 'RH'],
    color: 'hsl(330, 81%, 60%)',
  },
  E: {
    type: 'E',
    name: 'Empreendedor',
    emoji: '🚀',
    description: 'Você é líder, persuasivo e motivado por desafios. Gosta de influenciar pessoas, tomar decisões e buscar resultados ambiciosos.',
    careers: ['Administração', 'Vendas', 'Marketing', 'Direito', 'Gestão'],
    color: 'hsl(25, 95%, 53%)',
  },
  C: {
    type: 'C',
    name: 'Convencional',
    emoji: '📊',
    description: 'Você é organizado, metódico e detalhista. Gosta de seguir processos, trabalhar com dados e manter tudo em ordem.',
    careers: ['Contabilidade', 'Finanças', 'Administração', 'Logística', 'Auditoria'],
    color: 'hsl(47, 96%, 53%)',
  },
};
