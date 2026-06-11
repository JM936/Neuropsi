import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, BookOpen, GraduationCap, X, Eye } from 'lucide-react';
import { Button } from './UI/Button';
import type { Formacao } from '../types';

export const Formations: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Formacao | null>(null);

  const formacoes: Formacao[] = [
    {
      id: 'neuropsicopedagogia',
      title: 'Neuropsicopedagogia Aplicada®',
      badge: 'Especialização',
      tagline: 'Diagnóstico e intervenção de dificuldades de aprendizagem sob o prisma da neurociência.',
      duration: '360 horas',
      modality: 'Híbrido (Online + Prática)',
      description: 'Esta pós-graduação avançada capacita profissionais para atuar na identificação de transtornos e distúrbios de aprendizagem, formulando estratégias de reabilitação e intervenção cognitiva em âmbitos clínico e institucional.',
      modules: [
        'Fundamentos de Neuroanatomia Cognitiva',
        'Neuropsicofisiologia da Aprendizagem',
        'Processamento da Leitura, Escrita e Cálculo',
        'Avaliação Neuropsicopedagógica Clínica',
        'Intervenção e Reabilitação Neuropsicopedagógica',
        'Estudo Clínico de Casos Práticos'
      ],
      publicTarget: 'Pedagogos, psicólogos, fonoaudiólogos, terapeutas ocupacionais e licenciados em geral.'
    },
    {
      id: 'neuroeducacao',
      title: 'Neuroeducação®',
      badge: 'Capacitação',
      tagline: 'Aplicação prática do funcionamento cerebral no design de aulas e retenção de alunos.',
      duration: '240 horas',
      modality: '100% Online (Aulas ao vivo)',
      description: 'Uma formação moderna e dinâmica desenvolvida para educadores que desejam estruturar suas aulas com base nas evidências científicas de como o cérebro recebe, codifica, armazena e recupera informações.',
      modules: [
        'Como o Cérebro Aprende (Neurobiologia)',
        'Neuroplasticidade e Aprendizado ao Longo da Vida',
        'Atenção, Memória e Emoção no Processo de Ensino',
        'Metodologias Ativas Baseadas em Evidências',
        'Tecnologia, Telas e a Mente do Estudante Moderno',
        'Avaliação Formativa Inteligente'
      ],
      publicTarget: 'Professores da Educação Infantil ao Ensino Superior, tutores, gestores escolares e designers instrucionais.'
    },
    {
      id: 'educacao-inclusiva',
      title: 'Educação Inclusiva®',
      badge: 'Formação Prática',
      tagline: 'Metodologias adaptativas e ferramentas reais para a inclusão em sala de aula.',
      duration: '280 horas',
      modality: 'Híbrido',
      description: 'Fornece subsídios conceituais e ferramentas instrumentais para atender alunos com transtornos do neurodesenvolvimento (Autismo, TDAH, Dislexia) promovendo acessibilidade curricular estruturada.',
      modules: [
        'Direitos Humanos e Legislação da Inclusão',
        'Transtornos e Condições do Neurodesenvolvimento (TEA, TDAH, DI)',
        'Princípios do Desenho Universal para a Aprendizagem (DUA)',
        'Desenvolvimento do Plano de Ensino Individualizado (PEI)',
        'Adaptação Curricular Prática',
        'Comunicação Alternativa e Aumentativa (CAA)'
      ],
      publicTarget: 'Professores regentes, auxiliares de inclusão, cuidadores escolares, pedagogos e familiares.'
    },
    {
      id: 'neurogestao',
      title: 'Neurogestão®',
      badge: 'Liderança',
      tagline: 'Gestão de pessoas e tomada de decisões sob a ótica das neurociências.',
      duration: '180 horas',
      modality: 'Presencial ou In-Company',
      description: 'Focado em líderes e executivos públicos ou privados, este programa ensina a otimizar a tomada de decisão sob pressão, gerenciar o estresse corporativo e criar ambientes de alta performance e segurança psicológica.',
      modules: [
        'Neurociência da Liderança e Decisão',
        'Inteligência Emocional e Regulação de Estresse',
        'Dinâmicas de Equipes e Segurança Psicológica',
        'Neurocomunicação e Feedback de Alto Impacto',
        'Gestão de Mudanças Corporativas',
        'Ergonomia Mental no Trabalho'
      ],
      publicTarget: 'Diretores, gerentes, coordenadores, analistas de RH e profissionais em cargos de liderança.'
    },
    {
      id: 'seguranca-inclusiva',
      title: 'Segurança Pública Inclusiva®',
      badge: 'Protocolo Exclusivo',
      tagline: 'Treinamento tático e comunicação humanizada para abordagem a neurodiversos.',
      duration: '120 horas',
      modality: 'Presencial / Prático',
      description: 'Programa inédito que capacita as forças de segurança a lidar com surtos psicóticos, crises em pessoas com autismo e situações extremas envolvendo neurodiversos, aplicando técnicas de desescalada e empatia tática.',
      modules: [
        'Neurodiversidade no Espaço Público',
        'Reconhecimento Visual e Comportamental de Crises',
        'Técnicas de Comunicação Não-Violenta e Desescalada',
        'Protocolo de Abordagem Tática Inclusiva',
        'Gerenciamento de Crises em TEA e Saúde Mental',
        'Direitos Humanos, Legislação e Segurança Cidadã'
      ],
      publicTarget: 'Policiais Militares e Civis, Guardas Municipais (GCM), Agentes de Trânsito, Defesa Civil e Bombeiros.'
    },
    {
      id: 'missionaria-nascer-de-novo',
      title: 'Missionária Nascer de Novo®',
      badge: 'Social & Humanitário',
      tagline: 'Capacitação psicossocial e acolhimento em comunidades vulneráveis.',
      duration: '160 horas',
      modality: 'Híbrido',
      description: 'Programa social voltado ao desenvolvimento de agentes humanitários aptos a realizar triagem primária, escuta qualificada e acolhimento a populações vulneráveis e indivíduos em reabilitação psicossocial.',
      modules: [
        'Fundamentos do Acolhimento Humanitário',
        'Vulnerabilidade Social e Neurodesenvolvimento',
        'Noções de Saúde Mental e Toxicologia',
        'Técnicas de Escuta Ativa e Apoio Emocional',
        'Rede de Apoio: Parceria com Saúde e Assistência Social',
        'Desenvolvimento de Projetos Sociais Comunitários'
      ],
      publicTarget: 'Líderes de ONGs, capelães, voluntários de instituições de caridade e agentes comunitários.'
    }
  ];

  return (
    <section id="formations" className="py-20 bg-neuro-darkBg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-neuro-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-neuro-accent block mb-2">
            Nossos Programas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient font-title mb-4">
            Programas de Formação Profissional
          </h2>
          <p className="text-neuro-textSecondary text-base sm:text-lg">
            Capacitações chanceladas por especialistas em neurociência e educação com foco em inserção profissional e eficácia operacional.
          </p>
        </div>

        {/* Grade de Formações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formacoes.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 bg-glass-card rounded-2xl border border-neuro-border flex flex-col justify-between shadow-glass group"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 text-xs font-semibold text-neuro-accent bg-neuro-accent/10 border border-neuro-accent/20 rounded-full">
                    {course.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-neuro-textSecondary">
                    <Clock size={14} />
                    {course.duration}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-title text-neuro-textPrimary mb-3 group-hover:text-neuro-accent transition-colors duration-300">
                  {course.title}
                </h3>
                
                <p className="text-sm text-neuro-textSecondary mb-6 leading-relaxed">
                  {course.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 mt-auto">
                <Button
                  variant="secondary"
                  fullWidth
                  className="gap-2 group-hover:bg-neuro-primary group-hover:border-neuro-primary group-hover:text-white transition-all duration-300"
                  onClick={() => setSelectedCourse(course)}
                >
                  <Eye size={16} />
                  Ver Detalhes do Curso
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Interativo para Detalhes do Curso */}
      <AnimatePresence>
        {selectedCourse && (
          <>
            {/* Backdrop do Modal */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto will-change-[opacity]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
            >
              {/* Corpo do Modal */}
              <motion.div
                className="w-full max-w-2xl bg-neuro-darkBgLight border border-neuro-border rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto will-change-[transform,opacity]"
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Botão Fechar */}
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-4 right-4 p-2 text-neuro-textSecondary hover:text-white hover:bg-neuro-cardBg rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Fechar modal"
                >
                  <X size={20} />
                </button>

                {/* Cabeçalho do Modal */}
                <div className="mb-6 pr-8">
                  <span className="px-3 py-1 text-xs font-semibold text-neuro-accent bg-neuro-accent/10 border border-neuro-accent/20 rounded-full inline-block mb-3">
                    {selectedCourse.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-title text-neuro-textPrimary">
                    {selectedCourse.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-neuro-textSecondary">
                    <span className="flex items-center gap-1">
                      <Clock size={16} className="text-neuro-primary" />
                      <strong>Carga Horária:</strong> {selectedCourse.duration}
                    </span>
                    <span>•</span>
                    <span>
                      <strong>Modalidade:</strong> {selectedCourse.modality}
                    </span>
                  </div>
                </div>

                {/* Descrição Geral */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-neuro-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <GraduationCap size={16} />
                    Sobre a Formação
                  </h4>
                  <p className="text-neuro-textSecondary text-sm sm:text-base leading-relaxed">
                    {selectedCourse.description}
                  </p>
                </div>

                {/* Público Alvo */}
                <div className="mb-6 p-4 bg-neuro-cardBg/30 border border-neuro-border rounded-xl">
                  <h4 className="text-xs font-bold text-neuro-textPrimary uppercase tracking-wider mb-1">
                    Público-Alvo:
                  </h4>
                  <p className="text-xs sm:text-sm text-neuro-textSecondary">
                    {selectedCourse.publicTarget}
                  </p>
                </div>

                {/* Módulos do Curso */}
                <div>
                  <h4 className="text-sm font-semibold text-neuro-accent uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <BookOpen size={16} />
                    Ementa e Conteúdo Programático
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCourse.modules.map((module, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-neuro-cardBg/20 border border-white/5 rounded-lg">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-neuro-primary/20 text-neuro-primary text-xs font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-neuro-textPrimary font-medium">
                          {module}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chamada para Ação no Modal */}
                <div className="mt-8 pt-6 border-t border-neuro-border flex flex-col sm:flex-row gap-4 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCourse(null)}
                  >
                    Fechar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedCourse(null);
                      const contactSec = document.getElementById('contact');
                      if (contactSec) {
                        const offset = 90;
                        const elementPosition = contactSec.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      }
                    }}
                  >
                    Falar com Consultor
                  </Button>
                </div>

              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
