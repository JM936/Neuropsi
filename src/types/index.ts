export interface Pilar {
  id: string;
  title: string;
  description: string;
  icon: string;
  colorClass: string;
}

export interface Solucao {
  id: string;
  category: 'educacao' | 'saude' | 'seguranca';
  title: string;
  items: string[];
  description: string;
  icon: string;
  gradientClass: string;
}

export interface Formacao {
  id: string;
  title: string;
  badge?: string;
  tagline: string;
  duration: string;
  modality: string;
  description: string;
  modules: string[];
  publicTarget: string;
}

export interface Diferencial {
  id: string;
  title: string;
  description: string;
}

export interface ImpactoSocial {
  id: string;
  sector: string;
  icon: string;
  description: string;
}

export interface CorporateContact {
  title: string;
  description: string;
  phone: string;
  whatsappUrl: string;
  email: string;
  address: string;
  footerDisclaimer: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  content: string;
  imageUrl?: string;
  category: 'educacao' | 'saude' | 'seguranca' | 'neurociencia';
  authorName: string;
  authorRole: string;
  readTime: string;
  publishedAt: string;
  createdAt: string;
}

