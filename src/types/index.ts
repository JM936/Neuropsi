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
