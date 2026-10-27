export type DimensionId = 'DEPEND' | 'ANXIETY' | 'CLOSE';

export interface QuestionItem {
  id: number;
  pergunta: string;
  dimensao: DimensionId;
  inverter: boolean;
}

export interface DimensionMeta {
  id: DimensionId;
  title: string;
  subtitle: string;
  shortDesc: string;
  description: string;
  childhoodFocus: string;
  adultBehavior: string;
  color: string;
  accentHex: string;
  benchmark: number; // typical secure population average
}

export interface StyleDiagnosis {
  id: 'seguro' | 'ansioso' | 'evitativo' | 'desorganizado';
  nome: string;
  subtitulo: string;
  resumoClinico: string;
  origemInfancia: string;
  dinamicaAdulto: string;
  gatilhosEmocionais: string[];
  mecanismosDefesa: string[];
  caminhosCrescimento: string[];
  colorBadge: string;
  accentColor: string;
  cartesianZone: string;
}

export const OPCOES_RESPOSTA: Record<number, { label: string; short: string }> = {
  1: { label: 'Discordo totalmente', short: 'Discordo total' },
  2: { label: 'Discordo em parte', short: 'Discordo parcial' },
  3: { label: 'Neutro / Indiferente', short: 'Neutro' },
  4: { label: 'Concordo em parte', short: 'Concordo parcial' },
  5: { label: 'Concordo totalmente', short: 'Concordo total' },
};

export const DIMENSOES_META: Record<DimensionId, DimensionMeta> = {
  DEPEND: {
    id: 'DEPEND',
    title: 'Confiança no Suporte',
    subtitle: 'Disponibilidade do Outro e Raiz Familiar',
    shortDesc: 'Avalia a crença na confiabilidade dos outros e a expectativa de amparo em momentos de necessidade.',
    description:
      'Mede o grau em que o indivíduo confia na disponibilidade e benevolência das pessoas e figuras de apego quando enfrenta vulnerabilidades.',
    childhoodFocus:
      'Enraizado na previsibilidade e proteção que os cuidadores demonstraram quando a criança expressou dor, medo ou necessidade física e afetiva.',
    adultBehavior:
      'Altos índices facilitam a interdependência madura e o pedido de auxílio sem sensação de humilhação; baixos índices levam à autossuficiência defensiva.',
    color: 'emerald',
    accentHex: '#059669',
    benchmark: 3.8,
  },
  ANXIETY: {
    id: 'ANXIETY',
    title: 'Ansiedade de Abandono',
    subtitle: 'Medo de Rejeição e Insegurança Infantil',
    shortDesc: 'Mede o nível de hipervigilância, temor de ser deixado ou não ser amado com reciprocidade.',
    description:
      'Reflete a ativação contínua do sistema de apego, gerando busca frenética por garantias, medo crônico de perda e sensibilidade extrema a sinais de rejeição.',
    childhoodFocus:
      'Comum em históricos com figuras de cuidado inconsistentes ou invasivas, alternando momentos de afeto com indiferença ou negligência emocional.',
    adultBehavior:
      'Manifesta-se em ciúmes, necessidade obsessiva de validação, desespero perante o silêncio do parceiro e tendência a anular os próprios limites para reter o outro.',
    color: 'amber',
    accentHex: '#d97706',
    benchmark: 2.1,
  },
  CLOSE: {
    id: 'CLOSE',
    title: 'Conforto com Intimidade',
    subtitle: 'Vulnerabilidade e Proximidade Afetiva',
    shortDesc: 'Avalia o quanto a pessoa se sente confortável em se aproximar intimamente e compartilhar emoções.',
    description:
      'Avalia o conforto emocional e físico perante vínculos profundos, revelação de vulnerabilidades e entrega mútua sem fobia de sufocamento.',
    childhoodFocus:
      'Construído em lares onde a expressão emocional espontânea (como choro, fragilidade e afeto) era validada e calorosamente acolhida.',
    adultBehavior:
      'Altas pontuações permitem intimidade profunda sem perda de individualidade; pontuações baixas provocam afastamento quando o vínculo se aprofunda.',
    color: 'indigo',
    accentHex: '#4f46e5',
    benchmark: 3.9,
  },
};

