import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SolutionData {
  id: 'educacao' | 'saude' | 'seguranca';
  title: string;
  description: string;
  items: string[];
  ctaText: string;
  bgGlow: string;
  image: string;
  iconName: string;
  colorClass: string;
}

interface SolutionRow {
  id: 'educacao' | 'saude' | 'seguranca';
  title: string;
  description: string;
  items: string[];
  cta_text: string;
  bg_glow: string;
  image: string;
  icon_name: string;
  color_class: string;
  created_at: string;
}

const DEFAULT_SOLUTIONS: Record<'educacao' | 'saude' | 'seguranca', SolutionData> = {
  educacao: {
    id: 'educacao',
    title: 'Inovação Pedagógica e Prática Inclusiva',
    description: 'Capacitamos o corpo docente e gestores para o desenvolvimento de práticas de ensino verdadeiramente inclusivas. Nossos treinamentos oferecem subsídios práticos para a aplicação de metodologias ativas que se ajustam à singularidade cognitiva de cada estudante.',
    items: [
      'Formação em Inclusão Escolar na Prática',
      'Neuroeducação aplicada à sala de aula',
      'Elaboração de PEI (Plano de Ensino Individualizado)',
      'Princípios do DUA (Desenho Universal para a Aprendizagem)',
      'Capacitação Docente especializada em Neurodiversidade',
      'Adaptação Curricular e de Materiais Didáticos'
    ],
    ctaText: 'Falar com Consultor de Educação',
    bgGlow: 'bg-teal-500/5',
    image: '/images/solutions_education.webp',
    iconName: 'GraduationCap',
    colorClass: 'text-teal-400 border-teal-500/20 bg-teal-950/40'
  },
  saude: {
    id: 'saude',
    title: 'Excelência Clínica e Intervenção Acolhedora',
    description: 'Oferecemos programas de qualificação voltados a profissionais de saúde e gestores de clínicas/hospitais. Focamos em estruturar processos de triagem rápida, acolhimento diferenciado e planos de intervenção terapêutica baseados na ciência.',
    items: [
      'Protocolos de Rastreio em Transtornos de Neurodesenvolvimento',
      'Acolhimento humanizado em serviços de saúde mental',
      'Intervenções baseadas em evidências científicas',
      'Capacitação de equipes multiprofissionais de saúde',
      'Protocolos clínicos integrados de neuropsicologia',
      'Gestão de unidades de reabilitação e acolhimento'
    ],
    ctaText: 'Falar com Consultor de Saúde',
    bgGlow: 'bg-rose-500/5',
    image: '/images/solutions_health.webp',
    iconName: 'HeartPulse',
    colorClass: 'text-rose-400 border-rose-500/20 bg-rose-950/40'
  },
  seguranca: {
    id: 'seguranca',
    title: 'Treinamento Tático e Atendimento Humanizado',
    description: 'Estruturamos metodologias e guias práticos pioneiros para as forças de segurança. Preparamos equipes policiais e Guardas Civis Municipais (GCM) para identificar, comunicar e gerenciar ocorrências com cidadãos neurodivergentes de forma segura e ética.',
    items: [
      'Protocolos de Atendimento Inclusivo para forças policiais',
      'Gerenciamento de crises envolvendo pessoas com autismo',
      'Protocolos operacionais de abordagem para a Guarda Civil Municipal (GCM)',
      'Comunicação não-violenta e desescalada verbal',
      'Resolução pacífica de conflitos em ambientes públicos',
      'Legislação e direitos da pessoa neurodivergente'
    ],
    ctaText: 'Falar com Consultor de Segurança',
    bgGlow: 'bg-amber-500/5',
    image: '/images/solutions_security.webp',
    iconName: 'ShieldAlert',
    colorClass: 'text-amber-400 border-amber-500/20 bg-amber-950/40'
  }
};

export const useSolutions = () => {
  const [solutions, setSolutions] = useState<Record<'educacao' | 'saude' | 'seguranca', SolutionData>>(DEFAULT_SOLUTIONS);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    const fetchSolutions = async () => {
      try {
        const { data, error } = await supabase
          .from('solutions')
          .select('*');

        if (error) {
          throw error;
        }

        if (active && data && data.length > 0) {
          // Clona as soluções padrão e atualiza com os dados vindos do banco de dados
          const fetchedMap = { ...DEFAULT_SOLUTIONS };
          (data as SolutionRow[]).forEach((row) => {
            if (row.id === 'educacao' || row.id === 'saude' || row.id === 'seguranca') {
              fetchedMap[row.id] = {
                id: row.id,
                title: row.title,
                description: row.description,
                items: row.items,
                ctaText: row.cta_text,
                bgGlow: row.bg_glow,
                image: row.image,
                iconName: row.icon_name,
                colorClass: row.color_class
              };
            }
          });
          setSolutions(fetchedMap);
        }
      } catch (err) {
        console.error('Erro ao buscar soluções do Supabase:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchSolutions();

    return () => {
      active = false;
    };
  }, []);

  return { solutions, loading };
};
