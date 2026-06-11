import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Pilares } from './components/Pilares';
import { Solutions } from './components/Solutions';
import { Formations } from './components/Formations';
import { Diferenciais } from './components/Diferenciais';
import { President } from './components/President';
import { SocialImpact } from './components/SocialImpact';
import { ContactFooter } from './components/ContactFooter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neuro-darkBg text-neuro-textPrimary antialiased selection:bg-neuro-primary/30 selection:text-neuro-accent">
      {/* Barra de Navegação Fixa */}
      <Navbar />

      {/* Conteúdo Principal */}
      <main className="flex-grow">
        {/* Seção Hero - Entrada de Impacto */}
        <Hero />

        {/* Seção Quem Somos - Apresentação Institucional */}
        <About />

        {/* Seção Pilares - 4 Pilares do Instituto */}
        <Pilares />

        {/* Seção Soluções - Educação, Saúde e Segurança */}
        <Solutions />

        {/* Seção Formações - 6 Cursos e Modais de Detalhe */}
        <Formations />

        {/* Seção Diferenciais - Grade com Diferenciais Competitivos */}
        <Diferenciais />

        {/* Seção Presidente - Perfil do Comendador Leonardo Leal */}
        <President />

        {/* Seção Impacto Social - 8 Frentes de Atuação */}
        <SocialImpact />
      </main>

      {/* Chamada Final, Formulário de Contato e Rodapé */}
      <ContactFooter />
    </div>
  );
};

export default App;
