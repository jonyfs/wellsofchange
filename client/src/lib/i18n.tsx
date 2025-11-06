import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "pt-BR" | "es" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("wellsofchange-language");
    return (saved as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("wellsofchange-language", lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

const translations: Record<Language, any> = {
  en: {
    nav: {
      ourStory: "Our Story",
      whatWeDo: "What We Do",
      ourCommitment: "Our Commitment",
      whoWeAre: "Who We Are",
      ethics: "Code of Ethics",
      joinUs: "Join Us",
      donate: "Donate",
    },
    hero: {
      title: "Changing lives, one well at a time",
      subtitle: "While some search for water on other planets, over a billion still struggle for a drop here on Earth.",
      call: "This needs to change! It's in our hands.",
      donateButton: "Make a Donation",
      storyButton: "Learn Our Story",
      scrollDown: "Learn more",
    },
    mission: {
      title: "What We Believe",
      belief1: "We believe that technology exists, is available, and should serve those who need it most first.",
      belief2: "We believe that transparency transforms donation into investment — when investors, communities and society can see real impact, drop by drop.",
      belief3: "We believe that a well is not just infrastructure — it is dignity, it is freedom, it is future.",
      belief4: "We believe that every community deserves the chance to flourish where it is.",
    },
    story: {
      title: "Our Story",
      p1: "Wells of Change emerged during the pandemic, in a context of reflection on the role of technology in times of crisis.",
      p2: "In a lecture promoted by Intelie, a company specialized in operational intelligence and real-time monitoring of oil wells, the importance of technological diversity and the potential to apply advanced solutions to urgent social challenges were discussed.",
      p3: "At that moment, water became a symbol of inequality and urgency. The question that arose was simple but transformative: if we can employ artificial intelligence and real-time data to optimize oil extraction, why not do the same to ensure access to water?",
      p4: "This idea was consolidated based on previous experiences in the field of photovoltaic pumping and sustainable rural electrification projects.",
      quote: "Thus Wells of Change was born with the conviction that technology must serve life and that every drop of water can rekindle hope where it seemed lost.",
    },
    whatWeDo: {
      title: "What We Do",
      subtitle: "We don't just bring water. We bring possibilities.",
      intro: "Each well we build is more than a point of access to drinking water.",
      childTitle: "Protected Childhood",
      childDesc: "A child who doesn't need to walk miles with a bucket on their head.",
      motherTitle: "Family Dignity",
      motherDesc: "A mother who can take care of her family's hygiene with dignity.",
      farmerTitle: "Sustainable Agriculture",
      farmerDesc: "A farmer who can plan their harvest without relying only on rain.",
      communityTitle: "Thriving Community",
      communityDesc: "An entire community that has reasons to stay, grow and prosper.",
      tech1: "We drill the soil, install solar-powered pumps and apply real-time monitoring technology.",
      metricWater: "Every drop",
      metricWaterLabel: "is measured",
      metricImpact: "Every impact",
      metricImpactLabel: "is documented",
      metricStory: "Every story",
      metricStoryLabel: "is told",
      tech2: "With transparent data showing exactly how each dollar invested transforms into life.",
      visibility: "Because we believe visibility generates more visibility.\nAnd that demonstrated impact generates more impact.",
    },
    commitment: {
      title: "Our Commitment",
      wellComplete: "Well Complete",
      wellLocation: "Campo Formoso, Bahia",
      solar: "Solar",
      solarDesc: "Clean and sustainable energy",
      monitoring: "Monitoring",
      monitoringDesc: "Real-time data",
      impact: "Impact",
      impactDesc: "Lives transformed",
      location: "We started in Campo Formoso, in the interior of Bahia.",
      start: "The first well is complete. Life has already begun to change!",
      intro: "But this is just the beginning.",
      one1: "One well at a time.",
      one2: "One community at a time.",
      one3: "One life at a time.",
      reach: "From the Brazilian Northeast to Senegal, we go where thirst is most urgent and hope seems most distant.",
      lasting: "And we don't stop when the water starts flowing. We stay. We teach. We empower.",
      tools: "We ensure that each community has the tools and knowledge to keep its own source of life alive.",
      need: "Because this is just the beginning. We need you to continue.",
    },
    change: {
      title: "Together For Change",
      intro: "We are volunteers — engineers, developers, geologists, administrators, communicators — united by a simple and profound certainty: we can do better.",
      investTitle: "Invest Resources",
      investDesc: "Every donation transforms into water, health and dignity for communities that need it most.",
      investButton: "Make Donation",
      shareTitle: "Share the Cause",
      shareDesc: "Help spread our mission. The more people know, the more lives we can transform.",
      shareButton: "Share",
      volunteerTitle: "Become a Volunteer",
      volunteerDesc: "Join our team of specialists and contribute your knowledge and skills.",
      volunteerButton: "I Want to Participate",
      transformationTitle: "Because when water arrives, everything transforms:",
      transform1: "Thirst → Satiety",
      transform2: "Disease → Health",
      transform3: "Migration → Permanence",
      transform4: "Survival → Prosperity",
      transform5: "Despair → Dignity",
      transform6: "And you can see it happen in real time.",
      manifestoTitle: "WELLS OF CHANGE",
      manifestoTagline: "Changing lives, one well at a time.",
      manifesto1: "Because water is not a favor. It is a right.",
      manifesto2: "Because technology is not a privilege. It is a tool.",
      manifesto3: "Because community is not a statistic. It is life.",
      manifestoClosing: "Together, we drill more than soil. We drill through barriers. We open paths. We plant future.",
      manifestoFinal: "The change starts here. Drop by drop. Well by well.",
    },
    whoWeAre: {
      title: "Who We Are",
      intro: "Wells of Change is driven by a diverse team of dedicated professionals united by a common purpose: transforming lives through access to clean water.",
      leadership: "Leadership",
      advisors: "Advisory Board",
    },
    ethics: {
      title: "Code of Ethics",
      intro: "Wells of Change operates with the highest standards of transparency, integrity, and social commitment. Our code of ethics guides all our actions and decisions.",
      
      principle1Title: "Total Transparency",
      principle1Text: "Every donation received is publicly documented. All our financial operations are subject to independent audits, and detailed reports are available to the public. We believe transparency builds trust and demonstrates our commitment to the efficient use of resources.",
      
      principle2Title: "Non-Partisanship",
      principle2Text: "Wells of Change is completely independent and non-partisan. We have no affiliation with political parties or movements. Our mission is exclusively humanitarian and social, serving communities in need regardless of political, religious, or ideological affiliations.",
      
      principle3Title: "Independent Auditing",
      principle3Text: "Our accounts are audited annually by independent certified auditors. All financial reports, impact assessments, and operational activities are reviewed and validated by third parties to ensure integrity and accountability.",
      
      principle4Title: "Efficient Resource Use",
      principle4Text: "We commit to maximizing the impact of every dollar donated. Our operational costs are minimized through volunteerism and strategic partnerships, ensuring that the maximum amount possible is directed to projects that directly transform lives.",
      
      principle5Title: "Social Commitment",
      principle5Text: "Our sole purpose is to provide access to clean water and sustainable technology to communities in extreme need. We work with dignity and respect, empowering communities to maintain their own infrastructure and build a sustainable future.",
      
      principle6Title: "Professional Ethics",
      principle6Text: "All our volunteers and partners adhere to the highest ethical standards. We do not tolerate any form of discrimination, corruption, or unethical conduct. Decisions are made collectively and documented.",
      
      auditTitle: "Audits and Accountability",
      auditText: "Wells of Change is committed to absolute transparency. Our accounts are audited annually by independent auditors, and all reports are publicly available. We believe that accountability is fundamental to building trust with our donors and the communities we serve.",
      
      nonPartisanTitle: "Declaration of Non-Partisanship",
      nonPartisanText: "Wells of Change declares itself completely independent of any political party, political movement, or partisan ideology. Our work is guided exclusively by humanitarian and social values. We do not support candidates, parties, or political causes. Our mission is to serve communities in need, regardless of their political affiliations or beliefs.",
    },
    footer: {
      description: "Changing lives, one well at a time. Bringing clean water and sustainable technology to communities that need it most.",
      navTitle: "Navigation",
      contactTitle: "Contact",
      socialTitle: "Follow Us",
      location: "Rio de Janeiro, Brazil",
      copyright: "Wells of Change. Transforming lives through technology and clean water.",
      transparency: "Committed to total transparency. Every donation is tracked and every impact is documented.",
    },
    donate: "Donate",
  },
  "pt-BR": {
    nav: {
      ourStory: "Nossa História",
      whatWeDo: "O Que Fazemos",
      ourCommitment: "Nosso Compromisso",
      whoWeAre: "Quem Somos",
      ethics: "Código de Ética",
      joinUs: "Junte-se a Nós",
      donate: "Doar",
    },
    hero: {
      title: "Mudando vidas, um poço por vez",
      subtitle: "Enquanto alguns procuram água em outros planetas, mais de um bilhão ainda lutam por uma gota aqui na Terra.",
      call: "Isso precisa mudar! Está nas nossas mãos.",
      donateButton: "Fazer Doação",
      storyButton: "Conheça Nossa História",
      scrollDown: "Saiba mais",
    },
    mission: {
      title: "O Que Nós Acreditamos",
      belief1: "Acreditamos que a tecnologia existe, está disponível, e deve servir primeiro a quem mais precisa.",
      belief2: "Acreditamos que transparência transforma doação em investimento — quando investidores, comunidades e toda a sociedade podem ver o impacto real, gota por gota.",
      belief3: "Acreditamos que um poço não é apenas infraestrutura — é dignidade, é liberdade, é futuro.",
      belief4: "Acreditamos que toda comunidade merece a chance de florescer onde está.",
    },
    story: {
      title: "Nossa História",
      p1: "A Wells of Change surgiu durante a pandemia, em um contexto de reflexão sobre o papel da tecnologia em tempos de crise.",
      p2: "Em uma palestra promovida pela Intelie, empresa especializada em inteligência operacional e monitoramento em tempo real de poços de petróleo, discutia-se a importância da diversidade tecnológica e o potencial de aplicar soluções avançadas a desafios sociais urgentes.",
      p3: "Naquele momento, a água tornou-se símbolo de desigualdade e urgência. A pergunta que se impôs foi simples, mas transformadora: se conseguimos empregar inteligência artificial e dados em tempo real para otimizar a extração de petróleo, por que não fazer o mesmo para garantir acesso à água?",
      p4: "Essa ideia se consolidou com base em experiências prévias no campo do bombeamento fotovoltaico e em projetos de eletrificação rural sustentável.",
      quote: "Assim nasceu a Wells of Change com a convicção de que a tecnologia deve servir à vida e que cada gota de água pode reacender a esperança onde ela parecia perdida.",
    },
    whatWeDo: {
      title: "O Que Fazemos",
      subtitle: "Não levamos apenas água. Levamos possibilidades.",
      intro: "Cada poço que construímos é mais do que um ponto de acesso à água potável.",
      childTitle: "Infância Protegida",
      childDesc: "Uma criança que não precisa caminhar quilômetros com um balde na cabeça.",
      motherTitle: "Dignidade Familiar",
      motherDesc: "Uma mãe que pode cuidar da higiene da família com dignidade.",
      farmerTitle: "Agricultura Sustentável",
      farmerDesc: "Um agricultor que pode planejar sua colheita sem depender apenas da chuva.",
      communityTitle: "Comunidade Próspera",
      communityDesc: "Uma comunidade inteira que tem motivos para ficar, crescer e prosperar.",
      tech1: "Nós perfuramos o solo, instalamos bombas movidas a energia solar e aplicamos tecnologia de monitoramento em tempo real.",
      metricWater: "Cada gota",
      metricWaterLabel: "é medida",
      metricImpact: "Cada impacto",
      metricImpactLabel: "é documentado",
      metricStory: "Cada história",
      metricStoryLabel: "é contada",
      tech2: "Com dados transparentes que mostram exatamente como cada real investido se transforma em vida.",
      visibility: "Porque acreditamos que visibilidade gera mais visibilidade.\nE que impacto demonstrado gera mais impacto.",
    },
    commitment: {
      title: "Nosso Compromisso",
      wellComplete: "Poço Completo",
      wellLocation: "Campo Formoso, Bahia",
      solar: "Solar",
      solarDesc: "Energia limpa e sustentável",
      monitoring: "Monitoramento",
      monitoringDesc: "Dados em tempo real",
      impact: "Impacto",
      impactDesc: "Vidas transformadas",
      location: "Começamos em Campo Formoso, no interior da Bahia.",
      start: "O primeiro poço está completo. A vida já começou a mudar!",
      intro: "Mas este é apenas o começo.",
      one1: "Um poço por vez.",
      one2: "Uma comunidade por vez.",
      one3: "Uma vida por vez.",
      reach: "Do Nordeste Brasileiro até o Senegal, vamos onde a sede é mais urgente e a esperança parece mais distante.",
      lasting: "E não paramos quando a água começa a jorrar. Ficamos. Ensinamos. Empoderamos.",
      tools: "Garantimos que cada comunidade tenha as ferramentas e o conhecimento para manter viva a sua própria fonte de vida.",
      need: "Porque este é apenas o começo. Precisamos de você para continuar.",
    },
    whoWeAre: {
      title: "Quem Somos",
      intro: "A Wells of Change é movida por uma equipe diversificada de profissionais dedicados, unidos por um propósito comum: transformar vidas através do acesso à água potável.",
      leadership: "Liderança",
      advisors: "Conselho Consultivo",
    },
    change: {
      title: "Juntos Pela Mudança",
      intro: "Somos voluntários — engenheiros, desenvolvedores, geólogos, administradores, comunicadores — unidos por uma certeza simples e profunda: podemos fazer melhor.",
      investTitle: "Investir Recursos",
      investDesc: "Cada doação se transforma em água, saúde e dignidade para comunidades que mais precisam.",
      investButton: "Fazer Doação",
      shareTitle: "Compartilhar a Causa",
      shareDesc: "Ajude a espalhar nossa missão. Quanto mais pessoas souberem, mais vidas podemos transformar.",
      shareButton: "Compartilhar",
      volunteerTitle: "Ser Voluntário",
      volunteerDesc: "Junte-se ao nosso time de especialistas e contribua com seu conhecimento e habilidades.",
      volunteerButton: "Quero Participar",
      transformationTitle: "Porque quando a água chega, tudo se transforma:",
      transform1: "Sede → Saciedade",
      transform2: "Doença → Saúde",
      transform3: "Migração → Permanência",
      transform4: "Sobrevivência → Prosperidade",
      transform5: "Desespero → Dignidade",
      transform6: "E você pode ver isso acontecer em tempo real.",
      manifestoTitle: "WELLS OF CHANGE",
      manifestoTagline: "Mudando vidas, um poço por vez.",
      manifesto1: "Porque água não é favor. É direito.",
      manifesto2: "Porque tecnologia não é privilégio. É ferramenta.",
      manifesto3: "Porque comunidade não é estatística. É vida.",
      manifestoClosing: "Juntos, perfuramos mais que solo. Perfuramos barreiras. Abrimos caminhos. Plantamos futuro.",
      manifestoFinal: "A mudança começa aqui. Gota por gota. Poço por poço.",
    },
    ethics: {
      title: "Código de Ética",
      intro: "A Wells of Change opera com os mais altos padrões de transparência, integridade e compromisso social. Nosso código de ética orienta todas as nossas ações e decisões.",
      
      principle1Title: "Transparência Total",
      principle1Text: "Cada doação recebida é publicamente documentada. Todas as nossas operações financeiras são submetidas a auditorias independentes, e relatórios detalhados estão disponíveis ao público. Acreditamos que a transparência constrói confiança e demonstra nosso compromisso com o uso eficiente dos recursos.",
      
      principle2Title: "Apartidarismo",
      principle2Text: "A Wells of Change é completamente independente e apartidária. Não possuímos vínculos com partidos ou movimentos políticos. Nossa missão é exclusivamente humanitária e social, atendendo comunidades em necessidade independentemente de afiliações políticas, religiosas ou ideológicas.",
      
      principle3Title: "Auditoria Independente",
      principle3Text: "Nossas contas são auditadas anualmente por auditores independentes certificados. Todos os relatórios financeiros, avaliações de impacto e atividades operacionais são revisados e validados por terceiros para garantir integridade e prestação de contas.",
      
      principle4Title: "Uso Eficiente de Recursos",
      principle4Text: "Comprometemo-nos a maximizar o impacto de cada real doado. Nossos custos operacionais são minimizados através do voluntariado e parcerias estratégicas, garantindo que o máximo possível seja direcionado aos projetos que transformam vidas diretamente.",
      
      principle5Title: "Compromisso Social",
      principle5Text: "Nosso único propósito é proporcionar acesso à água potável e tecnologia sustentável a comunidades em extrema necessidade. Trabalhamos com dignidade e respeito, empoderando as comunidades para manterem sua própria infraestrutura e construírem um futuro sustentável.",
      
      principle6Title: "Ética Profissional",
      principle6Text: "Todos os nossos voluntários e parceiros aderem aos mais altos padrões éticos. Não toleramos qualquer forma de discriminação, corrupção ou conduta antiética. As decisões são tomadas coletivamente e documentadas.",
      
      auditTitle: "Auditorias e Prestação de Contas",
      auditText: "A Wells of Change está comprometida com a transparência absoluta. Nossas contas são auditadas anualmente por auditores independentes, e todos os relatórios são disponibilizados publicamente. Acreditamos que a prestação de contas é fundamental para construir confiança com nossos doadores e as comunidades que servimos.",
      
      nonPartisanTitle: "Declaração de Apartidarismo",
      nonPartisanText: "A Wells of Change declara-se completamente independente de qualquer partido político, movimento político ou ideologia partidária. Nosso trabalho é guiado exclusivamente por valores humanitários e sociais. Não apoiamos candidatos, partidos ou causas políticas. Nossa missão é servir comunidades em necessidade, independentemente de suas afiliações ou crenças políticas.",
    },
    footer: {
      description: "Mudando vidas, um poço por vez. Levando água potável e tecnologia sustentável para comunidades que mais precisam.",
      navTitle: "Navegação",
      contactTitle: "Contato",
      socialTitle: "Siga-nos",
      location: "Rio de Janeiro, Brasil",
      copyright: "Wells of Change. Transformando vidas através da tecnologia e água potável.",
      transparency: "Comprometidos com a transparência total. Cada doação é rastreada e cada impacto é documentado.",
    },
    donate: "Doe",
  },
  es: {
    nav: {
      ourStory: "Nuestra Historia",
      whatWeDo: "Lo Que Hacemos",
      ourCommitment: "Nuestro Compromiso",
      whoWeAre: "Quiénes Somos",
      ethics: "Código de Ética",
      joinUs: "Únete a Nosotros",
      donate: "Donar",
    },
    hero: {
      title: "Cambiando vidas, un pozo a la vez",
      subtitle: "Mientras algunos buscan agua en otros planetas, más de mil millones aún luchan por una gota aquí en la Tierra.",
      call: "¡Esto necesita cambiar! Está en nuestras manos.",
      donateButton: "Hacer una Donación",
      storyButton: "Conoce Nuestra Historia",
      scrollDown: "Saber más",
    },
    mission: {
      title: "Lo Que Creemos",
      belief1: "Creemos que la tecnología existe, está disponible y debe servir primero a quienes más la necesitan.",
      belief2: "Creemos que la transparencia transforma la donación en inversión — cuando inversores, comunidades y toda la sociedad pueden ver el impacto real, gota a gota.",
      belief3: "Creemos que un pozo no es solo infraestructura — es dignidad, es libertad, es futuro.",
      belief4: "Creemos que cada comunidad merece la oportunidad de florecer donde está.",
    },
    story: {
      title: "Nuestra Historia",
      p1: "Wells of Change surgió durante la pandemia, en un contexto de reflexión sobre el papel de la tecnología en tiempos de crisis.",
      p2: "En una conferencia promovida por Intelie, empresa especializada en inteligencia operacional y monitoreo en tiempo real de pozos de petróleo, se discutió la importancia de la diversidad tecnológica y el potencial de aplicar soluciones avanzadas a desafíos sociales urgentes.",
      p3: "En ese momento, el agua se convirtió en símbolo de desigualdad y urgencia. La pregunta que surgió fue simple pero transformadora: si podemos emplear inteligencia artificial y datos en tiempo real para optimizar la extracción de petróleo, ¿por qué no hacer lo mismo para garantizar acceso al agua?",
      p4: "Esta idea se consolidó basándose en experiencias previas en el campo del bombeo fotovoltaico y proyectos de electrificación rural sostenible.",
      quote: "Así nació Wells of Change con la convicción de que la tecnología debe servir a la vida y que cada gota de agua puede reavivar la esperanza donde parecía perdida.",
    },
    whatWeDo: {
      title: "Lo Que Hacemos",
      subtitle: "No solo llevamos agua. Llevamos posibilidades.",
      intro: "Cada pozo que construimos es más que un punto de acceso al agua potable.",
      childTitle: "Infancia Protegida",
      childDesc: "Un niño que no necesita caminar kilómetros con un cubo en la cabeza.",
      motherTitle: "Dignidad Familiar",
      motherDesc: "Una madre que puede cuidar la higiene de su familia con dignidad.",
      farmerTitle: "Agricultura Sostenible",
      farmerDesc: "Un agricultor que puede planificar su cosecha sin depender solo de la lluvia.",
      communityTitle: "Comunidad Próspera",
      communityDesc: "Una comunidad entera que tiene razones para quedarse, crecer y prosperar.",
      tech1: "Perforamos el suelo, instalamos bombas alimentadas por energía solar y aplicamos tecnología de monitoreo en tiempo real.",
      metricWater: "Cada gota",
      metricWaterLabel: "se mide",
      metricImpact: "Cada impacto",
      metricImpactLabel: "se documenta",
      metricStory: "Cada historia",
      metricStoryLabel: "se cuenta",
      tech2: "Con datos transparentes que muestran exactamente cómo cada dólar invertido se transforma en vida.",
      visibility: "Porque creemos que la visibilidad genera más visibilidad.\nY que el impacto demostrado genera más impacto.",
    },
    commitment: {
      title: "Nuestro Compromiso",
      wellComplete: "Pozo Completo",
      wellLocation: "Campo Formoso, Bahía",
      solar: "Solar",
      solarDesc: "Energía limpia y sostenible",
      monitoring: "Monitoreo",
      monitoringDesc: "Datos en tiempo real",
      impact: "Impacto",
      impactDesc: "Vidas transformadas",
      location: "Comenzamos en Campo Formoso, en el interior de Bahía.",
      start: "El primer pozo está completo. ¡La vida ya ha comenzado a cambiar!",
      intro: "Pero esto es solo el comienzo.",
      one1: "Un pozo a la vez.",
      one2: "Una comunidad a la vez.",
      one3: "Una vida a la vez.",
      reach: "Desde el Nordeste brasileño hasta Senegal, vamos donde la sed es más urgente y la esperanza parece más distante.",
      lasting: "Y no nos detenemos cuando el agua comienza a fluir. Nos quedamos. Enseñamos. Empoderamos.",
      tools: "Garantizamos que cada comunidad tenga las herramientas y el conocimiento para mantener viva su propia fuente de vida.",
      need: "Porque esto es solo el comienzo. Te necesitamos para continuar.",
    },
    whoWeAre: {
      title: "Quiénes Somos",
      intro: "Wells of Change está impulsada por un equipo diverso de profesionales dedicados, unidos por un propósito común: transformar vidas a través del acceso al agua potable.",
      leadership: "Liderazgo",
      advisors: "Consejo Asesor",
    },
    change: {
      title: "Juntos Por el Cambio",
      intro: "Somos voluntarios — ingenieros, desarrolladores, geólogos, administradores, comunicadores — unidos por una certeza simple y profunda: podemos hacerlo mejor.",
      investTitle: "Invertir Recursos",
      investDesc: "Cada donación se transforma en agua, salud y dignidad para las comunidades que más lo necesitan.",
      investButton: "Hacer Donación",
      shareTitle: "Compartir la Causa",
      shareDesc: "Ayuda a difundir nuestra misión. Cuantas más personas sepan, más vidas podemos transformar.",
      shareButton: "Compartir",
      volunteerTitle: "Ser Voluntario",
      volunteerDesc: "Únete a nuestro equipo de especialistas y contribuye con tu conocimiento y habilidades.",
      volunteerButton: "Quiero Participar",
      transformationTitle: "Porque cuando llega el agua, todo se transforma:",
      transform1: "Sed → Saciedad",
      transform2: "Enfermedad → Salud",
      transform3: "Migración → Permanencia",
      transform4: "Supervivencia → Prosperidad",
      transform5: "Desesperación → Dignidad",
      transform6: "Y puedes verlo suceder en tiempo real.",
      manifestoTitle: "WELLS OF CHANGE",
      manifestoTagline: "Cambiando vidas, un pozo a la vez.",
      manifesto1: "Porque el agua no es un favor. Es un derecho.",
      manifesto2: "Porque la tecnología no es un privilegio. Es una herramienta.",
      manifesto3: "Porque la comunidad no es una estadística. Es vida.",
      manifestoClosing: "Juntos, perforamos más que suelo. Perforamos barreras. Abrimos caminos. Plantamos futuro.",
      manifestoFinal: "El cambio comienza aquí. Gota a gota. Pozo por pozo.",
    },
    ethics: {
      title: "Código de Ética",
      intro: "Wells of Change opera con los más altos estándares de transparencia, integridad y compromiso social. Nuestro código de ética guía todas nuestras acciones y decisiones.",
      
      principle1Title: "Transparencia Total",
      principle1Text: "Cada donación recibida es documentada públicamente. Todas nuestras operaciones financieras están sujetas a auditorías independientes, y los informes detallados están disponibles para el público. Creemos que la transparencia construye confianza y demuestra nuestro compromiso con el uso eficiente de los recursos.",
      
      principle2Title: "Apartidarismo",
      principle2Text: "Wells of Change es completamente independiente y apartidista. No tenemos vínculos con partidos o movimientos políticos. Nuestra misión es exclusivamente humanitaria y social, sirviendo a comunidades necesitadas independientemente de afiliaciones políticas, religiosas o ideológicas.",
      
      principle3Title: "Auditoría Independiente",
      principle3Text: "Nuestras cuentas son auditadas anualmente por auditores independientes certificados. Todos los informes financieros, evaluaciones de impacto y actividades operacionales son revisados y validados por terceros para garantizar integridad y rendición de cuentas.",
      
      principle4Title: "Uso Eficiente de Recursos",
      principle4Text: "Nos comprometemos a maximizar el impacto de cada dólar donado. Nuestros costos operativos se minimizan a través del voluntariado y alianzas estratégicas, asegurando que la máxima cantidad posible se dirija a proyectos que transforman vidas directamente.",
      
      principle5Title: "Compromiso Social",
      principle5Text: "Nuestro único propósito es proporcionar acceso al agua potable y tecnología sostenible a comunidades en extrema necesidad. Trabajamos con dignidad y respeto, empoderando a las comunidades para mantener su propia infraestructura y construir un futuro sostenible.",
      
      principle6Title: "Ética Profesional",
      principle6Text: "Todos nuestros voluntarios y socios adhieren a los más altos estándares éticos. No toleramos ninguna forma de discriminación, corrupción o conducta no ética. Las decisiones se toman colectivamente y se documentan.",
      
      auditTitle: "Auditorías y Rendición de Cuentas",
      auditText: "Wells of Change está comprometida con la transparencia absoluta. Nuestras cuentas son auditadas anualmente por auditores independientes, y todos los informes están disponibles públicamente. Creemos que la rendición de cuentas es fundamental para construir confianza con nuestros donantes y las comunidades que servimos.",
      
      nonPartisanTitle: "Declaración de Apartidarismo",
      nonPartisanText: "Wells of Change se declara completamente independiente de cualquier partido político, movimiento político o ideología partidaria. Nuestro trabajo está guiado exclusivamente por valores humanitarios y sociales. No apoyamos candidatos, partidos o causas políticas. Nuestra misión es servir a comunidades necesitadas, independientemente de sus afiliaciones o creencias políticas.",
    },
    footer: {
      description: "Cambiando vidas, un pozo a la vez. Llevando agua potable y tecnología sostenible a las comunidades que más lo necesitan.",
      navTitle: "Navegación",
      contactTitle: "Contacto",
      socialTitle: "Síguenos",
      location: "Río de Janeiro, Brasil",
      copyright: "Wells of Change. Transformando vidas a través de la tecnología y el agua potable.",
      transparency: "Comprometidos con la transparencia total. Cada donación se rastrea y cada impacto se documenta.",
    },
    donate: "Donar",
  },
  fr: {
    nav: {
      ourStory: "Notre Histoire",
      whatWeDo: "Ce Que Nous Faisons",
      ourCommitment: "Notre Engagement",
      whoWeAre: "Qui Nous Sommes",
      ethics: "Code d'Éthique",
      joinUs: "Rejoignez-nous",
      donate: "Faire un Don",
    },
    hero: {
      title: "Changer des vies, un puits à la fois",
      subtitle: "Alors que certains cherchent de l'eau sur d'autres planètes, plus d'un milliard luttent encore pour une goutte ici sur Terre.",
      call: "Cela doit changer ! C'est entre nos mains.",
      donateButton: "Faire un Don",
      storyButton: "Découvrez Notre Histoire",
      scrollDown: "En savoir plus",
    },
    mission: {
      title: "Ce Que Nous Croyons",
      belief1: "Nous croyons que la technologie existe, est disponible et doit servir en premier ceux qui en ont le plus besoin.",
      belief2: "Nous croyons que la transparence transforme le don en investissement — lorsque les investisseurs, les communautés et toute la société peuvent voir l'impact réel, goutte par goutte.",
      belief3: "Nous croyons qu'un puits n'est pas seulement une infrastructure — c'est la dignité, c'est la liberté, c'est l'avenir.",
      belief4: "Nous croyons que chaque communauté mérite la chance de s'épanouir là où elle est.",
    },
    story: {
      title: "Notre Histoire",
      p1: "Wells of Change est né pendant la pandémie, dans un contexte de réflexion sur le rôle de la technologie en temps de crise.",
      p2: "Lors d'une conférence organisée par Intelie, entreprise spécialisée dans l'intelligence opérationnelle et la surveillance en temps réel des puits de pétrole, l'importance de la diversité technologique et le potentiel d'appliquer des solutions avancées aux défis sociaux urgents ont été discutés.",
      p3: "À ce moment-là, l'eau est devenue un symbole d'inégalité et d'urgence. La question qui s'est imposée était simple mais transformatrice : si nous pouvons utiliser l'intelligence artificielle et les données en temps réel pour optimiser l'extraction du pétrole, pourquoi ne pas faire de même pour garantir l'accès à l'eau ?",
      p4: "Cette idée s'est consolidée sur la base d'expériences antérieures dans le domaine du pompage photovoltaïque et de projets d'électrification rurale durable.",
      quote: "Ainsi est né Wells of Change avec la conviction que la technologie doit servir la vie et que chaque goutte d'eau peut raviver l'espoir là où il semblait perdu.",
    },
    whatWeDo: {
      title: "Ce Que Nous Faisons",
      subtitle: "Nous n'apportons pas seulement de l'eau. Nous apportons des possibilités.",
      intro: "Chaque puits que nous construisons est plus qu'un point d'accès à l'eau potable.",
      childTitle: "Enfance Protégée",
      childDesc: "Un enfant qui n'a pas besoin de marcher des kilomètres avec un seau sur la tête.",
      motherTitle: "Dignité Familiale",
      motherDesc: "Une mère qui peut prendre soin de l'hygiène de sa famille avec dignité.",
      farmerTitle: "Agriculture Durable",
      farmerDesc: "Un agriculteur qui peut planifier sa récolte sans dépendre uniquement de la pluie.",
      communityTitle: "Communauté Prospère",
      communityDesc: "Une communauté entière qui a des raisons de rester, de grandir et de prospérer.",
      tech1: "Nous forons le sol, installons des pompes alimentées par énergie solaire et appliquons une technologie de surveillance en temps réel.",
      metricWater: "Chaque goutte",
      metricWaterLabel: "est mesurée",
      metricImpact: "Chaque impact",
      metricImpactLabel: "est documenté",
      metricStory: "Chaque histoire",
      metricStoryLabel: "est racontée",
      tech2: "Avec des données transparentes montrant exactement comment chaque dollar investi se transforme en vie.",
      visibility: "Parce que nous croyons que la visibilité génère plus de visibilité.\nEt que l'impact démontré génère plus d'impact.",
    },
    commitment: {
      title: "Notre Engagement",
      wellComplete: "Puits Complet",
      wellLocation: "Campo Formoso, Bahia",
      solar: "Solaire",
      solarDesc: "Énergie propre et durable",
      monitoring: "Surveillance",
      monitoringDesc: "Données en temps réel",
      impact: "Impact",
      impactDesc: "Vies transformées",
      location: "Nous avons commencé à Campo Formoso, à l'intérieur de Bahia.",
      start: "Le premier puits est complet. La vie a déjà commencé à changer !",
      intro: "Mais ce n'est que le début.",
      one1: "Un puits à la fois.",
      one2: "Une communauté à la fois.",
      one3: "Une vie à la fois.",
      reach: "Du Nord-Est brésilien au Sénégal, nous allons là où la soif est la plus urgente et l'espoir semble le plus lointain.",
      lasting: "Et nous ne nous arrêtons pas quand l'eau commence à couler. Nous restons. Nous enseignons. Nous autonomisons.",
      tools: "Nous veillons à ce que chaque communauté dispose des outils et des connaissances pour maintenir sa propre source de vie.",
      need: "Parce que ce n'est que le début. Nous avons besoin de vous pour continuer.",
    },
    whoWeAre: {
      title: "Qui Nous Sommes",
      intro: "Wells of Change est porté par une équipe diversifiée de professionnels dévoués, unis par un objectif commun : transformer des vies grâce à l'accès à l'eau potable.",
      leadership: "Direction",
      advisors: "Conseil Consultatif",
    },
    change: {
      title: "Ensemble Pour le Changement",
      intro: "Nous sommes des bénévoles — ingénieurs, développeurs, géologues, administrateurs, communicateurs — unis par une certitude simple et profonde : nous pouvons faire mieux.",
      investTitle: "Investir des Ressources",
      investDesc: "Chaque don se transforme en eau, santé et dignité pour les communautés qui en ont le plus besoin.",
      investButton: "Faire un Don",
      shareTitle: "Partager la Cause",
      shareDesc: "Aidez à diffuser notre mission. Plus il y a de personnes qui savent, plus nous pouvons transformer de vies.",
      shareButton: "Partager",
      volunteerTitle: "Devenir Bénévole",
      volunteerDesc: "Rejoignez notre équipe de spécialistes et contribuez avec vos connaissances et compétences.",
      volunteerButton: "Je Veux Participer",
      transformationTitle: "Parce que quand l'eau arrive, tout se transforme :",
      transform1: "Soif → Satiété",
      transform2: "Maladie → Santé",
      transform3: "Migration → Permanence",
      transform4: "Survie → Prospérité",
      transform5: "Désespoir → Dignité",
      transform6: "Et vous pouvez le voir se produire en temps réel.",
      manifestoTitle: "WELLS OF CHANGE",
      manifestoTagline: "Changer des vies, un puits à la fois.",
      manifesto1: "Parce que l'eau n'est pas une faveur. C'est un droit.",
      manifesto2: "Parce que la technologie n'est pas un privilège. C'est un outil.",
      manifesto3: "Parce que la communauté n'est pas une statistique. C'est la vie.",
      manifestoClosing: "Ensemble, nous forons plus que le sol. Nous perçons des barrières. Nous ouvrons des chemins. Nous plantons l'avenir.",
      manifestoFinal: "Le changement commence ici. Goutte par goutte. Puits par puits.",
    },
    ethics: {
      title: "Code d'Éthique",
      intro: "Wells of Change fonctionne selon les normes les plus élevées de transparence, d'intégrité et d'engagement social. Notre code d'éthique guide toutes nos actions et décisions.",
      
      principle1Title: "Transparence Totale",
      principle1Text: "Chaque don reçu est documenté publiquement. Toutes nos opérations financières sont soumises à des audits indépendants, et des rapports détaillés sont disponibles au public. Nous croyons que la transparence construit la confiance et démontre notre engagement envers l'utilisation efficace des ressources.",
      
      principle2Title: "Non-Partisanerie",
      principle2Text: "Wells of Change est complètement indépendant et non partisan. Nous n'avons aucun lien avec des partis ou mouvements politiques. Notre mission est exclusivement humanitaire et sociale, servant les communautés dans le besoin indépendamment de leurs affiliations politiques, religieuses ou idéologiques.",
      
      principle3Title: "Audit Indépendant",
      principle3Text: "Nos comptes sont audités annuellement par des auditeurs indépendants certifiés. Tous les rapports financiers, évaluations d'impact et activités opérationnelles sont examinés et validés par des tiers pour garantir l'intégrité et la responsabilité.",
      
      principle4Title: "Utilisation Efficace des Ressources",
      principle4Text: "Nous nous engageons à maximiser l'impact de chaque dollar donné. Nos coûts opérationnels sont minimisés grâce au bénévolat et aux partenariats stratégiques, garantissant que le maximum possible soit dirigé vers des projets qui transforment directement des vies.",
      
      principle5Title: "Engagement Social",
      principle5Text: "Notre seul but est de fournir l'accès à l'eau potable et à la technologie durable aux communautés en extrême besoin. Nous travaillons avec dignité et respect, en autonomisant les communautés pour maintenir leur propre infrastructure et construire un avenir durable.",
      
      principle6Title: "Éthique Professionnelle",
      principle6Text: "Tous nos bénévoles et partenaires adhèrent aux normes éthiques les plus élevées. Nous ne tolérons aucune forme de discrimination, corruption ou conduite non éthique. Les décisions sont prises collectivement et documentées.",
      
      auditTitle: "Audits et Responsabilité",
      auditText: "Wells of Change s'engage pour une transparence absolue. Nos comptes sont audités annuellement par des auditeurs indépendants, et tous les rapports sont disponibles publiquement. Nous croyons que la responsabilité est fondamentale pour construire la confiance avec nos donateurs et les communautés que nous servons.",
      
      nonPartisanTitle: "Déclaration de Non-Partisanerie",
      nonPartisanText: "Wells of Change se déclare complètement indépendant de tout parti politique, mouvement politique ou idéologie partisane. Notre travail est guidé exclusivement par des valeurs humanitaires et sociales. Nous ne soutenons pas de candidats, partis ou causes politiques. Notre mission est de servir les communautés dans le besoin, indépendamment de leurs affiliations ou croyances politiques.",
    },
    footer: {
      description: "Changer des vies, un puits à la fois. Apporter de l'eau potable et une technologie durable aux communautés qui en ont le plus besoin.",
      navTitle: "Navigation",
      contactTitle: "Contact",
      socialTitle: "Suivez-nous",
      location: "Rio de Janeiro, Brésil",
      copyright: "Wells of Change. Transformer des vies grâce à la technologie et à l'eau potable.",
      transparency: "Engagés pour une transparence totale. Chaque don est suivi et chaque impact est documenté.",
    },
    donate: "Donner",
  },
};
