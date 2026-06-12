import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  GraduationCap, 
  HeartPulse, 
  ShieldAlert 
} from 'lucide-react';
import { usePillars } from '../hooks/usePillars';

// Dicionário de ícones locais para tree-shaking do Lucide
const ICONS_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain,
  GraduationCap,
  HeartPulse,
  ShieldAlert
};

// Renderização dinâmica dos ícones do Lucide
const renderLucideIcon = (name: string, size = 32, className = "text-white") => {
  const IconComponent = ICONS_MAP[name];
  return IconComponent ? <IconComponent size={size} className={className} /> : null;
};

export const Pilares: React.FC = () => {
  const { pillars } = usePillars();

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
          {pillars.map((pilar, index) => (
            <motion.div
              key={pilar.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className={`relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br border border-neuro-border/20 backdrop-blur-md flex flex-col justify-between transition-all duration-300 ${pilar.colorClass} ${pilar.shadowColor} group`}
            >
              {/* Círculo decorativo de fundo */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-500" />

              <div>
                <div className={`p-4 ${pilar.iconBg} rounded-xl w-fit mb-6 shadow-md flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300`}>
                  {renderLucideIcon(pilar.iconName, 32, "text-white")}
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
