import React from 'react';
import { motion } from 'framer-motion';
import { Brain, GraduationCap, HeartPulse, ShieldAlert } from 'lucide-react';

export const Pilares: React.FC = () => {
  const pilares = [
    {
      icon: <Brain size={32} className="text-white" />,
      title: 'Neurociência Aplicada',
      subtitle: 'Ciência do cérebro e aprendizagem',
      description: 'Estudo dos processos neurais e cognitivos para otimização do aprendizado, tomada de decisão e desenvolvimento de competências em ambientes educacionais e corporativos.',
      colorClass: 'from-purple-600/35 to-indigo-600/20 hover:border-purple-500/50',
      iconBg: 'bg-purple-600',
      shadowColor: 'hover:shadow-[0_8px_30px_rgb(147,51,234,0.15)]'
    },
    {
      icon: <GraduationCap size={32} className="text-white" />,
      title: 'Educação Inclusiva',
      subtitle: 'Formação de professores e gestores',
      description: 'Metodologias adaptativas, PEI (Plano de Ensino Individualizado) e DUA (Desenho Universal para a Aprendizagem), capacitando educadores para acolher e desenvolver a neurodiversidade na prática.',
      colorClass: 'from-teal-600/35 to-emerald-600/20 hover:border-teal-500/50',
      iconBg: 'bg-teal-600',
      shadowColor: 'hover:shadow-[0_8px_30px_rgb(13,148,136,0.15)]'
    },
    {
      icon: <HeartPulse size={32} className="text-white" />,
      title: 'Saúde Pública',
      subtitle: 'Acolhimento e intervenção precoce',
      description: 'Capacitação multiprofissional para agentes de saúde e clínicas, focando no rastreio, diagnóstico precoce e protocolos de intervenção terapêutica baseados em evidências científicas.',
      colorClass: 'from-rose-600/35 to-pink-600/20 hover:border-rose-500/50',
      iconBg: 'bg-rose-600',
      shadowColor: 'hover:shadow-[0_8px_30px_rgb(225,29,72,0.15)]'
    },
    {
      icon: <ShieldAlert size={32} className="text-white" />,
      title: 'Segurança Pública',
      subtitle: 'Protocolos humanizados e crise',
      description: 'Treinamento tático e de comunicação para forças policiais e guardas civis, focando no atendimento inclusivo a pessoas com transtornos do neurodesenvolvimento em situações de crise.',
      colorClass: 'from-amber-600/35 to-orange-600/20 hover:border-amber-500/50',
      iconBg: 'bg-amber-600',
      shadowColor: 'hover:shadow-[0_8px_30px_rgb(217,119,6,0.15)]'
    }
  ];

  return (
    <section id="pilares" className="py-20 bg-neuro-darkBg relative overflow-hidden">
      {/* Background radial soft gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neuro-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-neuro-accent block mb-2">
              Nossa Estrutura
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient font-title mb-4">
              Os Quatro Pilares de Excelência
            </h2>
            <p className="text-neuro-textSecondary text-base sm:text-lg">
              Atuação integrada com metodologias específicas desenvolvidas para responder aos desafios de cada setor de forma inovadora e humanizada.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pilares.map((pilar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className={`relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br border border-neuro-border backdrop-blur-glass flex flex-col justify-between transition-all duration-300 ${pilar.colorClass} ${pilar.shadowColor} group`}
            >
              {/* Círculo decorativo de fundo */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-500" />

              <div>
                <div className={`p-4 ${pilar.iconBg} rounded-xl w-fit mb-6 shadow-md flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300`}>
                  {pilar.icon}
                </div>
                <h3 className="text-xl font-bold font-title text-neuro-textPrimary mb-1">
                  {pilar.title}
                </h3>
                <h4 className="text-xs font-semibold text-neuro-accent uppercase tracking-wider mb-4">
                  {pilar.subtitle}
                </h4>
                <p className="text-sm text-neuro-textSecondary leading-relaxed">
                  {pilar.description}
                </p>
              </div>
              
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-neuro-textPrimary opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                Pilar {index + 1} de 4
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
