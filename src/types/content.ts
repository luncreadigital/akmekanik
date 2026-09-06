export interface ServiceItem {
  title: string;
  desc: string;
  tone: "water" | "fire" | "mix";
  number: string;
  cta: string;
}

export interface CurrentProject {
  title: string;
  status: string;
  type: string;
  location: string;
  progress: number;
  summary: string;
}

export interface CompletedProject {
  title: string;
  type: string;
  location: string;
  year: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface ProcessStep {
  n: string;
  t: string;
  d: string;
}

export interface InfoItem {
  label: string;
  value: string;
}

export interface SiteContent {
  company: {
    name: string;
    legalName: string;
    shortLegal: string;
    description: string;
    city: string;
    address: string;
    mapQuery: string;
    tax: string;
    taxFull: string;
    tradeRegistry: string;
    mersis: string;
    whatsapp: string;
    heroChips: string[];
    servicesMarquee: string[];
  };
  hero: {
    kicker: string;
    title: string[];
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollLabel: string;
    bottomLine: string;
  };
  services: {
    label: string;
    titlePrimary: string;
    titleSecondary: string;
    intro: string;
    detailCta: string;
    learnMore: string;
    items: ServiceItem[];
  };
  projects: {
    label: string;
    titlePrimary: string;
    titleSecondary: string;
    intro: string;
    currentHeading: string;
    currentSub: string;
    currentCountPrefix: string;
    currentProgressLabel: string;
    completedHeading: string;
    completedSub: string;
    completedCountPrefix: string;
    current: CurrentProject[];
    completed: CompletedProject[];
  };
  about: {
    label: string;
    imageAlt: string;
    imageCreditLabel: string;
    titlePrimary: string;
    titleSecondary: string;
    intro: string;
    points: string[];
    tags: string[];
    stats: Stat[];
    cardCorporateLabel: string;
    cardCompanyText: string;
    cardCenterLabel: string;
    cardSpecialtiesLabel: string;
    cardBottomLabel: string;
    cardMotto: string;
    cardMottoAccent: string;
    board: { label: string; value: string }[];
    yearsBadge: { value: number; suffix: string; label: string };
  };
  process: {
    label: string;
    titlePrimary: string;
    titleSecondary: string;
    steps: ProcessStep[];
  };
  contact: {
    label: string;
    titlePrimary: string;
    titleSecondary: string;
    intro: string;
    info: InfoItem[];
    mapLabel: string;
    form: {
      name: string;
      phone: string;
      email: string;
      service: string;
      servicePlaceholder: string;
      message: string;
      submit: string;
      successTitle: string;
      successBody: string;
    };
    services: string[];
  };
  footer: {
    description: string;
    servicesTitle: string;
    corporateTitle: string;
    services: string[];
    rightsPrefix: string;
  };
  navigation: {
    links: { label: string; href: string }[];
    catalogLabel: string;
  };
}
