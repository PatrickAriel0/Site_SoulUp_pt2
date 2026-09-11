import type {
  EtapaProcesso,
  Indicador,
  ModuloSolucao,
  Passagem,
  PerguntaFrequente,
} from "@/types";

/** Perguntas frequentes, migradas do faq.html da Sprint 02 e categorizadas. */
export const perguntasFrequentes: PerguntaFrequente[] = [
  {
    id: 1,
    categoria: "Plataforma",
    pergunta: "O que é a plataforma SoulUp?",
    subtitulo: "Sustentabilidade com benefícios reais",
    resposta:
      "A SoulUp é uma plataforma sustentável que permite aos usuários acumularem pontos através de ações ecológicas no dia a dia. Esses pontos podem ser convertidos em benefícios reais, como créditos para transporte público e descontos em serviços parceiros.",
  },
  {
    id: 2,
    categoria: "Pontos",
    pergunta: "Como funciona a conversão de pontos?",
    subtitulo: "Conversão simples e rápida",
    resposta:
      "Os usuários acumulam pontos realizando atividades sustentáveis dentro da plataforma SoulUp. Após isso, os pontos podem ser convertidos em saldo para utilização em sistemas de mobilidade urbana, ajudando no pagamento de passagens de ônibus, metrô e outros meios de transporte público.",
  },
  {
    id: 3,
    categoria: "Segurança",
    pergunta: "Como o sistema evita fraudes?",
    subtitulo: "Segurança e validação de informações",
    resposta:
      "A plataforma realiza validações de dados dos usuários e controle de operações para evitar utilização indevida dos pontos. Além disso, cada conversão realizada gera registros internos para monitoramento e segurança das transações.",
  },
  {
    id: 4,
    categoria: "Impacto",
    pergunta: "Qual é o impacto ambiental do projeto?",
    subtitulo: "Redução de impactos ambientais",
    resposta:
      "O projeto incentiva a utilização do transporte público, contribuindo diretamente para a redução da emissão de gases poluentes e ajudando no desenvolvimento de cidades mais sustentáveis e com menor impacto ambiental.",
  },
  {
    id: 5,
    categoria: "Pontos",
    pergunta: "Quais benefícios o usuário recebe?",
    subtitulo: "Economia e sustentabilidade ao mesmo tempo",
    resposta:
      "Além de contribuir com o meio ambiente, os usuários conseguem economizar financeiramente utilizando seus pontos para gerar créditos de transporte, tornando a mobilidade urbana mais acessível.",
  },
  {
    id: 6,
    categoria: "Plataforma",
    pergunta: "A SoulUp possui aplicativo?",
    subtitulo: "Facilidade para os usuários",
    resposta:
      "Sim. A SoulUp está sendo desenvolvida para permitir acesso rápido e prático aos usuários através de dispositivos móveis.",
  },
];

/** Categorias derivadas do proprio conteudo, para o filtro do FAQ. */
export const categoriasFaq = [
  "Todas",
  ...new Set(perguntasFrequentes.map((item) => item.categoria)),
] as const;

/**
 * Modulos da solucao. O slug alimenta a rota dinamica /solucao/:slug,
 * entao precisa ser unico e amigavel para a URL.
 */
