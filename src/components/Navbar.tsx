import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './UI/Button';
import { useTheme } from '../hooks/useTheme';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const desktopSections = [
    { path: '/', name: 'Início' },
    { path: '/sobre', name: 'Quem Somos' },
    { path: '/solucoes', name: 'Soluções' },
    { path: '/formacoes', name: 'Formações' },
    { path: '/blog', name: 'Blog' }
  ];

  const mobileSections = [
    { path: '/', name: 'Início' },
    { path: '/sobre', name: 'Quem Somos' },
    { path: '/pilares', name: 'Pilares' },
    { path: '/solucoes', name: 'Soluções' },
    { path: '/formacoes', name: 'Formações' },
    { path: '/blog', name: 'Blog' },
    { path: '/diferenciais', name: 'Diferenciais' },
    { path: '/presidente', name: 'Presidente' },
    { path: '/impacto', name: 'Impacto' }
  ];

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

  const { theme, toggleTheme } = useTheme();

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
            <Link 
              to="/" 
              className="flex items-center"
              aria-label="Ir para a seção inicial do Instituto de Neuropsicopedagogia"
            >
              <Logo showText={true} hideTagline={true} className="h-10" />
            </Link>

            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {desktopSections.map((sec) => (
                <NavLink
                  key={sec.path}
                  to={sec.path}
                  end={sec.path === '/'}
                  className={({ isActive }) =>
                    `text-xs lg:text-sm font-medium tracking-wide transition-colors duration-200 relative py-2 ${
                      isActive 
                        ? 'text-neuro-accent font-semibold' 
                        : 'text-neuro-textSecondary hover:text-neuro-textPrimary'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {sec.name}
                      {isActive && (
                        <motion.span 
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-neuro-accent rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-neuro-textSecondary hover:text-white hover:bg-neuro-cardBg/40 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                aria-label={theme === 'light' ? 'Alternar para tema escuro' : 'Alternar para tema claro'}
                title={theme === 'light' ? 'Ativar Tema Escuro' : 'Ativar Tema Claro'}
              >
                {theme === 'light' ? (
                  <Moon size={20} className="text-neuro-primary" />
                ) : (
                  <Sun size={20} className="text-neuro-highlight" />
                )}
              </button>
              
              <Link to="/contato">
                <Button 
                  variant="primary" 
                  size="sm"
                  className="gap-2"
                >
                  Falar com a Equipe
                  <ArrowRight size={16} />
                </Button>
              </Link>
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
                <Logo showText={true} hideTagline={true} className="h-10" />
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md text-neuro-textSecondary hover:text-white hover:bg-neuro-cardBg min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Fechar menu de navegação"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto flex-grow pr-2">
                {mobileSections.map((sec) => (
                  <NavLink
                    key={sec.path}
                    to={sec.path}
                    end={sec.path === '/'}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `text-base font-semibold py-3 px-4 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-neuro-primary/20 text-neuro-accent border-l-4 border-neuro-accent'
                          : 'text-neuro-textSecondary hover:text-white hover:bg-neuro-cardBg/30'
                      }`
                    }
                  >
                    {sec.name}
                  </NavLink>
                ))}
              </div>

              <div className="pt-6 border-t border-neuro-border mt-auto flex flex-col gap-4">
                <button
                  onClick={toggleTheme}
                  className="w-full py-3 px-4 rounded-lg bg-neuro-cardBg/60 border border-neuro-border text-neuro-textPrimary flex items-center justify-between text-sm font-semibold hover:bg-neuro-cardBg/90 transition-colors min-h-[44px]"
                  aria-label={theme === 'light' ? 'Alternar para tema escuro' : 'Alternar para tema claro'}
                >
                  <span className="flex items-center gap-2">
                    {theme === 'light' ? (
                      <Moon size={18} className="text-neuro-primary" />
                    ) : (
                      <Sun size={18} className="text-neuro-highlight" />
                    )}
                    Tema
                  </span>
                  <span className="text-xs text-neuro-accent uppercase tracking-wider font-bold">
                    {theme === 'light' ? 'Claro' : 'Escuro'}
                  </span>
                </button>

                <Link to="/contato" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="primary" 
                    fullWidth 
                    className="gap-2"
                  >
                    Falar com a Equipe
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
