import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './UI/Button';
import { useScrollAnchor } from '../hooks/useScrollAnchor';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    { id: 'hero', name: 'Início' },
    { id: 'about', name: 'Quem Somos' },
    { id: 'pilares', name: 'Pilares' },
    { id: 'solutions', name: 'Soluções' },
    { id: 'formations', name: 'Formações' },
    { id: 'diferenciais', name: 'Diferenciais' },
    { id: 'president', name: 'Presidente' },
    { id: 'impact', name: 'Impacto' }
  ];

  const sectionIds = sections.map(s => s.id).concat(['contact']);
  const activeSection = useScrollAnchor(sectionIds, 120);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
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
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-neuro-darkBg/80 backdrop-blur-glass border-b border-neuro-border shadow-lg' 
            : 'py-5 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logotipo */}
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
              className="flex items-center"
              aria-label="Ir para a seção inicial do Instituto NeuroPsi"
            >
              <Logo showText={true} className="h-10" />
            </a>

            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center gap-6">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(sec.id); }}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-2 ${
                    activeSection === sec.id 
                      ? 'text-neuro-accent' 
                      : 'text-neuro-textSecondary hover:text-neuro-textPrimary'
                  }`}
                >
                  {sec.name}
                  {activeSection === sec.id && (
                    <motion.span 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neuro-accent rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
              
              <Button 
                variant="primary" 
                size="sm"
                className="ml-2 gap-2"
                onClick={() => handleNavClick('contact')}
              >
                Falar com a Equipe
                <ArrowRight size={16} />
              </Button>
            </div>

            {/* Hamburguer Botão Mobile */}
            <div className="lg:hidden flex items-center">
              {isOpen ? (
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-neuro-textSecondary hover:text-white hover:bg-neuro-cardBg focus:outline-none min-h-[44px] min-w-[44px]"
                  aria-expanded="true"
                  aria-label="Fechar menu de navegação"
                >
                  <X size={24} />
                </button>
              ) : (
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-neuro-textSecondary hover:text-white hover:bg-neuro-cardBg focus:outline-none min-h-[44px] min-w-[44px]"
                  aria-expanded="false"
                  aria-label="Abrir menu de navegação"
                >
                  <Menu size={24} />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Menu Mobile Lateral / Gaveta */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* Painel do Menu */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-4/5 max-w-sm bg-neuro-darkBgLight border-l border-neuro-border p-6 shadow-2xl flex flex-col lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-8">
                <Logo showText={true} className="h-10" />
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md text-neuro-textSecondary hover:text-white hover:bg-neuro-cardBg min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Fechar menu de navegação"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto flex-grow pr-2">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(sec.id); }}
                    className={`text-base font-semibold py-3 px-4 rounded-lg transition-all duration-200 ${
                      activeSection === sec.id
                        ? 'bg-neuro-primary/20 text-neuro-accent border-l-4 border-neuro-accent'
                        : 'text-neuro-textSecondary hover:text-white hover:bg-neuro-cardBg/30'
                    }`}
                  >
                    {sec.name}
                  </a>
                ))}
              </div>

              <div className="pt-6 border-t border-neuro-border mt-auto">
                <Button 
                  variant="primary" 
                  fullWidth 
                  className="gap-2"
                  onClick={() => handleNavClick('contact')}
                >
                  Falar com a Equipe
                  <ArrowRight size={18} />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
