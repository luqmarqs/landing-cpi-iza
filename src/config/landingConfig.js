const landingConfig = {
  // Cores de fundo personalizaveis
  backgroundColors: {
    page: '#111319',
    hero: 'transparent',
    footer: 'transparent',
  },

  // 0) Background image
  backgroundImage: "/images/background.webp",

  // 1) Imagem capa hero
  heroImage: "/images/hero-desktop.webp",

  // 2) Imagem capa hero mobile
  heroImageMobile: "/images/hero-mobile.webp",

  // 4) Titulo hero
  heroTitle: "Minas Contra o Feminicidio",

  // 5) Subtitulo hero
  heroSubtitle:
    "Uma mobilizacao publica para fortalecer redes de protecao, denuncia e acolhimento.",

  // 6) Texto para WhatsApp
  whatsappText:
    "Oi! Quero participar da mobilizacao e receber atualizacoes sobre a campanha.",

  // 12) Integracao do formulario
  formIntegration: {
    // Opcoes sugeridas: 'google-forms' | 'json-api'
    provider: 'google-forms',

    // Endpoint de envio
    endpoint:
      'https://docs.google.com/forms/d/e/1FAIpQLScn46xJuZuka4P4UnEQjKhQuz3r1vPCoTa06XtuhbMTkiPhhw/formResponse',

    // Configuracao para Google Forms
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

    // Configuracao para backend proprio / webhook / banco via API
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

  // 13) URL de referencia do contador
  counterReferenceUrl:
    "https://script.google.com/macros/s/AKfycbz-bf8QgHbKJwUa9nYXvcWDjvuuVfGNvy_1AvZRnpvmneSfj9RT5XvS-C4T0wh4-xbc/exec",

  // 14) Texto do checkbox do formulario
  formCheckboxText: 'Eu concordo com o uso dos meus dados conforme a',

  // 15) Integracoes de analytics (opcionais)
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

  // 7) Secao de conteudo: titulo, texto, imagem
  contentSection: {
    title: "Por que essa mobilizacao importa",
    text: "Todos os dias, mulheres enfrentam violencia dentro e fora de casa. Esta landing pode ser adaptada para abaixo-assinado, captacao de apoio ou divulgacao de servicos de acolhimento.",
    image: "/images/content.webp",
  },

  // 8) Politica de privacidade
  privacyPolicy:
    "Ao enviar seus dados, voce autoriza o contato da equipe organizadora para comunicacoes sobre a campanha, conforme a LGPD. Seus dados nao serao comercializados e podem ser removidos mediante solicitacao.",

  // 3), 9), 10), 11) Footer
  footer: {
    // 9) Logo footer
    logo: "/images/footer-logo.webp",

    // 10) Instagram footer
    instagram: "https://www.instagram.com/izalourenca/",

    // 10.1) Texto do Instagram no footer
    instagramLabel: '@izalourenca',

    // 11) Texto footer
    text: "Esta mobilizacao e uma iniciativa cidada. Junte-se para ampliar a rede de protecao e denuncia.",
  },
}

export default landingConfig