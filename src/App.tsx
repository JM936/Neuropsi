import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ContactFooter } from './components/ContactFooter';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTransition } from './components/UI/PageTransition';

// Importação das Páginas do Site
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { PilaresPage } from './pages/PilaresPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { FormationsPage } from './pages/FormationsPage';
import { DiferenciaisPage } from './pages/DiferenciaisPage';
import { PresidentPage } from './pages/PresidentPage';
import { SocialImpactPage } from './pages/SocialImpactPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-neuro-darkBg text-neuro-textPrimary antialiased selection:bg-neuro-primary/30 selection:text-neuro-accent">
        {/* Garante que a troca de rota role a tela para o topo */}
        <ScrollToTop />

        {/* Barra de Navegação Comum */}
        <Navbar />

        {/* Rotas Principais do Site */}
        <main className="flex-grow">
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
            
            {/* Redirecionamento de rotas inexistentes para a Home */}
            <Route path="*" element={<PageTransition><Home /></PageTransition>} />
          </Routes>
        </main>

        {/* Rodapé Comum */}
        <ContactFooter />
      </div>
    </Router>
  );
};

export default App;
