export type ModalKind =
  | 'agendar'
  | 'online'
  | 'infantil'
  | 'contato'
  | 'abordagem'
  | null;

export interface LinkCardItem {
  id: Exclude<ModalKind, null | 'abordagem'>;
  titleLine1: string;
  titleLine2: string;
  bgColor: string;
  textColor: string;
  iconColor: string;
  imageSrc: string;
  imageAlt: string;
  layout: 'photo-left' | 'photo-right';
  iconType?: 'laptop' | 'child' | 'chat';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SocialLink {
  id: 'instagram' | 'facebook' | 'youtube';
  label: string;
  handle: string;
  url: string;
}

export const PALETTE = {
  chantilly: '#FEFCF5',
  cantaloupe: '#F7E2C0',
  haze: '#F0EBF2',
  dahlia: '#FAE7E8',
  gumdrop: '#E9F7F0',
  ink: '#362F34',
  inkSoft: '#5A5056',
} as const;

export const PROFILE = {
  monogram: 'ke',
  firstName: 'Karla',
  lastName: 'Eduarda',
  role: 'Psicóloga',
  specialty: 'Crianças e Pré-adolescentes',
  crp: 'CRP 06/182940',
  heroTaglinePrefix: 'Cuidado emocional para ',
  heroTaglineBold1: 'crianças',
  heroTaglineMiddle: ' e ',
  heroTaglineBold2: 'pré-adolescentes',
  heroTaglineSuffix: ' com escuta, afeto e leveza.',
  heroImage: 'assets/images/laura-hero.png',
  sobreImage: 'assets/images/laura-sobre.png',
  quotePrefix:
    'Crescer fica mais leve quando há um lugar seguro para sentir, brincar e ser ouvido. Aqui, crianças e pré-adolescentes encontram ',
  quoteBold: 'escuta sensível, acolhimento',
  quoteSuffix:
    ' e apoio gentil para fortalecer a autoestima, lidar com as emoções e construir vínculos saudáveis.',
  sobreTitle: 'Sobre mim',
  sobreBody:
    'Sou Karla Eduarda, psicóloga clínica dedicada ao atendimento online de crianças e pré-adolescentes. Com abordagem humanista e recursos lúdicos da terapia cognitivo-comportamental, acolho o universo infantil com respeito e caminho junto às famílias para promover segurança emocional, autonomia e bem-estar.',
  sobreButtonLabel: 'Minha abordagem',
  copyrightName: 'Karla Eduarda',
  copyrightYear: '2027',
  whatsappDisplay: '(11) 98432-7104',
  email: 'contato@karlaeduardapsi.com.br',
};

export const LINK_CARDS: LinkCardItem[] = [
  {
    id: 'agendar',
    titleLine1: 'Agende sua',
    titleLine2: 'sessão',
    bgColor: PALETTE.cantaloupe,
    textColor: '#3A2E25',
    iconColor: '#6D5642',
    imageSrc: 'assets/images/card-agende.png',
    imageAlt: 'Ambiente acolhedor com poltronas claras e plantas',
    layout: 'photo-left',
  },
  {
    id: 'online',
    titleLine1: 'Psicoterapia',
    titleLine2: 'Online',
    bgColor: PALETTE.haze,
    textColor: '#362E3B',
    iconColor: '#5B4E63',
    imageSrc: 'assets/images/card-online.png',
    imageAlt: 'Notebook e xícara preparados para atendimento online',
    layout: 'photo-right',
    iconType: 'laptop',
  },
  {
    id: 'infantil',
    titleLine1: 'Crianças e',
    titleLine2: 'Pré-adolescentes',
    bgColor: PALETTE.dahlia,
    textColor: '#3D2C30',
    iconColor: '#6E4C52',
    imageSrc: 'assets/images/card-individual.png',
    imageAlt: 'Espaço calmo e iluminado para atendimento infantojuvenil',
    layout: 'photo-right',
    iconType: 'child',
  },
  {
    id: 'contato',
    titleLine1: 'Fale',
    titleLine2: 'comigo',
    bgColor: PALETTE.gumdrop,
    textColor: '#283A31',
    iconColor: '#3E5E4E',
    imageSrc: 'assets/images/card-contato.png',
    imageAlt: 'Ramos naturais em ambiente sereno',
    layout: 'photo-right',
    iconType: 'chat',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'idade-atendimento',
    question: 'A partir de qual idade atende crianças e pré-adolescentes?',
    answer:
      'O atendimento online é voltado para crianças a partir de 6 anos e pré-adolescentes até 14 anos. Para crianças menores de 6 anos, realizo acompanhamento por meio de orientação parental, ajudando mãe, pai ou responsáveis a compreenderem e acolherem o desenvolvimento emocional no dia a dia.',
  },
  {
    id: 'como-funciona-online',
    question: 'Como funciona a psicoterapia online para o público infantil?',
    answer:
      'As sessões acontecem por videochamada segura, usando jogos interativos, histórias, desenhos, metáforas e conversas adaptadas à faixa etária. Antes do primeiro encontro com a criança ou pré-adolescente, realizo uma entrevista inicial exclusivamente com os responsáveis para alinhar demandas e preparar o ambiente.',
  },
  {
    id: 'participacao-pais',
    question: 'Os pais participam das sessões ou recebem devolutivas?',
    answer:
      'Sim. O vínculo com a família é parte essencial do processo. As sessões da criança são reservadas para fortalecer a confiança e a livre expressão, mas realizo encontros periódicos de devolutiva e orientação com os responsáveis para compartilhar avanços e estratégias práticas para a rotina.',
  },
  {
    id: 'sinais-terapia',
    question: 'Quando buscar psicoterapia para meu filho(a)?',
    answer:
      'Mudanças bruscas de humor, medos intensos, dificuldade para dormir, irritabilidade frequente, queda no rendimento escolar, timidez excessiva, insegurança, luto, separação dos pais ou desafios na convivência com colegas são sinais importantes de que o acompanhamento psicológico pode ajudar.',
  },
  {
    id: 'duracao-frequencia',
    question: 'Qual é a duração e a frequência das sessões?',
    answer:
      'Cada sessão tem duração média de 45 a 50 minutos, conforme a idade e a capacidade de concentração da criança ou pré-adolescente. A frequência recomendada inicialmente costuma ser semanal para construir vínculo e continuidade no cuidado.',
  },
  {
    id: 'agendamento-rapido',
    question: 'Como funciona a primeira sessão e o agendamento?',
    answer:
      'O agendamento é rápido: basta clicar em "Agende sua sessão", escolher o foco do atendimento (Criança, Pré-adolescente ou Orientação aos Pais), informar o melhor dia e período e enviar. Em seguida, confirmo o horário diretamente pelo seu WhatsApp.',
  },
];

export const TRUST_METRICS = [
  {
    value: '+30',
    label: 'PACIENTES',
  },
  {
    value: 'Desde 2023',
    label: 'CUIDANDO DE HISTÓRIAS',
  },
  {
    value: 'Atendimento',
    label: 'ONLINE',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@karlaeduarda.psi',
    url: 'https://instagram.com',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: '/karlaeduardapsicologa',
    url: 'https://facebook.com',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    handle: 'Karla Eduarda Psicóloga',
    url: 'https://youtube.com',
  },
];
