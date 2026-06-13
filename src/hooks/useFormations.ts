import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Formacao } from '../types';

interface FormationRow {
  id: string;
  title: string;
  badge: string | null;
  tagline: string;
  duration: string;
  modality: string;
  description: string;
  modules: string[];
  public_target: string;
  created_at: string;
}

const DEFAULT_FORMATIONS: Formacao[] = [
  {
    id: "educacao-inclusiva",
    title: "Educação Inclusiva®",
    badge: "Formação Prática",
    tagline: "Metodologias adaptativas e ferramentas reais para a inclusão em sala de aula.",
    duration: "280 horas",
    modality: "Híbrido",
    description: "Fornece subsídios conceituais e ferramentas instrumentais para atender alunos com transtornos do neurodesenvolvimento (Autismo, TDAH, Dislexia) promovendo acessibilidade curricular estruturada.",
    modules: [
      "Direitos Humanos e Legislação da Inclusão",
      "Transtornos e Condições do Neurodesenvolvimento (TEA, TDAH, DI)",
      "Princípios do Desenho Universal para a Aprendizagem (DUA)",
      "Desenvolvimento do Plano de Ensino Individualizado (PEI)",
      "Adaptação Curricular Prática",
      "Comunicação Alternativa e Aumentativa (CAA)"
    ],
    publicTarget: "Professores regentes, auxiliares de inclusão, cuidadores escolares, pedagogos e familiares."
  },
  {
    id: "missionaria-nascer-de-novo",
    title: "Missionária Nascer de Novo®",
    badge: "Social & Humanitário",
    tagline: "Capacitação psicossocial e acolhimento em comunidades vulneráveis.",
    duration: "160 horas",
    modality: "Híbrido",
    description: "Programa social voltado al desenvolvimento de agentes humanitários aptos a realizar triagem primária, escuta qualificada e acolhimento a populações vulneráveis e indivíduos em reabilitação psicossocial.",
    modules: [
      "Fundamentos do Acolhimento Humanitário",
      "Vulnerabilidade Social e Neurodesenvolvimento",
      "Noções de Saúde Mental e Toxicologia",
      "Técnicas de Escuta Ativa e Apoio Emocional",
      "Rede de Apoio: Parceria com Saúde e Assistência Social",
      "Desenvolvimento de Projetos Sociais Comunitários"
    ],
    publicTarget: "Líderes de ONGs, capelães, voluntários de instituições de caridade e agentes comunitários."
  },
  {
    id: "neuroeducacao",
    title: "Neuroeducação®",
    badge: "Capacitação",
    tagline: "Aplicação prática do funcionamento cerebral no design de aulas e retenção de alunos.",
    duration: "240 horas",
    modality: "100% Online (Aulas ao vivo)",
    description: "Uma formação moderna e dinâmica desenvolvida para educadores que desejam estruturar suas aulas com base nas evidências científicas de como o cérebro recebe, codifica, armazena e recupera informações.",
    modules: [
      "Como o Cérebro Aprende (Neurobiologia)",
      "Neuroplasticidade e Aprendizado ao Longo da Vida",
      "Atenção, Memória e Emoção no Processo de Ensino",
      "Metodologias Ativas Baseadas em Evidências",
      "Tecnologia, Telas e a Mente do Estudante Moderno",
      "Avaliação Formativa Inteligente"
    ],
    publicTarget: "Professores da Educação Infantil ao Ensino Superior, tutores, gestores escolares e designers instrucionais."
  },
  {
    id: "neurogestao",
    title: "Neurogestão®",
    badge: "Liderança",
    tagline: "Gestão de pessoas e tomada de decisões sob a ótica das neurociências.",
    duration: "180 horas",
    modality: "Presencial ou In-Company",
    description: "Focado em líderes e executivos públicos ou privados, este programa ensina a otimizar a tomada de decisão sob pressão, gerenciar o estresse corporativo e criar ambientes de alta performance e segurança psicológica.",
    modules: [
      "Neurociência da Liderança e Decisão",
      "Inteligência Emocional e Regulação de Estresse",
      "Dinâmicas de Equipes e Segurança Psicológica",
      "Neurocomunicação e Feedback de Alto Impacto",
      "Gestão de Mudanças Corporativas",
      "Ergonomia Mental no Trabalho"
    ],
    publicTarget: "Diretores, gerentes, coordenadores, analistas de RH e profissionais em cargos de liderança."
  },
  {
    id: "neuropsicopedagogia",
    title: "Neuropsicopedagogia Aplicada®",
    badge: "Especialização",
    tagline: "Diagnóstico e intervenção de dificuldades de aprendizagem sob o prisma da neurociência.",
    duration: "360 horas",
    modality: "Híbrido (Online + Prática)",
    description: "Esta pós-graduação avançada capacita profissionais para atuar na identificação de transtornos e distúrbios de aprendizagem, formulando estratégias de reabilitação e intervenção cognitiva em âmbitos clínico e institucional.",
    modules: [
      "Fundamentos de Neuroanatomia Cognitiva",
      "Neuropsicofisiologia da Aprendizagem",
      "Processamento da Leitura, Escrita e Cálculo",
      "Avaliação Neuropsicopedagógica Clínica",
      "Intervenção e Reabilitação Neuropsicopedagógica",
      "Estudo Clínico de Casos Práticos"
    ],
    publicTarget: "Pedagogos, psicólogos, fonoaudiólogos, terapeutas ocupacionais e licenciados em geral."
  },
  {
    id: "seguranca-inclusiva",
    title: "Segurança Pública Inclusiva®",
    badge: "Protocolo Exclusivo",
    tagline: "Treinamento tático e comunicação humanizada para abordagem a neurodiversos.",
    duration: "120 horas",
    modality: "Presencial / Prático",
    description: "Programa inédito que capacita as forças de segurança a lidar com surtos psicóticos, crises em pessoas com autismo e situações extremas envolvendo neurodiversos, aplicando técnicas de desescalada e empatia tática.",
    modules: [
      "Neurodiversidade no Espaço Público",
      "Reconhecimento Visual e Comportamental de Crises",
      "Técnicas de Comunicação Não-Violenta e Desescalada",
      "Protocolo de Abordagem Tática Inclusiva",
      "Gerenciamento de Crises em TEA e Saúde Mental",
      "Direitos Humanos, Legislação e Segurança Cidadã"
    ],
    publicTarget: "Policiais Militares e Civis, Guardas Municipais (GCM), Agentes de Trânsito, Defesa Civil e Bombeiros."
  }
];

