export type RiasecType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface Question {
  id: number;
  text: string;
  type: RiasecType;
}

export const questions: Question[] = [
  // Realista (R) - 3 perguntas
  { id: 1, text: "Gosto de trabalhar com ferramentas, máquinas ou atividades manuais.", type: 'R' },
  { id: 2, text: "Prefiro resolver problemas de forma prática, colocando a mão na massa.", type: 'R' },
  { id: 3, text: "Me sinto bem realizando atividades ao ar livre ou que envolvam esforço físico.", type: 'R' },

  // Investigativo (I) - 3 perguntas
  { id: 4, text: "Gosto de investigar, pesquisar e entender como as coisas funcionam.", type: 'I' },
  { id: 5, text: "Prefiro analisar dados e informações antes de tomar decisões.", type: 'I' },
  { id: 6, text: "Me interesso por ciência, tecnologia ou resolver problemas complexos.", type: 'I' },

  // Artístico (A) - 3 perguntas
  { id: 7, text: "Gosto de me expressar através da arte, música, escrita ou design.", type: 'A' },
  { id: 8, text: "Valorizo a criatividade e a originalidade no meu trabalho.", type: 'A' },
  { id: 9, text: "Prefiro ambientes de trabalho flexíveis e sem muitas regras rígidas.", type: 'A' },

  // Social (S) - 3 perguntas
  { id: 10, text: "Gosto de ajudar pessoas e contribuir para o bem-estar dos outros.", type: 'S' },
  { id: 11, text: "Me sinto bem ensinando, orientando ou cuidando de outras pessoas.", type: 'S' },
  { id: 12, text: "Prefiro trabalhar em equipe e valorizo a cooperação.", type: 'S' },

  // Empreendedor (E) - 3 perguntas
  { id: 13, text: "Gosto de liderar projetos e influenciar decisões.", type: 'E' },
  { id: 14, text: "Me motivo com desafios competitivos e metas ambiciosas.", type: 'E' },
  { id: 15, text: "Tenho facilidade para convencer e negociar com outras pessoas.", type: 'E' },

  // Convencional (C) - 3 perguntas
  { id: 16, text: "Gosto de organizar informações, documentos e processos.", type: 'C' },
  { id: 17, text: "Prefiro seguir procedimentos claros e bem definidos.", type: 'C' },
  { id: 18, text: "Me sinto confortável trabalhando com números, planilhas e dados.", type: 'C' },
];

export const answerOptions = [
  { value: 1, label: "Discordo totalmente" },
  { value: 2, label: "Discordo" },
  { value: 3, label: "Neutro" },
  { value: 4, label: "Concordo" },
  { value: 5, label: "Concordo totalmente" },
];

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