export const TESTE_AVANCADO_DATA: QuestionItem[] = [
  // ---- DIMENSÃO: DEPEND (Confiança no Suporte e Raiz Familiar) ----
  { id: 1, pergunta: "Eu sinto que posso recorrer aos outros e figuras de cuidado quando preciso de ajuda.", dimensao: "DEPEND", inverter: false },
  { id: 2, pergunta: "Para mim, é difícil confiar plenamente nas pessoas ou depender delas.", dimensao: "DEPEND", inverter: true },
  { id: 3, pergunta: "Frequentemente eu sinto que as pessoas não estão lá quando mais preciso delas.", dimensao: "DEPEND", inverter: true },
  { id: 4, pergunta: "Eu me sinto confortável dependendo de outras pessoas emocionalmente.", dimensao: "DEPEND", inverter: false },
  { id: 5, pergunta: "Eu tenho certeza de que os outros estarão disponíveis quando eu pedir apoio.", dimensao: "DEPEND", inverter: false },
  { id: 6, pergunta: "Sinto que é um risco muito grande colocar minhas necessidades nas mãos de terceiros.", dimensao: "DEPEND", inverter: true },
  { id: 7, pergunta: "Na minha infância, meus pais me passavam a clara segurança de que me protegeriam de qualquer perigo.", dimensao: "DEPEND", inverter: false },
  { id: 8, pergunta: "Muitas vezes senti que precisava me virar sozinho desde muito cedo porque não dava para contar com os adultos.", dimensao: "DEPEND", inverter: true },
  { id: 9, pergunta: "Eu acredito que a maioria das pessoas é essencialmente boa e confiável.", dimensao: "DEPEND", inverter: false },
  { id: 10, pergunta: "As promessas que as pessoas me fazem geralmente me deixam desconfiado.", dimensao: "DEPEND", inverter: true },
  { id: 11, pergunta: "Sinto que construir uma dinâmica onde um depende do outro é algo saudável e natural.", dimensao: "DEPEND", inverter: false },
  { id: 12, pergunta: "Raramente peço ajuda, mesmo quando estou sobrecarregado ou passando por momentos difíceis.", dimensao: "DEPEND", inverter: true },

  // ---- DIMENSÃO: ANXIETY (Medo de Abandono, Rejeição e Insegurança Infantil) ----
  { id: 13, pergunta: "Eu costumo me preocupar com a possibilidade de as pessoas me abandonarem.", dimensao: "ANXIETY", inverter: false },
  { id: 14, pergunta: "Eu tenho um medo frequente de que meu parceiro ou amigos não me amem de verdade.", dimensao: "ANXIETY", inverter: false },
  { id: 15, pergunta: "Eu sinto que preciso de constantes garantias e provas de que as pessoas gostam de mim.", dimensao: "ANXIETY", inverter: false },
  { id: 16, pergunta: "Quando alguém se afasta um pouco, eu entro em pânico ou fico extremamente frustrado.", dimensao: "ANXIETY", inverter: false },
  { id: 17, pergunta: "Minha maior ferida emocional é o medo de ser rejeitado ou deixado para trás.", dimensao: "ANXIETY", inverter: false },
  { id: 18, pergunta: "Eu exijo muita proximidade das pessoas, o que às vezes acaba afastando-as.", dimensao: "ANXIETY", inverter: false },
  { id: 19, pergunta: "Lembro-me de sentir muita ansiedade ou medo de ser esquecido/deixado pelos meus pais quando criança.", dimensao: "ANXIETY", inverter: false },
  { id: 20, pergunta: "Se alguém demora a me responder, imediatamente penso que fiz algo errado ou que a pessoa perdeu o interesse.", dimensao: "ANXIETY", inverter: false },
  { id: 21, pergunta: "Eu me sinto altamente hipersensível a qualquer sinal de frieza ou distanciamento.", dimensao: "ANXIETY", inverter: false },
  { id: 22, pergunta: "Mesmo quando as coisas estão bem, fico esperando o momento em que tudo vai desmoronar.", dimensao: "ANXIETY", inverter: false },
  { id: 23, pergunta: "Frequentemente tolero situações ruins ou desrespeito apenas pelo medo de ficar sozinho.", dimensao: "ANXIETY", inverter: false },
  { id: 24, pergunta: "Eu sinto que amo ou me importo com as pessoas muito mais do que elas se importam comigo.", dimensao: "ANXIETY", inverter: false },

  // ---- DIMENSÃO: CLOSE (Conforto com Intimidade e Expressão de Sentimentos) ----
  { id: 25, pergunta: "Eu tenho facilidade em me aproximar intimamente e expressar meus sentimentos reais.", dimensao: "CLOSE", inverter: false },
  { id: 26, pergunta: "Eu me sinto desconfortável quando alguém tenta criar um vínculo emocional muito profundo comigo.", dimensao: "CLOSE", inverter: true },
  { id: 27, pergunta: "Eu prefiro manter uma distância segura das pessoas para não correr o risco de me machucar.", dimensao: "CLOSE", inverter: true },
  { id: 28, pergunta: "Eu não me importo em me abrir e compartilhar minhas vulnerabilidades e segredos.", dimensao: "CLOSE", inverter: false },
  { id: 29, pergunta: "Fico nervoso ou sufocado quando percebo que alguém está ficando muito dependente de mim.", dimensao: "CLOSE", inverter: true },
  { id: 30, pergunta: "A ideia de entrega ou fusão emocional completa com outra pessoa me assusta bastante.", dimensao: "CLOSE", inverter: true },
  { id: 31, pergunta: "Na minha casa, falar sobre sentimentos, chorar ou demonstrar fraqueza era algo bem-vindo e acolhido.", dimensao: "CLOSE", inverter: false },
  { id: 32, pergunta: "Quando as pessoas começam a ficar muito íntimas de mim, eu sinto uma necessidade inconsciente de me afastar.", dimensao: "CLOSE", inverter: true },
  { id: 33, pergunta: "Eu me sinto completamente confortável demonstrando afeto físico e verbal em público ou no privado.", dimensao: "CLOSE", inverter: false },
  { id: 34, pergunta: "Eu sinto que fecho uma 'muralha emocional' sempre que alguém atinge um ponto muito profundo da minha vida.", dimensao: "CLOSE", inverter: true },
  { id: 35, pergunta: "Detesto a sensação de me sentir vulnerável diante de qualquer pessoa.", dimensao: "CLOSE", inverter: true },
  { id: 36, pergunta: "Eu consigo equilibrar perfeitamente minha individualidade enquanto estou profundamente conectado a alguém.", dimensao: "CLOSE", inverter: false }
];

