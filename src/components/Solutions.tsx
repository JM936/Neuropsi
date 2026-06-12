import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useSolutions } from '../hooks/useSolutions';
import { Button } from './UI/Button';

// Mapeamento dinâmico e seguro de ícones do Lucide
const renderLucideIcon = (name: string, size = 20, className = "") => {
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[name];
  return IconComponent ? <IconComponent size={size} className={className} /> : null;
};

export const Solutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'educacao' | 'saude' | 'seguranca'>('educacao');
  const { solutions } = useSolutions();

  const tabs = [
    {
      id: 'educacao',
      label: 'Educação',
      iconName: 'GraduationCap',
      colorClass: 'text-teal-400 border-teal-400 bg-teal-500/10'
    },
    {
      id: 'saude',
      label: 'Saúde Pública',
      iconName: 'HeartPulse',
      colorClass: 'text-rose-400 border-rose-400 bg-rose-500/10'
    },
    {
      id: 'seguranca',
      label: 'Segurança Pública',
      iconName: 'ShieldAlert',
      colorClass: 'text-amber-400 border-amber-400 bg-amber-500/10'
    }
  ];

  const currentContent = solutions[activeTab];

  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
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
    <section id="solutions" className="py-20 bg-neuro-darkBgLight/20 border-t border-neuro-border/30 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(63,55,201,0.03),transparent_45%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-neuro-accent block mb-2">
            O que Oferecemos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient font-title mb-4">
            Soluções Institucionais Customizadas
          </h2>
          <p className="text-neuro-textSecondary text-base sm:text-lg">
            Programas desenvolvidos sob demanda para atender as necessidades regulatórias, de capacitação e técnicas de cada instituição.
          </p>
        </div>

        {/* Abas Seletoras (Tabs) - Acessibilidade de toque de 44px */}
        <div className="flex justify-center mb-12">
          <div 
            role="tablist" 
            aria-label="Opções de Soluções Institucionais"
            className="inline-flex p-1.5 bg-neuro-cardBg/60 rounded-xl border border-neuro-border max-w-full overflow-x-auto gap-2"
          >
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              if (isSelected) {
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id as 'educacao' | 'saude' | 'seguranca')}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap min-h-[44px] bg-neuro-primary text-white shadow-glow"
                    aria-selected="true"
                    aria-controls={`panel-${tab.id}`}
                    role="tab"
                  >
                    {renderLucideIcon(tab.iconName, 20)}
                    {tab.label}
                  </button>
                );
              }
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as 'educacao' | 'saude' | 'seguranca')}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap min-h-[44px] text-neuro-textSecondary hover:text-white hover:bg-neuro-cardBg/30"
                  aria-selected="false"
                  aria-controls={`panel-${tab.id}`}
                  role="tab"
                >
                  {renderLucideIcon(tab.iconName, 20)}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel de Conteúdo com Animação */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`panel-${activeTab}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-12 rounded-2xl bg-glass border border-neuro-border shadow-glass relative overflow-hidden"
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
            >
              {/* Brilho decorativo no canto */}
              <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl -z-10 pointer-events-none transition-all duration-500 ${currentContent.bgGlow}`} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Lado Esquerdo: Descrição e CTA */}
                <div className="lg:col-span-7 flex flex-col justify-between relative">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-title text-neuro-textPrimary mb-4">
                      {currentContent.title}
                    </h3>
                    <p className="text-neuro-textSecondary text-base leading-relaxed mb-4">
                      {currentContent.description}
                    </p>
                  </div>
                  
                  {/* Ilustração Temática Decorativa com Lazy Loading */}
                  <div className="my-6 relative rounded-xl overflow-hidden h-36 sm:h-44 border border-neuro-border/20 bg-neuro-darkBg/30 flex items-center justify-center pointer-events-none group">
                    <img 
                      src={currentContent.image} 
                      alt={currentContent.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-20 solutions-image-bg group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neuro-darkBgLight/80 via-transparent to-neuro-darkBgLight/45" />
                    
                    {/* Badge de Ícone centralizado e suave */}
                    <div className={`relative z-10 flex items-center gap-3 p-3.5 backdrop-blur-md rounded-xl border transition-all duration-300 ${currentContent.colorClass}`}>
                      {renderLucideIcon(currentContent.iconName, 24)}
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                        Estratégia e Ação de Impacto
                      </span>
                    </div>
                  </div>

                  <div>
                    <Button 
                      variant="accent" 
                      className="gap-2 self-start min-h-[44px]"
                      onClick={handleScrollToContact}
                    >
                      {currentContent.ctaText}
                      {renderLucideIcon('ArrowRight', 18)}
                    </Button>
                  </div>
                </div>

                {/* Lado Direito: Grid de Itens e Serviços */}
                <div className="lg:col-span-5 bg-neuro-darkBg/60 border border-neuro-border/30 p-6 sm:p-8 rounded-xl flex flex-col justify-center">
                  <h4 className="text-sm font-semibold text-neuro-accent uppercase tracking-wider mb-6">
                    Principais Linhas de Ação:
                  </h4>
                  <ul className="space-y-4">
                    {currentContent.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {renderLucideIcon('CheckCircle2', 18, "text-neuro-accent mt-0.5 flex-shrink-0")}
                        <span className="text-sm sm:text-base text-neuro-textPrimary font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
