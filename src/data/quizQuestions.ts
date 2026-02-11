export type RiasecType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface Question {
  id: number;
  text: string;
  /** Tipo que recebe ponto ao responder SIM */
  yesType: RiasecType;
  /** Tipo que recebe ponto ao responder NÃO */
  noType: RiasecType;
  yesLabel: string;
  noLabel: string;
}

export const questions: Question[] = [
  // Mistura orgânica dos pares antagônicos R×I, A×C, S×E
  { id: 1,  text: "Gosto de trabalhar com ferramentas, máquinas ou atividades manuais.", yesType: 'R', noType: 'I', yesLabel: 'REALISTA', noLabel: 'INVESTIGATIVO' },
  { id: 2,  text: "Gosto de investigar, pesquisar e entender como as coisas funcionam.", yesType: 'I', noType: 'R', yesLabel: 'INVESTIGATIVO', noLabel: 'REALISTA' },
  { id: 3,  text: "Gosto de me expressar através da arte, música, escrita ou design.", yesType: 'A', noType: 'C', yesLabel: 'ARTÍSTICO', noLabel: 'CONVENCIONAL' },
  { id: 4,  text: "Gosto de ajudar pessoas e contribuir para o bem-estar dos outros.", yesType: 'S', noType: 'E', yesLabel: 'SOCIAL', noLabel: 'EMPREENDEDOR' },
  { id: 5,  text: "Gosto de liderar projetos e influenciar decisões.", yesType: 'E', noType: 'S', yesLabel: 'EMPREENDEDOR', noLabel: 'SOCIAL' },
  { id: 6,  text: "Gosto de organizar informações, documentos e processos.", yesType: 'C', noType: 'A', yesLabel: 'CONVENCIONAL', noLabel: 'ARTÍSTICO' },

  // Rodada 2 — invertendo alguns pares para imprevisibilidade
  { id: 7,  text: "Prefiro analisar dados e informações antes de tomar decisões.", yesType: 'I', noType: 'R', yesLabel: 'DIAGNÓSTICO', noLabel: 'PRODUÇÃO' },
  { id: 8,  text: "Me sinto bem realizando atividades ao ar livre ou que envolvam esforço físico.", yesType: 'R', noType: 'I', yesLabel: 'EXECUÇÃO', noLabel: 'PESQUISA' },
  { id: 9,  text: "Me motivo com desafios competitivos e metas ambiciosas.", yesType: 'E', noType: 'S', yesLabel: 'AMBIÇÃO', noLabel: 'CUIDADO' },
  { id: 10, text: "Prefiro seguir procedimentos claros e bem definidos.", yesType: 'C', noType: 'A', yesLabel: 'ESTRUTURA', noLabel: 'EXPRESSÃO' },
  { id: 11, text: "Me sinto bem ensinando, orientando ou cuidando de outras pessoas.", yesType: 'S', noType: 'E', yesLabel: 'ENSINO', noLabel: 'LIDERANÇA' },
  { id: 12, text: "Valorizo a criatividade e a originalidade no meu trabalho.", yesType: 'A', noType: 'C', yesLabel: 'CRIATIVIDADE', noLabel: 'PADRÃO' },

  // Rodada 3 — mais mistura
  { id: 13, text: "Prefiro consertar e construir coisas do que estudar teorias sobre elas.", yesType: 'R', noType: 'I', yesLabel: 'MANUTENÇÃO', noLabel: 'TEORIA' },
  { id: 14, text: "Tenho facilidade para convencer e negociar com outras pessoas.", yesType: 'E', noType: 'S', yesLabel: 'INFLUÊNCIA', noLabel: 'AJUDA' },
  { id: 15, text: "Me sinto confortável trabalhando com números, planilhas e dados.", yesType: 'C', noType: 'A', yesLabel: 'DADOS', noLabel: 'ESTILO' },
  { id: 16, text: "Me interesso por ciência, tecnologia ou resolver problemas complexos.", yesType: 'I', noType: 'R', yesLabel: 'CURIOSIDADE', noLabel: 'CONSTÂNCIA' },
  { id: 17, text: "Prefiro ambientes de trabalho flexíveis e sem muitas regras rígidas.", yesType: 'A', noType: 'C', yesLabel: 'IMAGINAÇÃO', noLabel: 'REGRAS' },
  { id: 18, text: "Prefiro trabalhar em equipe e valorizo a cooperação.", yesType: 'S', noType: 'E', yesLabel: 'COOPERAÇÃO', noLabel: 'COMPETIÇÃO' },
];

export interface RiasecProfile {
  type: RiasecType;
  name: string;
  icon: string;
  description: string;
  careers: string[];
  color: string;
}

export const riasecProfiles: Record<RiasecType, RiasecProfile> = {
  R: {
    type: 'R',
    name: 'Realista',
    icon: 'IconTool',
    description: 'Você é prático, objetivo e gosta de trabalhar com as mãos. Prefere atividades concretas e tangíveis, resolver problemas reais e ver resultados imediatos do seu trabalho.',
    careers: ['Engenharia', 'Mecânica', 'Agricultura', 'Construção Civil', 'Eletricista'],
    color: 'hsl(142, 71%, 45%)',
  },
  I: {
    type: 'I',
    name: 'Investigativo',
    icon: 'IconMicroscope',
    description: 'Você é curioso, analítico e adora entender como as coisas funcionam. Gosta de pesquisar, estudar e resolver problemas complexos usando lógica e raciocínio.',
    careers: ['Ciência', 'Pesquisa', 'Medicina', 'Tecnologia', 'Análise de Dados'],
    color: 'hsl(217, 91%, 60%)',
  },
  A: {
    type: 'A',
    name: 'Artístico',
    icon: 'IconPalette',
    description: 'Você é criativo, expressivo e valoriza a originalidade. Gosta de ambientes livres onde pode usar sua imaginação e criar coisas novas.',
    careers: ['Design', 'Música', 'Escrita', 'Artes Visuais', 'Publicidade'],
    color: 'hsl(262, 83%, 58%)',
  },
  S: {
    type: 'S',
    name: 'Social',
    icon: 'IconUsersGroup',
    description: 'Você é empático, cooperativo e gosta de ajudar os outros. Se realiza em atividades que envolvem ensinar, orientar e cuidar das pessoas.',
    careers: ['Educação', 'Psicologia', 'Serviço Social', 'Saúde', 'RH'],
    color: 'hsl(330, 81%, 60%)',
  },
  E: {
    type: 'E',
    name: 'Empreendedor',
    icon: 'IconRocket',
    description: 'Você é líder, persuasivo e motivado por desafios. Gosta de influenciar pessoas, tomar decisões e buscar resultados ambiciosos.',
    careers: ['Administração', 'Vendas', 'Marketing', 'Direito', 'Gestão'],
    color: 'hsl(25, 95%, 53%)',
  },
  C: {
    type: 'C',
    name: 'Convencional',
    icon: 'IconChartBar',
    description: 'Você é organizado, metódico e detalhista. Gosta de seguir processos, trabalhar com dados e manter tudo em ordem.',
    careers: ['Contabilidade', 'Finanças', 'Administração', 'Logística', 'Auditoria'],
    color: 'hsl(47, 96%, 53%)',
  },
};
