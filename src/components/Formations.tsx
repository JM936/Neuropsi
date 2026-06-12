import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, BookOpen, GraduationCap, X, Eye, AlertCircle } from 'lucide-react';
import { Button } from './UI/Button';
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

export const Formations: React.FC = () => {
  const [formacoes, setFormacoes] = useState<Formacao[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Formacao | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFormations = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('formations')
        .select('*');

      if (fetchError) {
        throw fetchError;
      }

      // Mapeamento tipado e seguro de snake_case para camelCase
      const mappedFormations: Formacao[] = (data as FormationRow[] || []).map((item) => ({
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

      // Ordena as formações alfabeticamente pelo título
      mappedFormations.sort((a, b) => a.title.localeCompare(b.title));

      setFormacoes(mappedFormations);
    } catch (err) {
      console.error('Erro ao buscar as formações:', err);
      setError('Desculpe, ocorreu um problema ao carregar os programas de formação. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadInitialFormations = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('formations')
          .select('*');

        if (fetchError) {
          throw fetchError;
        }

        if (!active) return;

        const mappedFormations: Formacao[] = (data as FormationRow[] || []).map((item) => ({
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

        mappedFormations.sort((a, b) => a.title.localeCompare(b.title));

        setFormacoes(mappedFormations);
      } catch (err) {
        console.error('Erro ao buscar as formações na inicialização:', err);
        if (active) {
          setError('Desculpe, ocorreu um problema ao carregar os programas de formação. Por favor, tente novamente.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadInitialFormations();

    return () => {
      active = false;
    };
  }, []);

  // Renderização do Loader de Esqueleto Premium (Skeleton) com pulsação
  if (loading) {
    return (
      <section id="formations" className="py-20 bg-neuro-darkBg relative overflow-hidden animate-fade-in">
        <div className="absolute top-0 right-0 w-80 h-80 bg-neuro-primary/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-pulse">
            <div className="h-4 w-28 bg-white/10 mx-auto rounded mb-3" />
            <div className="h-10 w-80 bg-white/10 mx-auto rounded mb-4" />
            <div className="h-6 w-96 bg-white/10 mx-auto rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="p-6 bg-glass-card rounded-2xl border border-neuro-border flex flex-col justify-between shadow-glass h-[320px] animate-pulse">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-6 w-24 bg-white/10 rounded-full" />
                    <div className="h-4 w-16 bg-white/10 rounded" />
                  </div>
                  <div className="h-6 w-3/4 bg-white/10 rounded mb-4" />
                  <div className="h-4 w-full bg-white/10 rounded mb-2" />
                  <div className="h-4 w-5/6 bg-white/10 rounded" />
                </div>
                <div className="pt-4 border-t border-white/5 h-10 w-full bg-white/10 rounded-lg mt-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Renderização de Degradamento Suave em Caso de Erro
  if (error) {
    return (
      <section id="formations" className="py-20 bg-neuro-darkBg relative overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="text-center max-w-md p-8 bg-glass border border-red-500/30 rounded-2xl shadow-glass mx-4">
          <AlertCircle className="text-red-400 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-bold text-white mb-2">Erro de Carregamento</h3>
          <p className="text-sm text-neuro-textSecondary mb-6">{error}</p>
          <Button variant="primary" onClick={fetchFormations} className="min-h-[44px] px-6">
            Tentar Novamente
          </Button>
        </div>
      </section>
    );
  }

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