export const modulosSolucao: ModuloSolucao[] = [
  {
    slug: "carteira-de-pontos",
    nome: "Carteira de Pontos",
    chamada: "Simule o saldo SoulUp e converta em passagem",
    descricao:
      "A carteira reúne os pontos ganhos com ações sustentáveis e mostra, em tempo real, quanto isso representa em reais. A partir dela o usuário escolhe a modalidade de transporte e envia o crédito para o Bilhete Único.",
    icone: "◈",
    destaque: "100 pontos = R$ 1,00",
    recursos: [
      "Saldo em pontos e em reais atualizado a cada operação",
      "Conversão direta em passagem de ônibus ou metrô",
      "Bloqueio da operação quando o saldo é insuficiente",
      "Histórico das últimas movimentações da sessão",
    ],
  },
  {
    slug: "calculadora-de-impacto",
    nome: "Calculadora de Impacto",
    chamada: "Descubra o CO₂ e o dinheiro que você deixa de gastar",
    descricao:
      "A calculadora estima quanto de dióxido de carbono deixa de ser emitido e quanto o usuário economiza ao trocar o carro particular pelo transporte público, usando fatores de emissão por tipo de combustível.",
    icone: "◉",
    destaque: "4 tipos de veículo",
    recursos: [
      "Fator de emissão específico por combustível",
      "Economia mensal e projeção anual de gastos",
      "Equivalência do CO₂ em árvores adultas",
      "Barra visual do nível de impacto de cada indicador",
    ],
  },
  {
    slug: "integracao-bilhete-unico",
    nome: "Integração Bilhete Único",
    chamada: "Do aplicativo direto para a catraca",
    descricao:
      "Camada de integração que transmite o saldo convertido para os postos de recarga. O usuário aproxima o cartão em qualquer validador de ônibus, metrô ou terminal para confirmar o crédito.",
    icone: "◎",
    destaque: "Recarga em até 2h",
    recursos: [
      "Sincronização segura com o perfil SoulUp",
      "Envio do saldo para a rede de validadores",
      "Registro de cada conversão para auditoria",
      "Confirmação da recarga no próprio aplicativo",
    ],
  },
];

/** Busca um modulo da solucao pelo slug da URL. */
export function buscarModuloPorSlug(slug: string): ModuloSolucao | undefined {
  return modulosSolucao.find((modulo) => modulo.slug === slug);
}

/** Passo a passo do resgate, migrado da lista ordenada do index.html. */
export const etapasProcesso: EtapaProcesso[] = [
  {
    numero: 1,
    titulo: "Pratique hábitos verdes na SoulUp",
    descricao:
      "Realize atividades sustentáveis na sua rotina e registre no aplicativo da SoulUp para acumular pontos e moedas ecológicas.",
  },
  {
    numero: 2,
    titulo: "Sincronize sua carteira NepTune Labs",
    descricao:
      "A plataforma se conecta de forma segura ao seu perfil SoulUp e exibe o saldo de pontos atualizado em tempo real.",
  },
  {
    numero: 3,
    titulo: "Realize a conversão de pontos",
    descricao:
      "Escolha a quantidade de pontos que deseja resgatar e informe o número de identificação do seu cartão de transporte público.",
  },
  {
    numero: 4,
    titulo: "Valide e viaje",
    descricao:
      "O saldo é transmitido para os postos de recarga. Aproxime o cartão de um validador no ônibus, metrô ou terminal e confirme a recarga.",
  },
];

/** Numeros de impacto exibidos na Home e na pagina Sobre. */
export const indicadores: Indicador[] = [
  {
    valor: "50 mil",
    rotulo: "Usuários beneficiados",
    detalhe: "Meta de alcance da plataforma na primeira fase de operação.",
  },
  {
    valor: "1 mi",
    rotulo: "Toneladas de CO₂ evitadas",
    detalhe: "Projeção acumulada com a migração para o transporte coletivo.",
  },
  {
    valor: "1 bi",
    rotulo: "Veículos em circulação",
    detalhe: "Frota global que pressiona o trânsito e a qualidade do ar.",
  },
  {
    valor: "100 pts",
    rotulo: "Equivalem a R$ 1,00",
    detalhe: "Taxa de conversão aplicada no resgate para o Bilhete Único.",
  },
];

/** Modalidades disponiveis na carteira de pontos. */
export const passagens: Passagem[] = [
  {
    tipo: "onibus",
    nome: "Ônibus",
    custoPontos: 530,
    valorReais: 5.3,
    icone: "🚌",
  },
  {
    tipo: "metro",
    nome: "Metrô",
    custoPontos: 540,
    valorReais: 5.4,
    icone: "🚇",
  },
];
