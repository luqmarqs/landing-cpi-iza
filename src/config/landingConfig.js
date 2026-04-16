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
    "Não queremos apagão: CPI da Educação!\n\nA educação pública de Belo Horizonte vive uma crise profunda. O que deveria ser prioridade virou sinônimo de desorganização, precarização e abandono.\n\nUma Comissão Parlamentar de Inquérito (CPI) é fundamental para investigar irregularidades e trazer transparência.",

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
    text: "A crise da educação em Belo Horizonte não é acidental. É resultado de decisões, falta de prioridade e falta de transparência.\n\nNos últimos 5 anos vivemos uma verdadeira desorganização: gestões instáveis, contratos sob suspeita, professores faltando, dinheiro desaparecendo e ninguém prestando contas.\n\nA CPI é essencial para trazer luz a tudo isso e defender o direito fundamental dos nossos filhos.",
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
      text: "Mesmo com concurso vigente, faltam professores em várias escolas. Isso tem causado:\n\n• Sobrecarga e adoecimento de professores\n• Diretores assumindo sala de aula\n• Falta de coordenação pedagógica\n• Ausência de aulas de português e matemática\n\nQuem paga essa conta são os estudantes e os trabalhadores da educação.",
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
    text: "Não é sobre disputa política. É sobre exigir respostas.\n\nA CPI vai investigar irregularidades, restaurar transparência e defender a educação pública de Belo Horizonte.",
    highlights: [
      "✔ Investigar os contratos obscuros",
      "✔ Explicar o desaparecimento de recursos",
      "✔ Proteger professores e trabalhadores",
      "✔ Garantir aulas para todos",
      "✔ Defender o direito fundamental à educação",
    ],
  },

  // ===== SEÇÃO 4: CTA ANTES DO FORMULÁRIO =====
  ctaSection: {
    title: "✊ EDUCAÇÃO NÃO É NEGÓCIO. É DIREITO.",
    text: "Não queremos apagão: CPI da Educação!\n\nBelo Horizonte precisa de respostas. E a CPI é o primeiro passo.\n\nAssine o abaixo-assinado e demonstre que a população apoia essa investigação fundamental.",
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
    logo: "/images/footer-logo.webp",
    text: "Não queremos apagão: CPI da Educação!\n\nNão é sobre disputa política. É sobre transparência, investigação de irregularidades, proteção de trabalhadores e o direito fundamental à educação.",
    instagram: "https://www.instagram.com/izalourenca/",
    instagramLabel: '@izalourenca',
    privacyLinkText: 'Politica de privacidade',
  },

  // ===== PRIVACIDADE =====
  privacyPolicy:
    "Ao assinar este abaixo-assinado, você autoriza a equipe organizadora a utilizar seus dados para comunicações sobre a CPI do Apagão da Educação, conforme a Lei Geral de Proteção de Dados (LGPD). Seus dados: não serão vendidos ou compartilhados com terceiros; serão utilizados exclusivamente para fins desta campanha; podem ser removidos mediante solicitação. Respeitamos seu compromisso com a educação pública e a transparência.",

  // ===== CONTATO FLUTUANTE WHATSAPP =====
  whatsappContact: {
    number: '5531900000000', // formato: código país + DDD + número, sem espaços ou traços
    message: 'Olá! Vim pelo site da CPI da Educação e gostaria de entrar em contato.',
  },

  // ===== WHITE LABEL / SHARING =====
  whatsappText:
    "Não queremos apagão: CPI da Educação!\n\nA educação pública de BH está em crise. Falta gestão, faltam professores, faltam recursos. Apoie a CPI do Apagão da Educação e exija transparência! Confira:",

  // ===== INTEGRAÇÃO FORMULÁRIO =====
  formIntegration: {
    provider: 'google-forms',
    endpoint:
      'https://docs.google.com/forms/d/e/1FAIpQLScn46xJuZuka4P4UnEQjKhQuz3r1vPCoTa06XtuhbMTkiPhhw/formResponse',
    googleForms: {
      fieldIds: {
        nome: 'entry.841108454',
        nascimento: {
          year: 'entry.2078748064_year',
          month: 'entry.2078748064_month',
          day: 'entry.2078748064_day',
        },
        whatsapp: 'entry.1963593262',
        email: 'entry.1835698599',
        uf: 'entry.1397297655',
        cidade: 'entry.1434357970',
        lgpd: 'entry.1477377412',
      },
      lgpdAcceptedValue: 'Aceito politica de privacidade',
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
    "https://script.google.com/macros/s/AKfycbz-bf8QgHbKJwUa9nYXvcWDjvuuVfGNvy_1AvZRnpvmneSfj9RT5XvS-C4T0wh4-xbc/exec",

  // ===== ANALYTICS =====
  analytics: {
    googleAnalytics: {
      enabled: false,
      measurementId: '',
    },
    metaPixel: {
      enabled: false,
      pixelId: '',
    },
  },
}

export default landingConfig