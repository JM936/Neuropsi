import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, BookOpen } from 'lucide-react';

export const About: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const highlights = [
    {
      icon: <BookOpen className="text-neuro-primary" size={24} />,
      title: 'Ciência e Evidências',
      description: 'Protocolos rigorosamente fundamentados na neurociência aplicada à aprendizagem e ao comportamento humano.'
    },
    {
      icon: <Shield className="text-neuro-accent" size={24} />,
      title: 'Segurança & Cuidado',
      description: 'Capacitações voltadas ao gerenciamento de crises e acolhimento humanizado para a neurodiversidade.'
    },
    {
      icon: <Users className="text-neuro-highlight" size={24} />,
      title: 'Impacto Social',
      description: 'Projetos e soluções customizadas que promovem a inclusão real em escolas, prefeituras e órgãos públicos.'
    },
    {
      icon: <Award className="text-neuro-magenta" size={24} />,
      title: 'Resultados Reais',
      description: 'Transformação direta de equipes com metodologias ativas, otimizando o atendimento institucional.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-neuro-darkBgLight/40 border-t border-b border-neuro-border/30 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.03),transparent_40%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Coluna Texto Institucional */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs uppercase tracking-widest font-semibold text-neuro-accent block mb-2">
                Quem Somos
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient font-title mb-6">
                A Sinergia entre Ciência, Inclusão e Prática Institucional
              </h2>
              <div className="text-neuro-textSecondary space-y-4 leading-relaxed text-base">
                <p>
                  O <strong>Instituto de Neuropsicopedagogia</strong> nasceu da urgente necessidade de construir pontes sólidas entre a ciência do cérebro e as demandas práticas da sociedade. Unimos a <strong>Neurociência Aplicada</strong>, a <strong>Educação Inclusiva</strong>, a <strong>Saúde Pública</strong> e a <strong>Segurança Pública</strong> em um ecossistema integrado de soluções corporativas e educacionais.
                </p>
                <p>
                  Nossa atuação é focada em criar metodologias de ponta, capacitar profissionais e desenvolver protocolos baseados em evidências que geram resultados concretos e mensuráveis para instituições públicas e privadas em todo o país.
                </p>
                <p className="border-l-4 border-neuro-accent pl-4 italic text-neuro-textPrimary">
                  Acreditamos que a inclusão verdadeira e a gestão de ambientes diversos dependem de conhecimento técnico, empatia e estratégia estruturada.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Coluna Cards de Destaque */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-glass-card rounded-xl shadow-glass border border-neuro-border flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="p-3 bg-neuro-darkBg rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold font-title text-neuro-textPrimary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neuro-textSecondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
