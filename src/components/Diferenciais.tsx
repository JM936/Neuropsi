import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Diferencial } from '../types';

export const Diferenciais: React.FC = () => {
  const diferenciais: Diferencial[] = [
    {
      id: 'metodologia',
      title: 'Metodologia Própria',
      description: 'Desenvolvida a partir de anos de pesquisa pericial e prática pedagógica de alta performance.'
    },
    {
      id: 'base-cientifica',
      title: 'Base Científica Atualizada',
      description: 'Programas de estudo fundamentados nos mais recentes artigos publicados internacionalmente.'
    },
    {
      id: 'formacao',
      title: 'Formação Nacional e Internacional',
      description: 'Corpo docente com vivência acadêmica externa e intercâmbio de conhecimento de ponta.'
    },
    {
      id: 'protocolos',
      title: 'Protocolos Exclusivos',
      description: 'Ferramentas proprietárias estruturadas para conduzir avaliações e desescalar crises.'
    },
    {
      id: 'multidisciplinar',
      title: 'Atuação Multidisciplinar',
      description: 'Visão integral unindo neuropsicólogos, pedagogos, peritos e assistentes sociais.'
    },
    {
      id: 'consultoria',
      title: 'Consultoria para Órgãos Públicos',
      description: 'Assessoria especializada na construção de editais e estruturação de políticas de inclusão.'
    },
    {
      id: 'projetos-sociais',
      title: 'Projetos Sociais',
      description: 'Compromisso cívico com frentes de auxílio a comunidades vulneráveis e de baixa renda.'
    },
    {
      id: 'customizacao',
      title: 'Soluções Customizadas',
      description: 'Programas modulares desenhados sob medida para responder à realidade de sua instituição.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="diferenciais" className="py-20 bg-neuro-darkBgLight/10 border-t border-b border-neuro-border/30 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.02),transparent_40%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-neuro-accent block mb-2">
            Nossos Pontos Fortes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient font-title mb-4">
            Diferenciais Competitivos
          </h2>
          <p className="text-neuro-textSecondary text-base sm:text-lg">
            Por que o Instituto NeuroPsi é a escolha ideal para capacitar sua equipe e assessorar seus projetos institucionais.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {diferenciais.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-glass-card rounded-xl border border-neuro-border shadow-glass hover:bg-neuro-primary/5 transition-all duration-300 flex flex-col items-start gap-4"
            >
              {/* Checkmark circular animado */}
              <div className="w-10 h-10 rounded-full bg-neuro-accent/10 border border-neuro-accent/20 flex items-center justify-center text-neuro-accent flex-shrink-0">
                <Check size={20} className="stroke-[3]" />
              </div>

              <div>
                <h3 className="text-lg font-bold font-title text-neuro-textPrimary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neuro-textSecondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
