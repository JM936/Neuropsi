import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, HeartPulse, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from './UI/Button';

export const Solutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'educacao' | 'saude' | 'seguranca'>('educacao');

  const tabs = [
    {
      id: 'educacao',
      label: 'Educação',
      icon: <GraduationCap size={20} />,
      colorClass: 'text-teal-400 border-teal-400 bg-teal-500/10'
    },
    {
      id: 'saude',
      label: 'Saúde Pública',
      icon: <HeartPulse size={20} />,
      colorClass: 'text-rose-400 border-rose-400 bg-rose-500/10'
    },
    {
      id: 'seguranca',
      label: 'Segurança Pública',
      icon: <ShieldAlert size={20} />,
      colorClass: 'text-amber-400 border-amber-400 bg-amber-500/10'
    }
  ];

  const content = {
    educacao: {
      title: 'Inovação Pedagógica e Prática Inclusiva',
      description: 'Capacitamos o corpo docente e gestores para o desenvolvimento de práticas de ensino verdadeiramente inclusivas. Nossos treinamentos oferecem subsídios práticos para a aplicação de metodologias ativas que se ajustam à singularidade cognitiva de cada estudante.',
      items: [
        'Formação em Inclusão Escolar na Prática',
        'Neuroeducação aplicada à sala de aula',
        'Elaboração de PEI (Plano de Ensino Individualizado)',
        'Princípios do DUA (Desenho Universal para a Aprendizagem)',
        'Capacitação Docente especializada em Neurodiversidade',
        'Adaptação Curricular e de Materiais Didáticos'
      ],
      ctaText: 'Falar com Consultor de Educação',
      bgGlow: 'bg-teal-500/5'
    },
    saude: {
      title: 'Excelência Clínica e Intervenção Acolhedora',
      description: 'Oferecemos programas de qualificação voltados a profissionais de saúde e gestores de clínicas/hospitais. Focamos em estruturar processos de triagem rápida, acolhimento diferenciado e planos de intervenção terapêutica baseados na ciência.',
      items: [
        'Protocolos de Rastreio em Transtornos de Neurodesenvolvimento',
        'Acolhimento humanizado em serviços de saúde mental',
        'Intervenções baseadas em evidências científicas',
        'Capacitação de equipes multiprofissionais de saúde',
        'Protocolos clínicos integrados de neuropsicologia',
        'Gestão de unidades de reabilitação e acolhimento'
      ],
      ctaText: 'Falar com Consultor de Saúde',
      bgGlow: 'bg-rose-500/5'
    },
    seguranca: {
      title: 'Treinamento Tático e Atendimento Humanizado',
      description: 'Estruturamos metodologias e guias práticos pioneiros para as forças de segurança. Preparamos equipes policiais e Guardas Civis Municipais (GCM) para identificar, comunicar e gerenciar ocorrências com cidadãos neurodivergentes de forma segura e ética.',
      items: [
        'Protocolos de Atendimento Inclusivo para forças policiais',
        'Gerenciamento de crises envolvendo pessoas com autismo',
        'Protocolos operacionais de abordagem para a Guarda Civil Municipal (GCM)',
        'Comunicação não-violenta e desescalada verbal',
        'Resolução pacífica de conflitos em ambientes públicos',
        'Legislação e direitos da pessoa neurodivergente'
      ],
      ctaText: 'Falar com Consultor de Segurança',
      bgGlow: 'bg-amber-500/5'
    }
  };

  const currentContent = content[activeTab];

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

        {/* Abas Seletoras (Tabs) */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-neuro-cardBg/60 rounded-xl border border-neuro-border max-w-full overflow-x-auto gap-2">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'educacao' | 'saude' | 'seguranca')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap min-h-[44px] ${
                    isSelected
                      ? 'bg-neuro-primary text-white shadow-glow'
                      : 'text-neuro-textSecondary hover:text-white hover:bg-neuro-cardBg/30'
                  }`}
                >
                  {tab.icon}
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className={`p-8 sm:p-12 rounded-2xl bg-glass border border-neuro-border shadow-glass relative overflow-hidden`}
            >
              {/* Brilho decorativo no canto */}
              <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl -z-10 pointer-events-none transition-all duration-500 ${currentContent.bgGlow}`} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Lado Esquerdo: Descrição e CTA */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-title text-neuro-textPrimary mb-4">
                      {currentContent.title}
                    </h3>
                    <p className="text-neuro-textSecondary text-base leading-relaxed mb-8">
                      {currentContent.description}
                    </p>
                  </div>
                  
                  <div>
                    <Button 
                      variant="accent" 
                      className="gap-2 self-start"
                      onClick={handleScrollToContact}
                    >
                      {currentContent.ctaText}
                      <ArrowRight size={18} />
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
                        <CheckCircle2 className="text-neuro-accent mt-0.5 flex-shrink-0" size={18} />
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
