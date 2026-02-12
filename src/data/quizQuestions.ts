export type RiasecType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

/** Compute per-subtype counts from actual answered questions.
 *  Each question carries its own yesSub/noSub assigned at session start. */
export function computeSubtypeCounts(
  questions: Question[],
  answers: Record<number, 'yes' | 'no'>,
  filterType?: RiasecType
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const q of questions) {
    const ans = answers[q.id];
    if (!ans) continue;
    const sub = ans === 'yes' ? q.yesSub : q.noSub;
    const type = ans === 'yes' ? q.yesType : q.noType;
    if (!sub) continue;
    if (filterType && type !== filterType) continue;
    result[sub] = (result[sub] || 0) + 1;
  }
  return result;
}

export interface Question {
  id: number;
  text: string;
  yesType: RiasecType;
  noType: RiasecType;
  yesSub?: string;
  noSub?: string;
}

/** All 300 questions from the question bank */
export const allQuestions: Question[] = [
  { id: 1, text: "Diante de uma rotina que pode ser otimizada, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 2, text: "Em um grupo em conflito, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 3, text: "Para um anúncio, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 4, text: "Para um layout, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 5, text: "Para um texto curto, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 6, text: "Diante de um projeto com risco, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 7, text: "Diante de um procedimento que precisa melhorar, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 8, text: "Em uma situação emocional delicada, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 9, text: "Diante de um bug ou falha, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 10, text: "Em uma negociação tensa, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 11, text: "Em uma decisão que afeta pessoas, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 12, text: "Em uma meta urgente, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 13, text: "Diante de uma tarefa operacional, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 14, text: "Para um portfólio, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 15, text: "Em uma comunidade precisando de apoio, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 16, text: "Para um convite, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 17, text: "Diante de uma dúvida técnica, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 18, text: "Para um conteúdo para redes, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 19, text: "Em uma pessoa insegura, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 20, text: "Para um vídeo curto, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 21, text: "Diante de um trabalho com pouco tempo, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 22, text: "Diante de um ambiente com pressão, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 23, text: "Diante de um imprevisto no dia a dia, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 24, text: "Em um cliente indeciso, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 25, text: "Diante de uma falha recorrente, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 26, text: "Diante de uma situação prática nova, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 27, text: "Para uma solução estética, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 28, text: "Para um roteiro, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 29, text: "Diante de um sistema que não funciona, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 30, text: "Para uma narrativa, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 31, text: "Em uma reunião importante, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 32, text: "Diante de uma demanda urgente, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 33, text: "Para uma identidade visual, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 34, text: "Em um time que precisa de direção, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 35, text: "Em um grupo desmotivado, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 36, text: "Para um design de produto, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 37, text: "Para um nome ou slogan, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 38, text: "Diante de um desafio no trabalho, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 39, text: "Em um novo integrante do time, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 40, text: "Para uma proposta visual, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 41, text: "Em um projeto com muita gente, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 42, text: "Em um objetivo agressivo, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 43, text: "Diante de um resultado abaixo do esperado, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 44, text: "Em uma turma aprendendo, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 45, text: "Para um cartaz, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 46, text: "Para uma campanha, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 47, text: "Diante de um obstáculo inesperado, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 48, text: "Em um atendimento difícil, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 49, text: "Para um projeto criativo, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 50, text: "Diante de um erro em um processo, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 51, text: "Para um layout, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 52, text: "Para uma solução estética, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 53, text: "Em uma negociação tensa, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 54, text: "Para um anúncio, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 55, text: "Diante de um equipamento com defeito, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 56, text: "Diante de um resultado abaixo do esperado, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 57, text: "Em um novo integrante do time, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 58, text: "Em uma meta urgente, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 59, text: "Diante de uma falha recorrente, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 60, text: "Em uma decisão que afeta pessoas, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 61, text: "Em uma apresentação para público, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 62, text: "Para um projeto criativo, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 63, text: "Em um ambiente competitivo, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 64, text: "Para uma proposta visual, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 65, text: "Diante de um alerta de qualidade, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 66, text: "Para um conteúdo para redes, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 67, text: "Para um conceito, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 68, text: "Diante de um procedimento que precisa melhorar, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 69, text: "Diante de uma quebra de padrão, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 70, text: "Diante de uma inconformidade, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 71, text: "Em uma situação emocional delicada, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 72, text: "Diante de uma tarefa operacional, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 73, text: "Para um material visual, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 74, text: "Diante de um fluxo que precisa correção, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 75, text: "Em uma reunião importante, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 76, text: "Em um projeto com muita gente, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 77, text: "Para um nome ou slogan, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 78, text: "Para uma narrativa, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 79, text: "Para um convite, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 80, text: "Diante de um sistema que não funciona, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 81, text: "Em uma equipe com dificuldades, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 82, text: "Em um grupo em conflito, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 83, text: "Para um portfólio, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 84, text: "Para um cartaz, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 85, text: "Diante de um desafio no trabalho, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 86, text: "Diante de uma decisão técnica, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 87, text: "Diante de uma anomalia nos dados, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 88, text: "Em um grupo desmotivado, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 89, text: "Em uma pessoa insegura, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 90, text: "Em um colega com problema, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 91, text: "Diante de um equipamento que precisa ajuste, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 92, text: "Para uma campanha, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 93, text: "Diante de um imprevisto no dia a dia, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 94, text: "Para uma apresentação, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 95, text: "Diante de um erro em um processo, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 96, text: "Diante de um problema técnico, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 97, text: "Em um time que precisa de direção, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 98, text: "Em um objetivo agressivo, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 99, text: "Para um vídeo curto, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 100, text: "Para um texto curto, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 101, text: "Para um conceito, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 102, text: "Em um projeto com muita gente, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 103, text: "Diante de uma inconformidade, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 104, text: "Diante de um trabalho com pouco tempo, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 105, text: "Diante de uma decisão técnica, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 106, text: "Em uma turma aprendendo, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 107, text: "Em um cliente indeciso, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 108, text: "Diante de uma anomalia nos dados, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 109, text: "Em uma apresentação para público, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 110, text: "Em uma negociação tensa, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 111, text: "Para um convite, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 112, text: "Diante de um fluxo que precisa correção, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 113, text: "Diante de uma quebra de padrão, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 114, text: "Em uma decisão que afeta pessoas, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 115, text: "Em um objetivo agressivo, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 116, text: "Diante de um equipamento que precisa ajuste, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 117, text: "Em um grupo desmotivado, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 118, text: "Em uma situação emocional delicada, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 119, text: "Em um atendimento difícil, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 120, text: "Para uma campanha, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 121, text: "Para uma proposta visual, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 122, text: "Em uma reunião importante, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 123, text: "Em uma pessoa insegura, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 124, text: "Diante de um alerta de qualidade, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 125, text: "Para um vídeo curto, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 126, text: "Para um roteiro, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 127, text: "Diante de uma situação de manutenção, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 128, text: "Para uma apresentação, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 129, text: "Para uma identidade visual, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 130, text: "Para um portfólio, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 131, text: "Para um design de produto, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 132, text: "Em um ambiente competitivo, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 133, text: "Diante de um caso que exige diagnóstico, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 134, text: "Em uma comunidade precisando de apoio, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 135, text: "Diante de um projeto com risco, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 136, text: "Em uma meta urgente, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 137, text: "Em um novo integrante do time, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 138, text: "Para um anúncio, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 139, text: "Diante de um erro que precisa de causa raiz, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 140, text: "Diante de uma situação prática nova, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 141, text: "Para um nome ou slogan, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 142, text: "Diante de um ambiente com pressão, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 143, text: "Diante de uma rotina que pode ser otimizada, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 144, text: "Para um cartaz, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 145, text: "Para um conteúdo para redes, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 146, text: "Diante de um problema com múltiplas causas, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 147, text: "Diante de um problema técnico, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 148, text: "Para uma narrativa, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 149, text: "Para uma solução estética, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 150, text: "Para um layout, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 151, text: "Para um anúncio, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 152, text: "Diante de um obstáculo inesperado, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 153, text: "Em um cliente indeciso, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 154, text: "Para um portfólio, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 155, text: "Em um grupo em conflito, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 156, text: "Para um convite, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 157, text: "Diante de um sistema que não funciona, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 158, text: "Em uma decisão que afeta pessoas, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 159, text: "Em um time que precisa de direção, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 160, text: "Para um vídeo curto, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 161, text: "Para um conceito, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 162, text: "Diante de um bug ou falha, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 163, text: "Para uma identidade visual, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 164, text: "Diante de uma dúvida técnica, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 165, text: "Para um cartaz, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 166, text: "Diante de um ambiente com pressão, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 167, text: "Em uma equipe com dificuldades, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 168, text: "Para um nome ou slogan, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 169, text: "Para um layout, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 170, text: "Em uma reunião importante, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 171, text: "Para um material visual, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 172, text: "Em uma negociação tensa, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 173, text: "Diante de um projeto com risco, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 174, text: "Diante de uma situação de manutenção, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 175, text: "Para um conteúdo para redes, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 176, text: "Diante de um trabalho com pouco tempo, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 177, text: "Em um ambiente competitivo, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 178, text: "Para um texto curto, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 179, text: "Para uma apresentação, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 180, text: "Diante de uma rotina que pode ser otimizada, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 181, text: "Diante de um erro que precisa de causa raiz, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 182, text: "Para uma proposta visual, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 183, text: "Diante de uma demanda urgente, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 184, text: "Em uma pessoa insegura, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 185, text: "Diante de um resultado abaixo do esperado, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 186, text: "Para uma narrativa, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 187, text: "Em uma turma aprendendo, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 188, text: "Diante de uma falha recorrente, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 189, text: "Em um novo integrante do time, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 190, text: "Em um grupo desmotivado, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 191, text: "Em um projeto com muita gente, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 192, text: "Diante de uma situação prática nova, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 193, text: "Para um roteiro, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 194, text: "Em um colega com problema, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 195, text: "Diante de um problema com múltiplas causas, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 196, text: "Em uma situação emocional delicada, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 197, text: "Em uma apresentação para público, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 198, text: "Diante de um imprevisto no dia a dia, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 199, text: "Para um projeto criativo, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 200, text: "Diante de um procedimento que precisa melhorar, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 201, text: "Em uma comunidade precisando de apoio, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 202, text: "Para um conteúdo para redes, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 203, text: "Em uma equipe com dificuldades, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 204, text: "Diante de um obstáculo inesperado, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 205, text: "Em uma apresentação para público, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 206, text: "Diante de um resultado abaixo do esperado, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 207, text: "Em um objetivo agressivo, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 208, text: "Em uma turma aprendendo, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 209, text: "Para uma apresentação, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 210, text: "Em um ambiente competitivo, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 211, text: "Diante de uma decisão técnica, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 212, text: "Para um cartaz, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 213, text: "Diante de um erro em um processo, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 214, text: "Diante de um equipamento com defeito, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 215, text: "Diante de um sistema que não funciona, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 216, text: "Em um grupo desmotivado, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 217, text: "Para um vídeo curto, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 218, text: "Em uma decisão que afeta pessoas, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 219, text: "Para um design de produto, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 220, text: "Diante de uma dúvida técnica, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 221, text: "Diante de um imprevisto no dia a dia, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 222, text: "Em um colega com problema, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 223, text: "Para um texto curto, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 224, text: "Em um atendimento difícil, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 225, text: "Diante de um desafio no trabalho, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 226, text: "Diante de um procedimento que precisa melhorar, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 227, text: "Para um convite, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 228, text: "Diante de uma falha recorrente, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 229, text: "Para um nome ou slogan, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 230, text: "Em um cliente indeciso, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 231, text: "Em uma negociação tensa, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 232, text: "Em um projeto com muita gente, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 233, text: "Para um conceito, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 234, text: "Em uma meta urgente, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 235, text: "Diante de uma quebra de padrão, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 236, text: "Diante de uma tarefa operacional, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 237, text: "Diante de um alerta de qualidade, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 238, text: "Para um portfólio, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 239, text: "Diante de uma inconformidade, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 240, text: "Para uma campanha, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 241, text: "Para uma solução estética, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 242, text: "Para um material visual, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 243, text: "Diante de um bug ou falha, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 244, text: "Para uma identidade visual, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 245, text: "Em um novo integrante do time, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 246, text: "Para uma narrativa, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 247, text: "Em uma situação emocional delicada, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 248, text: "Para uma proposta visual, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 249, text: "Diante de um problema técnico, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 250, text: "Para um roteiro, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 251, text: "Para um vídeo curto, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 252, text: "Em uma turma aprendendo, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 253, text: "Para uma narrativa, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 254, text: "Em um cliente indeciso, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 255, text: "Em uma pessoa insegura, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 256, text: "Para um texto curto, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 257, text: "Diante de um equipamento que precisa ajuste, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 258, text: "Para um anúncio, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 259, text: "Para um projeto criativo, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 260, text: "Para um cartaz, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 261, text: "Diante de uma inconformidade, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 262, text: "Em uma comunidade precisando de apoio, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 263, text: "Diante de uma situação de manutenção, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 264, text: "Para um conteúdo para redes, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 265, text: "Em um projeto com muita gente, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 266, text: "Diante de um desafio no trabalho, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 267, text: "Em um grupo em conflito, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 268, text: "Em um ambiente competitivo, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 269, text: "Para um nome ou slogan, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 270, text: "Diante de um ambiente com pressão, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 271, text: "Para um layout, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 272, text: "Diante de um caso que exige diagnóstico, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 273, text: "Para um material visual, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 274, text: "Para uma identidade visual, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 275, text: "Diante de um erro que precisa de causa raiz, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 276, text: "Em um time que precisa de direção, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 277, text: "Em uma situação emocional delicada, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 278, text: "Diante de um problema com múltiplas causas, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 279, text: "Diante de um trabalho com pouco tempo, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 280, text: "Em uma equipe com dificuldades, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 281, text: "Diante de uma tarefa operacional, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 282, text: "Em um colega com problema, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 283, text: "Para uma solução estética, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 284, text: "Em uma reunião importante, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 285, text: "Diante de um problema técnico, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 286, text: "Diante de um equipamento com defeito, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 287, text: "Para um roteiro, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 288, text: "Diante de uma anomalia nos dados, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 289, text: "Diante de uma quebra de padrão, você prefere analisar antes de agir?", yesType: 'I', noType: 'R' },
  { id: 290, text: "Diante de um alerta de qualidade, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 291, text: "Para um convite, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 292, text: "Diante de uma decisão técnica, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 293, text: "Para um design de produto, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 294, text: "Para um conceito, você prefere criar do seu jeito?", yesType: 'A', noType: 'C' },
  { id: 295, text: "Em uma negociação tensa, você prefere apoiar e acolher pessoas?", yesType: 'S', noType: 'E' },
  { id: 296, text: "Em um novo integrante do time, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 297, text: "Em um atendimento difícil, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
  { id: 298, text: "Diante de um fluxo que precisa correção, você prefere agir na prática primeiro?", yesType: 'R', noType: 'I' },
  { id: 299, text: "Para uma apresentação, você prefere seguir um padrão pronto?", yesType: 'C', noType: 'A' },
  { id: 300, text: "Em uma apresentação para público, você prefere liderar para alcançar resultados?", yesType: 'E', noType: 'S' },
];

/** Number of questions per quiz session */
export const QUIZ_SIZE = 18;

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Pick QUIZ_SIZE random questions ensuring balanced pair coverage.
 * Each antagonistic pair (R×I, A×C, S×E) gets an equal number of questions (6 each).
 */
export function getRandomQuestions(): Question[] {
  const pairs: [RiasecType, RiasecType][] = [['R', 'I'], ['A', 'C'], ['S', 'E']];
  const perPair = QUIZ_SIZE / pairs.length; // 6

  const selected: Question[] = [];

  for (const [a, b] of pairs) {
    const pairQuestions = allQuestions.filter(
      (q) => (q.yesType === a && q.noType === b) || (q.yesType === b && q.noType === a)
    );
    const shuffled = shuffle(pairQuestions);
    selected.push(...shuffled.slice(0, perPair));
  }

  // Assign random subtypes to each selected question
  return shuffle(selected).map((q) => ({
    ...q,
    yesSub: randomPick(riasecProfiles[q.yesType].subdivisions),
    noSub: randomPick(riasecProfiles[q.noType].subdivisions),
  }));
}

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export interface RiasecProfile {
  type: RiasecType;
  name: string;
  icon: string;
  description: string;
  careers: string[];
  color: string;
  subdivisions: string[];
}

export const riasecProfiles: Record<RiasecType, RiasecProfile> = {
  R: {
    type: 'R',
    name: 'Realista',
    icon: 'IconTool',
    description: 'Você é prático, objetivo e gosta de trabalhar com as mãos. Prefere atividades concretas e tangíveis, resolver problemas reais e ver resultados imediatos do seu trabalho.',
    careers: ['Engenharia', 'Mecânica', 'Agricultura', 'Construção Civil', 'Eletricista'],
    color: 'hsl(142, 71%, 45%)',
    subdivisions: ['REALISTA', 'COISAS', 'EXECUÇÃO', 'ROTINA', 'SEGURANÇA', 'MANUTENÇÃO', 'PRODUÇÃO', 'OPERAÇÃO', 'RESISTÊNCIA', 'CONSTÂNCIA', 'FERRAMENTAS', 'ESTABILIDADE'],
  },
  I: {
    type: 'I',
    name: 'Investigativo',
    icon: 'IconMicroscope',
    description: 'Você é curioso, analítico e adora entender como as coisas funcionam. Gosta de pesquisar, estudar e resolver problemas complexos usando lógica e raciocínio.',
    careers: ['Ciência', 'Pesquisa', 'Medicina', 'Tecnologia', 'Análise de Dados'],
    color: 'hsl(217, 91%, 60%)',
    subdivisions: ['ESTUDO', 'ANÁLISE', 'PLANEJAMENTO', 'PESQUISA', 'DIAGNÓSTICO', 'CURIOSIDADE', 'RACIOCÍNIO', 'RESOLUÇÕES', 'TEORIA', 'OBSERVAÇÃO'],
  },
  A: {
    type: 'A',
    name: 'Artístico',
    icon: 'IconPalette',
    description: 'Você é criativo, expressivo e valoriza a originalidade. Gosta de ambientes livres onde pode usar sua imaginação e criar coisas novas.',
    careers: ['Design', 'Música', 'Escrita', 'Artes Visuais', 'Publicidade'],
    color: 'hsl(262, 83%, 58%)',
    subdivisions: ['CRIATIVIDADE', 'EXPRESSÃO', 'MUDANÇA', 'IMAGINAÇÃO', 'INTUIÇÃO', 'ESTÉTICA', 'ESTILO', 'INOVAÇÃO', 'EXPERIÊNCIAS', 'IDENTIDADE'],
  },
  S: {
    type: 'S',
    name: 'Social',
    icon: 'IconUsersGroup',
    description: 'Você é empático, cooperativo e gosta de ajudar os outros. Se realiza em atividades que envolvem ensinar, orientar e cuidar das pessoas.',
    careers: ['Educação', 'Psicologia', 'Serviço Social', 'Saúde', 'RH'],
    color: 'hsl(330, 81%, 60%)',
    subdivisions: ['GRUPO', 'COMUNICAÇÃO', 'EMPATIA', 'COLABORAÇÃO', 'AJUDA', 'ENSINO', 'CUIDADO', 'ESCUTA', 'APOIO', 'COOPERAÇÃO'],
  },
  E: {
    type: 'E',
    name: 'Empreendedor',
    icon: 'IconRocket',
    description: 'Você é líder, persuasivo e motivado por desafios. Gosta de influenciar pessoas, tomar decisões e buscar resultados ambiciosos.',
    careers: ['Administração', 'Vendas', 'Marketing', 'Direito', 'Gestão'],
    color: 'hsl(25, 95%, 53%)',
    subdivisions: ['LIDERANÇA', 'RISCO', 'EXPOSIÇÃO', 'PERSUASÃO', 'INFLUÊNCIA', 'DECISÃO', 'AMBIÇÃO', 'COMPETIÇÃO', 'INICIATIVA', 'VISÃO'],
  },
  C: {
    type: 'C',
    name: 'Convencional',
    icon: 'IconChartBar',
    description: 'Você é organizado, metódico e detalhista. Gosta de seguir processos, trabalhar com dados e manter tudo em ordem.',
    careers: ['Contabilidade', 'Finanças', 'Administração', 'Logística', 'Auditoria'],
    color: 'hsl(47, 96%, 53%)',
    subdivisions: ['ORGANIZAÇÃO', 'CONTROLE', 'PADRÃO', 'REGRAS', 'PRECISÃO', 'ESTRUTURA', 'PLANEJAMENTO', 'CONFORMIDADE', 'DADOS', 'DOCUMENTAÇÃO'],
  },
};
