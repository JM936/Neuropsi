import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ContactFooter } from './components/ContactFooter';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTransition } from './components/UI/PageTransition';

// Importação Dinâmica (Lazy Loading) das Páginas do Site para Code-Splitting inteligente
const Home = React.lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const PilaresPage = React.lazy(() => import('./pages/PilaresPage').then(m => ({ default: m.PilaresPage })));
const SolutionsPage = React.lazy(() => import('./pages/SolutionsPage').then(m => ({ default: m.SolutionsPage })));
const FormationsPage = React.lazy(() => import('./pages/FormationsPage').then(m => ({ default: m.FormationsPage })));
const DiferenciaisPage = React.lazy(() => import('./pages/DiferenciaisPage').then(m => ({ default: m.DiferenciaisPage })));
const PresidentPage = React.lazy(() => import('./pages/PresidentPage').then(m => ({ default: m.PresidentPage })));
const SocialImpactPage = React.lazy(() => import('./pages/SocialImpactPage').then(m => ({ default: m.SocialImpactPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const BlogPage = React.lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const ArticleDetailPage = React.lazy(() => import('./pages/ArticleDetailPage').then(m => ({ default: m.ArticleDetailPage })));

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-neuro-darkBg text-neuro-textPrimary antialiased selection:bg-neuro-primary/30 selection:text-neuro-accent">
        {/* Garante que a troca de rota role a tela para o topo */}
        <ScrollToTop />

        {/* Barra de Navegação Comum */}
        <Navbar />

        {/* Rotas Principais do Site com Roteamento Preguiçoso (Suspense) */}
        <main className="flex-grow">
          <Suspense fallback={
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-neuro-darkBg text-neuro-textSecondary">
              <div className="w-10 h-10 border-2 border-neuro-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-xs uppercase tracking-widest font-semibold animate-pulse">Carregando Conteúdo...</p>
            </div>
          }>
            <Routes>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/sobre" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="/pilares" element={<PageTransition><PilaresPage /></PageTransition>} />
              <Route path="/solucoes" element={<PageTransition><SolutionsPage /></PageTransition>} />
              <Route path="/formacoes" element={<PageTransition><FormationsPage /></PageTransition>} />
              <Route path="/diferenciais" element={<PageTransition><DiferenciaisPage /></PageTransition>} />
              <Route path="/presidente" element={<PageTransition><PresidentPage /></PageTransition>} />
              <Route path="/impacto" element={<PageTransition><SocialImpactPage /></PageTransition>} />
              <Route path="/contato" element={<PageTransition><ContactPage /></PageTransition>} />
              <Route path="/privacidade" element={<PageTransition><PrivacyPage /></PageTransition>} />
              <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
              <Route path="/blog/:slug" element={<PageTransition><ArticleDetailPage /></PageTransition>} />
              
              {/* Redirecionamento de rotas inexistentes para a Home */}
              <Route path="*" element={<PageTransition><Home /></PageTransition>} />
            </Routes>
          </Suspense>
        </main>

        {/* Rodapé Comum */}
        <ContactFooter />
      </div>
    </Router>
  );
};

export default App;
