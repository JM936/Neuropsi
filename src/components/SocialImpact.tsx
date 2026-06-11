import React from 'react';
import { motion } from 'framer-motion';
import { 
  School, 
  Stethoscope, 
  Landmark, 
  BookOpen, 
  ShieldAlert, 
  ShieldCheck, 
  Users, 
  HelpingHand 
} from 'lucide-react';
import type { ImpactoSocial } from '../types';

export const SocialImpact: React.FC = () => {
  const impactos: ImpactoSocial[] = [
    {
      id: 'escolas',
      sector: 'Escolas',
      icon: 'school',
      description: 'Estruturação de planos pedagógicos acessíveis e treinamento continuado de docentes para o acolhimento.'
    },
    {
      id: 'hospitais',
      sector: 'Hospitais',
      icon: 'health',
      description: 'Capacitação clínica multiprofissional para triagem ágil e terapias baseadas em evidências.'
    },
    {
      id: 'prefeituras',
      sector: 'Prefeituras',
      icon: 'landmark',
      description: 'Consultoria técnica para implementação de políticas públicas eficientes em acessibilidade social.'
    },
    {
      id: 'universidades',
      sector: 'Universidades',
      icon: 'academic',
      description: 'Parcerias para fomento à pesquisa de ponta aplicada à cognição e reabilitação comportamental.'
    },
    {
      id: 'guardas-municipais',
      sector: 'Guardas Municipais',
      icon: 'gcm',
      description: 'Protocolos de atendimento inclusivo em situações cotidianas de policiamento urbano.'
    },
    {
      id: 'forcas-seguranca',
      sector: 'Forças de Segurança',
      icon: 'police',
      description: 'Programas táticos avançados para controle emocional, mediação e contenção ética em crises.'
    },
    {
      id: 'organizacoes-sociais',
      sector: 'Organizações Sociais',
      icon: 'ngo',
      description: 'Estruturação de frentes de inclusão e assessoria técnica gratuita para ONGs parceiras.'
    },
    {
      id: 'instituicoes-religiosas',
      sector: 'Instituições Religiosas',
      icon: 'church',
      description: 'Capacitações voltadas ao suporte psicossocial e mediação humanitária comunitária.'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'school': return <School className="text-teal-400" size={24} />;
      case 'health': return <Stethoscope className="text-rose-400" size={24} />;
      case 'landmark': return <Landmark className="text-amber-400" size={24} />;
      case 'academic': return <BookOpen className="text-blue-400" size={24} />;
      case 'gcm': return <ShieldAlert className="text-indigo-400" size={24} />;
      case 'police': return <ShieldCheck className="text-purple-400" size={24} />;
      case 'ngo': return <Users className="text-emerald-400" size={24} />;
      case 'church': return <HelpingHand className="text-pink-400" size={24} />;
      default: return <School className="text-white" size={24} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="impact" className="py-20 bg-neuro-darkBgLight/20 border-t border-neuro-border/30 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(63,55,201,0.02),transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-neuro-accent block mb-2">
            Alcance Social
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient font-title mb-4">
            Áreas de Impacto Institucional
          </h2>
          <p className="text-neuro-textSecondary text-base sm:text-lg">
            A versatilidade e a robustez científica dos nossos programas permitem que atuemos nos núcleos mais sensíveis da vida em sociedade.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {impactos.map((imp) => (
            <motion.div
              key={imp.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="p-6 bg-glass-card rounded-xl border border-neuro-border shadow-glass hover:bg-neuro-primary/5 transition-all duration-300 flex flex-col items-start"
            >
              <div className="p-3 bg-neuro-darkBg rounded-lg w-fit mb-4">
                {getIcon(imp.icon)}
              </div>
              <h3 className="text-lg font-bold font-title text-neuro-textPrimary mb-2">
                {imp.sector}
              </h3>
              <p className="text-sm text-neuro-textSecondary leading-relaxed">
                {imp.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
