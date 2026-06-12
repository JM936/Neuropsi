import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, GraduationCap, ShieldAlert, ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { PageMeta } from '../components/UI/PageMeta';

export const Home: React.FC = () => {
  const links = [
    {
      to: '/sobre',
      icon: <BookOpen className="text-teal-400" size={24} />,
      title: 'Quem Somos',
      description: 'Conheça nossa missão institucional, nossa história e atuação pericial e pedagógica.'
    },
    {
      to: '/pilares',
      icon: <Brain className="text-purple-400" size={24} />,
      title: 'Os 4 Pilares',
      description: 'Nossos fundamentos em Neurociência, Educação Inclusiva, Saúde e Segurança Pública.'
    },
    {
      to: '/solucoes',
      icon: <ShieldAlert className="text-amber-400" size={24} />,
      title: 'Soluções Customizadas',
      description: 'Consultorias e assessorias sob medida para prefeituras, escolas e hospitais.'
    },
    {
      to: '/formacoes',
      icon: <GraduationCap className="text-rose-400" size={24} />,
      title: 'Programas de Formação',
      description: 'Nossas 6 especializações e capacitações com conteúdo programático científico.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PageMeta 
        title="Início" 
        description="Instituto de Neuropsicopedagogia. Excelência em Neurociência Aplicada, Educação Inclusiva, Saúde e Segurança Pública." 
      />
      {/* Hero Section de Impacto */}
      <Hero />

      {/* Seção de Atalhos e Visão Geral */}
      <section className="py-16 bg-neuro-darkBgLight/30 border-t border-neuro-border/30 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(63,55,201,0.02),transparent_40%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gradient font-title mb-4">
              Explore o Instituto
            </h2>
            <p className="text-neuro-textSecondary text-sm sm:text-base">
              Navegue pelos nossos departamentos e frentes de atuação para encontrar a solução ideal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {links.map((link, idx) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 bg-glass-card border-glow-premium rounded-xl flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="p-3 bg-neuro-darkBg rounded-lg w-fit mb-4 group-hover:scale-105 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <h3 className="text-lg font-bold font-title text-white mb-2">
                    {link.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neuro-textSecondary leading-relaxed mb-6">
                    {link.description}
                  </p>
                </div>

                <Link
                  to={link.to}
                  className="inline-flex items-center gap-1 text-xs font-bold text-neuro-accent group-hover:text-white transition-colors uppercase tracking-wider"
                >
                  Acessar Página
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
