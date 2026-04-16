const landingConfig = {
  // ===== VISUAL =====
  backgroundColors: {
    page: '#FFFFFF',
    hero: '#4C1D95',
    footer: '#2E1065',
  },
  heroImage: "/images/hermann-books-5937716.webp",
  heroImageMobile: "/images/hermann-books-5937716.webp",

  // ===== HERO SECTION =====
  heroTitle: "Não queremos apagão: CPI da Educação!",
  heroSubtitle:
    "A educação pública de Belo Horizonte vive uma crise profunda. O que deveria ser prioridade virou sinônimo de desorganização, precarização e abandono.\n\nUma Comissão Parlamentar de Inquérito (CPI) é fundamental para investigar irregularidades e trazer transparência.",

  // ===== CONTADOR =====
  counterLabel: "pessoas ja assinaram",
  
  // ===== HERO ACTIONS =====
  heroActions: {
    ctaButtonText: "Assinar Agora",
    whatsappButtonText: "Compartilhar no WhatsApp",
  },

  // ===== SEÇÃO 1: CONTEXTO (PROBLEMA) =====
  contextSection: {
    title: "POR QUE A CPI É NECESSÁRIA?",
    text: "A crise da educação em Belo Horizonte não é acidental. É resultado de decisões, falta de prioridade e falta de transparência.\n\nNos últimos 5 anos vivemos uma verdadeira desorganização: gestões instáveis, contratos sob suspeita e professores faltando.\n\nA CPI é essencial para trazer luz a tudo isso e defender o direito fundamental dos nossos filhos.",
  },

  // ===== SEÇÃO 2: 5 MOTIVOS (BLOCOS VISUAIS) =====
  reasonsSection: {
    title: '5 Motivos para Apoiar a CPI',
  },
  reasons: [
    {
      icon: "1️⃣",
      title: "INSTABILIDADE TOTAL NA GESTÃO",
      text: "Nos últimos 5 anos, a educação municipal teve 6 secretários diferentes.\n\nEssa rotatividade revela falta de prioridade, quebra de continuidade e ausência de planejamento. O resultado? Um verdadeiro apagão da educação pública.",
    },
    {
      icon: "2️⃣",
      title: "CONTRATOS SOB SUSPEITA",
      text: "Durante a gestão do ex-secretário Bruno Barral, afastado após investigação da Polícia Federal, foram firmados contratos que até hoje não foram devidamente esclarecidos.\n\nA Prefeitura afirmou que investigaria — mas cadê os resultados?\n\nA CPI é essencial para trazer transparência.",
    },
    {
      icon: "3️⃣",
      title: "FALTA DE PROFESSORES E PRECARIZAÇÃO",
      text: "Mesmo com concurso vigente, faltam professores em várias escolas. Isso tem causado:\n\n• Sobrecarga e adoecimento de professores\n• Diretores assumindo sala de aula\n• Falta de coordenação pedagógica\n• Ausência de aulas de português e matemática, dentre outras.\n\nÉ preciso apurar quem é o responsável por essa situação e se não há uma intenção a médio prazo de levar as escolas ao limite e criar uma situação que justifique perante a opinião pública a alteração da lei orgânica para permitir contratos precários e com isso \"resolver\" a crise.\n\nQuem paga essa conta são os estudantes e os trabalhadores da educação.",
    },
    {
      icon: "4️⃣",
      title: "CAOS NA TERCEIRIZAÇÃO E ATAQUE AOS TRABALHADORES",
      text: "A transição de contratos virou colapso:\n\n• Trabalhadores sem salário e sem direitos\n• Falta de contrato formal\n• Pressão para pedir demissão\n• Insegurança total e adoecimento mental\n\nA MGS judicializou o caso, acusando a Prefeitura de descumprir acordo no Ministério Público do Trabalho.",
    },
    {
      icon: "5️⃣",
      title: "CADÊ O DINHEIRO DA EDUCAÇÃO?",
      text: "Direções escolares denunciam dificuldades para manter funcionamento básico:\n\n• Falta de verba nas caixas escolares\n• Dificuldade para garantir materiais\n• Limitação na execução de atividades pedagógicas\n\nIsso acontece em uma área com orçamento significativo. A pergunta é inevitável: cadê o dinheiro da educação pública?",
    },
  ],

  // ===== SEÇÃO 3: REFORÇO =====
  reinforcementSection: {
    title: "⚠️ A CPI É NECESSÁRIA",
    text: "A CPI não é sobre disputa política — é sobre:",
    highlights: [
      "✔ garantir transparência",
      "✔ investigar irregularidades",
      "✔ defender a educação pública",
      "✔ proteger trabalhadores",
      "✔ assegurar o direito dos estudantes",
    ],
  },

  // ===== SEÇÃO 4: CTA ANTES DO FORMULÁRIO =====
  ctaSection: {
    title: "✊ EDUCAÇÃO NÃO É NEGÓCIO. É DIREITO.",
    text: "Belo Horizonte precisa de respostas.\n\nE a CPI é o primeiro passo.\n\nAssine o abaixo-assinado e demonstre que a população apoia essa iniciativa.",
    buttonText: "ASSINAR AGORA",
  },

  // ===== FORMULÁRIO - TEXT CONTENT =====
  formSection: {
    title: "ASSINE E EXIJA A CPI",
    ctaButtonText: "ASSINAR AGORA",
    whatsappButtonText: "Compartilhar no WhatsApp",
    successMessage: "Sua assinatura foi registrada com sucesso! 🎉\n\nDeseja compartilhar este abaixo-assinado no WhatsApp e chamar mais pessoas para apoiar a CPI?",
  },

  // ===== FORM FIELDS =====
  formFields: {
    nome: {
      placeholder: "Seu nome completo",
      label: "Nome",
    },
    rg: {
      placeholder: "RG",
      label: "RG",
    },
    nascimento: {
      label: "Data de nascimento*",
      icon: "📅",
    },
    whatsapp: {
      placeholder: "Telefone ou WhatsApp",
      label: "Telefone",
    },
    email: {
      placeholder: "seu@email.com",
      label: "E-mail",
    },
    uf: {
      placeholder: "Estado",
      label: "Estado",
    },
    cidade: {
      placeholder: "Cidade",
      label: "Cidade",
    },
  },

  // ===== FORM VALIDATION MESSAGES =====
  formValidation: {
    telefoneIncompleto: "Telefone incompleto",
    telefoneInvalido: "Telefone inválido",
    emailInvalido: "E-mail inválido",
    cidadeInvalida: "Selecione uma cidade válida",
    lgpdRequired: "É necessário concordar para assinar o abaixo-assinado.",
  },

  // ===== CHECKBOX LGPD =====
  formCheckboxText: 'Concordo em apoiar a CPI e receber atualizações conforme a',
  formCheckboxLinkText: 'política de privacidade',

  // ===== FOOTER =====
  footer: {
    logo: "/images/LOGO-SIMPLES-AMARELO.png",
    text: "Essa iniciativa é do mandato da vereadora Iza Lourença, comprometida com a transparência, a investigação de irregularidades e a defesa da educação pública de Belo Horizonte.",
    instagram: "https://www.instagram.com/izalourenca/",
    instagramLabel: '@izalourenca',
    privacyLinkText: 'Politica de privacidade',
  },

  // ===== PRIVACIDADE =====
  privacyPolicy:
    "Ao assinar este abaixo-assinado, você autoriza a equipe organizadora a utilizar seus dados para comunicações sobre a CPI do Apagão da Educação, conforme a Lei Geral de Proteção de Dados (LGPD). Seus dados: não serão vendidos ou compartilhados com terceiros; serão utilizados exclusivamente para fins desta campanha; podem ser removidos mediante solicitação. Respeitamos seu compromisso com a educação pública e a transparência.",

  // ===== CONTATO FLUTUANTE WHATSAPP =====
  whatsappContact: {
    number: '5531993246781', // formato: código país + DDD + número, sem espaços ou traços
    message: 'Olá! Vim pelo site da CPI da Educação e gostaria de entrar em contato.',
  },

  // ===== WHITE LABEL / SHARING =====
  whatsappText:
    "Não queremos apagão: CPI da Educação!\n\nA educação pública de BH está em crise. Falta gestão, faltam professores, faltam recursos. Apoie a CPI do Apagão da Educação e exija transparência! Confira:",

  // ===== INTEGRAÇÃO FORMULÁRIO =====
  formIntegration: {
    provider: 'google-forms',
    endpoint:
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLScCdCW0e44KqsIdpgH569tKbNeQuGp0gaUP3uicjS9JmhgpyA/formResponse',
    googleForms: {
      fieldIds: {
        nome: 'entry.444893001',
        rg: 'entry.1282772015',
        nascimento: {
          year: 'entry.315384187_year',
          month: 'entry.315384187_month',
          day: 'entry.315384187_day',
        },
        whatsapp: 'entry.850934725',
        email: 'entry.1120520517',
        uf: 'entry.420560265',
        cidade: 'entry.296241263',
        lgpd: 'entry.2102880556',
      },
      lgpdAcceptedValue: 'aceito',
    },
    jsonApi: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      fieldMap: {
        nome: 'nome',
        nascimento: 'nascimento',
        whatsapp: 'whatsapp',
        email: 'email',
        uf: 'uf',
        cidade: 'cidade',
        lgpd: 'lgpd',
      },
    },
  },

  // ===== COUNTER API =====
  counterReferenceUrl:
    "https://script.google.com/macros/s/AKfycbxfjMhyMbui54QcOoe-3UZS_ErlPpxfTb4o3sVodeTSDyGCaHzGmmnt5FDpVAgyLsEe/exec",

  // ===== ANALYTICS =====
  analytics: {
    googleAnalytics: {
      enabled: true,
      measurementId: 'G-DZF77VG3G5',
    },
    metaPixel: {
      enabled: false,
      pixelId: '',
    },
  },
}

export default landingConfig