export const ESTILOS_APEGO: Record<StyleDiagnosis['id'], StyleDiagnosis> = {
  seguro: {
    id: 'seguro',
    nome: 'Estilo Seguro / Autônomo',
    subtitulo: 'Segurança Adquirida e Conexão Equilibrada',
    resumoClinico:
      'Seus pais agiram como uma "base segura" previsível na sua primeira e segunda infância. O algoritmo indica alta resiliência adaptativa, permitindo que você confie, dependa e se entregue emocionalmente sem medo de perder sua identidade ou de ser rejeitado.',
    origemInfancia:
      'Ambiente primário caracterizado por sintonização emocional consistente. Seus cuidadores reconheciam e validavam seus estados de angústia sem desespero nem frieza, ensinando o sistema nervoso a se autorregular com naturalidade.',
    dinamicaAdulto:
      'Capacidade de estabelecer limites saudáveis, expressar necessidades diretamente sem jogos emocionais, tolerar discordâncias e sustentar intimidade sem fobia de invasão ou pânico de abandono.',
    gatilhosEmocionais: [
      'Injustiça crônica ou desrespeito deliberado de acordos relacionais',
      'Situações prolongadas de falta de reciprocidade em parcerias',
    ],
    mecanismosDefesa: [
      'Comunicação assertiva e busca direta de reparação',
      'Capacidade de manter a própria autoestima mesmo perante rejeição circunstancial',
    ],
    caminhosCrescimento: [
      'Desenvolver paciência ativa com parceiros de estilos inseguros (ansiosos ou evitativos)',
      'Aprofundar a escuta empática em momentos de conflito intenso sem assumir a responsabilidade total pela regulação alheia',
      'Manter o autocuidado nos períodos de sobrecarga relacional',
    ],
    colorBadge: 'emerald',
    accentColor: '#059669',
    cartesianZone: 'Quadrante Inferior Esquerdo (Baixa Ansiedade · Baixa Evasão)',
  },
  ansioso: {
    id: 'ansioso',
    nome: 'Estilo Ansioso / Ambivalente',
    subtitulo: 'Hiperativação do Apego e Medo de Abandono',
    resumoClinico:
      'Sua raiz aponta para um ambiente de infância com pais emocionalmente inconsistentes. Por não saber quando receberia afeto ou frieza, seu cérebro aprendeu a vigiar constantemente as reações dos outros. O algoritmo acusa um medo crônico e estrutural de rejeição/abandono.',
    origemInfancia:
      'Cuidadores carinhosos em certos períodos, mas intermitentemente ausentes, ansiosos ou indisponíveis em outros. A imprevisibilidade forçou seu sistema límbico a amplificar o chamado de socorro para reter a figura materna ou paterna.',
    dinamicaAdulto:
      'Forte tendência à hipervigilância relacional: monitoramento de horários de mensagens, busca constante por reafirmações de afeto, fusão de limites e terror em relação a momentos normais de afastamento do outro.',
    gatilhosEmocionais: [
      'Demora nas respostas ou mudanças sutis de tom de voz',
      'Momentos em que o parceiro solicita tempo ou espaço para si mesmo',
      'Sensação de que o outro está distante, distraído ou com outros interesses',
    ],
    mecanismosDefesa: [
      'Comportamentos de protesto (ligações insistentes, drama, frieza punitiva calculada)',
      'Submissão e anulação dos próprios desejos para evitar o risco de ser deixado',
      'Ruminar pensamentos catastróficos antecipando o fim do vínculo',
    ],
    caminhosCrescimento: [
      'Treinar a pausa consciente antes de reagir à sensação de rejeição imaginada',
      'Construir um centro de gravidade próprio com interesses, amizades e projetos autônomos',
      'Aprender a autorregulação somática (respiração diafragmática) quando sentir a onda de pânico do abandono',
      'Substituir acusações indiretas por pedidos explícitos de acolhimento',
    ],
    colorBadge: 'amber',
    accentColor: '#d97706',
    cartesianZone: 'Quadrante Superior Esquerdo (Alta Ansiedade · Baixa Evasão)',
  },
  evitativo: {
    id: 'evitativo',
    nome: 'Estilo Evitativo / Desconectado',
    subtitulo: 'Desativação do Apego e Autossuficiência Compulsiva',
    resumoClinico:
      'Sua infância exigiu uma postura de autossuficiência forçada. Seus pais costumavam rejeitar, minimizar ou punir demonstrações de choro, dor ou carência. O algoritmo mostra que hoje você reprime a necessidade de intimidade e prefere o isolamento seguro para blindar sua vulnerabilidade.',
    origemInfancia:
      'Pais emocionalmente distantes, excessivamente rígidos ou focados apenas em realizações práticas. Para evitar a dor repetida da rejeição direta, a criança "desliga" o circuito da necessidade e conclui precocemente que só pode contar consigo mesma.',
    dinamicaAdulto:
      'Muralha protetora contra vulnerabilidade íntima. Quando o parceiro busca maior profundidade, surge a sensação de sufocamento, irritação ou perda de liberdade. Foco exacerbado no trabalho, hobbies individuais ou rotinas intocáveis.',
    gatilhosEmocionais: [
      'Demandas emocionais intensas do parceiro ("precisamos conversar sobre nós")',
      'Expectativa de demonstração de fragilidade ou choro diante de terceiros',
      'Sensação de controle, perda de privacidade ou obrigações de dependência mútua',
    ],
    mecanismosDefesa: [
      'Afastamento físico ou silêncio prolongado (bloqueio de comunicação)',
      'Hiperintelectualização e desvalorização dos sentimentos do outro',
      'Focalizar em pequenos defeitos do parceiro como justificativa inconsciente para romper',
    ],
    caminhosCrescimento: [
      'Reconhecer que precisar de suporte e afeto humano é biológico, e não sinal de fraqueza',
      'Praticar pequenas confissões diárias de sentimentos reais com pessoas de confiança',
      'Avisar ao parceiro quando precisar de espaço sem desaparecer abruptamente',
      'Distinguir intimidade madura de perda de soberania pessoal',
    ],
    colorBadge: 'slate',
    accentColor: '#475569',
    cartesianZone: 'Quadrante Inferior Direito (Baixa Ansiedade · Alta Evasão)',
  },
  desorganizado: {
    id: 'desorganizado',
    nome: 'Estilo Desorganizado / Medroso',
    subtitulo: 'Conflito de Aproximação-Fuga e Ferida Traumática',
    resumoClinico:
      'O algoritmo detectou um conflito severo: alta ansiedade por conexão cruzada com forte bloqueio de intimidade. Sua raiz sugere que os cuidadores foram, simultaneamente, refúgio de sobrevivência e fonte de medo, gerando o dilema: "Desejo intimidade, mas quando ela se aproxima, sinto pavor de ser destruído".',
    origemInfancia:
      'Contextos de infância com ameaças, instabilidade drástica, caos familiar ou figuras de cuidado assustadoras/assustadas. O cérebro da criança entra no paradoxo biológico: o instinto manda correr em direção ao cuidador em busca de amparo, mas o mesmo cuidador é o gerador do perigo.',
    dinamicaAdulto:
      'Padrão "quente e frio". A pessoa se apaixona intensamente e busca fusão, mas assim que o relacionamento se estabiliza ou ganha profundidade, é tomada por um terror súbito de controle/traição e repele violentamente o parceiro.',
    gatilhosEmocionais: [
      'Crescimento rápido da intimidade e compromisso formal',
      'Sensação simultânea de dependência e impotência perante o outro',
      'Conflitos interpessoais que reativam sensações de abandono ou abuso do passado',
    ],
    mecanismosDefesa: [
      'Autossabotagem preventiva em relacionamentos promissores',
      'Oscilação abrupta entre ciúme possessivo e total indiferença aparente',
      'Desassociação emocional e hipervigilância defensiva',
    ],
    caminhosCrescimento: [
      'Psicoterapia focada em trauma (reprocessamento e terapia de esquemas)',
      'Identificar o ciclo aproximação-rejeição antes de agir no impulso de fuga',
      'Construir relacionamentos com pessoas seguras e emocionalmente reguladas com ritmo gradual',
      'Acolher a criança interior que aprendeu a temer aquilo que mais desejava',
    ],
    colorBadge: 'rose',
    accentColor: '#e11d48',
    cartesianZone: 'Quadrante Superior Direito (Alta Ansiedade · Alta Evasão)',
  },
};

