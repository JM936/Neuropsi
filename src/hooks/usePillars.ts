import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface PillarData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  colorClass: string;
  iconBg: string;
  shadowColor: string;
  iconName: string;
}

interface PillarRow {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  color_class: string;
  icon_bg: string;
  shadow_color: string;
  icon_name: string;
  created_at: string;
}

const DEFAULT_PILLARS: PillarData[] = [
  {
    id: 1,
    title: 'Neurociência Aplicada',
    subtitle: 'Ciência do cérebro e aprendizagem',
    description: 'Estudo dos processos neurais e cognitivos para otimização do aprendizado, tomada de decisão e desenvolvimento de competências em ambientes educacionais e corporativos.',
    colorClass: 'from-purple-600/35 to-indigo-600/20 hover:border-purple-500/50',
    iconBg: 'bg-purple-600',
    shadowColor: 'hover:shadow-[0_8px_30px_rgb(147,51,234,0.15)]',
    iconName: 'Brain'
  },
  {
    id: 2,
    title: 'Educação Inclusiva',
    subtitle: 'Formação de professores e gestores',
    description: 'Metodologias adaptativas, PEI (Plano de Ensino Individualizado) e DUA (Desenho Universal para a Aprendizagem), capacitando educadores para acolher e desenvolver a neurodiversidade na prática.',
    colorClass: 'from-teal-600/35 to-emerald-600/20 hover:border-teal-500/50',
    iconBg: 'bg-teal-600',
    shadowColor: 'hover:shadow-[0_8px_30px_rgb(13,148,136,0.15)]',
    iconName: 'GraduationCap'
  },
  {
    id: 3,
    title: 'Saúde Pública',
    subtitle: 'Acolhimento e intervenção precoce',
    description: 'Capacitação multiprofissional para agentes de saúde e clínicas, focando no rastreio, diagnóstico precoce e protocolos de intervenção terapêutica baseados em evidências científicas.',
    colorClass: 'from-rose-600/35 to-pink-600/20 hover:border-rose-500/50',
    iconBg: 'bg-rose-600',
    shadowColor: 'hover:shadow-[0_8px_30px_rgb(225,29,72,0.15)]',
    iconName: 'HeartPulse'
  },
  {
    id: 4,
    title: 'Segurança Pública',
    subtitle: 'Protocolos humanizados e crise',
    description: 'Treinamento tático e de comunicação para forças policiais e guardas civis, focando no atendimento inclusivo a pessoas com transtornos do neurodesenvolvimento em situações de crise.',
    colorClass: 'from-amber-600/35 to-orange-600/20 hover:border-amber-500/50',
    iconBg: 'bg-amber-600',
    shadowColor: 'hover:shadow-[0_8px_30px_rgb(217,119,6,0.15)]',
    iconName: 'ShieldAlert'
  }
];

export const usePillars = () => {
  const [pillars, setPillars] = useState<PillarData[]>(DEFAULT_PILLARS);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    const fetchPillars = async () => {
      try {
        const { data, error } = await supabase
          .from('pillars')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          throw error;
        }

        if (active && data && data.length > 0) {
          const mapped = (data as PillarRow[]).map((row) => ({
            id: row.id,
            title: row.title,
            subtitle: row.subtitle,
            description: row.description,
            colorClass: row.color_class,
            iconBg: row.icon_bg,
            shadowColor: row.shadow_color,
            iconName: row.icon_name
          }));
          setPillars(mapped);
        }
      } catch (err) {
        console.error('Erro ao buscar pilares do Supabase:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchPillars();

    return () => {
      active = false;
    };
  }, []);

  return { pillars, loading };
};
