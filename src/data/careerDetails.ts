import type { RiasecType } from './quizQuestions';

export interface CareerDetail {
  name: string;
  type: RiasecType;
  description: string;
  strengths: string;
  weaknesses: string;
  relatedSubtypes: string[];
}

export const careerDetails: CareerDetail[] = [
  // Realista (R)
  {
    name: 'Engenharia',
    type: 'R',
    description: 'O Engenheiro projeta, constrói e otimiza sistemas, estruturas e processos. Com raciocínio lógico e habilidades técnicas, transforma ideias em soluções concretas que impactam a sociedade. Se você gosta de resolver problemas práticos e ver resultados tangíveis, a engenharia é o seu caminho.',
    strengths: 'Resolução de problemas complexos, pensamento analítico, criação de soluções práticas e inovadoras para desafios reais.',
    weaknesses: 'Alta exigência técnica, pressão por prazos, necessidade constante de atualização e responsabilidade elevada.',
    relatedSubtypes: ['REALISTA', 'EXECUÇÃO', 'PRODUÇÃO', 'MANUTENÇÃO'],
  },
  {
    name: 'Mecânica',
    type: 'R',
    description: 'O Mecânico diagnostica, repara e mantém máquinas e veículos em funcionamento. Com conhecimento técnico e habilidade manual, garante que equipamentos operem com segurança e eficiência. Se você gosta de entender como as coisas funcionam por dentro, essa profissão é ideal.',
    strengths: 'Trabalho prático e tangível, alta demanda no mercado, autonomia profissional e satisfação imediata.',
    weaknesses: 'Esforço físico intenso, exposição a riscos, necessidade de ferramentas específicas e atualização tecnológica.',
    relatedSubtypes: ['COISAS', 'MANUTENÇÃO', 'FERRAMENTAS', 'EXECUÇÃO'],
  },
  {
    name: 'Agricultura',
    type: 'R',
    description: 'O Agricultor cultiva alimentos e gerencia propriedades rurais com técnicas sustentáveis. Conectado à natureza, combina conhecimento tradicional com tecnologia moderna para alimentar o mundo. Se você valoriza o trabalho ao ar livre e a conexão com a terra, essa é a sua vocação.',
    strengths: 'Contato com a natureza, independência profissional, contribuição essencial para a sociedade e sustentabilidade.',
    weaknesses: 'Dependência climática, sazonalidade de renda, trabalho físico intenso e distância dos centros urbanos.',
    relatedSubtypes: ['REALISTA', 'CONSTÂNCIA', 'PRODUÇÃO', 'RESISTÊNCIA'],
  },
  {
    name: 'Construção Civil',
    type: 'R',
    description: 'O profissional de Construção Civil edifica casas, prédios e infraestruturas que transformam cidades. Com habilidades técnicas e visão espacial, materializa projetos arquitetônicos em estruturas sólidas. Se você gosta de construir e ver obras tomando forma, essa carreira combina com você.',
    strengths: 'Resultados visíveis e duradouros, mercado amplo, trabalho em equipe e impacto direto na sociedade.',
    weaknesses: 'Riscos de segurança, exposição ao clima, exigência física e prazos apertados em obras.',
    relatedSubtypes: ['EXECUÇÃO', 'OPERAÇÃO', 'COISAS', 'ESTABILIDADE'],
  },
  {
    name: 'Eletricista',
    type: 'R',
    description: 'O Eletricista instala, mantém e repara sistemas elétricos residenciais e industriais. Com precisão técnica e conhecimento de normas de segurança, mantém a energia fluindo com segurança. Se você tem atenção aos detalhes e gosta de trabalhar com sistemas, essa profissão é para você.',
    strengths: 'Alta demanda, possibilidade de autonomia, remuneração competitiva e trabalho técnico especializado.',
    weaknesses: 'Riscos elétricos, trabalho em alturas, necessidade de certificações e atualização normativa constante.',
    relatedSubtypes: ['MANUTENÇÃO', 'FERRAMENTAS', 'SEGURANÇA', 'OPERAÇÃO'],
  },

  // Investigativo (I)
  {
    name: 'Ciência',
    type: 'I',
    description: 'O Cientista investiga fenômenos naturais e desenvolve teorias que expandem o conhecimento humano. Com método rigoroso e curiosidade insaciável, busca respostas para as grandes perguntas da humanidade. Se você ama descobrir o desconhecido e desafiar limites, a ciência é seu lugar.',
    strengths: 'Descobertas inovadoras, contribuição para o avanço humano, ambiente intelectual estimulante e reconhecimento.',
    weaknesses: 'Resultados a longo prazo, competição por financiamento, pressão por publicações e isolamento acadêmico.',
    relatedSubtypes: ['PESQUISA', 'TEORIA', 'CURIOSIDADE', 'OBSERVAÇÃO'],
  },
  {
    name: 'Pesquisa',
    type: 'I',
    description: 'O Pesquisador coleta, analisa e interpreta dados para gerar conhecimento aplicável. Com disciplina metodológica e pensamento crítico, transforma perguntas em evidências concretas. Se você é movido por questionamentos e busca respostas baseadas em fatos, a pesquisa é ideal.',
    strengths: 'Aprofundamento intelectual, contribuição para políticas e decisões, autonomia e flexibilidade temática.',
    weaknesses: 'Processos demorados, burocracia acadêmica, incerteza de resultados e remuneração variável.',
    relatedSubtypes: ['ANÁLISE', 'DIAGNÓSTICO', 'ESTUDO', 'RACIOCÍNIO'],
  },
  {
    name: 'Medicina',
    type: 'I',
    description: 'O Médico diagnostica e trata doenças, promovendo a saúde e salvando vidas. Com conhecimento científico profundo e empatia, cuida do bem-estar físico e mental dos pacientes. Se você quer unir ciência e cuidado humano, a medicina oferece essa oportunidade única.',
    strengths: 'Impacto direto na vida das pessoas, prestígio profissional, estabilidade financeira e aprendizado contínuo.',
    weaknesses: 'Formação longa e exigente, carga emocional, plantões extensos e responsabilidade sobre vidas.',
    relatedSubtypes: ['DIAGNÓSTICO', 'ANÁLISE', 'RESOLUÇÕES', 'OBSERVAÇÃO'],
  },
  {
    name: 'Tecnologia',
    type: 'I',
    description: 'O profissional de Tecnologia desenvolve sistemas, aplicações e soluções digitais que transformam o mundo. Com lógica e criatividade, cria ferramentas que conectam pessoas e automatizam processos. Se você gosta de inovação e resolver problemas com código, a tech é para você.',
    strengths: 'Mercado aquecido, trabalho remoto, salários competitivos e possibilidade de impacto global.',
    weaknesses: 'Evolução tecnológica acelerada, sedentarismo, burnout e necessidade de atualização constante.',
    relatedSubtypes: ['CURIOSIDADE', 'RACIOCÍNIO', 'RESOLUÇÕES', 'ESTUDO'],
  },
  {
    name: 'Análise de Dados',
    type: 'I',
    description: 'O Analista de Dados coleta, organiza e interpreta grandes volumes de informação para orientar decisões estratégicas. Com habilidades estatísticas e visão analítica, transforma números em insights valiosos. Se você gosta de encontrar padrões e contar histórias com dados, essa é sua área.',
    strengths: 'Alta demanda, versatilidade setorial, tomada de decisão baseada em evidências e salários atrativos.',
    weaknesses: 'Trabalho repetitivo com limpeza de dados, complexidade estatística e dependência de ferramentas específicas.',
    relatedSubtypes: ['ANÁLISE', 'PESQUISA', 'TEORIA', 'DIAGNÓSTICO'],
  },

  // Artístico (A)
  {
    name: 'Design',
    type: 'A',
    description: 'O Designer cria soluções visuais que comunicam, encantam e resolvem problemas. Com olhar estético e domínio de ferramentas criativas, transforma conceitos em experiências visuais memoráveis. Se você une criatividade e funcionalidade, o design é a sua linguagem.',
    strengths: 'Expressão criativa, versatilidade de atuação, impacto visual e possibilidade de trabalho freelancer.',
    weaknesses: 'Subjetividade das avaliações, prazos apertados, necessidade de portfólio e concorrência elevada.',
    relatedSubtypes: ['EXPRESSÃO', 'CRIATIVIDADE', 'ESTÉTICA', 'INOVAÇÃO'],
  },
  {
    name: 'Música',
    type: 'A',
    description: 'O Músico cria, interpreta e produz obras sonoras que emocionam e conectam pessoas. Com talento artístico e dedicação técnica, transforma sentimentos em melodias e ritmos. Se a música é sua forma de expressão e comunicação, essa carreira é a sua partitura.',
    strengths: 'Expressão emocional profunda, conexão com o público, liberdade criativa e satisfação artística.',
    weaknesses: 'Instabilidade financeira, competição intensa, exigência de prática constante e mercado volátil.',
    relatedSubtypes: ['EXPRESSÃO', 'IMAGINAÇÃO', 'IDENTIDADE', 'EXPERIÊNCIAS'],
  },
  {
    name: 'Escrita',
    type: 'A',
    description: 'O Escritor transforma ideias, histórias e conhecimento em textos que informam, inspiram e transformam. Com domínio da linguagem e sensibilidade narrativa, dá voz a mundos reais e imaginários. Se as palavras são o seu instrumento, a escrita é o seu palco.',
    strengths: 'Autonomia criativa, possibilidade de trabalho remoto, impacto cultural e versatilidade de formatos.',
    weaknesses: 'Renda irregular, bloqueio criativo, solidão no processo e dificuldade de reconhecimento.',
    relatedSubtypes: ['IMAGINAÇÃO', 'CRIATIVIDADE', 'IDENTIDADE', 'EXPRESSÃO'],
  },
  {
    name: 'Artes Visuais',
    type: 'A',
    description: 'O Artista Visual cria obras que provocam reflexão e emoção através de formas, cores e texturas. Com sensibilidade estética e técnica, expressa visões de mundo únicas em diferentes suportes. Se você enxerga arte em tudo ao redor, essa é a sua vocação.',
    strengths: 'Liberdade de expressão total, impacto cultural, originalidade e possibilidade de reconhecimento artístico.',
    weaknesses: 'Mercado restrito, renda instável, subjetividade da valorização e necessidade de networking.',
    relatedSubtypes: ['ESTÉTICA', 'ESTILO', 'EXPERIÊNCIAS', 'INOVAÇÃO'],
  },
  {
    name: 'Publicidade',
    type: 'A',
    description: 'O Publicitário cria campanhas que comunicam, persuadem e constroem marcas memoráveis. Com criatividade estratégica e visão de mercado, conecta produtos e serviços ao público certo. Se você gosta de unir arte e negócios, a publicidade é o seu campo.',
    strengths: 'Criatividade aplicada, dinâmica de trabalho, impacto comercial e possibilidade de premiações.',
    weaknesses: 'Pressão por resultados, prazos curtos, subjetividade dos clientes e mercado competitivo.',
    relatedSubtypes: ['CRIATIVIDADE', 'INOVAÇÃO', 'EXPRESSÃO', 'MUDANÇA'],
  },

  // Social (S)
  {
    name: 'Educação',
    type: 'S',
    description: 'O Educador forma cidadãos, transmite conhecimento e inspira transformações sociais. Com paciência e didática, cria ambientes de aprendizagem que moldam o futuro. Se você acredita no poder transformador do ensino e quer impactar gerações, a educação é sua missão.',
    strengths: 'Impacto social profundo, realização pessoal, estabilidade em redes públicas e férias regulares.',
    weaknesses: 'Baixa remuneração em muitos contextos, desgaste emocional, burocracia e falta de recursos.',
    relatedSubtypes: ['ENSINO', 'COMUNICAÇÃO', 'EMPATIA', 'COOPERAÇÃO'],
  },
  {
    name: 'Psicologia',
    type: 'S',
    description: 'O Psicólogo estuda o comportamento humano e auxilia pessoas a compreenderem suas emoções e relações. Com escuta ativa e técnicas terapêuticas, promove saúde mental e autoconhecimento. Se você se interessa pela mente humana e quer ajudar pessoas, a psicologia é para você.',
    strengths: 'Ajuda direta às pessoas, crescimento pessoal constante, versatilidade de atuação e demanda crescente.',
    weaknesses: 'Carga emocional elevada, formação contínua necessária, início de carreira desafiador e limites éticos.',
    relatedSubtypes: ['ESCUTA', 'EMPATIA', 'CUIDADO', 'APOIO'],
  },
  {
    name: 'Serviço Social',
    type: 'S',
    description: 'O Assistente Social defende direitos e promove a inclusão de populações vulneráveis. Com compromisso ético e visão sistêmica, atua na mediação entre indivíduos e políticas públicas. Se você quer lutar por justiça social e transformar realidades, essa é sua profissão.',
    strengths: 'Impacto social direto, atuação em políticas públicas, diversidade de campos e senso de propósito.',
    weaknesses: 'Condições de trabalho difíceis, sobrecarga emocional, baixa remuneração e frustrações sistêmicas.',
    relatedSubtypes: ['AJUDA', 'GRUPO', 'COLABORAÇÃO', 'COOPERAÇÃO'],
  },
  {
    name: 'Saúde',
    type: 'S',
    description: 'O profissional de Saúde cuida do bem-estar físico e emocional das pessoas. Com conhecimento técnico e humanidade, promove prevenção, tratamento e reabilitação. Se você quer dedicar sua vida a cuidar dos outros e fazer a diferença, a área da saúde é o seu chamado.',
    strengths: 'Propósito claro, estabilidade de emprego, reconhecimento social e aprendizado constante.',
    weaknesses: 'Plantões e horários irregulares, exposição a riscos, pressão emocional e cansaço físico.',
    relatedSubtypes: ['CUIDADO', 'EMPATIA', 'APOIO', 'ENSINO'],
  },
  {
    name: 'RH',
    type: 'S',
    description: 'O profissional de RH gerencia pessoas, desenvolve talentos e constrói culturas organizacionais saudáveis. Com habilidades interpessoais e visão estratégica, conecta objetivos da empresa ao bem-estar dos colaboradores. Se você gosta de pessoas e organizações, o RH é ideal.',
    strengths: 'Influência na cultura organizacional, desenvolvimento de pessoas, versatilidade e crescimento profissional.',
    weaknesses: 'Mediação de conflitos, decisões difíceis como demissões, burocracia e pressão por resultados.',
    relatedSubtypes: ['COMUNICAÇÃO', 'GRUPO', 'COLABORAÇÃO', 'ESCUTA'],
  },

  // Empreendedor (E)
  {
    name: 'Administração',
    type: 'E',
    description: 'O Administrador planeja, organiza e dirige recursos para alcançar objetivos organizacionais. Com visão estratégica e capacidade de liderança, otimiza processos e conduz equipes ao sucesso. Se você gosta de tomar decisões e gerenciar pessoas, a administração é sua arena.',
    strengths: 'Versatilidade de atuação, visão ampla de negócios, oportunidades de liderança e crescimento na carreira.',
    weaknesses: 'Mercado saturado, necessidade de diferenciação, pressão por resultados e tomada de decisões difíceis.',
    relatedSubtypes: ['LIDERANÇA', 'DECISÃO', 'VISÃO', 'INICIATIVA'],
  },
  {
    name: 'Vendas',
    type: 'E',
    description: 'O profissional de Vendas conecta produtos e serviços às necessidades dos clientes. Com habilidade de comunicação e persuasão, constrói relacionamentos comerciais duradouros e gera resultados. Se você é movido por metas e gosta de negociar, vendas é o seu terreno.',
    strengths: 'Potencial de ganhos ilimitados, desenvolvimento interpessoal, dinamismo e meritocracia.',
    weaknesses: 'Pressão por metas, rejeição constante, instabilidade de comissões e competitividade intensa.',
    relatedSubtypes: ['PERSUASÃO', 'INFLUÊNCIA', 'COMPETIÇÃO', 'AMBIÇÃO'],
  },
  {
    name: 'Marketing',
    type: 'E',
    description: 'O profissional de Marketing cria estratégias para posicionar marcas e conquistar mercados. Com criatividade e análise de dados, desenvolve campanhas que conectam empresas a seus públicos. Se você une visão de negócio com comunicação criativa, o marketing é para você.',
    strengths: 'Criatividade estratégica, impacto nos negócios, mercado dinâmico e possibilidade de trabalho digital.',
    weaknesses: 'Resultados nem sempre mensuráveis, mudanças constantes de tendência, pressão e concorrência.',
    relatedSubtypes: ['INFLUÊNCIA', 'EXPOSIÇÃO', 'RISCO', 'VISÃO'],
  },
  {
    name: 'Direito',
    type: 'E',
    description: 'O profissional do Direito defende interesses, resolve conflitos e garante a aplicação da justiça. Com argumentação sólida e conhecimento jurídico, atua em tribunais, empresas e órgãos públicos. Se você busca justiça e gosta de debater ideias, o Direito é seu campo.',
    strengths: 'Prestígio profissional, estabilidade em concursos, diversidade de áreas e impacto social.',
    weaknesses: 'Mercado saturado, formação longa, pressão por prazos processuais e carga de leitura intensa.',
    relatedSubtypes: ['DECISÃO', 'PERSUASÃO', 'LIDERANÇA', 'AMBIÇÃO'],
  },
  {
    name: 'Gestão',
    type: 'E',
    description: 'O Gestor coordena equipes, processos e recursos para atingir metas organizacionais. Com capacidade analítica e habilidades de liderança, transforma estratégias em resultados concretos. Se você gosta de coordenar pessoas e projetos, a gestão é a sua vocação.',
    strengths: 'Posição de influência, visão sistêmica, crescimento na carreira e impacto organizacional.',
    weaknesses: 'Alta responsabilidade, gestão de conflitos, cobrança por resultados e tomada de decisões sob pressão.',
    relatedSubtypes: ['LIDERANÇA', 'INICIATIVA', 'COMPETIÇÃO', 'VISÃO'],
  },

  // Convencional (C)
  {
    name: 'Contabilidade',
    type: 'C',
    description: 'O Contador registra, analisa e interpreta informações financeiras de empresas e pessoas. Com precisão numérica e conhecimento fiscal, garante a saúde financeira e conformidade legal. Se você gosta de números e organização, a contabilidade é o seu domínio.',
    strengths: 'Demanda constante, estabilidade profissional, possibilidade de autonomia e essencialidade em qualquer empresa.',
    weaknesses: 'Trabalho repetitivo, pressão em períodos fiscais, atualização legislativa constante e responsabilidade legal.',
    relatedSubtypes: ['DADOS', 'CONTROLE', 'PRECISÃO', 'DOCUMENTAÇÃO'],
  },
  {
    name: 'Finanças',
    type: 'C',
    description: 'O profissional de Finanças gerencia recursos monetários, investimentos e riscos financeiros. Com visão analítica e conhecimento de mercado, otimiza o patrimônio de empresas e indivíduos. Se você se interessa por economia e números, finanças é a sua especialidade.',
    strengths: 'Altos salários, mercado global, impacto estratégico nas organizações e crescimento profissional.',
    weaknesses: 'Alta pressão, volatilidade de mercados, longas jornadas e estresse constante com resultados.',
    relatedSubtypes: ['ORGANIZAÇÃO', 'ESTRUTURA', 'DADOS', 'PLANEJAMENTO'],
  },
  {
    name: 'Administração',
    type: 'C',
    description: 'O Administrador operacional mantém a engrenagem da empresa funcionando com eficiência. Com métodos organizacionais e atenção aos processos, garante que tudo siga conforme o planejado. Se você valoriza ordem, controle e eficiência, a administração operacional é para você.',
    strengths: 'Versatilidade, visão holística da empresa, oportunidades em todos os setores e estabilidade.',
    weaknesses: 'Burocracia, decisões baseadas em restrições, pressão por eficiência e gestão de recursos limitados.',
    relatedSubtypes: ['ORGANIZAÇÃO', 'CONTROLE', 'REGRAS', 'CONFORMIDADE'],
  },
  {
    name: 'Logística',
    type: 'C',
    description: 'O profissional de Logística planeja e coordena o fluxo de produtos, do fornecedor ao consumidor final. Com organização e visão sistêmica, otimiza prazos, custos e processos de distribuição. Se você gosta de planejar rotas e otimizar operações, a logística é seu mapa.',
    strengths: 'Mercado em crescimento com e-commerce, impacto direto nos custos, dinamismo e visão global.',
    weaknesses: 'Pressão por prazos, imprevistos operacionais, horários irregulares e gestão de cadeia complexa.',
    relatedSubtypes: ['ESTRUTURA', 'PLANEJAMENTO', 'PADRÃO', 'CONTROLE'],
  },
  {
    name: 'Auditoria',
    type: 'C',
    description: 'O Auditor examina processos, contas e controles para garantir conformidade e transparência. Com olhar crítico e metodologia rigorosa, identifica riscos e oportunidades de melhoria. Se você tem atenção aos detalhes e senso de justiça, a auditoria é seu campo.',
    strengths: 'Prestígio profissional, remuneração atrativa, atuação estratégica e demanda regulatória constante.',
    weaknesses: 'Trabalho minucioso e repetitivo, viagens frequentes, pressão por prazos e confronto com irregularidades.',
    relatedSubtypes: ['PRECISÃO', 'REGRAS', 'CONFORMIDADE', 'DOCUMENTAÇÃO'],
  },
];
