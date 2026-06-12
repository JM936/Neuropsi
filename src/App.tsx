import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ContactFooter } from './components/ContactFooter';
import { ScrollToTop } from './components/ScrollToTop';

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
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/pilares" element={<PilaresPage />} />
            <Route path="/solucoes" element={<SolutionsPage />} />
            <Route path="/formacoes" element={<FormationsPage />} />
            <Route path="/diferenciais" element={<DiferenciaisPage />} />
            <Route path="/presidente" element={<PresidentPage />} />
            <Route path="/impacto" element={<SocialImpactPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/privacidade" element={<PrivacyPage />} />
            
            {/* Redirecionamento de rotas inexistentes para a Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Rodapé Comum */}
        <ContactFooter />
      </div>
    </Router>
  );
};

export default App;