export const useFormations = () => {
  const [formacoes, setFormacoes] = useState<Formacao[]>(() => {
    // Tenta carregar do cache antes de fazer o fetch
    try {
      const cached = sessionStorage.getItem('neuropsi_formations');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (err) {
      console.error('Erro ao ler formações do sessionStorage:', err);
    }
    return DEFAULT_FORMATIONS;
  });

  const [loading, setLoading] = useState<boolean>(() => {
    // Se temos cache, não precisamos mostrar o esqueleto/loader na tela
    try {
      const cached = sessionStorage.getItem('neuropsi_formations');
      return !cached;
    } catch {
      return true;
    }
  });

  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchFormations = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('formations')
          .select('*');

        if (fetchError) {
          throw fetchError;
        }

        if (data && data.length > 0 && active) {
          const mapped: Formacao[] = (data as FormationRow[]).map((item) => ({
            id: item.id,
            title: item.title,
            badge: item.badge || undefined,
            tagline: item.tagline,
            duration: item.duration,
            modality: item.modality,
            description: item.description,
            modules: item.modules,
            publicTarget: item.public_target
          }));

          mapped.sort((a, b) => a.title.localeCompare(b.title));

          setFormacoes(mapped);
          setError(null);
          try {
            sessionStorage.setItem('neuropsi_formations', JSON.stringify(mapped));
          } catch (storageErr) {
            console.error('Erro ao salvar no sessionStorage:', storageErr);
          }
        }
      } catch (err) {
        console.error('Erro ao buscar as formações no hook:', err);
        if (active) {
          setError('Não foi possível carregar os programas de formação. Por favor, tente novamente.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void fetchFormations();

    return () => {
      active = false;
    };
  }, [refetchIndex]);

  const refetch = () => {
    setLoading(true);
    setRefetchIndex((prev) => prev + 1);
  };

  return { formacoes, loading, error, refetch };
};