export interface DiagnosticResult {
  medias: Record<DimensionId, number>;
  pontosPorDimensao: Record<DimensionId, number[]>;
  scoresFormatados: Record<DimensionId, string>;
  estilo: StyleDiagnosis;
  // Coordenadas cartesianas no modelo de 2 eixos
  coordenadas: {
    ansiedadeY: number;
    evasaoX: number;
  };
  totalRespondidas: number;
  percentualConclusao: number;
}

export function calcularDiagnostico(respostas: Record<number, number>): DiagnosticResult {
  const pontosPorDimensao: Record<DimensionId, number[]> = {
    DEPEND: [],
    ANXIETY: [],
    CLOSE: [],
  };

  TESTE_AVANCADO_DATA.forEach((item) => {
    const notaBruta = respostas[item.id] ?? 3;
    // Lógica de Correção de Itens Invertidos
    const notaFinal = item.inverter ? 6 - notaBruta : notaBruta;
    pontosPorDimensao[item.dimensao].push(notaFinal);
  });

  const medias: Record<DimensionId, number> = {
    DEPEND: Number((pontosPorDimensao.DEPEND.reduce((a, b) => a + b, 0) / pontosPorDimensao.DEPEND.length).toFixed(2)),
    ANXIETY: Number((pontosPorDimensao.ANXIETY.reduce((a, b) => a + b, 0) / pontosPorDimensao.ANXIETY.length).toFixed(2)),
    CLOSE: Number((pontosPorDimensao.CLOSE.reduce((a, b) => a + b, 0) / pontosPorDimensao.CLOSE.length).toFixed(2)),
  };

  const scoresFormatados = {
    DEPEND: medias.DEPEND.toFixed(2),
    ANXIETY: medias.ANXIETY.toFixed(2),
    CLOSE: medias.CLOSE.toFixed(2),
  };

  // ÁRVORE DE DECISÃO CLÍNICA DO CÓDIGO FORNECIDO
  let estiloId: StyleDiagnosis['id'] = 'desorganizado';

  if (medias.ANXIETY <= 2.6 && medias.CLOSE >= 3.4 && medias.DEPEND >= 3.4) {
    estiloId = 'seguro';
  } else if (medias.ANXIETY >= 3.4 && medias.CLOSE < 3.4) {
    estiloId = 'ansioso';
  } else if (medias.ANXIETY <= 3.0 && medias.CLOSE < 3.0 && medias.DEPEND < 3.0) {
    estiloId = 'evitativo';
  } else {
    estiloId = 'desorganizado';
  }

  // Cálculo da dimensão de evasão para o modelo cartesiano (1.0 a 5.0)
  const proximidadeMedia = (medias.CLOSE + medias.DEPEND) / 2;
  const evasaoX = Math.max(1.0, Math.min(5.0, Number((6 - proximidadeMedia).toFixed(2))));
  const ansiedadeY = medias.ANXIETY;

  const totalRespondidas = Object.keys(respostas).length;
  const percentualConclusao = Math.round((totalRespondidas / TESTE_AVANCADO_DATA.length) * 100);

  return {
    medias,
    pontosPorDimensao,
    scoresFormatados,
    estilo: ESTILOS_APEGO[estiloId],
    coordenadas: {
      ansiedadeY,
      evasaoX,
    },
    totalRespondidas,
    percentualConclusao,
  };
}

