import React from 'react';
import { motion } from 'framer-motion';
import { FileText, GraduationCap, ArrowDown } from 'lucide-react';
import { Button } from './UI/Button';
import { Logo } from './Logo';

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const badges = [
    'Capacitação',
    'Consultoria',
    'Protocolos',
    'Pesquisa Aplicada',
    'Educação Inclusiva',
    'Neurodiversidade',
    'Segurança Pública'
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-animated-radial"
    >
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-neuro-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neuro-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Logo Centralizado */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 p-4 bg-glass rounded-2xl shadow-glass flex justify-center items-center"
          >
            <Logo showText={false} className="h-16 w-16" />
          </motion.div>

          {/* Título Principal */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-gradient font-title max-w-4xl"
          >
            Instituto de Neuropsicopedagogia Aplicada e Educação Inclusiva
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-neuro-accent font-semibold tracking-wide mb-8 max-w-2xl font-title"
          >
            Soluções Integradas para Instituições Públicas e Privadas
          </motion.p>

          {/* Destaques (Badges) */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 max-w-3xl"
          >
            {badges.map((badge, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-neuro-cardBg/60 text-neuro-textSecondary border border-neuro-border rounded-full hover:border-neuro-accent/30 hover:text-white transition-all duration-300"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          {/* Frase de Impacto */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-neuro-textSecondary italic max-w-3xl mb-12 px-4 border-l-4 border-neuro-primary"
          >
            "Transformamos conhecimento científico em soluções práticas para pessoas, equipes e instituições."
          </motion.p>

          {/* Botões de Ação */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
          >
            <Button
              variant="primary"
              size="lg"
              className="gap-2 shadow-glow text-white"
              onClick={() => handleScrollTo('contact')}
            >
              <FileText size={20} />
              Solicitar Apresentação
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="gap-2"
              onClick={() => handleScrollTo('formations')}
            >
              <GraduationCap size={20} />
              Conhecer Programas
            </Button>
          </motion.div>

          {/* Seta Indicadora */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="mt-16 text-neuro-textMuted hover:text-neuro-textPrimary cursor-pointer flex flex-col items-center gap-1"
            onClick={() => handleScrollTo('about')}
          >
            <span className="text-xs uppercase tracking-widest font-semibold">Saiba Mais</span>
            <ArrowDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
