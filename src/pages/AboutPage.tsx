import React from 'react';
import { About } from '../components/About';
import { PageMeta } from '../components/UI/PageMeta';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-20">
      <PageMeta 
        title="Quem Somos" 
        description="Conheça nossa história, nossa missão pericial e pedagógica e nosso compromisso científico com o desenvolvimento humano." 
      />
      <About />
    </div>
  );
};