// Perfis de exemplo para demonstração e testes rápidos
export const PRESETS_TESTE: Record<string, { label: string; desc: string; answers: Record<number, number> }> = {
  seguro: {
    label: 'Exemplo: Apego Seguro',
    desc: 'Alta confiança no suporte, facilidade para intimidade e baixa ansiedade de abandono.',
    answers: {
      1: 5, 2: 1, 3: 1, 4: 5, 5: 5, 6: 1, 7: 5, 8: 1, 9: 5, 10: 1, 11: 5, 12: 1,
      13: 1, 14: 1, 15: 2, 16: 1, 17: 2, 18: 1, 19: 1, 20: 1, 21: 2, 22: 1, 23: 1, 24: 1,
      25: 5, 26: 1, 27: 1, 28: 5, 29: 1, 30: 1, 31: 5, 32: 1, 33: 5, 34: 1, 35: 1, 36: 5,
    },
  },
  ansioso: {
    label: 'Exemplo: Apego Ansioso',
    desc: 'Hipervigilância, medo persistente de perda e desejo frequente de validação.',
    answers: {
      1: 4, 2: 3, 3: 4, 4: 3, 5: 3, 6: 4, 7: 2, 8: 4, 9: 3, 10: 4, 11: 3, 12: 3,
      13: 5, 14: 5, 15: 5, 16: 5, 17: 5, 18: 4, 19: 4, 20: 5, 21: 5, 22: 4, 23: 5, 24: 5,
      25: 3, 26: 3, 27: 4, 28: 3, 29: 3, 30: 4, 31: 2, 32: 3, 33: 3, 34: 4, 35: 4, 36: 2,
    },
  },
  evitativo: {
    label: 'Exemplo: Apego Evitativo',
    desc: 'Autossuficiência forçada, bloqueio a pedidos de ajuda e aversão à vulnerabilidade.',
    answers: {
      1: 1, 2: 5, 3: 5, 4: 1, 5: 1, 6: 5, 7: 1, 8: 5, 9: 2, 10: 5, 11: 1, 12: 5,
      13: 2, 14: 1, 15: 1, 16: 2, 17: 2, 18: 1, 19: 2, 20: 1, 21: 1, 22: 2, 23: 1, 24: 2,
      25: 1, 26: 5, 27: 5, 28: 1, 29: 5, 30: 5, 31: 1, 32: 5, 33: 1, 34: 5, 35: 5, 36: 1,
    },
  },
  desorganizado: {
    label: 'Exemplo: Apego Desorganizado',
    desc: 'Conflito simultâneo de carência de afeto cruzada com fobia aguda de intimidade.',
    answers: {
      1: 2, 2: 4, 3: 4, 4: 2, 5: 2, 6: 4, 7: 2, 8: 4, 9: 2, 10: 4, 11: 2, 12: 4,
      13: 4, 14: 4, 15: 4, 16: 4, 17: 5, 18: 4, 19: 4, 20: 4, 21: 4, 22: 4, 23: 4, 24: 4,
      25: 2, 26: 4, 27: 4, 28: 2, 29: 4, 30: 4, 31: 2, 32: 4, 33: 2, 34: 4, 35: 4, 36: 2,
    },
  },
};
